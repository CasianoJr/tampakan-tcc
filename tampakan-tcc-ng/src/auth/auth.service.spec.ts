import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$12$mockhashed'),
  compare: jest.fn(),
}));

import * as bcrypt from 'bcrypt';

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
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

    it('should throw UnauthorizedException when user is inactive', async () => {
      mockJwt.verifyAsync.mockResolvedValue({
        sub: 1,
        email: 'a@b.com',
        role: 'STUDENT',
      });
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
});
