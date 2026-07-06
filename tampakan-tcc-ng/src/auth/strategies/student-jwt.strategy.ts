import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../config/jwt.config';
import { PrismaService } from '../../prisma/prisma.service';

interface StudentJwtPayload {
  sub: number;
  role: 'STUDENT';
  refNo: string;
}

@Injectable()
export class StudentJwtStrategy extends PassportStrategy(Strategy, 'jwt-student') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: StudentJwtPayload) {
    if (payload.role !== 'STUDENT') {
      throw new UnauthorizedException('Invalid token role');
    }

    const enrollment = await this.prisma.preEnrollment.findUnique({
      where: { referenceNumber: payload.refNo },
    });

    if (!enrollment) {
      throw new UnauthorizedException('Pre-enrollment record not found');
    }

    return {
      id: enrollment.id,
      refNo: enrollment.referenceNumber,
      fullName: enrollment.fullName,
      role: 'STUDENT',
    };
  }
}
