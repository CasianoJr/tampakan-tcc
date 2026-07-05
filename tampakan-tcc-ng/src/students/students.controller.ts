import { Body, Controller, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { PreEnrollDto } from './dto/pre-enroll.dto';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('pre-enroll')
  preEnroll(@Body() dto: PreEnrollDto) {
    return this.studentsService.preEnroll(dto);
  }
}
