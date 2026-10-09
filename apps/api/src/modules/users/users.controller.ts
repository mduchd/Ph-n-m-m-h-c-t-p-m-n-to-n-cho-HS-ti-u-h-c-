import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('guest-students')
  async createGuestStudent(
    @Body() body: { fullName?: string; avatarMascot?: string; gradeLevel?: number },
  ) {
    const fullName = body.fullName?.trim();
    if (!fullName) {
      throw new BadRequestException('Tên học sinh là bắt buộc.');
    }

    return this.usersService.createGuestStudent({
      fullName,
      avatarMascot: body.avatarMascot,
      gradeLevel: body.gradeLevel,
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng.');
    }
    return user;
  }
}
