import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { PreEnrollDto } from './dto/pre-enroll.dto';
import { PreEnrollmentStatusDto } from './dto/pre-enrollment-status.dto';
import { PreEnrollmentQueryDto } from './dto/pre-enrollment-query.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  private generateReferenceNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const bytes = randomBytes(6);
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[bytes[i] % chars.length];
    }
    return `TCC-${code}`;
  }

  async preEnroll(dto: PreEnrollDto) {
    let referenceNumber: string;
    let isUnique = false;

    while (!isUnique) {
      referenceNumber = this.generateReferenceNumber();
      const existing = await this.prisma.preEnrollment.findUnique({
        where: { referenceNumber },
      });
      if (!existing) isUnique = true;
    }

    try {
      const enrollment = await this.prisma.preEnrollment.create({
        data: {
          referenceNumber: referenceNumber!,
          fullName: dto.fullName,
          birthdate: new Date(dto.birthdate),
          contactNumber: dto.contactNumber,
          email: dto.email ?? null,
          address: dto.address,
          lastSchool: dto.lastSchool,
          desiredProgram: dto.desiredProgram,
          guardianName: dto.guardianName,
          guardianContact: dto.guardianContact,
          isTampakanResident: dto.isTampakanResident ?? null,
          admitType: dto.admitType ?? null,
          yearLevel: dto.yearLevel ?? null,
          schoolYear: dto.schoolYear ?? null,
          term: dto.term ?? null,
          lrn: dto.lrn ?? null,
          firstName: dto.firstName ?? null,
          middleName: dto.middleName ?? null,
          lastName: dto.lastName ?? null,
          suffix: dto.suffix ?? null,
          gender: dto.gender ?? null,
          civilStatus: dto.civilStatus ?? null,
          citizenship: dto.citizenship ?? null,
          birthplace: dto.birthplace ?? null,
          religion: dto.religion ?? null,
          telephoneNo: dto.telephoneNo ?? null,
          currentAddress: dto.currentAddress ?? null,
          permanentAddress: dto.permanentAddress ?? null,
          addressSameAsCurrent: dto.addressSameAsCurrent ?? null,
          fatherFirstName: dto.fatherFirstName ?? null,
          fatherLastName: dto.fatherLastName ?? null,
          fatherMiddleInitial: dto.fatherMiddleInitial ?? null,
          fatherSuffix: dto.fatherSuffix ?? null,
          fatherMobile: dto.fatherMobile ?? null,
          fatherEmail: dto.fatherEmail ?? null,
          fatherOccupation: dto.fatherOccupation ?? null,
          motherFirstName: dto.motherFirstName ?? null,
          motherLastName: dto.motherLastName ?? null,
          motherMiddleInitial: dto.motherMiddleInitial ?? null,
          motherSuffix: dto.motherSuffix ?? null,
          motherMobile: dto.motherMobile ?? null,
          motherEmail: dto.motherEmail ?? null,
          motherOccupation: dto.motherOccupation ?? null,
          guardianFirstName: dto.guardianFirstName ?? null,
          guardianLastName: dto.guardianLastName ?? null,
          guardianMiddleInitial: dto.guardianMiddleInitial ?? null,
          guardianSuffix: dto.guardianSuffix ?? null,
          guardianMobile: dto.guardianMobile ?? null,
          guardianEmail: dto.guardianEmail ?? null,
          guardianOccupation: dto.guardianOccupation ?? null,
          guardianRelationship: dto.guardianRelationship ?? null,
          referralSources: dto.referralSources ?? null,
        },
      });

      return {
        message: 'Pre-enrollment submitted successfully',
        referenceNumber: enrollment.referenceNumber,
        fullName: enrollment.fullName,
        status: enrollment.status,
      };
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException(
          'A duplicate entry was detected. Please try again.',
        );
      }
      throw error;
    }
  }

  async getByRefNo(refNo: string, birthdate: string) {
    const enrollment = await this.prisma.preEnrollment.findUnique({
      where: { referenceNumber: refNo },
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Pre-enrollment with reference number ${refNo} not found`,
      );
    }

    const providedDate = new Date(birthdate);
    const storedDate = new Date(enrollment.birthdate);

    if (providedDate.getTime() !== storedDate.getTime()) {
      throw new BadRequestException('Birthdate does not match our records');
    }

    return {
      refNo: enrollment.referenceNumber,
      status: enrollment.status,
      course: enrollment.desiredProgram,
      firstName: enrollment.firstName ?? enrollment.fullName.split(' ')[0],
      lastName: enrollment.lastName ?? enrollment.fullName.split(' ').slice(-1)[0],
      birthdate: enrollment.birthdate,
      email: enrollment.email,
      phone: enrollment.contactNumber,
      submittedAt: enrollment.createdAt,
    };
  }

  async findAll(query: PreEnrollmentQueryDto) {
    const { status, course, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) where.status = status;
    if (course) where.desiredProgram = course;

    const [items, total] = await Promise.all([
      this.prisma.preEnrollment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.preEnrollment.count({ where }),
    ]);

    return {
      items: items.map((e) => ({
        refNo: e.referenceNumber,
        fullName: e.fullName,
        course: e.desiredProgram,
        status: e.status,
        submittedAt: e.createdAt,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProfile(refNo: string) {
    const enrollment = await this.prisma.preEnrollment.findUnique({
      where: { referenceNumber: refNo },
    });

    if (!enrollment) {
      throw new NotFoundException('Pre-enrollment record not found');
    }

    return {
      refNo: enrollment.referenceNumber,
      fullName: enrollment.fullName,
      birthdate: enrollment.birthdate,
      contactNumber: enrollment.contactNumber,
      email: enrollment.email,
      address: enrollment.address,
      lastSchool: enrollment.lastSchool,
      desiredProgram: enrollment.desiredProgram,
      status: enrollment.status,
      isTampakanResident: enrollment.isTampakanResident,
      admitType: enrollment.admitType,
      yearLevel: enrollment.yearLevel,
      schoolYear: enrollment.schoolYear,
      term: enrollment.term,
      lrn: enrollment.lrn,
      firstName: enrollment.firstName,
      middleName: enrollment.middleName,
      lastName: enrollment.lastName,
      suffix: enrollment.suffix,
      gender: enrollment.gender,
      civilStatus: enrollment.civilStatus,
      citizenship: enrollment.citizenship,
      birthplace: enrollment.birthplace,
      religion: enrollment.religion,
      telephoneNo: enrollment.telephoneNo,
      currentAddress: enrollment.currentAddress,
      permanentAddress: enrollment.permanentAddress,
      addressSameAsCurrent: enrollment.addressSameAsCurrent,
      fatherFirstName: enrollment.fatherFirstName,
      fatherLastName: enrollment.fatherLastName,
      fatherMiddleInitial: enrollment.fatherMiddleInitial,
      fatherSuffix: enrollment.fatherSuffix,
      fatherMobile: enrollment.fatherMobile,
      fatherEmail: enrollment.fatherEmail,
      fatherOccupation: enrollment.fatherOccupation,
      motherFirstName: enrollment.motherFirstName,
      motherLastName: enrollment.motherLastName,
      motherMiddleInitial: enrollment.motherMiddleInitial,
      motherSuffix: enrollment.motherSuffix,
      motherMobile: enrollment.motherMobile,
      motherEmail: enrollment.motherEmail,
      motherOccupation: enrollment.motherOccupation,
      guardianFirstName: enrollment.guardianFirstName,
      guardianLastName: enrollment.guardianLastName,
      guardianMiddleInitial: enrollment.guardianMiddleInitial,
      guardianSuffix: enrollment.guardianSuffix,
      guardianMobile: enrollment.guardianMobile,
      guardianEmail: enrollment.guardianEmail,
      guardianOccupation: enrollment.guardianOccupation,
      guardianRelationship: enrollment.guardianRelationship,
      referralSources: enrollment.referralSources,
      submittedAt: enrollment.createdAt,
    };
  }

  async updateStatus(refNo: string, dto: PreEnrollmentStatusDto) {
    const enrollment = await this.prisma.preEnrollment.findUnique({
      where: { referenceNumber: refNo },
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Pre-enrollment with reference number ${refNo} not found`,
      );
    }

    if (enrollment.status === 'APPROVED' || enrollment.status === 'REJECTED') {
      throw new BadRequestException(
        `Pre-enrollment is already ${enrollment.status.toLowerCase()}`,
      );
    }

    if (dto.status === 'REJECTED' && !dto.rejectionReason) {
      throw new BadRequestException(
        'Rejection reason is required when rejecting a pre-enrollment',
      );
    }

    const updated = await this.prisma.preEnrollment.update({
      where: { referenceNumber: refNo },
      data: { status: dto.status },
    });

    return {
      refNo: updated.referenceNumber,
      status: updated.status,
      message: `Pre-enrollment ${dto.status.toLowerCase()} successfully`,
    };
  }
}
