import { create } from 'zustand';
import { User, ProficiencyLevel, AssessmentSubmission, AILearningPlan } from '@kid-elearning/types';

interface AppState {
  currentUser: User | null;
  currentSubmission: AssessmentSubmission | null;
  currentPlan: AILearningPlan | null;
  setUser: (user: User | null) => void;
  setSubmission: (submission: AssessmentSubmission | null) => void;
  setPlan: (plan: AILearningPlan | null) => void;
  registerGuestStudent: (fullName: string, mascot: string, pin: string, submissionData: any) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  currentSubmission: null,
  currentPlan: null,

  setUser: (user) => {
    set({ currentUser: user });
    if (typeof window !== 'undefined') {
      if (user) localStorage.setItem('kid_user', JSON.stringify(user));
      else localStorage.removeItem('kid_user');
    }
  },
  setSubmission: (submission) => {
    set({ currentSubmission: submission });
    if (typeof window !== 'undefined') {
      if (submission) localStorage.setItem('kid_submission', JSON.stringify(submission));
      else localStorage.removeItem('kid_submission');
    }
  },
  setPlan: (plan) => {
    set({ currentPlan: plan });
    if (typeof window !== 'undefined') {
      if (plan) localStorage.setItem('kid_plan', JSON.stringify(plan));
      else localStorage.removeItem('kid_plan');
    }
  },

  registerGuestStudent: (fullName, mascot, pin, submissionData) => {
    const newUser: User = {
      id: `student_${Date.now()}`,
      role: 'STUDENT',
      fullName,
      avatarMascot: mascot,
      gradeLevel: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newSubmission: AssessmentSubmission = {
      id: `sub_${Date.now()}`,
      studentId: newUser.id,
      totalQuestions: submissionData.totalQuestions,
      correctAnswersCount: submissionData.correctCount,
      score: submissionData.score,
      proficiencyLevel: submissionData.proficiencyLevel,
      answers: submissionData.answers,
      questionsReview: submissionData.questionsReview,
      completedAt: new Date().toISOString(),
    };

    set({
      currentUser: newUser,
      currentSubmission: newSubmission,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('kid_user', JSON.stringify(newUser));
      localStorage.setItem('kid_submission', JSON.stringify(newSubmission));
    }
  },

  logout: () => {
    set({ currentUser: null, currentSubmission: null, currentPlan: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kid_user');
      localStorage.removeItem('kid_submission');
      localStorage.removeItem('kid_plan');
    }
  },
}));
