# Phần Mềm Học Tập Môn Toán & Kỹ Năng Sống Cho Học Sinh Tiểu Học

> Hệ thống học tập, khảo sát đánh giá năng lực đầu vào và kế hoạch học tập cá nhân hóa do AI lập ra cho học sinh tiểu học và giáo viên. Phát triển bằng **Next.js**, **NestJS**, **PostgreSQL** và **AI Gemini Flash**.

---

## 1. Cấu Trúc Dự Án (Project Structure)

```text
D:\kid-elearning/
├── apps/
│   ├── web/                          # Frontend Next.js (App Router)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (auth)/           # Màn hình chọn vai trò: Học sinh / Giáo viên
│   │   │   │   ├── (student)/        # Phân hệ Học sinh (Cột dọc: Trang chủ, Thư viện, Lớp học, Kế hoạch AI...)
│   │   │   │   │   ├── assessment/   # Bài test đầu vào, chia 3 cấp độ (Cơ bản, Vận dụng, Vận dụng cao), xem lại đáp án
│   │   │   │   │   ├── library/      # Thư viện của bạn (chọn Công khai / Riêng tư)
│   │   │   │   │   ├── classroom/    # Lớp học & Nhập mã xác nhận tham gia
│   │   │   │   │   └── plan/         # Kế hoạch học tập cá nhân hóa do AI lập
│   │   │   │   └── (teacher)/        # Phân hệ Giáo viên (Thanh ngang Topbar + Cột dọc Sidebar)
│   │   │   │       ├── classes/      # Mở lớp, cấp mã xác nhận, duyệt học sinh realtime
│   │   │   │       ├── library/      # Đề ôn tập GV soạn (Công khai / Riêng tư)
│   │   │   │       └── analytics/    # Thống kê điểm số học sinh
│   │   │   └── components/           # UI Components (AudioButton đọc câu hỏi, LevelBadge, QuizCard...)
│   │
│   └── api/                          # Backend NestJS (Clean Modular Architecture)
│       └── src/
│           ├── modules/
│           │   ├── assessment/       # Chấm điểm bài test, phân 3 mức độ, lưu lịch sử xem lại
│           │   ├── ai-planner/       # Tích hợp Gemini 2.0 Flash sinh kế hoạch học tập
│           │   ├── classrooms/       # Quản lý lớp, tạo mã PIN, duyệt học sinh
│           │   ├── library/          # Quản lý bài tập & trạng thái Public/Private
│           │   └── socket/           # WebSocket Gateway duyệt vào lớp Realtime
│
├── packages/
│   ├── database/                     # Prisma ORM & PostgreSQL Schema
│   └── types/                        # TypeScript Interfaces & Types dùng chung
├── docker-compose.yml                # PostgreSQL 16 + Redis 7
├── .env.example                      # Mẫu biến môi trường
└── README.md
```

---

## 2. Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### Bước 1: Khởi động Cơ sở dữ liệu (PostgreSQL & Redis)
Đảm bảo máy đã cài Docker Desktop, mở terminal tại thư mục gốc `D:\kid-elearning` và chạy:
```bash
docker compose up -d
```

### Bước 2: Cài đặt Dependencies
```bash
npm install
```

### Bước 3: Đồng bộ Database Schema (Prisma)
Sao chép file `.env.example` thành `.env` và chạy:
```bash
npm run db:push
```

### Bước 4: Khởi chạy dự án
- Chạy Frontend Web (Next.js):
  ```bash
  npm run dev:web
  # Mở trình duyệt tại: http://localhost:3000
  ```
- Chạy Backend API (NestJS):
  ```bash
  npm run dev:api
  # API endpoint tại: http://localhost:4000/api
  ```

---

## 3. Các Tính Năng Đã Thiết Kế Sẵn Theo Yêu Cầu

1. **Chọn vai trò ban đầu:** Giao diện chào đón bắt mắt, cho phép chọn `Học sinh` hoặc `Giáo viên`.
2. **Khảo sát đầu vào & Xếp 3 cấp độ:**
   - 4 câu hỏi trắc nghiệm mẫu (Toán & Kỹ năng sống) có nút **"Nghe câu hỏi"** (Text-to-Speech) cho học sinh lớp nhỏ.
   - Tự động chấm điểm và xếp 3 mức độ: **Cơ bản – Vận dụng – Vận dụng cao**.
   - Lưu trữ và hiển thị khu vực **Xem lại đáp án chi tiết** có giải thích.
3. **Kế hoạch học tập AI:** Lộ trình 3 tuần chi tiết kèm bài học và minigame tương ứng theo cấp độ của bé.
4. **Quản lý lớp học & Duyệt Realtime:**
   - Giáo viên mở lớp $\rightarrow$ Cấp mã xác nhận (ví dụ `TOAN3A`) và link mời.
   - Học sinh nhập mã xin tham gia.
   - Giáo viên nhận danh sách chờ và bấm **Duyệt / Từ chối**.
5. **Thư viện bài tập cá nhân:** Tạo bài tập và chuyển đổi linh hoạt giữa 2 chế độ **Công khai (Public)** hoặc **Riêng tư (Private)**.
