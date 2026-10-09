import type { AILearningPlan, AssessmentQuestion, User } from '@kid-elearning/types';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? 'Không thể kết nối tới hệ thống. Vui lòng thử lại.');
  }

  return response.json() as Promise<T>;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  proficiencyLevel: 'BASIC' | 'APPLIED' | 'ADVANCED';
  review: Array<{
    questionId: string;
    questionText: string;
    selectedOptionId?: string;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  completedAt: string;
}

export async function getDiagnosticQuestions() {
  return request<AssessmentQuestion[]>('/assessment/questions');
}

export async function createGuestStudent(input: {
  fullName: string;
  avatarMascot: string;
  gradeLevel: number;
}) {
  return request<User>('/users/guest-students', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function submitAssessment(studentId: string, answers: Record<string, string>) {
  return request<{ gradeResult: AssessmentResult; learningPlan: AILearningPlan }>('/assessment/submit', {
    method: 'POST',
    body: JSON.stringify({ studentId, answers }),
  });
}
