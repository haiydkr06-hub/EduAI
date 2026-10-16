# TÀI LIỆU GIAO DIỆN AI — EDUAI
## Đặc tả UX/UI và nhật ký hỗ trợ thiết kế bằng AI

**Sinh viên:** Hồ Hải Ý · **MSSV:** 2401ITA046 · **Lớp:** CNTT
**Môn học:** AI Based Programming · **Giảng viên:** Trần Thanh Bình
**Ngày cập nhật:** 16/10/2026 · **Repository:** https://github.com/haiydkr06-hub/EduAI

> **Ghi chú thực tế:** Các wireframe dưới đây mô tả sản phẩm mục tiêu. Demo hiện tại tập trung vào dashboard học viên; các màn hình Instructor/Admin và quiz là thiết kế để triển khai tiếp. Các AI Interaction Log là ví dụ/hồi cứu dùng cho tài liệu, không phải bản xuất tự động từ lịch sử hội thoại.

## 1. Nguyên tắc thiết kế

### 1.1. Phong cách

- Hiện đại, chuyên nghiệp, thân thiện; ưu tiên khả năng đọc và định hướng.
- Dùng nền sáng, thẻ trắng, khoảng trắng thoáng và màu nhấn tím-indigo.
- Các hành động chính (đăng ký, tiếp tục học, nộp bài) có nhãn rõ và vị trí ổn định.
- Phản hồi mọi thao tác bằng trạng thái loading, thành công, empty hoặc lỗi; không dùng màu sắc làm tín hiệu duy nhất.
- UI AI thể hiện rõ đây là đề xuất; giảng viên có quyền sửa, từ chối hoặc duyệt.

### 1.2. Hệ thống màu

| Token | Hex | Công dụng |
|---|---|---|
| Primary | `#6857DF` | Nút chính, trạng thái chọn |
| Primary dark | `#5144BE` | Hover/active |
| Primary soft | `#F0EDFF` | Nền thẻ/nhãn tím |
| Ink | `#303147` | Nội dung chính |
| Muted | `#9293A5` | Mô tả, metadata |
| Border | `#ECEEF4` | Viền phân cách |
| Surface | `#FFFFFF` | Thẻ và panel |
| Canvas | `#F7F8FC` | Nền ứng dụng |
| Success | `#43A783` | Hoàn thành/thành công |
| Warning | `#E8A142` | Cần chú ý |
| Danger | `#D94F63` | Lỗi/nguy hiểm |

Màu sắc là token thiết kế đề xuất và có thể được ánh xạ vào CSS variables/Tailwind theme. Trạng thái phải đi kèm text/icon và cần kiểm tra contrast.

### 1.3. Typography

- Font giao diện: DM Sans; heading có thể dùng Plus Jakarta Sans. Có fallback hệ thống nếu không tải được web font.
- Heading trang: 24–30px desktop; heading khối: 14–18px; body: 14–16px; caption: tối thiểu 12px ở luồng nội dung quan trọng.
- Dùng weight 400–700, line-height khoảng 1.45–1.65; tránh chữ xám nhạt trên nền trắng.
- Thiết kế thực tế hiện dùng cỡ chữ dashboard compact; cần duy trì khả năng phóng to và zoom.

### 1.4. Responsive breakpoints

| Breakpoint | Dải | Hành vi |
|---|---|---|
| Mobile | `< 700px` | Một cột, menu drawer, vùng bấm tối thiểu 44px mục tiêu, biểu mẫu xếp dọc |
| Tablet | `700–980px` | Hai cột khi phù hợp; dashboard ưu tiên nội dung |
| Desktop | `> 980px` | Sidebar cố định, dashboard dạng lưới |
| Wide | `> 1500px` | Giới hạn chiều rộng nội dung, tăng khoảng đệm |

## 2. Sitemap

```text
EduAI
├── Công khai
│   ├── /                         Trang chủ
│   ├── /courses                  Danh mục + tìm kiếm khóa học
│   ├── /courses/:courseId        Chi tiết khóa học
│   ├── /login                    Đăng nhập
│   └── /register                 Đăng ký
├── Student (đăng nhập)
│   ├── /dashboard                Tổng quan/tiến độ
│   ├── /my-courses               Khóa học đã đăng ký
│   ├── /courses/:courseId/learn  Bài học
│   ├── /quizzes/:quizId          Làm quiz
│   ├── /attempts/:attemptId      Kết quả/lịch sử bài làm
│   └── /profile                  Hồ sơ và cài đặt
├── Instructor (đăng nhập)
│   ├── /instructor               Tổng quan giảng viên
│   ├── /instructor/courses       Quản lý khóa học
│   ├── /instructor/courses/new   Tạo/sửa khóa học
│   ├── /instructor/courses/:id/lessons
│   ├── /instructor/quizzes       Danh sách quiz
│   └── /instructor/ai-quiz       Sinh quiz AI, duyệt và xuất bản
└── Admin (đăng nhập)
    ├── /admin                    Dashboard thống kê
    ├── /admin/users              Quản lý tài khoản/role
    ├── /admin/courses            Quản lý/kiểm duyệt khóa học
    └── /admin/audit              Nhật ký quản trị
```

## 3. Wireframes chi tiết

### 3.1. HomePage

```text
+--------------------------------------------------------------------------------+
| EDUAI       Khóa học   Cách hoạt động   Giảng viên       [Đăng nhập] [Bắt đầu] |
+--------------------------------------------------------------------------------+
| HỌC TẬP CÁ NHÂN HÓA                                                            |
| Học thông minh hơn,                                                            |
| tiến xa hơn cùng EduAI.                 [Minh họa lớp học / AI]                |
| Bài học rõ ràng. Quiz phù hợp.                                                  |
| [Khám phá khóa học]  [Tìm hiểu thêm]                                            |
+--------------------------------------------------------------------------------+
| Khóa học nổi bật                                      [Tìm kiếm...] [Lọc v]     |
| +--------------------+  +--------------------+  +--------------------+           |
| | Ảnh / môn học      |  | Ảnh / môn học      |  | Ảnh / môn học      |           |
| | Tên khóa học       |  | Tên khóa học       |  | Tên khóa học       |           |
| | GV · cấp độ        |  | GV · cấp độ        |  | GV · cấp độ        |           |
| | [Xem khóa học]     |  | [Xem khóa học]     |  | [Xem khóa học]     |           |
| +--------------------+  +--------------------+  +--------------------+           |
+--------------------------------------------------------------------------------+
| AI tạo quiz từ tài liệu của bạn     | Quy trình học tập | Đánh giá người học     |
+--------------------------------------------------------------------------------+
| Footer: giới thiệu · trợ giúp · quyền riêng tư · điều khoản                     |
+--------------------------------------------------------------------------------+
```

### 3.2. CourseDetailPage

```text
+--------------------------------------------------------------------------------+
| EDUAI / Khóa học / Toán tư duy                                                 |
+-----------------------------------------------+--------------------------------+
| Toán học tư duy                               | Đăng ký học                     |
| Mô tả, mục tiêu, cấp độ, thời lượng           | Miễn phí / thông tin khóa       |
| Giảng viên: Nguyễn Minh Anh                   | [Đăng ký khóa học]              |
|                                               | Lưu ý điều kiện truy cập        |
| [Ảnh bìa khóa học]                            |                                |
+-----------------------------------------------+--------------------------------+
| Tabs: [Tổng quan] [Nội dung] [Đánh giá]                                        |
| Nội dung khóa học                                                               |
| 01  Bài 1 · Khái niệm nền tảng                            12 phút              |
| 02  Bài 2 · Hàm số                                          18 phút              |
| 03  Quiz ôn tập                                              10 câu              |
+--------------------------------------------------------------------------------+
| Điều kiện tiên quyết · Giảng viên · Câu hỏi thường gặp                         |
+--------------------------------------------------------------------------------+
```

### 3.3. QuizPage

```text
+--------------------------------------------------------------------------------+
| EDUAI / Toán học tư duy / Quiz cuối chương                      [Thoát quiz]    |
+--------------------------------------------------------------------------------+
| Câu 3 / 10      [==================------] 70%        Còn lại 08:42             |
+--------------------------------------------------------------------------------+
| Với hàm số y = x², giá trị y khi x = -3 là bao nhiêu?                           |
|                                                                                 |
| ( )  -6             ( )  6                                                      |
| ( )   9             ( ) -9                                                      |
|                                                                                 |
| [← Câu trước]   [Đánh dấu xem lại]    [Câu tiếp theo →]                         |
+--------------------------------------------------------------------------------+
| Bản đồ câu hỏi: [1✓] [2✓] [3●] [4] [5] [6] [7] [8] [9] [10]                    |
|                                                        [Nộp bài]                |
+--------------------------------------------------------------------------------+
| Dialog xác nhận nộp: đã trả lời 7/10 câu · [Quay lại] [Nộp bài]                 |
+--------------------------------------------------------------------------------+
```

### 3.4. AIQuizGeneratorPage (Instructor)

```text
+--------------------------------------------------------------------------------+
| Instructor / Quiz / Tạo quiz bằng AI                                            |
+--------------------------------------------------------------------------------+
| 1. Nguồn nội dung                      | 2. Thiết lập quiz                      |
| [Chọn khóa học v]                      | Số câu: [10 v]                          |
| [Chọn bài học v]                       | Độ khó: [Cơ bản v]                       |
| [Dán nội dung bài học...]              | Loại: [Trắc nghiệm v]                    |
| Hỗ trợ PDF/TXT · giới hạn hiển thị      | [ ] Kèm giải thích                       |
|                                        |                                         |
| [Tạo bản nháp bằng AI]                 |                                         |
+--------------------------------------------------------------------------------+
| Bản nháp AI — cần giảng viên duyệt                                               |
| Câu 1 [Sửa] [Xóa]    Nội dung câu hỏi ...                                       |
|   A ...   B ...   C ...   D ...   Đáp án dự kiến: C                             |
|   Giải thích dự kiến: ...                                                       |
| [+ Thêm câu]   [Lưu nháp]   [Duyệt & xuất bản]                                  |
+--------------------------------------------------------------------------------+
| Cảnh báo: AI có thể tạo đáp án chưa chính xác; vui lòng kiểm tra trước xuất bản.|
+--------------------------------------------------------------------------------+
```

### 3.5. AdminDashboard

```text
+--------------------------------------------------------------------------------+
| EDUAI ADMIN    Dashboard   Người dùng   Khóa học   Nhật ký                      |
+--------------------------------------------------------------------------------+
| Tổng quan hệ thống                         [Khoảng thời gian v] [Xuất báo cáo]  |
| +------------------+ +------------------+ +------------------+ +--------------+ |
| | Học viên         | | Khóa học         | | Quiz đã làm      | | Tỉ lệ hoàn tất| |
| |       1,284      | |       86         | |      5,302       | |      68%      | |
| +------------------+ +------------------+ +------------------+ +--------------+ |
|                                                                                |
| Hoạt động theo thời gian                 | Phân bố vai trò                     |
| [Biểu đồ; có nhãn và bảng dữ liệu]       | [Student/Instructor/Admin]          |
+------------------------------------------+-------------------------------------+
| Khóa học cần duyệt                                                             |
| Tên khóa học | Giảng viên | Gửi lúc | Trạng thái | [Xem] [Duyệt/Từ chối]       |
+--------------------------------------------------------------------------------+
| Hoạt động gần đây / cảnh báo bảo mật / lỗi tích hợp AI                         |
+--------------------------------------------------------------------------------+
```

## 4. AI Interaction Log — giao diện

> Các mục sau là ví dụ nhật ký/hồi cứu cho bài tập thiết kế; prompt được viết lại để minh họa ý định, không khẳng định là bản ghi nguyên văn từ công cụ.

### Log 1 — CourseCard

- **Ngày:** 16/10/2026
- **Task:** Thiết kế thẻ khóa học nhất quán với dashboard.
- **Prompt đã dùng (minh họa):** “Đề xuất cấu trúc component CourseCard cho dashboard học tập: ảnh/illustration, môn học, giảng viên, tiến độ và nút tiếp tục; responsive, accessible.”
- **Kết quả AI:** Gợi ý tách metadata, tiêu đề, tiến độ và hành động thành các vùng rõ; dùng phần trăm cùng progress bar.
- **Đánh giá & chỉnh sửa:**
  - **Điểm tốt:** Thông tin khóa học quét nhanh; trạng thái tiến độ dễ nhận biết.
  - **Điểm cần sửa:** Màu thanh tiến độ không đủ để phân biệt hoàn thành; title dài có thể tràn.
  - **Bài học:** Luôn có nhãn số phần trăm, trạng thái bằng chữ và xử lý ellipsis/focus.

### Log 2 — HeroSection

- **Ngày:** 16/10/2026
- **Task:** Tổ chức nội dung hero cho landing page.
- **Prompt đã dùng (minh họa):** “Viết wireframe hero tiếng Việt cho nền tảng học trực tuyến AI, có tiêu đề, mô tả ngắn, CTA chính/phụ và nội dung không phóng đại năng lực AI.”
- **Kết quả AI:** Đề xuất một thông điệp chính, một CTA khám phá khóa học và một CTA phụ tìm hiểu quy trình.
- **Đánh giá & chỉnh sửa:**
  - **Điểm tốt:** Thứ bậc thông tin và hành động rõ ràng.
  - **Điểm cần sửa:** Tránh tuyên bố AI hiểu hoàn hảo hoặc đảm bảo kết quả học tập.
  - **Bài học:** Nội dung tiếp thị cần trung thực về giới hạn của đề xuất AI.

### Log 3 — AIQuizForm

- **Ngày:** 16/10/2026
- **Task:** Thiết kế biểu mẫu sinh quiz có kiểm soát.
- **Prompt đã dùng (minh họa):** “Đề xuất form giảng viên gửi nội dung bài học để tạo quiz; gồm nguồn, số câu, độ khó, trạng thái lỗi/loading và bước duyệt.”
- **Kết quả AI:** Gợi ý bố cục hai cột, chọn bài học, nội dung, tham số, nút tạo nháp và editor xem trước.
- **Đánh giá & chỉnh sửa:**
  - **Điểm tốt:** Tách phần nhập nguồn khỏi phần tùy chọn.
  - **Điểm cần sửa:** Thêm giới hạn ký tự, xác nhận trước khi gửi và thông báo xử lý dữ liệu.
  - **Bài học:** Với dữ liệu AI, UI phải làm nổi bật trạng thái “bản nháp — chưa xuất bản”.

### Log 4 — QuizPlayer

- **Ngày:** 16/10/2026
- **Task:** Bố trí trang làm quiz và trạng thái nộp bài.
- **Prompt đã dùng (minh họa):** “Tạo wireframe quiz accessible, có tiến độ câu, timer, lựa chọn, đánh dấu xem lại, xác nhận nộp và trạng thái hết giờ.”
- **Kết quả AI:** Đề xuất phân cấp câu hỏi, điều hướng, bản đồ câu và dialog xác nhận.
- **Đánh giá & chỉnh sửa:**
  - **Điểm tốt:** Người học thấy tiến độ và câu chưa trả lời.
  - **Điểm cần sửa:** Timer cần thông báo accessible; không nên chỉ dựa vào màu để thể hiện câu đã chọn.
  - **Bài học:** Luồng kiểm tra cần hỗ trợ bàn phím và phòng tránh nộp nhầm.

### Log 5 — AdminDashboard

- **Ngày:** 16/10/2026
- **Task:** Xác định dashboard tổng quan cho Admin.
- **Prompt đã dùng (minh họa):** “Thiết kế admin dashboard EduAI với thống kê người dùng/khóa/quiz, kiểm duyệt, biểu đồ có phương án thay thế dạng bảng.”
- **Kết quả AI:** Đề xuất thẻ KPI, biểu đồ hoạt động, danh sách nội dung chờ duyệt và hoạt động gần đây.
- **Đánh giá & chỉnh sửa:**
  - **Điểm tốt:** Tách hành động quản trị khỏi số liệu tổng quan.
  - **Điểm cần sửa:** KPI cần định nghĩa kỳ thời gian, nguồn dữ liệu và quyền xem.
  - **Bài học:** Dashboard không chỉ đẹp; mọi số liệu cần có ngữ cảnh và truy vết nguồn.

## 5. Kiểm thử giao diện

| Hạng mục | Cách kiểm tra | Tiêu chí |
|---|---|---|
| Responsive | DevTools ở 320, 375, 768, 1024, 1440px; xoay màn hình | Không tràn ngang; menu, form, thẻ và dialog dùng được |
| Accessibility | axe DevTools và kiểm tra thủ công | Không còn lỗi nghiêm trọng/critical; landmark, heading, label, alt, focus hợp lý |
| Bàn phím | Chỉ dùng Tab/Shift+Tab/Enter/Space/Escape | Thứ tự focus hợp lý; mọi điều khiển thao tác được; focus dễ thấy |
| Contrast/zoom | Contrast checker; zoom trình duyệt 200% | Đọc được, không mất chức năng/nội dung |
| Dark mode | Bật theme nếu được triển khai; kiểm tra từng trạng thái | Contrast và trạng thái hover/focus/error nhất quán; không đảo màu ảnh/biểu đồ gây hiểu nhầm |
| Trạng thái UI | Mock loading, empty, lỗi API, lỗi AI | Có thông báo cụ thể và thao tác phục hồi; không hiện success giả |

> Dark mode hiện là hạng mục kiểm thử/thiết kế cần hoàn thiện, không phải tính năng đã cam kết có trong demo.

## 6. Kết luận

Hệ thống giao diện EduAI ưu tiên khả năng định hướng, khả năng đọc và tính an toàn trong quy trình AI. Wireframe giúp thống nhất yêu cầu giữa người học, giảng viên và quản trị viên; kiểm thử responsive/accessibility cần được chạy lại trên các màn hình triển khai thực tế.
