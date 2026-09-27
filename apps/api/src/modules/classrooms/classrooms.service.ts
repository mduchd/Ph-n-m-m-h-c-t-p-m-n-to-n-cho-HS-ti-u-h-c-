import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Classroom, ClassroomMember } from '@kid-elearning/types';

@Injectable()
export class ClassroomsService {
  // In-memory demo store (hoặc kết nối Prisma database)
  private classrooms: Classroom[] = [
    {
      id: 'class-1',
      teacherId: 'teacher-101',
      name: 'Lớp 3A - Toán & Kỹ Năng Sống',
      gradeLevel: 3,
      joinCode: 'TOAN3A',
      inviteLink: 'http://localhost:3000/classroom/join?code=TOAN3A',
      isActive: true,
      memberCount: 24,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private members: ClassroomMember[] = [
    {
      id: 'mem-1',
      classroomId: 'class-1',
      studentId: 'student-01',
      studentName: 'Nguyễn Văn An',
      studentAvatar: 'avatar_bear',
      status: 'APPROVED',
      requestedAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
    },
    {
      id: 'mem-2',
      classroomId: 'class-1',
      studentId: 'student-02',
      studentName: 'Trần Thị Bích',
      studentAvatar: 'avatar_rabbit',
      status: 'PENDING',
      requestedAt: new Date().toISOString(),
    },
  ];

  createClass(teacherId: string, name: string, gradeLevel: number): Classroom {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newClass: Classroom = {
      id: `class-${Date.now()}`,
      teacherId,
      name,
      gradeLevel,
      joinCode: code,
      inviteLink: `http://localhost:3000/classroom/join?code=${code}`,
      isActive: true,
      memberCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.classrooms.push(newClass);
    return newClass;
  }

  getTeacherClasses(teacherId: string): Classroom[] {
    return this.classrooms.filter((c) => c.teacherId === teacherId);
  }

  getClassMembers(classroomId: string): ClassroomMember[] {
    return this.members.filter((m) => m.classroomId === classroomId);
  }

  joinClassByCode(studentId: string, studentName: string, joinCode: string): ClassroomMember {
    const classroom = this.classrooms.find((c) => c.joinCode === joinCode.trim().toUpperCase());
    if (!classroom) {
      throw new NotFoundException('Mã xác nhận lớp học không hợp lệ hoặc không tồn tại!');
    }

    const existing = this.members.find(
      (m) => m.classroomId === classroom.id && m.studentId === studentId,
    );
    if (existing) {
      throw new BadRequestException('Bạn đã gửi yêu cầu tham gia lớp học này rồi!');
    }

    const newMember: ClassroomMember = {
      id: `mem-${Date.now()}`,
      classroomId: classroom.id,
      studentId,
      studentName,
      status: 'PENDING', // Đang chờ Giáo viên duyệt
      requestedAt: new Date().toISOString(),
    };

    this.members.push(newMember);
    return newMember;
  }

  reviewMember(memberId: string, action: 'APPROVE' | 'REJECT'): ClassroomMember {
    const member = this.members.find((m) => m.id === memberId);
    if (!member) {
      throw new NotFoundException('Không tìm thấy yêu cầu tham gia này!');
    }

    member.status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    if (action === 'APPROVE') {
      member.approvedAt = new Date().toISOString();
      const classroom = this.classrooms.find((c) => c.id === member.classroomId);
      if (classroom) classroom.memberCount++;
    }

    return member;
  }
}
