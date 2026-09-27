import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { AIPlannerService } from '../ai-planner/ai-planner.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService, AIPlannerService],
  exports: [AssessmentService],
})
export class AssessmentModule {}
