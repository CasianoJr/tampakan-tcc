import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class AdminGuard extends JwtAuthGuard {
  handleRequest(err: any, user: any) {
    if (err || !user || user.role !== 'ADMIN') {
      throw err || new UnauthorizedException('Admin access required');
    }
    return user;
  }
}
