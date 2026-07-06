import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class PreEnrollmentStatusDto {
  @IsString()
  @IsIn(['APPROVED', 'REJECTED'])
  status: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  rejectionReason?: string;
}
