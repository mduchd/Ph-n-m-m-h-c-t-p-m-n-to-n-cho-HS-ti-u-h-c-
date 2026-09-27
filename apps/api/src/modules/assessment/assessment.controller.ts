import { Controller, Get, Post, Body } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AIPlannerService } from '../ai-planner/ai-planner.service';

@Controller('assessment')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly aiPlannerService: AIPlannerService,
  ) {}

  @Get('questions')
  getQuestions() {
    return this.assessmentService.getDiagnosticQuestions();
  }

  @Post('submit')
  async submitAssessment(
    @Body() body: { studentId: string; answers: Record<string, string> },
  ) {
    const gradeResult = this.assessmentService.gradeAssessment(body);
    const learningPlan = await this.aiPlannerService.generateLearningPlan(
      body.studentId,
      `sub_${Date.now()}`,
      gradeResult.proficiencyLevel,
      gradeResult.score,
    );

    return {
      gradeResult,
      learningPlan,
    };
  }
}
