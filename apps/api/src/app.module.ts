import { Module } from '@nestjs/common';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { LibraryModule } from './modules/library/library.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    SocketModule,
    AssessmentModule,
    ClassroomsModule,
    LibraryModule,
  ],
})
export class AppModule {}
