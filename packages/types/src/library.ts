import { UserRole } from './user';

export type VisibilityState = 'PUBLIC' | 'PRIVATE';
export type LibraryItemType = 'EXERCISE' | 'QUIZ' | 'FLASHCARD';

export interface LibraryItem {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  title: string;
  subject: string;
  visibility: VisibilityState; // Public or Private (HS or GV can choose)
  itemType: LibraryItemType;
  questionsCount: number;
  content: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLibraryItemDto {
  title: string;
  subject: string;
  visibility: VisibilityState;
  itemType: LibraryItemType;
  content: Record<string, unknown>;
}
