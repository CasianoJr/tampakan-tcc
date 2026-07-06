import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class RefNoLookupDto {
  @IsDateString()
  birthdate: string;
}
