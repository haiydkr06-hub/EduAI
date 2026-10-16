# EduAI — Nền tảng học trực tuyến tích hợp AI

EduAI hướng tới kết nối khóa học, bài học, quiz và theo dõi tiến độ trên một nền tảng web. Giảng viên có thể dùng AI tạo **bản nháp** câu hỏi từ tài liệu rồi duyệt/chỉnh sửa trước khi xuất bản.

> **Trạng thái hiện tại:** Repository đang chứa demo dashboard React + TypeScript + Vite với dữ liệu mẫu chạy ở trình duyệt. Supabase Auth/database, AI quiz backend, phân quyền Instructor/Admin và các trang nghiệp vụ khác là kiến trúc mục tiêu được mô tả trong tài liệu, chưa được triển khai trong demo này.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-planned-3ecf8e?logo=supabase)](https://supabase.com/)

## Ảnh demo

![Placeholder ảnh demo EduAI — thay bằng screenshot giao diện thực tế khi phát hành](https://placehold.co/1280x720/F7F8FC/6857DF?text=EduAI+Dashboard+Demo)

## Tính năng

### Học viên (Student)

- Dashboard tiến độ học tập và thống kê mẫu.
- Tìm kiếm khóa học theo tên, môn học hoặc giảng viên.
- Lọc khóa học đang học/đã hoàn thành.
- Xem lịch học sắp tới và tương tác với thông báo, nút tiếp tục học (minh họa frontend).

### Giảng viên (Instructor) — định hướng

- Tạo và quản lý khóa học, bài học.
- Sinh bản nháp quiz từ tài liệu bằng AI.
- Duyệt, sửa, lưu nháp hoặc xuất bản quiz.

### Quản trị viên (Admin) — định hướng

- Quản lý người dùng, vai trò và nội dung.
- Xem thống kê hệ thống và hoạt động quản trị.

> Các luồng Instructor/Admin, AI và dữ liệu Supabase chưa hoạt động trong bản demo hiện tại.

## Công nghệ

| Công nghệ | Sử dụng |
|---|---|
| React + TypeScript | Giao diện component và kiểu dữ liệu |
| Vite | Dev server và build |
| CSS responsive | Giao diện dashboard demo |
| Tailwind CSS | Có cấu hình dependency; chưa dùng làm styling chính của dashboard |
| Supabase | Backend/Auth/Database dự kiến, chưa tích hợp trong runtime hiện tại |
| Zustand, React Router, Axios, React Hook Form, Zod | Stack thiết kế cho bản mở rộng, chưa được cài/tích hợp trong demo |

## Yêu cầu hệ thống

- Node.js **20.19+** hoặc **22.12+** (theo yêu cầu của Vite hiện được dự án cài đặt).
- npm đi kèm Node.js.
- Git để clone repository.

## Cài đặt và chạy local

```bash
git clone https://github.com/haiydkr06-hub/EduAI.git
cd EduAI
npm install
npm run dev
```

Mở URL Vite in trong terminal, thường là `http://localhost:5173`.

Demo dashboard hiện dùng dữ liệu cục bộ nên **không cần `.env`**. Khi tích hợp Supabase, tạo `.env.local` ở thư mục gốc và thêm biến public phù hợp:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_AI_API_URL=https://your-project.supabase.co/functions/v1/generate-quiz
```

Không commit `.env.local`, Supabase `service_role` hoặc AI provider key. Secret của AI phải được cấu hình trong Supabase Edge Function Secrets, không có tiền tố `VITE_`.

## Lệnh phát triển

```bash
npm run dev      # Chạy Vite dev server
npm run build    # Kiểm tra TypeScript và tạo dist/
npm run preview  # Xem thử production build
npm run lint     # Chạy Oxlint
```

`package.json` hiện chưa khai báo script test; chưa có automated test suite trong repository.

## Cấu trúc thư mục

```text
EduAI/
├── docs/                    # Đặc tả nghiệp vụ, UI, kỹ thuật frontend/backend
├── public/                  # Tài nguyên tĩnh, favicon
├── src/
│   ├── assets/
│   ├── App.tsx              # Dashboard demo và tương tác UI
│   ├── App.css              # Style dashboard responsive
│   ├── index.css            # Global styles
│   └── main.tsx             # React entry point
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Deploy lên Vercel

1. Import repository EduAI vào Vercel.
2. Chọn framework preset **Vite**.
3. Build command: `npm run build`; output directory: `dist`.
4. Với demo hiện tại, không cần environment variables.
5. Sau khi tích hợp Supabase, khai báo public `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` trong Project Settings; cấu hình provider secrets trong Supabase Edge Functions.
6. Deploy Preview trước; kiểm tra responsive, console/network, Auth callback, RLS và Edge Function trước khi promote Production.

## Tài liệu

- [Tài liệu nghiệp vụ](docs/01-TAI-LIEU-NGHIEP-VU.md)
- [Tài liệu giao diện và AI](docs/02-TAI-LIEU-GIAO-DIEN-AI.md)
- [Tài liệu kỹ thuật AI Frontend](docs/03-TAI-LIEU-KY-THUAT-AI-FRONTEND.md)
- [Tài liệu kỹ thuật AI Backend/Admin](docs/04-TAI-LIEU-KY-THUAT-AI-ADMIN.md)
- [Hướng dẫn dành cho AI agents](AGENTS.md)

## Tác giả và giấy phép

- **Tác giả:** Hồ Hải Ý
- **License:** Chưa xác định trong repository. MIT có thể được cân nhắc; cần thêm tệp `LICENSE` và xác nhận quyền sử dụng trước khi phát hành theo giấy phép đó.
