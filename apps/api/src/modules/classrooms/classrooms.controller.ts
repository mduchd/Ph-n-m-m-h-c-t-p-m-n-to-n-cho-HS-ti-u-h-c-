import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassRealtimeGateway } from '../socket/class-realtime.gateway';

@Controller('classrooms')
export class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService,
    private readonly socketGateway: ClassRealtimeGateway,
  ) {}

  @Post()
  createClass(
    @Body() body: { teacherId: string; name: string; gradeLevel: number },
  ) {
    return this.classroomsService.createClass(body.teacherId, body.name, body.gradeLevel);
  }

  @Get('teacher/:teacherId')
  getTeacherClasses(@Param('teacherId') teacherId: string) {
    return this.classroomsService.getTeacherClasses(teacherId);
  }

  @Get(':id/members')
  getClassMembers(@Param('id') classroomId: string) {
    return this.classroomsService.getClassMembers(classroomId);
  }

  @Post('join')
  joinClass(
    @Body() body: { studentId: string; studentName: string; joinCode: string },
  ) {
    const member = this.classroomsService.joinClassByCode(
      body.studentId,
      body.studentName,
      body.joinCode,
    );

    // Gửi thông báo realtime cho Giáo viên
    this.socketGateway.notifyTeacherStudentJoined(member.classroomId, member);

    return member;
  }

  @Patch('members/:id/review')
  reviewMember(
    @Param('id') memberId: string,
    @Body() body: { action: 'APPROVE' | 'REJECT' },
  ) {
    const updated = this.classroomsService.reviewMember(memberId, body.action);
    
    // Gửi thông báo realtime cho Học sinh kết quả duyệt
    this.socketGateway.notifyStudentApprovalResult(updated.studentId, updated.status);

    return updated;
  }
}
