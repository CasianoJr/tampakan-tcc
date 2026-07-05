import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$12$mockhashed'),
  compare: jest.fn(),
}));

jest.mock('crypto', () => ({
  createHash: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue('mocked-hash'),
  }),
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue('mock-raw-reset-token'),
  }),
}));

import * as bcrypt from 'bcrypt';

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  blacklistedToken: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  passwordResetToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  emailVerificationToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  preEnrollment: {
    findUnique: jest.fn(),
  },
};

const mockJwt = {
  sign: jest.fn().mockReturnValue('mock-token'),
  verifyAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginDto = { email: 'a@b.com', password: 'password123' };
    const hashedPassword = '$2b$12$mockhashed';

    it('should return tokens and user for valid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
        password: hashedPassword,
        role: 'STUDENT',
        isActive: true,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(result.access_token).toBe('mock-token');
      expect(result.refresh_token).toBe('mock-token');
      expect(result.user).toEqual({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
        role: 'STUDENT',
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when user is inactive', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
        password: hashedPassword,
        role: 'STUDENT',
        isActive: false,
      });

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when password is wrong', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
        password: hashedPassword,
        role: 'STUDENT',
        isActive: true,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('refresh', () => {
    const refreshDto = { refreshToken: 'valid-refresh-token' };

    it('should return new tokens for valid refresh token', async () => {
      mockJwt.verifyAsync.mockResolvedValue({
        sub: 1,
        email: 'a@b.com',
        role: 'STUDENT',
      });
      mockPrisma.blacklistedToken.findUnique.mockResolvedValue(null);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
        role: 'STUDENT',
        isActive: true,
      });

      const result = await service.refresh(refreshDto);

      expect(result.access_token).toBe('mock-token');
      expect(result.refresh_token).toBe('mock-token');
      expect(result.user).toEqual({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
        role: 'STUDENT',
      });
    });

    it('should throw UnauthorizedException when token is invalid', async () => {
      mockJwt.verifyAsync.mockRejectedValue(new Error('invalid token'));

      await expect(service.refresh(refreshDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when token is blacklisted', async () => {
      mockJwt.verifyAsync.mockResolvedValue({
        sub: 1,
        email: 'a@b.com',
        role: 'STUDENT',
      });
      mockPrisma.blacklistedToken.findUnique.mockResolvedValue({
        id: 1,
        token: 'mocked-hash',
      });

      await expect(service.refresh(refreshDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when user is inactive', async () => {
      mockJwt.verifyAsync.mockResolvedValue({
        sub: 1,
        email: 'a@b.com',
        role: 'STUDENT',
      });
      mockPrisma.blacklistedToken.findUnique.mockResolvedValue(null);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
        role: 'STUDENT',
        isActive: false,
      });

      await expect(service.refresh(refreshDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('forgotPassword', () => {
    const forgotDto = { email: 'a@b.com' };

    it('should generate a token for existing user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        name: 'Test',
      });

      const result = await service.forgotPassword(forgotDto);

      expect(result.message).toBe(
        'If that email is registered, a reset link has been sent',
      );
      expect(result.resetToken).toBe('mock-raw-reset-token');
      expect(mockPrisma.passwordResetToken.create).toHaveBeenCalled();
    });

    it('should return same message for unknown email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.forgotPassword(forgotDto);

      expect(result.message).toBe(
        'If that email is registered, a reset link has been sent',
      );
      expect(result.resetToken).toBeUndefined();
    });
  });

  describe('resetPassword', () => {
    const resetDto = { token: 'valid-raw-token', newPassword: 'newPass123' };
    const validTokenRecord = {
      id: 1,
      userId: 1,
      token: 'mocked-hash',
      expiresAt: new Date(Date.now() + 600000),
      used: false,
      createdAt: new Date(),
    };

    it('should reset password for valid token', async () => {
      mockPrisma.passwordResetToken.findUnique.mockResolvedValue(
        validTokenRecord,
      );

      const result = await service.resetPassword(resetDto);

      expect(result).toEqual({
        message: 'Password has been reset successfully',
      });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { password: '$2b$12$mockhashed' },
      });
      expect(mockPrisma.passwordResetToken.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { used: true },
      });
    });

    it('should throw BadRequestException when token not found', async () => {
      mockPrisma.passwordResetToken.findUnique.mockResolvedValue(null);

      await expect(service.resetPassword(resetDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when token is already used', async () => {
      mockPrisma.passwordResetToken.findUnique.mockResolvedValue({
        ...validTokenRecord,
        used: true,
      });

      await expect(service.resetPassword(resetDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when token is expired', async () => {
      mockPrisma.passwordResetToken.findUnique.mockResolvedValue({
        ...validTokenRecord,
        expiresAt: new Date(Date.now() - 600000),
      });

      await expect(service.resetPassword(resetDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('verifyEmail', () => {
    const verifyDto = { token: 'valid-raw-token' };
    const validTokenRecord = {
      id: 1,
      userId: 1,
      token: 'mocked-hash',
      expiresAt: new Date(Date.now() + 600000),
      used: false,
      createdAt: new Date(),
    };

    it('should verify email for valid token', async () => {
      mockPrisma.emailVerificationToken.findUnique.mockResolvedValue(
        validTokenRecord,
      );

      const result = await service.verifyEmail(verifyDto);

      expect(result).toEqual({ message: 'Email verified successfully' });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { emailVerified: true },
      });
      expect(mockPrisma.emailVerificationToken.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { used: true },
      });
    });

    it('should throw BadRequestException when token not found', async () => {
      mockPrisma.emailVerificationToken.findUnique.mockResolvedValue(null);

      await expect(service.verifyEmail(verifyDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when token is already used', async () => {
      mockPrisma.emailVerificationToken.findUnique.mockResolvedValue({
        ...validTokenRecord,
        used: true,
      });

      await expect(service.verifyEmail(verifyDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when token is expired', async () => {
      mockPrisma.emailVerificationToken.findUnique.mockResolvedValue({
        ...validTokenRecord,
        expiresAt: new Date(Date.now() - 600000),
      });

      await expect(service.verifyEmail(verifyDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('resendVerification', () => {
    const resendDto = { email: 'a@b.com' };

    it('should generate a token for existing unverified user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        emailVerified: false,
      });

      const result = await service.resendVerification(resendDto);

      expect(result.message).toBe(
        'If that email is registered, a verification link has been sent',
      );
      expect(result.verificationToken).toBe('mock-raw-reset-token');
      expect(mockPrisma.emailVerificationToken.create).toHaveBeenCalled();
    });

    it('should return same message for unknown email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.resendVerification(resendDto);

      expect(result.message).toBe(
        'If that email is registered, a verification link has been sent',
      );
      expect(result.verificationToken).toBeUndefined();
    });

    it('should return already verified message when email is verified', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'a@b.com',
        emailVerified: true,
      });

      const result = await service.resendVerification(resendDto);

      expect(result).toEqual({ message: 'Email is already verified' });
    });
  });

  describe('changePassword', () => {
    const userId = 1;
    const changeDto = { currentPassword: 'oldPass123', newPassword: 'newPass456' };

    it('should change password for valid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        password: '$2b$12$mockhashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.changePassword(userId, changeDto);

      expect(result).toEqual({ message: 'Password changed successfully' });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { password: '$2b$12$mockhashed' },
      });
    });

    it('should throw UnauthorizedException when current password is wrong', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        password: '$2b$12$mockhashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.changePassword(userId, changeDto),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.changePassword(userId, changeDto),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('studentLogin', () => {
    const loginDto = {
      referenceNumber: 'TCC-ABC123',
      birthdate: '2000-01-15',
    };
    const mockPreEnrollment = {
      id: 1,
      referenceNumber: 'TCC-ABC123',
      fullName: 'Juan Dela Cruz',
      birthdate: new Date('2000-01-15'),
      contactNumber: '09170000000',
      status: 'PENDING',
    };

    it('should return tokens for valid reference number and birthdate', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue(
        mockPreEnrollment,
      );

      const result = await service.studentLogin(loginDto);

      expect(result.access_token).toBe('mock-token');
      expect(result.refresh_token).toBe('mock-token');
      expect(result.student).toEqual({
        id: 1,
        referenceNumber: 'TCC-ABC123',
        fullName: 'Juan Dela Cruz',
        status: 'PENDING',
      });
    });

    it('should throw UnauthorizedException when reference number not found', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue(null);

      await expect(service.studentLogin(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when birthdate does not match', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue(
        mockPreEnrollment,
      );

      const wrongDto = { ...loginDto, birthdate: '1999-12-31' };

      await expect(service.studentLogin(wrongDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    const logoutDto = { refreshToken: 'token-to-blacklist' };

    it('should blacklist the token and return success', async () => {
      mockJwt.verifyAsync.mockResolvedValue({
        sub: 1,
        email: 'a@b.com',
        role: 'STUDENT',
        exp: 9999999999,
      });

      const result = await service.logout(logoutDto);

      expect(result).toEqual({ message: 'Logged out successfully' });
      expect(mockPrisma.blacklistedToken.create).toHaveBeenCalledWith({
        data: {
          token: 'mocked-hash',
          expiresAt: expect.any(Date),
        },
      });
    });

    it('should throw UnauthorizedException when token is invalid', async () => {
      mockJwt.verifyAsync.mockRejectedValue(new Error('invalid'));

      await expect(service.logout(logoutDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
