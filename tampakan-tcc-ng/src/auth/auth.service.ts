import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { jwtConstants } from '../config/jwt.config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: 900,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: 604800,
      }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async refresh(dto: RefreshDto) {
    let payload: { sub: number; email: string; role: string };

    try {
      payload = await this.jwtService.verifyAsync(dto.refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokenHash = createHash('sha256')
      .update(dto.refreshToken)
      .digest('hex');

    const blacklisted = await this.prisma.blacklistedToken.findUnique({
      where: { token: tokenHash },
    });

    if (blacklisted) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const newPayload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(newPayload, {
        expiresIn: 900,
      }),
      refresh_token: this.jwtService.sign(newPayload, {
        expiresIn: 604800,
      }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async logout(dto: LogoutDto) {
    let payload: { sub: number; email: string; role: string; exp: number };

    try {
      payload = await this.jwtService.verifyAsync(dto.refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokenHash = createHash('sha256')
      .update(dto.refreshToken)
      .digest('hex');

    const expiresAt = new Date(payload.exp * 1000);

    await this.prisma.blacklistedToken.create({
      data: {
        token: tokenHash,
        expiresAt,
      },
    });

    return { message: 'Logged out successfully' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: 'If that email is registered, a reset link has been sent' };
    }

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: tokenHash,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return {
      message: 'If that email is registered, a reset link has been sent',
      resetToken: rawToken,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');

    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token: tokenHash },
    });

    if (!resetToken) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (resetToken.used) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await hash(dto.newPassword, 12);

    await this.prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    });

    return { message: 'Password has been reset successfully' };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');

    const verificationToken =
      await this.prisma.emailVerificationToken.findUnique({
        where: { token: tokenHash },
      });

    if (!verificationToken) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    if (verificationToken.used) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    if (verificationToken.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: true },
    });

    await this.prisma.emailVerificationToken.update({
      where: { id: verificationToken.id },
      data: { used: true },
    });

    return { message: 'Email verified successfully' };
  }
}
