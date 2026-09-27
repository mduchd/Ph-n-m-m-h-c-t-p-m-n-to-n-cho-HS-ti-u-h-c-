export type ProficiencyLevel = 'BASIC' | 'APPLIED' | 'ADVANCED';

export interface QuizOption {
  id: string;
  text: string;
  image?: string;
}

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  audioPrompt?: string; // URL or text for text-to-speech
  image?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  difficulty: ProficiencyLevel;
}

export interface StudentAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface AssessmentSubmission {
  id: string;
  studentId: string;
  totalQuestions: number;
  correctAnswersCount: number;
  score: number; // 0 - 100
  proficiencyLevel: ProficiencyLevel;
  answers: StudentAnswer[];
  questionsReview: AssessmentQuestion[];
  completedAt: string;
}

export interface WeeklyMilestone {
  week: number;
  title: string;
  focusArea: string;
  recommendedLessons: string[];
  recommendedGames: string[];
  dailyPracticeMinutes: number;
}

export interface AILearningPlan {
  id: string;
  studentId: string;
  submissionId: string;
  level: ProficiencyLevel;
  summary: string;
  strengths: string[];
  areasToImprove: string[];
  weeklyMilestones: WeeklyMilestone[];
  createdAt: string;
}
