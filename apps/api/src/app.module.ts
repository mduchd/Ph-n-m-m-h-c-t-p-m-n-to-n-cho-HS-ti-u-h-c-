import { Module } from '@nestjs/common';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { LibraryModule } from './modules/library/library.module';
import { SocketModule } from './modules/socket/socket.module';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    SocketModule,
    AssessmentModule,
    ClassroomsModule,
    LibraryModule,
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
