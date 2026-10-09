import { Injectable } from '@nestjs/common';
import { prisma } from '../../database/prisma';

@Injectable()
export class UsersService {
  async createGuestStudent(input: {
    fullName: string;
    avatarMascot?: string;
    gradeLevel?: number;
  }) {
    return prisma.user.create({
      data: {
        role: 'STUDENT',
        fullName: input.fullName.trim(),
        avatarMascot: input.avatarMascot,
        gradeLevel: input.gradeLevel ?? 3,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
