import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { prisma } from '../../database/prisma';
import { ProficiencyLevel } from '@kid-elearning/types';

@Injectable()
export class AssessmentService {
  /**
   * Phân loại 3 mức độ dựa theo số điểm bài test
   */
  classifyLevel(score: number): ProficiencyLevel {
    if (score < 50) {
      return 'BASIC'; // Cơ bản
    } else if (score <= 80) {
      return 'APPLIED'; // Vận dụng
    } else {
      return 'ADVANCED'; // Vận dụng cao
    }
  }

  /**
   * Lấy bộ đề test mẫu đánh giá đầu vào cho học sinh tiểu học
   */
  getDiagnosticQuestions() {
    return [
      {
        id: 'q1',
        questionText: 'Tính: 25 + 38 = ?',
        audioPrompt: 'Hãy tính xem: hai mươi lăm cộng ba mươi tám bằng bao nhiêu?',
        options: [
          { id: 'opt_a', text: '53' },
          { id: 'opt_b', text: '63' },
          { id: 'opt_c', text: '62' },
          { id: 'opt_d', text: '73' },
        ],
        correctOptionId: 'opt_b',
        explanation: 'Ta có: 25 + 38 = (20 + 30) + (5 + 8) = 50 + 13 = 63.',
        difficulty: 'BASIC' as ProficiencyLevel,
      },
      {
        id: 'q2',
        questionText: 'Bạn Lan có 15 viên kẹo, Lan cho Mai 4 viên và cho Hùng 3 viên. Hỏi Lan còn lại bao nhiêu viên kẹo?',
        audioPrompt: 'Bạn Lan có 15 viên kẹo, cho Mai 4 viên và cho Hùng 3 viên. Hỏi Lan còn lại mấy viên?',
        options: [
          { id: 'opt_a', text: '7 viên' },
          { id: 'opt_b', text: '8 viên' },
          { id: 'opt_c', text: '9 viên' },
          { id: 'opt_d', text: '10 viên' },
        ],
        correctOptionId: 'opt_b',
        explanation: 'Tổng số kẹo Lan đã cho là: 4 + 3 = 7 viên. Số kẹo Lan còn lại là: 15 - 7 = 8 viên.',
        difficulty: 'APPLIED' as ProficiencyLevel,
      },
      {
        id: 'q3',
        questionText: 'Trong giờ ra chơi, nếu em thấy một bạn làm rơi ví tiền, em nên làm gì?',
        audioPrompt: 'Trong giờ ra chơi, nếu thấy bạn làm rơi ví, em nên làm gì?',
        options: [
          { id: 'opt_a', text: 'Cất vào cặp của mình' },
          { id: 'opt_b', text: 'Nhặt lên và gửi thầy cô giáo hoặc ban giám hiệu' },
          { id: 'opt_c', text: 'Bỏ đi xem như không thấy' },
          { id: 'opt_d', text: 'Chia tiền cho các bạn khác' },
        ],
        correctOptionId: 'opt_b',
        explanation: 'Kỹ năng sống: Nhặt được của rơi cần gửi trả lại người đánh mất qua thầy cô giáo.',
        difficulty: 'BASIC' as ProficiencyLevel,
      },
      {
        id: 'q4',
        questionText: 'Tìm quy luật và điền số tiếp theo vào dãy: 2, 4, 8, 16, ...',
        audioPrompt: 'Tìm số tiếp theo trong dãy số: 2, 4, 8, 16',
        options: [
          { id: 'opt_a', text: '24' },
          { id: 'opt_b', text: '30' },
          { id: 'opt_c', text: '32' },
          { id: 'opt_d', text: '64' },
        ],
        correctOptionId: 'opt_c',
        explanation: 'Quy luật: Mỗi số sau gấp đôi số liền trước. 16 x 2 = 32.',
        difficulty: 'ADVANCED' as ProficiencyLevel,
      },
    ];
  }

  /**
   * Chấm điểm bài làm và sinh kết quả chi tiết
   */
  async gradeAssessment(submissionDto: { studentId: string; answers: Record<string, string> }) {
    const questions = this.getDiagnosticQuestions();
    let correctCount = 0;

    const detailedAnswers = questions.map((q) => {
      const selectedOptionId = submissionDto.answers[q.id];
      const isCorrect = selectedOptionId === q.correctOptionId;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        questionText: q.questionText,
        selectedOptionId,
        correctOptionId: q.correctOptionId,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const proficiencyLevel = this.classifyLevel(score);

    const student = await prisma.user.findFirst({
      where: { id: submissionDto.studentId, role: 'STUDENT' },
    });
    if (!student) {
      throw new NotFoundException('Không tìm thấy hồ sơ học sinh.');
    }

    const submission = await prisma.testSubmission.create({
      data: {
        studentId: submissionDto.studentId,
        score,
        proficiencyLevel,
        questionsAndAnswers: detailedAnswers,
      },
    });

    return {
      id: submission.id,
      studentId: submissionDto.studentId,
      totalQuestions: questions.length,
      correctCount,
      score,
      proficiencyLevel,
      review: detailedAnswers,
      completedAt: submission.completedAt.toISOString(),
    };
  }
}
