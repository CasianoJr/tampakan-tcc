import { IsString } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  referenceNumber: string;

  @IsString()
  birthdate: string;
}
