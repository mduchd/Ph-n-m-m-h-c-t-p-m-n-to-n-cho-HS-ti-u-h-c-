export type UserRole = 'STUDENT' | 'TEACHER';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  avatarMascot?: string;
  gradeLevel?: number; // 1 to 5 for primary school
  createdAt: string;
  updatedAt: string;
}
