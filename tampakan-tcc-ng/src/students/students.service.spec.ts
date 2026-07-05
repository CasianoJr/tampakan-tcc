import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { PrismaService } from '../prisma/prisma.service';
import { PreEnrollDto } from './dto/pre-enroll.dto';

jest.mock('crypto', () => ({
  randomBytes: jest.fn().mockReturnValue(
    Buffer.from([0, 1, 2, 3, 4, 5]),
  ),
}));

const mockPrisma = {
  preEnrollment: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    jest.clearAllMocks();
  });

  describe('preEnroll', () => {
    const dto: PreEnrollDto = {
      fullName: 'Juan Dela Cruz',
      birthdate: '2000-01-15',
      contactNumber: '09170000000',
      email: 'juan@example.com',
      address: 'Poblacion, Tampakan, South Cotabato',
      lastSchool: 'Tampakan National High School',
      desiredProgram: 'Agri-Business',
      guardianName: 'Maria Dela Cruz',
      guardianContact: '09180000000',
    };

    it('should create a pre-enrollment and return reference number', async () => {
      const mockCreated = {
        id: 1,
        referenceNumber: 'TCC-ABCDEF',
        fullName: 'Juan Dela Cruz',
        status: 'PENDING',
      };

      mockPrisma.preEnrollment.findUnique.mockResolvedValue(null);
      mockPrisma.preEnrollment.create.mockResolvedValue(mockCreated);

      const result = await service.preEnroll(dto);

      expect(result).toEqual({
        message: 'Pre-enrollment submitted successfully',
        referenceNumber: 'TCC-ABCDEF',
        fullName: 'Juan Dela Cruz',
        status: 'PENDING',
      });
    });

    it('should generate a unique reference number even after collisions', async () => {
      mockPrisma.preEnrollment.findUnique
        .mockResolvedValueOnce({ referenceNumber: 'TCC-ABCDEF' })
        .mockResolvedValueOnce(null);
      mockPrisma.preEnrollment.create.mockResolvedValue({
        referenceNumber: 'TCC-ABCDEF',
        fullName: 'Juan Dela Cruz',
        status: 'PENDING',
      });

      const result = await service.preEnroll(dto);

      expect(mockPrisma.preEnrollment.findUnique).toHaveBeenCalledTimes(2);
      expect(result.referenceNumber).toBe('TCC-ABCDEF');
    });

    it('should throw ConflictException on duplicate entry', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue(null);
      mockPrisma.preEnrollment.create.mockRejectedValue(
        Object.assign(new Error('Unique constraint'), { code: 'P2002' }),
      );

      await expect(service.preEnroll(dto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should store optional fields when provided', async () => {
      const fullDto: PreEnrollDto = {
        ...dto,
        isTampakanResident: true,
        admitType: 'New Student',
        gender: 'Male',
        lrn: '123456789012',
      };

      mockPrisma.preEnrollment.findUnique.mockResolvedValue(null);
      mockPrisma.preEnrollment.create.mockResolvedValue({
        referenceNumber: 'TCC-ABCDEF',
        fullName: 'Juan Dela Cruz',
        status: 'PENDING',
      });

      await service.preEnroll(fullDto);

      expect(mockPrisma.preEnrollment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          isTampakanResident: true,
          admitType: 'New Student',
          gender: 'Male',
          lrn: '123456789012',
        }),
      });
    });
  });
});
