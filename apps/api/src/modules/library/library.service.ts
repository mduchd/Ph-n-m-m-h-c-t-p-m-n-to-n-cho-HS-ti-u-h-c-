import { Injectable, NotFoundException } from '@nestjs/common';
import { LibraryItem, CreateLibraryItemDto, VisibilityState, UserRole } from '@kid-elearning/types';

@Injectable()
export class LibraryService {
  private libraryItems: LibraryItem[] = [
    {
      id: 'lib-1',
      authorId: 'student-01',
      authorName: 'Nguyễn Văn An',
      authorRole: 'STUDENT',
      title: 'Bộ câu đố vui toán học 10 câu ôn tập hè',
      subject: 'Toán học',
      visibility: 'PUBLIC', // Đã chọn Công khai
      itemType: 'QUIZ',
      questionsCount: 10,
      content: { topic: 'Toán cộng trừ nâng cao' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'lib-2',
      authorId: 'student-01',
      authorName: 'Nguyễn Văn An',
      authorRole: 'STUDENT',
      title: 'Ghi chú bài học riêng về phân số',
      subject: 'Toán học',
      visibility: 'PRIVATE', // Để Riêng tư
      itemType: 'EXERCISE',
      questionsCount: 5,
      content: { note: 'Chỉ mình em ôn' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getUserLibrary(userId: string): LibraryItem[] {
    return this.libraryItems.filter((item) => item.authorId === userId);
  }

  getPublicLibrary(): LibraryItem[] {
    return this.libraryItems.filter((item) => item.visibility === 'PUBLIC');
  }

  createItem(
    userId: string,
    userName: string,
    role: UserRole,
    dto: CreateLibraryItemDto,
  ): LibraryItem {
    const newItem: LibraryItem = {
      id: `lib-${Date.now()}`,
      authorId: userId,
      authorName: userName,
      authorRole: role,
      title: dto.title,
      subject: dto.subject,
      visibility: dto.visibility, // Người dùng chọn PUBLIC hoặc PRIVATE
      itemType: dto.itemType,
      questionsCount: 1,
      content: dto.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.libraryItems.push(newItem);
    return newItem;
  }

  toggleVisibility(itemId: string, userId: string): LibraryItem {
    const item = this.libraryItems.find((i) => i.id === itemId && i.authorId === userId);
    if (!item) {
      throw new NotFoundException('Không tìm thấy bài tập hoặc bạn không có quyền sửa!');
    }
    item.visibility = item.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
    item.updatedAt = new Date().toISOString();
    return item;
  }
}
