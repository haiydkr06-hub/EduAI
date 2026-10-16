# AGENTS.md — Hướng dẫn cho AI agents

Tệp này cung cấp ngữ cảnh và quy tắc làm việc cho AI coding agents (và contributor) khi đọc hoặc thay đổi repository EduAI. Nội dung hướng đến dự án hiện tại, không phải tuyên bố rằng mọi tính năng đã được triển khai.

## 1. Tổng quan EduAI

EduAI là nền tảng học trực tuyến tích hợp AI, định hướng cho ba vai trò Student, Instructor và Admin. Mục tiêu sản phẩm gồm quản lý khóa học/bài học, theo dõi tiến độ, làm quiz và để giảng viên tạo bản nháp quiz từ tài liệu bằng AI rồi duyệt trước khi xuất bản.

**Trạng thái mã nguồn hiện tại:** demo dashboard chạy bằng React, TypeScript, Vite và dữ liệu cục bộ. Supabase, Auth, AI Edge Function, routing theo vai trò, Zustand và các luồng quản trị chưa được tích hợp đầy đủ. Đọc `package.json` và mã nguồn trước khi giả định một thư viện/endpoint tồn tại.

## 2. Cấu trúc quan trọng

```text
docs/
  01-TAI-LIEU-NGHIEP-VU.md
  02-TAI-LIEU-GIAO-DIEN-AI.md
  03-TAI-LIEU-KY-THUAT-AI-FRONTEND.md
  04-TAI-LIEU-KY-THUAT-AI-ADMIN.md
public/                 Tài nguyên tĩnh
src/
  App.tsx               Dashboard demo và state UI
  App.css               Component styles/responsive layout
  index.css             Global styles
  main.tsx              Entry point
  assets/               Hình ảnh/icon
index.html              Metadata và root mount
package.json            Scripts và dependency hiện hữu
```

Thư mục `features/`, `lib/`, `pages/`, `supabase/` trong tài liệu kỹ thuật là cấu trúc định hướng; chỉ xem là thực tế sau khi các tệp tương ứng được thêm vào repository.

## 3. Quy ước code

### Naming

- React component dùng `PascalCase`; hooks bắt đầu bằng `use`; hàm/biến dùng `camelCase`.
- Tên boolean nên diễn đạt trạng thái (`isLoading`, `hasAccess`).
- Hằng số và union types nên biểu đạt domain; tránh `any` và ép kiểu không cần thiết.
- Giữ tên sản phẩm, label UI và nội dung người dùng bằng tiếng Việt; tên code bằng tiếng Anh theo convention hiện có.

### Components và logic

- Component tập trung vào một trách nhiệm, nhận props có type rõ ràng.
- Giữ state cục bộ cho trạng thái chỉ thuộc một vùng UI; chỉ đưa state chia sẻ lên store khi có nhu cầu thực.
- Không thêm dependency/framework chỉ để giải quyết một trường hợp nhỏ; kiểm tra package và prior art trước.
- Khi tích hợp API, thể hiện loading/error/empty/success riêng; không che lỗi bằng dữ liệu mặc định thành công.
- Tính năng AI trả bản nháp; yêu cầu người có thẩm quyền duyệt trước khi xuất bản.

### Styling và accessibility

- Bám hệ thống token/màu và pattern trong `src/App.css`, `src/index.css`.
- Duy trì responsive trên mobile/tablet/desktop; không gây overflow ngang.
- Dùng semantic HTML, label cho input, accessible name cho icon button, focus-visible và trạng thái không chỉ dựa vào màu.
- Kiểm tra `prefers-reduced-motion`; giữ tương phản đủ dùng.

## 4. Lệnh thường dùng

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

Hiện `package.json` chưa có lệnh `test`; không báo test suite đã chạy nếu chưa được thêm. Node hiện yêu cầu Vite: dùng Node 20.19+ hoặc 22.12+.

## 5. Database schema mục tiêu

Tài liệu nghiệp vụ mô tả 8 bảng:

- `profiles`: hồ sơ và role (`student`, `instructor`, `admin`).
- `courses`: khóa học, liên kết Instructor.
- `lessons`: nội dung bài học theo thứ tự khóa.
- `enrollments`: đăng ký học viên/khóa học, unique theo cặp.
- `lesson_progress`: tiến độ học viên/bài học, unique theo cặp.
- `quizzes`: quiz thuộc khóa/bài và trạng thái draft/published.
- `quiz_questions`: nội dung câu hỏi/lựa chọn/đáp án.
- `quiz_attempts`: câu trả lời và kết quả bài làm.

Đây là schema mục tiêu, chưa mặc định tồn tại trong Supabase. Bật RLS cho bảng dữ liệu; không gửi `answer_key` trước thời điểm chấm; quyền Admin phải được xác minh server-side và role không được người dùng tự sửa.

## 6. Environment variables

Các biến frontend mục tiêu (chỉ public config):

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_AI_API_URL=
```

- Demo dashboard hiện tại không cần `.env`.
- `.env.local` chỉ dùng local và không commit.
- Không đặt Supabase `service_role`, OpenAI/AI provider key, password, access token hoặc secret nào trong `VITE_*`.
- AI key được lưu trong Supabase Edge Function Secrets. Nếu phát hiện secret đã commit, báo ngay và rotate; xóa khỏi file không làm secret cũ an toàn trở lại.

## 7. Quy trình khi AI sửa code

1. Đọc yêu cầu, `package.json`, tệp liên quan và trạng thái hiện tại trước khi sửa.
2. Phân biệt tính năng đã có với định hướng trong tài liệu; hỏi lại nếu thay đổi hành vi/scope có nhiều lựa chọn.
3. Tìm pattern/helper đang có; lập thay đổi nhỏ, hoàn chỉnh và không sửa ngoài phạm vi.
4. Không đọc/in ra giá trị `.env`; không thêm secret vào source, log, tài liệu hoặc commit.
5. Giữ type safety; cập nhật tài liệu liên quan khi thay đổi API/hành vi/cấu hình.
6. Chạy validation nhỏ nhất phù hợp, tối thiểu `npm run build` và/hoặc `npm run lint` nếu sửa frontend.
7. Đọc lại diff, xác nhận không stage file ngoài phạm vi, không xóa thay đổi người khác.

### Checklist trước khi hoàn tất

- [ ] Thay đổi đúng yêu cầu, không mở rộng scope ngoài ý muốn.
- [ ] Build/typecheck/lint liên quan đã chạy và ghi nhận chính xác kết quả.
- [ ] Loading, lỗi, empty và trường hợp responsive/accessibility được xem xét.
- [ ] Không có secret, `.env`, build output hay `node_modules` trong nội dung chuẩn bị commit.
- [ ] Tài liệu, tên file và lệnh hướng dẫn khớp với mã nguồn thực tế.

## 8. Tài liệu tham khảo trong repository

- [Tài liệu nghiệp vụ](docs/01-TAI-LIEU-NGHIEP-VU.md)
- [Tài liệu giao diện AI](docs/02-TAI-LIEU-GIAO-DIEN-AI.md)
- [Tài liệu kỹ thuật Frontend](docs/03-TAI-LIEU-KY-THUAT-AI-FRONTEND.md)
- [Tài liệu kỹ thuật Backend/Admin](docs/04-TAI-LIEU-KY-THUAT-AI-ADMIN.md)
- [README](README.md)
