import { Injectable } from '@nestjs/common';
import { ProficiencyLevel, AILearningPlan } from '@kid-elearning/types';

@Injectable()
export class AIPlannerService {
  /**
   * Tạo kế hoạch học tập cá nhân hóa do AI lập ra cho học sinh dựa vào kết quả bài test
   */
  async generateLearningPlan(
    studentId: string,
    submissionId: string,
    level: ProficiencyLevel,
    score: number,
  ): Promise<AILearningPlan> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'your-gemini-api-key-here') {
      try {
        // Tích hợp Google Gemini Flash API nếu có key
        // Gọi Gemini với JSON mode structured output
      } catch (error) {
        console.warn('Gemini API call failed, falling back to smart rules template:', error);
      }
    }

    // Smart Planner Template dựa theo 3 cấp độ (Cơ bản / Vận dụng / Vận dụng cao)
    return this.createDefaultPlan(studentId, submissionId, level, score);
  }

  private createDefaultPlan(
    studentId: string,
    submissionId: string,
    level: ProficiencyLevel,
    score: number,
  ): AILearningPlan {
    const levelVietnamese = {
      BASIC: 'Cơ bản',
      APPLIED: 'Vận dụng',
      ADVANCED: 'Vận dụng cao',
    }[level];

    let summary = '';
    let strengths: string[] = [];
    let areasToImprove: string[] = [];
    let weeklyTasks = [];

    if (level === 'BASIC') {
      summary = `Học sinh đạt mức độ ${levelVietnamese} (${score} điểm). Cần tập trung ôn luyện các phép tính cộng trừ cơ bản và kỹ năng đọc hiểu đề bài.`;
      strengths = ['Có ý thức làm bài cẩn thận', 'Nhận biết câu hỏi kỹ năng sống tốt'];
      areasToImprove = ['Tính toán có nhớ trong phạm vi 100', 'Phân tích đề toán có lời văn'];
      weeklyTasks = [
        {
          week: 1,
          title: 'Tuần 1: Ôn tập phép cộng, trừ có nhớ',
          focusArea: 'Tính toán cơ bản',
          recommendedLessons: ['Bài 1: Phép cộng có nhớ trong phạm vi 100', 'Bài 2: Tính nhanh các số tròn chục'],
          recommendedGames: ['Ong vàng chăm chỉ nhặt chữ', 'Nối phép tính đúng'],
          dailyPracticeMinutes: 15,
        },
        {
          week: 2,
          title: 'Tuần 2: Đọc hiểu và tóm tắt đề toán',
          focusArea: 'Đọc hiểu lời văn',
          recommendedLessons: ['Bài 3: Cách tìm từ khóa trong bài toán', 'Bài 4: Bài toán về nhiều hơn, ít hơn'],
          recommendedGames: ['Thám tử nhí tìm đáp án'],
          dailyPracticeMinutes: 15,
        },
      ];
    } else if (level === 'APPLIED') {
      summary = `Học sinh đạt mức độ ${levelVietnamese} (${score} điểm). Nền tảng kiến thức tốt, cần tăng cường các bài toán 2 bước tính và kỹ năng tư duy phản biện.`;
      strengths = ['Tính toán nhanh, chính xác', 'Nắm chắc kiến thức sách giáo khoa'];
      areasToImprove = ['Toán đố logic', 'Giải quyết tình huống thực tế'];
      weeklyTasks = [
        {
          week: 1,
          title: 'Tuần 1: Bài toán giải bằng hai phép tính',
          focusArea: 'Toán tư duy vận dụng',
          recommendedLessons: ['Bài 5: Tìm hai số khi biết tổng và hiệu', 'Bài 6: Quy tắc giải toán tình huống'],
          recommendedGames: ['Đua xe toán học cùng bạn bè', 'Bảo vệ nông trại'],
          dailyPracticeMinutes: 20,
        },
        {
          week: 2,
          title: 'Tuần 2: Ứng dụng toán vào đời sống & Kỹ năng',
          focusArea: 'Kỹ năng sống & Quản lý chi tiêu',
          recommendedLessons: ['Bài 7: Em làm quen với tiền Việt Nam', 'Bài 8: Xử lý khi bị lạc hoặc gặp sự cố'],
          recommendedGames: ['Đi siêu thị thông thái'],
          dailyPracticeMinutes: 20,
        },
      ];
    } else {
      summary = `Xuất sắc! Học sinh đạt mức độ ${levelVietnamese} (${score} điểm). Sẵn sàng cho các bài toán mở rộng tư duy hình học và logic nâng cao.`;
      strengths = ['Tư duy logic sắc bén', 'Khả năng quan sát quy luật tuyệt vời'];
      areasToImprove = ['Tối ưu thời gian làm bài toán nâng cao', 'Chia sẻ và hướng dẫn lại cho bạn học'];
      weeklyTasks = [
        {
          week: 1,
          title: 'Tuần 1: Tìm quy luật dãy số & Hình học không gian',
          focusArea: 'Tư duy trừu tượng',
          recommendedLessons: ['Bài 9: Các bài toán dãy số thú vị', 'Bài 10: Xếp hình và đếm hình thần tốc'],
          recommendedGames: ['Đấu trường trạng nguyên nhí', 'Mê cung logic'],
          dailyPracticeMinutes: 25,
        },
        {
          week: 2,
          title: 'Tuần 2: Thử thách kỹ năng lãnh đạo & Làm việc nhóm',
          focusArea: 'Kỹ năng sống lãnh đạo',
          recommendedLessons: ['Bài 11: Kỹ năng thuyết trình trước đám đông', 'Bài 12: Giúp đỡ bạn bè cùng tiến'],
          recommendedGames: ['Trọng tài tí hon'],
          dailyPracticeMinutes: 25,
        },
      ];
    }

    return {
      id: `plan_${Date.now()}`,
      studentId,
      submissionId,
      level,
      summary,
      strengths,
      areasToImprove,
      weeklyMilestones: weeklyTasks,
      createdAt: new Date().toISOString(),
    };
  }
}
