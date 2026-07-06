import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
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
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
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

  describe('getByRefNo', () => {
    const refNo = 'TCC-ABCDEF';
    const birthdate = '2000-01-15';

    it('should return enrollment details when refNo and birthdate match', async () => {
      const mockEnrollment = {
        referenceNumber: refNo,
        status: 'PENDING',
        desiredProgram: 'Agri-Business',
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        fullName: 'Juan Dela Cruz',
        birthdate: new Date('2000-01-15'),
        email: 'juan@example.com',
        contactNumber: '09170000000',
        createdAt: new Date('2026-07-06'),
      };

      mockPrisma.preEnrollment.findUnique.mockResolvedValue(mockEnrollment);

      const result = await service.getByRefNo(refNo, birthdate);

      expect(result.refNo).toBe(refNo);
      expect(result.status).toBe('PENDING');
      expect(result.firstName).toBe('Juan');
    });

    it('should throw NotFoundException when refNo does not exist', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue(null);

      await expect(service.getByRefNo(refNo, birthdate)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when birthdate does not match', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue({
        referenceNumber: refNo,
        birthdate: new Date('2000-06-15'),
      });

      await expect(service.getByRefNo(refNo, '2000-01-15')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return paginated pre-enrollments', async () => {
      const mockItems = [
        { referenceNumber: 'TCC-001', fullName: 'Juan', desiredProgram: 'Agri-Business', status: 'PENDING', createdAt: new Date() },
        { referenceNumber: 'TCC-002', fullName: 'Maria', desiredProgram: 'BS Agriculture', status: 'APPROVED', createdAt: new Date() },
      ];

      mockPrisma.preEnrollment.findMany.mockResolvedValue(mockItems);
      mockPrisma.preEnrollment.count.mockResolvedValue(2);

      const result = await service.findAll({ page: 1, limit: 20 });

      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('should filter by status when provided', async () => {
      mockPrisma.preEnrollment.findMany.mockResolvedValue([]);
      mockPrisma.preEnrollment.count.mockResolvedValue(0);

      await service.findAll({ status: 'PENDING' });

      expect(mockPrisma.preEnrollment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'PENDING' }),
        }),
      );
    });

    it('should filter by course when provided', async () => {
      mockPrisma.preEnrollment.findMany.mockResolvedValue([]);
      mockPrisma.preEnrollment.count.mockResolvedValue(0);

      await service.findAll({ course: 'Agri-Business' });

      expect(mockPrisma.preEnrollment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ desiredProgram: 'Agri-Business' }),
        }),
      );
    });
  });

  describe('getProfile', () => {
    const refNo = 'TCC-ABCDEF';

    it('should return the full pre-enrollment profile', async () => {
      const mockEnrollment = {
        referenceNumber: refNo,
        fullName: 'Juan Dela Cruz',
        birthdate: new Date('2000-01-15'),
        contactNumber: '09170000000',
        email: 'juan@example.com',
        address: 'Poblacion, Tampakan',
        lastSchool: 'TNHS',
        desiredProgram: 'Agri-Business',
        status: 'PENDING',
        isTampakanResident: true,
        admitType: null,
        yearLevel: null,
        schoolYear: null,
        term: null,
        lrn: null,
        firstName: null,
        middleName: null,
        lastName: null,
        suffix: null,
        gender: null,
        civilStatus: null,
        citizenship: null,
        birthplace: null,
        religion: null,
        telephoneNo: null,
        currentAddress: null,
        permanentAddress: null,
        addressSameAsCurrent: null,
        fatherFirstName: null,
        fatherLastName: null,
        fatherMiddleInitial: null,
        fatherSuffix: null,
        fatherMobile: null,
        fatherEmail: null,
        fatherOccupation: null,
        motherFirstName: null,
        motherLastName: null,
        motherMiddleInitial: null,
        motherSuffix: null,
        motherMobile: null,
        motherEmail: null,
        motherOccupation: null,
        guardianFirstName: null,
        guardianLastName: null,
        guardianMiddleInitial: null,
        guardianSuffix: null,
        guardianMobile: null,
        guardianEmail: null,
        guardianOccupation: null,
        guardianRelationship: null,
        referralSources: null,
        createdAt: new Date('2026-07-06'),
      };

      mockPrisma.preEnrollment.findUnique.mockResolvedValue(mockEnrollment);

      const result = await service.getProfile(refNo);

      expect(result.refNo).toBe(refNo);
      expect(result.fullName).toBe('Juan Dela Cruz');
      expect(result.status).toBe('PENDING');
    });

    it('should throw NotFoundException when refNo does not exist', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue(null);

      await expect(service.getProfile(refNo)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    const refNo = 'TCC-ABCDEF';

    it('should approve a pending pre-enrollment', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue({
        referenceNumber: refNo,
        status: 'PENDING',
      });
      mockPrisma.preEnrollment.update.mockResolvedValue({
        referenceNumber: refNo,
        status: 'APPROVED',
      });

      const result = await service.updateStatus(refNo, { status: 'APPROVED' });

      expect(result.status).toBe('APPROVED');
      expect(result.message).toBe('Pre-enrollment approved successfully');
    });

    it('should throw NotFoundException when refNo does not exist', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue(null);

      await expect(
        service.updateStatus(refNo, { status: 'APPROVED' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when already approved', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue({
        referenceNumber: refNo,
        status: 'APPROVED',
      });

      await expect(
        service.updateStatus(refNo, { status: 'REJECTED' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when rejecting without reason', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue({
        referenceNumber: refNo,
        status: 'PENDING',
      });

      await expect(
        service.updateStatus(refNo, { status: 'REJECTED' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject with a reason', async () => {
      mockPrisma.preEnrollment.findUnique.mockResolvedValue({
        referenceNumber: refNo,
        status: 'PENDING',
      });
      mockPrisma.preEnrollment.update.mockResolvedValue({
        referenceNumber: refNo,
        status: 'REJECTED',
      });

      const result = await service.updateStatus(refNo, {
        status: 'REJECTED',
        rejectionReason: 'Incomplete documents',
      });

      expect(result.status).toBe('REJECTED');
      expect(result.message).toBe('Pre-enrollment rejected successfully');
    });
  });
});
