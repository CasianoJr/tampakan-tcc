import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
  IsDateString,
  IsIn,
} from 'class-validator';

export class PreEnrollDto {
  // Required fields
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  fullName: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  contactNumber: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  address: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  lastSchool: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @IsIn([
    'Agri-Business',
    'Bachelor of Science in Agriculture',
    'Agricultural Technology',
    'Agri-Entrepreneurship',
  ])
  desiredProgram: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  guardianName: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  guardianContact: string;

  // Optional expanded fields
  @IsOptional()
  @IsBoolean()
  isTampakanResident?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['New Student', 'Transferee'])
  admitType?: string;

  @IsOptional()
  @IsString()
  @IsIn(['1st', '2nd', '3rd', '4th'])
  yearLevel?: string;

  @IsOptional()
  @IsString()
  schoolYear?: string;

  @IsOptional()
  @IsString()
  term?: string;

  @IsOptional()
  @IsString()
  lrn?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  suffix?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Male', 'Female'])
  gender?: string;

  @IsOptional()
  @IsString()
  civilStatus?: string;

  @IsOptional()
  @IsString()
  citizenship?: string;

  @IsOptional()
  @IsString()
  birthplace?: string;

  @IsOptional()
  @IsString()
  religion?: string;

  @IsOptional()
  @IsString()
  telephoneNo?: string;

  @IsOptional()
  @IsString()
  currentAddress?: string;

  @IsOptional()
  @IsString()
  permanentAddress?: string;

  @IsOptional()
  @IsBoolean()
  addressSameAsCurrent?: boolean;

  @IsOptional()
  @IsString()
  fatherFirstName?: string;

  @IsOptional()
  @IsString()
  fatherLastName?: string;

  @IsOptional()
  @IsString()
  fatherMiddleInitial?: string;

  @IsOptional()
  @IsString()
  fatherSuffix?: string;

  @IsOptional()
  @IsString()
  fatherMobile?: string;

  @IsOptional()
  @IsEmail()
  fatherEmail?: string;

  @IsOptional()
  @IsString()
  fatherOccupation?: string;

  @IsOptional()
  @IsString()
  motherFirstName?: string;

  @IsOptional()
  @IsString()
  motherLastName?: string;

  @IsOptional()
  @IsString()
  motherMiddleInitial?: string;

  @IsOptional()
  @IsString()
  motherSuffix?: string;

  @IsOptional()
  @IsString()
  motherMobile?: string;

  @IsOptional()
  @IsEmail()
  motherEmail?: string;

  @IsOptional()
  @IsString()
  motherOccupation?: string;

  @IsOptional()
  @IsString()
  guardianFirstName?: string;

  @IsOptional()
  @IsString()
  guardianLastName?: string;

  @IsOptional()
  @IsString()
  guardianMiddleInitial?: string;

  @IsOptional()
  @IsString()
  guardianSuffix?: string;

  @IsOptional()
  @IsString()
  guardianMobile?: string;

  @IsOptional()
  @IsEmail()
  guardianEmail?: string;

  @IsOptional()
  @IsString()
  guardianOccupation?: string;

  @IsOptional()
  @IsString()
  guardianRelationship?: string;

  @IsOptional()
  @IsString()
  referralSources?: string;
}
