export type MembershipStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Classroom {
  id: string;
  teacherId: string;
  name: string;
  gradeLevel: number;
  joinCode: string; // 6-character code
  inviteLink: string;
  isActive: boolean;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClassroomMember {
  id: string;
  classroomId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  status: MembershipStatus;
  requestedAt: string;
  approvedAt?: string;
}

export interface JoinClassRequest {
  joinCode: string;
}

export interface ApproveMemberRequest {
  memberId: string;
  action: 'APPROVE' | 'REJECT';
}
