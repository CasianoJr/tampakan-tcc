import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { PreEnrollDto } from './dto/pre-enroll.dto';
import { RefNoLookupDto } from './dto/refNo-lookup.dto';
import { PreEnrollmentStatusDto } from './dto/pre-enrollment-status.dto';
import { PreEnrollmentQueryDto } from './dto/pre-enrollment-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { StudentAuthGuard } from '../auth/guards/student-auth.guard';

interface ReqWithUser {
  user: { refNo: string };
}

@Controller('api')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('students/pre-enroll')
  preEnroll(@Body() dto: PreEnrollDto) {
    return this.studentsService.preEnroll(dto);
  }

  @Get('students/pre-enroll/:refNo')
  getByRefNo(
    @Param('refNo') refNo: string,
    @Query() query: RefNoLookupDto,
  ) {
    return this.studentsService.getByRefNo(refNo, query.birthdate);
  }

  @UseGuards(StudentAuthGuard)
  @Get('students/profile')
  getProfile(@Req() req: ReqWithUser) {
    return this.studentsService.getProfile(req.user.refNo);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/pre-enrollments')
  findAll(@Query() query: PreEnrollmentQueryDto) {
    return this.studentsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('admin/pre-enrollments/:refNo/status')
  updateStatus(
    @Param('refNo') refNo: string,
    @Body() dto: PreEnrollmentStatusDto,
  ) {
    return this.studentsService.updateStatus(refNo, dto);
  }
}
