import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryItemDto, UserRole } from '@kid-elearning/types';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('public')
  getPublicLibrary() {
    return this.libraryService.getPublicLibrary();
  }

  @Get('user/:userId')
  getUserLibrary(@Param('userId') userId: string) {
    return this.libraryService.getUserLibrary(userId);
  }

  @Post()
  createItem(
    @Body()
    body: {
      userId: string;
      userName: string;
      role: UserRole;
      dto: CreateLibraryItemDto;
    },
  ) {
    return this.libraryService.createItem(
      body.userId,
      body.userName,
      body.role,
      body.dto,
    );
  }

  @Patch(':id/toggle-visibility')
  toggleVisibility(
    @Param('id') itemId: string,
    @Body('userId') userId: string,
  ) {
    return this.libraryService.toggleVisibility(itemId, userId);
  }
}
