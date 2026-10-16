# TÀI LIỆU NGHIỆP VỤ EDUAI
## Nền tảng học trực tuyến tích hợp AI

| Thông tin | Nội dung |
|---|---|
| Sinh viên thực hiện | Hồ Hải Ý |
| Mã sinh viên | 2401ITA046 |
| Lớp | CNTT |
| Môn học | AI Based Programming |
| Giảng viên | Trần Thanh Bình |
| Ngày cập nhật | 16/10/2026 |
| Repository | https://github.com/haiydkr06-hub/EduAI |

> **Phạm vi tài liệu:** Đây là đặc tả nghiệp vụ/thiết kế cho sản phẩm EduAI. Mã nguồn hiện tại là demo dashboard frontend với dữ liệu mẫu; Auth, database, phân quyền, sinh quiz AI và các luồng nghiệp vụ dưới đây là kiến trúc mục tiêu, chưa được triển khai đầy đủ trong demo.

## 1. Tổng quan dự án

### 1.1. Bối cảnh

Giảng viên thường phải tạo câu hỏi kiểm tra thủ công từ nội dung bài giảng, còn học viên thiếu công cụ phản hồi nhanh và theo dõi tiến độ theo từng bài. Các nền tảng học trực tuyến hiện có cũng có thể tách rời nội dung, bài kiểm tra và thống kê học tập.

EduAI hướng tới một không gian học trực tuyến kết nối khóa học, bài học, quiz và tiến độ. Giảng viên có thể gửi nội dung bài học để AI đề xuất bộ câu hỏi; giảng viên duyệt và chỉnh sửa trước khi xuất bản. Học viên làm quiz và xem kết quả sau khi nộp.

### 1.2. Mục tiêu

- Cung cấp trải nghiệm học tập trực tuyến dễ sử dụng trên máy tính và điện thoại.
- Hỗ trợ quản lý khóa học, bài học và đăng ký học.
- Rút ngắn thời gian soạn câu hỏi bằng chức năng AI sinh bản nháp quiz từ tài liệu.
- Cho phép giảng viên kiểm duyệt nội dung AI trước khi phát hành.
- Ghi nhận kết quả quiz và tiến độ học tập để học viên, giảng viên theo dõi.
- Xây dựng nền tảng có thể mở rộng, bảo vệ dữ liệu theo vai trò.

### 1.3. Đối tượng người dùng

| Vai trò | Mô tả | Nhu cầu chính |
|---|---|---|
| Student (Học viên) | Người tham gia các khóa học | Tìm khóa, đăng ký, học bài, làm quiz, xem kết quả và tiến độ cá nhân |
| Instructor (Giảng viên) | Người soạn và quản lý nội dung học tập | Tạo khóa/bài học, sinh và duyệt quiz, theo dõi học viên |
| Admin (Quản trị viên) | Người vận hành nền tảng | Quản lý tài khoản, nội dung, trạng thái hoạt động và số liệu hệ thống |

### 1.4. Phạm vi

**Trong phạm vi thiết kế:** xác thực người dùng; danh mục/chi tiết khóa học; đăng ký học; bài học và tiến độ; tạo, làm và chấm quiz; AI hỗ trợ tạo quiz; bảng điều khiển theo vai trò; phân quyền dữ liệu; triển khai web responsive.

**Ngoài phạm vi của phiên bản demo cơ bản:** thu phí thực, hội nghị video thời gian thực, ứng dụng native, AI tự động chấm bài luận có tính quyết định cao và các tích hợp LMS bên ngoài. Mọi nội dung quiz do AI tạo đều cần người có chuyên môn duyệt.

## 2. Phân tích nghiệp vụ

### 2.1. Danh sách tính năng

| STT | Tên tính năng | Đối tượng | Ưu tiên |
|---:|---|---|---|
| 1 | Đăng ký, đăng nhập, đăng xuất | Student, Instructor, Admin | Must |
| 2 | Xem, tìm kiếm và lọc danh sách khóa học | Tất cả | Must |
| 3 | Xem chi tiết khóa học và danh sách bài học | Tất cả | Must |
| 4 | Đăng ký tham gia khóa học | Student | Must |
| 5 | Truy cập nội dung bài học đã được cấp quyền | Student | Must |
| 6 | Ghi nhận tiến độ và đánh dấu bài học hoàn tất | Student | Should |
| 7 | Làm quiz và xem kết quả | Student | Must |
| 8 | Xem lịch sử lần làm quiz của bản thân | Student | Should |
| 9 | Tạo và cập nhật khóa học | Instructor | Must |
| 10 | Tạo và sắp xếp bài học trong khóa | Instructor | Must |
| 11 | Gửi tài liệu/nội dung để AI đề xuất quiz | Instructor | Must |
| 12 | Duyệt, sửa và xuất bản quiz do AI đề xuất | Instructor | Must |
| 13 | Quản lý tài khoản và vai trò người dùng | Admin | Should |
| 14 | Xem thống kê, quản lý nội dung và trạng thái hệ thống | Admin | Should |

### 2.2. User Stories

**Student**

- Là học viên, tôi muốn tìm và lọc khóa học theo chủ đề để chọn nội dung phù hợp.
- Là học viên đã đăng nhập, tôi muốn đăng ký khóa học để được truy cập bài học.
- Là học viên, tôi muốn lưu tiến độ từng bài để tiếp tục học từ nơi đã dừng.
- Là học viên, tôi muốn làm quiz và nhận điểm cùng giải thích sau khi nộp.
- Là học viên, tôi chỉ muốn xem lịch sử và tiến độ của tài khoản mình.

**Instructor**

- Là giảng viên, tôi muốn tạo khóa học và sắp xếp bài học để tổ chức chương trình học.
- Là giảng viên, tôi muốn cung cấp tài liệu văn bản để AI tạo bản nháp quiz nhanh hơn.
- Là giảng viên, tôi muốn xem và chỉnh sửa câu hỏi/đáp án AI tạo trước khi xuất bản.
- Là giảng viên, tôi muốn xem kết quả học viên trong khóa do mình quản lý.
- Là giảng viên, tôi muốn sửa hoặc lưu nháp quiz thay vì phát hành nhầm nội dung chưa được duyệt.

**Admin**

- Là quản trị viên, tôi muốn xem số liệu tổng quan để nắm tình hình sử dụng nền tảng.
- Là quản trị viên, tôi muốn quản lý trạng thái tài khoản và gán vai trò theo quy trình được cấp quyền.
- Là quản trị viên, tôi muốn kiểm duyệt hoặc ẩn nội dung vi phạm.
- Là quản trị viên, tôi muốn truy vết thao tác quản trị quan trọng để hỗ trợ vận hành.

### 2.3. Use Case Diagram

```text
                         +----------------------------------------------+
                         |                  EDUAI                       |
                         |                                              |
 [Student] --------------|-- (Đăng ký / đăng nhập)                      |
     |                   |-- (Tìm kiếm / xem khóa học)                  |
     |                   |-- (Đăng ký khóa học)                         |
     |                   |-- (Học bài / lưu tiến độ)                    |
     |                   |-- (Làm quiz / xem kết quả)                   |
     |                   |                                              |
 [Instructor] -----------|-- (Tạo và quản lý khóa học, bài học)         |
     |                   |-- (Gửi nội dung bài học)                     |
     |                   |-- (Sinh quiz AI) ----<<include>>---->        |
     |                   |-- (Duyệt / sửa / xuất bản quiz)              |
     |                   |-- (Xem kết quả học viên trong khóa)          |
     |                   |                                              |
 [Admin] ----------------|-- (Quản lý người dùng / vai trò)             |
     |                   |-- (Kiểm duyệt nội dung)                      |
     |                   |-- (Xem dashboard và thống kê)                |
                         +----------------------------------------------+
```

### 2.4. Luồng nghiệp vụ chính

#### Luồng A — Học viên học khóa và làm quiz

1. Học viên đăng nhập; hệ thống xác thực và tải hồ sơ.
2. Học viên tìm khóa học, xem mô tả và danh sách bài học.
3. Học viên đăng ký khóa; hệ thống tạo enrollment duy nhất cho cặp học viên/khóa.
4. Học viên mở bài học được phép truy cập; hệ thống tải nội dung và tiến độ.
5. Khi học xong, học viên đánh dấu hoàn thành; hệ thống cập nhật `lesson_progress`.
6. Học viên bắt đầu quiz; hệ thống tải câu hỏi đã xuất bản.
7. Học viên gửi câu trả lời; máy chủ tính điểm, lưu `quiz_attempts` và trả kết quả.
8. Học viên xem điểm/lịch sử của chính mình và tiếp tục bài học.

#### Luồng B — Giảng viên tạo quiz có AI hỗ trợ

1. Giảng viên đăng nhập và chọn khóa/bài học thuộc quyền sở hữu.
2. Giảng viên nhập hoặc tải nội dung tài liệu được phép xử lý, chọn số câu và mức độ.
3. Frontend kiểm tra dữ liệu cơ bản rồi gửi yêu cầu xác thực tới Edge Function.
4. Server xác minh JWT, vai trò, quyền sở hữu và giới hạn sử dụng; không gửi khóa AI xuống trình duyệt.
5. AI trả dữ liệu theo schema; server kiểm tra cấu trúc, kích thước và số câu.
6. Hệ thống lưu quiz ở trạng thái nháp; giảng viên xem, sửa câu hỏi và đáp án.
7. Giảng viên xác nhận xuất bản; quiz chuyển sang trạng thái có thể làm.
8. Học viên chỉ truy cập quiz đã xuất bản và thuộc khóa mình được đăng ký.

### 2.5. Luồng ngoại lệ

| Tình huống | Xử lý mong đợi |
|---|---|
| Đăng nhập sai hoặc phiên hết hạn | Báo lỗi dễ hiểu; không tạo phiên giả; yêu cầu đăng nhập lại khi cần |
| Học viên chưa đăng ký mở bài học riêng tư | Từ chối ở server/RLS; hiển thị hướng dẫn đăng ký khóa |
| Đăng ký trùng một khóa | Không tạo bản ghi trùng; trả trạng thái đã tham gia |
| Quiz chưa xuất bản hoặc không thuộc khóa được phép | Không trả nội dung câu hỏi; hiển thị quiz hiện không khả dụng |
| Mất mạng khi nộp bài | Giữ dữ liệu câu trả lời ở giao diện trong phiên; cho phép thử lại an toàn; tránh ghi nhận lần nộp trùng |
| AI timeout, quota hoặc trả JSON sai schema | Không xuất bản quiz; báo lỗi cụ thể, cho phép thử lại; ghi log không chứa tài liệu nhạy cảm |
| Tài liệu rỗng/quá dài/định dạng không hỗ trợ | Từ chối trước khi gọi AI và nêu giới hạn đầu vào |
| Người dùng sửa URL để truy cập tài nguyên người khác | Kiểm tra quyền tại API/RLS; trả 403/404 an toàn, ghi nhận sự kiện phù hợp |
| Giảng viên không sở hữu khóa đích | Chặn thao tác tạo/sửa quiz; không dựa riêng vào ẩn nút ở giao diện |

### 2.6. ERD mức khái niệm

```text
profiles (1) --------< courses                 : instructor_id
profiles (1) --------< enrollments >----------- (1) courses
profiles (1) --------< lesson_progress >------- (1) lessons
courses  (1) --------< lessons
courses  (1) --------< quizzes
quizzes  (1) --------< quiz_questions
profiles (1) --------< quiz_attempts >---------- (1) quizzes

profiles
  id PK, full_name, role, avatar_url, created_at
courses
  id PK, instructor_id FK -> profiles.id, title, description, status
lessons
  id PK, course_id FK -> courses.id, title, content, position
enrollments
  id PK, student_id FK -> profiles.id, course_id FK -> courses.id, enrolled_at
lesson_progress
  id PK, student_id FK -> profiles.id, lesson_id FK -> lessons.id, completed_at
quizzes
  id PK, course_id FK -> courses.id, lesson_id FK -> lessons.id NULL, title, status
quiz_questions
  id PK, quiz_id FK -> quizzes.id, prompt, options JSONB, answer_key, position
quiz_attempts
  id PK, quiz_id FK -> quizzes.id, student_id FK -> profiles.id, score, answers JSONB
```

> Mô hình dữ liệu chi tiết, ràng buộc và chính sách RLS được mô tả trong [tài liệu kỹ thuật Admin](./04-TAI-LIEU-KY-THUAT-AI-ADMIN.md).

## 3. Yêu cầu phi chức năng

| Nhóm | Yêu cầu |
|---|---|
| Hiệu năng | Trang chính tương tác trong khoảng 3 giây trên mạng phổ thông; tải danh sách theo trang; không tải toàn bộ khóa học/quiz cùng lúc |
| Bảo mật | TLS; xác thực server-side; RLS cho bảng có dữ liệu người dùng; quyền tối thiểu; không lưu secret AI ở frontend |
| Riêng tư | Chỉ gửi phần tài liệu cần thiết cho AI; thông báo rõ việc xử lý; tránh ghi nội dung tài liệu, token hoặc đáp án nhạy cảm vào log |
| Tính đúng đắn | Validate đầu vào ở client và server; chấm điểm phía server; dùng ràng buộc DB chống dữ liệu trùng |
| Responsive | Hỗ trợ màn hình từ 320px; thao tác cảm ứng; không tràn ngang ở luồng học/quiz |
| Accessibility | Dùng semantic HTML, nhãn form, điều hướng bàn phím, focus rõ, tương phản đạt WCAG 2.1 AA mục tiêu |
| Khả dụng | Trạng thái loading/empty/error rõ ràng; thao tác gửi bài không tạo kết quả trùng khi retry |
| Bảo trì | TypeScript strict ở mức phù hợp; module theo feature; tài liệu/schema migration được version hóa |
| Mở rộng | Tách dịch vụ AI ở server; có thể thêm hàng đợi/rate limit và caching khi tải tăng |

## 4. Kết luận

EduAI xác định quy trình học tập xuyên suốt từ khám phá khóa học đến đánh giá kết quả, đồng thời đặt bước kiểm duyệt của giảng viên giữa nội dung AI tạo và quiz được phát hành. Tài liệu này là cơ sở để triển khai, kiểm thử và đánh giá nghiệp vụ; các tính năng backend/AI cần được xây dựng trước khi xem hệ thống là sản phẩm hoàn chỉnh.
