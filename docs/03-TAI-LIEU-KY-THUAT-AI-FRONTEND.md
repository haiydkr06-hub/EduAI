# TÀI LIỆU KỸ THUẬT AI — FRONTEND EDUAI
## Kiến trúc giao diện và ví dụ tích hợp

**Sinh viên:** Hồ Hải Ý · **MSSV:** 2401ITA046 · **Môn học:** AI Based Programming
**Giảng viên:** Trần Thanh Bình · **Ngày cập nhật:** 16/10/2026
**Repository:** https://github.com/haiydkr06-hub/EduAI

> **Trạng thái triển khai:** Mã nguồn hiện có là demo React 19 + TypeScript + Vite, với dashboard và dữ liệu mẫu. Các thư viện Supabase, Zustand, Router, Axios, React Hook Form và Zod dưới đây là kiến trúc/ví dụ cho phiên bản đầy đủ; chúng chưa có trong `package.json`. Không dùng các ví dụ như bằng chứng backend đã hoạt động.

## 1. Kiến trúc Frontend

### 1.1. Tech stack

| Công nghệ | Phiên bản mục tiêu | Trách nhiệm | Tình trạng trong demo |
|---|---|---|---|
| React | 18+ theo yêu cầu sản phẩm | Component UI | React 19 hiện tại |
| TypeScript | 5+ | Kiểu dữ liệu, kiểm tra tĩnh | Có; package hiện tại dùng TypeScript 6 |
| Vite | 5+ | Dev server, build | Có; package hiện tại dùng Vite 8 |
| Tailwind CSS | 3+ | Utility styling | Cấu hình có; UI hiện tại dùng CSS |
| React Router | 6+ | Định tuyến SPA | Chưa tích hợp |
| Zustand | 4+ | State chia sẻ nhẹ | Chưa tích hợp |
| Supabase JS | 2+ | Auth và truy cập Supabase | Chưa tích hợp |
| Axios | 1+ | HTTP client | Chưa tích hợp |
| React Hook Form | 7+ | Quản lý form | Chưa tích hợp |
| Zod | 3+ | Kiểm tra schema | Chưa tích hợp |

### 1.2. Cấu trúc thư mục mục tiêu

```text
eduai/
├── docs/
├── public/
├── src/
│   ├── app/                    # Router, providers, app shell
│   ├── components/
│   │   ├── ui/                 # Button, Input, Dialog, Spinner
│   │   ├── layout/             # Header, Sidebar, Footer
│   │   └── shared/             # CourseCard, ProgressBar
│   ├── features/
│   │   ├── auth/               # Zustand auth store và form
│   │   ├── courses/            # hooks, API và UI khóa học
│   │   ├── lessons/            # bài học và tiến độ
│   │   ├── quizzes/            # QuizPlayer và attempt
│   │   └── ai/                 # AIQuizForm và preview
│   ├── lib/                    # supabase.ts, axios.ts
│   ├── pages/                  # Route-level page components
│   ├── types/                  # Kiểu dùng chung
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── functions/generate-quiz/
│   └── migrations/
├── .env.example
└── package.json
```

### 1.3. Component tree

```text
App
└── AppProviders (Router + auth bootstrap)
    ├── PublicLayout
    │   ├── HomePage ── HeroSection, CourseCard[]
    │   ├── CoursesPage ── SearchBar, FilterBar, CourseCard[]
    │   ├── CourseDetailPage ── LessonList, EnrollButton
    │   └── AuthPage ── LoginForm / RegisterForm
    ├── StudentLayout [auth + role guard]
    │   ├── DashboardPage ── ProgressSummary, CourseCard[]
    │   ├── LessonPage ── LessonContent, ProgressTracker
    │   └── QuizPage ── QuizPlayer, SubmitConfirmation, QuizResult
    ├── InstructorLayout [auth + role guard]
    │   ├── CourseEditor
    │   └── AIQuizGeneratorPage ── AIQuizForm, QuestionReviewList
    └── AdminLayout [auth + role guard]
        └── AdminDashboard ── KPI, UserTable, CourseModeration
```

## 2. Chi tiết component và logic

### 2.1. State management với Zustand

Ví dụ store xác thực tối giản. Cần tải profile từ bảng `profiles`; role ở client chỉ phục vụ giao diện, còn quyền thật phải được xác minh ở server/RLS.

```typescript
import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

type Role = 'student' | 'instructor' | 'admin'
type Profile = { id: string; full_name: string; role: Role }

type AuthState = {
  user: User | null
  profile: Profile | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: false,
  error: null,
  signIn: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (!data.user) throw new Error('Không nhận được tài khoản sau khi đăng nhập.')

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', data.user.id)
        .single()
      if (profileError) throw profileError
      set({ user: data.user, profile, loading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Không thể đăng nhập.'
      set({ error: message, loading: false })
      throw error
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      set({ error: error.message })
      throw error
    }
    set({ user: null, profile: null, error: null })
  },
}))
```

### 2.2. Custom hook `useCourses`

```typescript
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export type Course = {
  id: string
  title: string
  description: string | null
  instructor_id: string
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)
    const { data, error: queryError } = await supabase
      .from('courses')
      .select('id, title, description, instructor_id')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .abortSignal(signal ?? new AbortController().signal)
    if (signal?.aborted) return
    if (queryError) {
      setError(queryError.message)
      setLoading(false)
      return
    }
    setCourses(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void reload(controller.signal)
    return () => controller.abort()
  }, [reload])

  return { courses, loading, error, reload }
}
```

`reload` có tham chiếu ổn định nhờ `useCallback`; effect có cleanup để tránh cập nhật sau unmount. Ứng dụng lớn có thể thay hook này bằng TanStack Query để cache/invalidate có hệ thống.

### 2.3. Custom hook `useAIQuizGenerator`

```typescript
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export type GeneratedQuestion = {
  prompt: string
  options: string[]
  answerIndex: number
  explanation: string
}

type Input = { courseId: string; sourceText: string; questionCount: number }

export function useAIQuizGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function generate(input: Input): Promise<GeneratedQuestion[]> {
    setLoading(true)
    setError(null)
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('generate-quiz', {
        body: input,
      })
      if (invokeError) throw invokeError
      if (!Array.isArray(data?.questions)) {
        throw new Error('Phản hồi AI không đúng định dạng câu hỏi.')
      }
      return data.questions as GeneratedQuestion[]
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Không thể tạo quiz.'
      setError(message)
      throw cause
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error }
}
```

Kiểu dữ liệu phía client không thay thế validation server-side. Hiển thị kết quả ở trạng thái nháp và giảng viên phải xác nhận trước khi lưu/xuất bản.

### 2.4. Supabase client và Axios instance

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!url || !anonKey) {
  throw new Error('Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY.')
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
})
```

```typescript
// src/lib/axios.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15_000,
  headers: { Accept: 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
)
```

Supabase anon/publishable key có thể có trong bundle khi RLS được cấu hình đúng. **Không** đặt `service_role`, OpenAI API key hoặc secret server-side vào biến `VITE_*`. Axios không tự thêm access token trong ví dụ này; chỉ thêm interceptor khi API riêng cần token và có xử lý refresh/logout rõ ràng.

### 2.5. Form với React Hook Form + Zod

```tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const quizSchema = z.object({
  courseId: z.string().uuid('Hãy chọn khóa học hợp lệ.'),
  sourceText: z.string().trim().min(100, 'Nội dung cần ít nhất 100 ký tự.').max(30_000),
  questionCount: z.coerce.number().int().min(1).max(20),
})
type QuizFormValues = z.infer<typeof quizSchema>

export function AIQuizForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<QuizFormValues>({
      resolver: zodResolver(quizSchema),
      defaultValues: { sourceText: '', questionCount: 5 },
    })

  async function onSubmit(values: QuizFormValues) {
    // Gọi Edge Function; server vẫn phải lặp lại validation và kiểm tra quyền.
    console.info('Quiz request validated', {
      courseId: values.courseId,
      questionCount: values.questionCount,
      sourceLength: values.sourceText.length,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="courseId">Khóa học</label>
      <input id="courseId" {...register('courseId')} aria-invalid={!!errors.courseId} />
      {errors.courseId && <p role="alert">{errors.courseId.message}</p>}

      <label htmlFor="sourceText">Nội dung bài học</label>
      <textarea id="sourceText" {...register('sourceText')} aria-invalid={!!errors.sourceText} />
      {errors.sourceText && <p role="alert">{errors.sourceText.message}</p>}

      <label htmlFor="questionCount">Số câu (1–20)</label>
      <input id="questionCount" type="number" {...register('questionCount')} />
      {errors.questionCount && <p role="alert">{errors.questionCount.message}</p>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Đang tạo bản nháp…' : 'Tạo quiz'}
      </button>
    </form>
  )
}
```

## 3. AI Interaction Log — code Frontend

> Nhật ký mẫu/hồi cứu phục vụ tài liệu; nội dung prompt được tóm tắt, không phải transcript xác thực. Các ngày ghi nhận theo ngày cập nhật tài liệu.

### Log 1 — `useCourses`

- **Ngày:** 16/10/2026
- **Task:** Thiết kế hook tải danh sách khóa học có trạng thái.
- **Prompt:** “Tạo custom hook TypeScript dùng Supabase tải khóa published, có loading/error/reload và cleanup khi unmount.”
- **Kết quả AI:** Gợi ý `useState`, `useCallback`, `useEffect`, abort signal và kiểm tra lỗi truy vấn.
- **Đánh giá & chỉnh sửa:** **Tốt:** API hook rõ. **Cần sửa:** phụ thuộc effect phải ổn định, `data ?? []` không được che lỗi. **Bài học:** Trả lỗi riêng, cleanup và kiểm tra trạng thái abort.

### Log 2 — Debug hai lần gọi API

- **Ngày:** 16/10/2026
- **Task:** Chẩn đoán vì sao hook gọi API hai lần trong môi trường phát triển.
- **Prompt:** “Phân tích React StrictMode và useEffect; cách phân biệt request lặp do kiểm tra development với effect dependency không ổn định.”
- **Kết quả AI:** Giải thích StrictMode có thể mount/cleanup/mount để phát hiện side effect; callback mới ở mỗi render cũng có thể kích hoạt effect lại.
- **Đánh giá & chỉnh sửa:** **Tốt:** Phân biệt hai nguồn dễ nhầm. **Cần sửa:** Không tắt StrictMode hoặc bỏ cleanup để che triệu chứng. **Bài học:** Đo request, làm effect idempotent/có cleanup và dùng cache nếu cần.

### Log 3 — Refactor dữ liệu khóa học

- **Ngày:** 16/10/2026
- **Task:** Tách kiểu dữ liệu, truy cập Supabase và UI khỏi component trang.
- **Prompt:** “Đề xuất refactor theo feature, giữ luồng UI hiện hữu và thêm trạng thái loading/error/empty.”
- **Kết quả AI:** Gợi ý `features/courses` chứa hook/API/card, `lib` chứa client dùng chung, page lắp ráp component.
- **Đánh giá & chỉnh sửa:** **Tốt:** Ranh giới feature dễ bảo trì. **Cần sửa:** Tránh abstraction tổng quát cho một truy vấn nhỏ. **Bài học:** Tách theo nhu cầu hiện tại và kiểm tra build sau mỗi phần.

### Log 4 — Từ chối Redux

- **Ngày:** 16/10/2026
- **Task:** Chọn state manager cho ứng dụng demo/quy mô nhỏ.
- **Prompt:** “So sánh Redux Toolkit, Zustand và state cục bộ cho EduAI; không tạo boilerplate vượt nhu cầu.”
- **Kết quả AI:** So sánh mức độ chuẩn hóa, devtools và lượng code; đề xuất Zustand cho state xác thực nhỏ, local state cho form/UI.
- **Đánh giá & chỉnh sửa:** **Tốt:** Đưa ra trade-off theo bối cảnh. **Cần sửa:** Nếu app/team tăng, có thể chọn RTK Query hoặc query cache riêng. **Bài học:** Quyết định dựa trên độ phức tạp thực, không theo trào lưu.

### Log 5 — Timer trong QuizPlayer

- **Ngày:** 16/10/2026
- **Task:** Thiết kế timer quiz tránh drift và gửi bài trùng.
- **Prompt:** “Rà soát timer React: không giảm số giây dựa trên interval tích lũy, cleanup, xử lý hết giờ đúng một lần và tránh stale state.”
- **Kết quả AI:** Gợi ý lưu deadline tuyệt đối, tính thời gian còn lại từ `Date.now()`, ref chống submit lặp và cleanup interval.
- **Đánh giá & chỉnh sửa:** **Tốt:** Deadline tránh sai lệch khi tab nền. **Cần sửa:** Máy khách không phải nguồn thời gian/chấm điểm đáng tin cậy; server cần xác nhận hạn. **Bài học:** Timer là hỗ trợ UX, không phải biện pháp bảo mật.

### Log 6 — Kết hợp nhiều prompt

- **Ngày:** 16/10/2026
- **Task:** Dùng nhiều bước prompt để xây luồng AI quiz.
- **Prompt:** “(1) Xác định schema câu hỏi; (2) tạo wireframe form/preview; (3) kiểm tra type/validation/error; (4) rà soát rủi ro quyền và dữ liệu.”
- **Kết quả AI:** Phân chia nhiệm vụ thành schema, UI, xác thực đầu vào và kiểm tra bảo mật, giúp review từng phần.
- **Đánh giá & chỉnh sửa:** **Tốt:** Đầu ra theo từng bước dễ kiểm chứng. **Cần sửa:** Hợp nhất kết quả, kiểm tra schema thực và không gửi secret. **Bài học:** Prompt nối tiếp cần có tiêu chí đầu ra và người phát triển phải tự xác minh.

## 4. Deployment

### 4.1. Biến môi trường

`.env.example` chỉ chứa tên biến và placeholder không bí mật; `.env.local` giữ ở máy cá nhân và không commit.

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_API_BASE_URL=/api
```

AI provider key và Supabase `service_role` chỉ được đặt trong Edge Function secrets, không có tiền tố `VITE_`.

### 4.2. GitHub Actions — kiểm tra build

Ví dụ `.github/workflows/ci.yml`; workflow kiểm tra cài dependencies, lint và build. Cần cấu hình environment variables hợp lệ trong GitHub Actions nếu module khởi tạo Supabase yêu cầu biến ngay trong build.

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

### 4.3. Deploy Vercel

1. Đẩy nhánh `main` lên GitHub, import repository vào Vercel.
2. Framework preset chọn Vite; build command `npm run build`, output `dist`.
3. Thêm `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` và API URL trong Vercel Project Settings cho từng environment.
4. Đặt OpenAI key và `service_role` trong Supabase Edge Function secrets, không đặt ở Vercel frontend environment.
5. Deploy preview, chạy smoke test Auth/RLS/AI function; sau khi đạt yêu cầu mới promote production.
6. Cấu hình domain, callback URL Auth, CORS và redirect URL chính xác cho production.

## 5. Kết luận

Frontend được chia theo feature, dùng validation và trạng thái UI rõ ràng. Tích hợp AI cần server-side boundary: client chỉ gửi request đã xác thực và nhận bản nháp; mọi secret, authorization và kiểm tra dữ liệu quan trọng nằm ở server/database.
