import { useMemo, useState, type ReactNode } from 'react'
import './App.css'

type IconName =
  | 'grid'
  | 'book'
  | 'calendar'
  | 'trophy'
  | 'settings'
  | 'search'
  | 'bell'
  | 'chevron'
  | 'clock'
  | 'play'
  | 'sparkles'
  | 'arrow'
  | 'check'
  | 'target'
  | 'menu'
  | 'close'

const iconContent: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 5.5v16M8 7h8M8 11h7" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></>,
  trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4M17 7h3v2a4 4 0 0 1-4 4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1L11 7.3h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2z" transform="translate(-1 -1)" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  play: <><path d="m9 6 10 6-10 6z" fill="currentColor" stroke="none" /></>,
  sparkles: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9zM5 3l.7 1.3L7 5l-1.3.7L5 7l-.7-1.3L3 5l1.3-.7z" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconContent[name]}
    </svg>
  )
}

type Course = {
  id: number
  title: string
  category: string
  instructor: string
  progress: number
  lessons: string
  accent: string
  illustration: string
  status: 'Đang học' | 'Hoàn thành'
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Toán học tư duy',
    category: 'Toán học',
    instructor: 'Cô Nguyễn Minh Anh',
    progress: 68,
    lessons: '12 / 18 bài học',
    accent: 'lavender',
    illustration: '∑',
    status: 'Đang học',
  },
  {
    id: 2,
    title: 'Khám phá thế giới khoa học',
    category: 'Khoa học',
    instructor: 'Thầy Trần Hoàng Nam',
    progress: 42,
    lessons: '8 / 20 bài học',
    accent: 'mint',
    illustration: '✳',
    status: 'Đang học',
  },
  {
    id: 3,
    title: 'Tiếng Anh giao tiếp',
    category: 'Ngoại ngữ',
    instructor: 'Cô Lê Thu Hà',
    progress: 100,
    lessons: '16 / 16 bài học',
    accent: 'peach',
    illustration: 'A',
    status: 'Hoàn thành',
  },
]

const navigation: { label: string; icon: IconName }[] = [
  { label: 'Tổng quan', icon: 'grid' },
  { label: 'Khóa học của tôi', icon: 'book' },
  { label: 'Lịch học', icon: 'calendar' },
  { label: 'Thành tích', icon: 'trophy' },
]

const todayLabel = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date()).toLocaleUpperCase('vi')

function App() {
  const [activeNav, setActiveNav] = useState('Tổng quan')
  const [filter, setFilter] = useState('Tất cả')
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const visibleCourses = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('vi')
    return courses.filter((course) => {
      const matchesFilter =
        filter === 'Tất cả' ||
        (filter === 'Đang học' && course.status === 'Đang học') ||
        (filter === 'Hoàn thành' && course.status === 'Hoàn thành')
      const matchesSearch =
        !query ||
        `${course.title} ${course.category} ${course.instructor}`
          .toLocaleLowerCase('vi')
          .includes(query)
      return matchesFilter && matchesSearch
    })
  }, [filter, search])

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2800)
  }

  const selectNavigation = (label: string) => {
    setActiveNav(label)
    setMenuOpen(false)
    if (label !== 'Tổng quan') showNotice(`Bạn đang xem mục ${label.toLocaleLowerCase('vi')}.`)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark"><Icon name="sparkles" size={22} /></span>
          <span>Edu<span className="brand-ai">AI</span><small>HỌC THÔNG MINH</small></span>
        </a>

        <div className="sidebar-label">MENU CHÍNH</div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <button
              className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
              key={item.label}
              onClick={() => selectNavigation(item.label)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.label === 'Lịch học' && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-label sidebar-label-bottom">CÁ NHÂN</div>
        <button className="nav-item" onClick={() => selectNavigation('Cài đặt')}>
          <Icon name="settings" size={19} />
          <span>Cài đặt</span>
        </button>

        <div className="sidebar-spacer" />
        <div className="sidebar-help">
          <div className="help-spark"><Icon name="sparkles" size={19} /></div>
          <strong>Học cùng AI</strong>
          <p>Khám phá cách học phù hợp nhất với bạn.</p>
          <button onClick={() => showNotice('Trợ lý EduAI sẵn sàng giúp bạn học tập!')}>
            Khám phá ngay <Icon name="arrow" size={15} />
          </button>
          <span className="help-orbit orbit-one" />
          <span className="help-orbit orbit-two" />
        </div>
        <button className="profile-card" onClick={() => showNotice('Xin chào, Minh Anh! Chúc bạn học tập vui vẻ.')}>
          <span className="avatar">MA</span>
          <span className="profile-copy"><strong>Minh Anh</strong><small>Học sinh lớp 10</small></span>
          <Icon name="chevron" size={17} />
        </button>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu icon-button"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
          <div className="breadcrumb"><span>Không gian học tập</span><Icon name="chevron" size={15} /><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Icon name="search" size={18} />
              <input
                aria-label="Tìm kiếm khóa học"
                placeholder="Tìm khóa học..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <kbd>⌘ K</kbd>
            </label>
            <div className="notification-wrap">
              <button
                className={`icon-button notification-button ${notificationsOpen ? 'is-open' : ''}`}
                aria-label="Thông báo"
                aria-expanded={notificationsOpen}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Icon name="bell" size={19} /><span className="notification-dot" />
              </button>
              {notificationsOpen && (
                <div className="notification-popover">
                  <strong>Thông báo mới</strong>
                  <p><span className="notice-icon"><Icon name="calendar" size={15} /></span> Bạn có lịch học Toán lúc 15:30 hôm nay.</p>
                  <p><span className="notice-icon notice-green"><Icon name="trophy" size={15} /></span> Bạn sắp đạt mốc 7 ngày học liên tục!</p>
                </div>
              )}
            </div>
            <button className="top-avatar" aria-label="Hồ sơ Minh Anh" onClick={() => showNotice('Hồ sơ học tập của Minh Anh')}>MA</button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="date-label"><span className="date-dot" /> {todayLabel}</div>
              <h1>Chào buổi sáng, Minh Anh <span className="wave">✦</span></h1>
              <p className="welcome-subtitle">Mỗi ngày một chút, bạn đang tiến gần hơn tới mục tiêu của mình.</p>
            </div>
            <button className="primary-button" onClick={() => showNotice('Tiếp tục bài học: Hàm số bậc hai')}>
              <Icon name="play" size={16} /> Tiếp tục học <Icon name="arrow" size={16} />
            </button>
          </section>

          <section className="stats-grid" aria-label="Tổng quan tiến độ">
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon icon-violet"><Icon name="book" size={18} /></span><span className="stat-trend">+2 tuần này</span></div>
              <div className="stat-value">04 <span>khóa học</span></div>
              <div className="stat-caption">Khóa học đang tham gia</div>
              <div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon icon-green"><Icon name="clock" size={18} /></span><span className="stat-trend">+18% tuần trước</span></div>
              <div className="stat-value">12.5 <span>giờ</span></div>
              <div className="stat-caption">Thời gian học tập</div>
              <div className="mini-bars bars-green"><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon icon-orange"><Icon name="trophy" size={18} /></span><span className="stat-trend">Top 15%</span></div>
              <div className="stat-value">860 <span>điểm</span></div>
              <div className="stat-caption">Điểm tích lũy của bạn</div>
              <div className="mini-bars bars-orange"><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon icon-pink"><Icon name="target" size={18} /></span><span className="stat-trend">Mục tiêu 80%</span></div>
              <div className="stat-value">72<span className="percent">%</span></div>
              <div className="stat-caption">Tiến độ mục tiêu tuần</div>
              <div className="stat-progress"><span /></div>
            </article>
          </section>

          <div className="dashboard-grid">
            <section className="courses-section">
              <div className="section-heading">
                <div><h2>Tiếp tục hành trình</h2><p>Các khóa học của bạn đang học dở</p></div>
                <button className="text-link" onClick={() => { setFilter('Tất cả'); showNotice('Đang hiển thị tất cả khóa học.') }}>Tất cả khóa học <Icon name="arrow" size={16} /></button>
              </div>
              <div className="filter-tabs" role="tablist" aria-label="Lọc khóa học">
                {['Tất cả', 'Đang học', 'Hoàn thành'].map((tab) => (
                  <button
                    className={filter === tab ? 'selected' : ''}
                    key={tab}
                    onClick={() => setFilter(tab)}
                    role="tab"
                    aria-selected={filter === tab}
                  >
                    {tab}{tab === 'Tất cả' && <span className="tab-count">3</span>}
                  </button>
                ))}
              </div>
              <div className="course-list">
                {visibleCourses.length ? visibleCourses.map((course) => (
                  <article className="course-card" key={course.id}>
                    <div className={`course-art ${course.accent}`}><span>{course.illustration}</span><i /><b /></div>
                    <div className="course-details">
                      <div className="course-meta"><span>{course.category}</span>{course.status === 'Hoàn thành' && <span className="completed-label"><Icon name="check" size={12} /> Hoàn thành</span>}</div>
                      <h3>{course.title}</h3>
                      <div className="instructor"><span className="instructor-avatar">{course.instructor.charAt(0)}</span>{course.instructor}</div>
                      <div className="course-progress-row"><span>{course.lessons}</span><strong>{course.progress}%</strong></div>
                      <div className="progress-track"><span style={{ width: `${course.progress}%` }} className={course.status === 'Hoàn thành' ? 'progress-complete' : ''} /></div>
                    </div>
                    <button className="course-action" aria-label={`Mở khóa học ${course.title}`} onClick={() => showNotice(`${course.status === 'Hoàn thành' ? 'Xem lại' : 'Tiếp tục'} khóa học: ${course.title}`)}>
                      {course.status === 'Hoàn thành' ? <Icon name="check" size={18} /> : <Icon name="play" size={16} />}
                    </button>
                  </article>
                )) : <div className="empty-state">Không tìm thấy khóa học phù hợp. Hãy thử từ khóa khác nhé.</div>}
              </div>
            </section>

            <aside className="right-column">
              <section className="weekly-card">
                <div className="section-heading compact"><div><h2>Tiến độ tuần này</h2><p>Bạn đang làm rất tốt!</p></div><button className="more-button" aria-label="Xem thêm tiến độ" onClick={() => showNotice('Báo cáo học tập tuần này')}>···</button></div>
                <div className="weekly-total"><strong>12.5</strong><span>giờ học</span><span className="weekly-change">↗ 18%</span></div>
                <div className="chart" aria-label="Biểu đồ giờ học trong tuần">
                  {[{ d: 'T2', h: 42 }, { d: 'T3', h: 69 }, { d: 'T4', h: 52 }, { d: 'T5', h: 87 }, { d: 'T6', h: 58 }, { d: 'T7', h: 100 }, { d: 'CN', h: 36 }].map((day, index) => (
                    <div className="chart-column" key={day.d}><div className="chart-bar-bg"><span style={{ height: `${day.h}%` }} className={index === 5 ? 'today-bar' : ''} /></div><small>{day.d}</small></div>
                  ))}
                </div>
                <div className="weekly-foot"><span><i /> Mục tiêu tuần</span><strong>12.5 / 15 giờ</strong></div>
              </section>

              <section className="next-lesson">
                <div className="lesson-topline"><span className="lesson-tag">BUỔI HỌC TIẾP THEO</span><span className="lesson-live"><i /> HÔM NAY</span></div>
                <h3>Hàm số bậc hai</h3>
                <p>Toán học tư duy <span>·</span> Bài 13</p>
                <div className="lesson-info"><span><Icon name="clock" size={15} /> 15:30 – 16:15</span><span className="lesson-teacher"><span className="teacher-avatar">N</span> Cô Minh Anh</span></div>
                <button onClick={() => showNotice('Đã mở phòng học: Hàm số bậc hai')}>Vào lớp học <Icon name="arrow" size={15} /></button>
                <span className="lesson-decoration">f(x)</span>
              </section>

              <section className="ai-card">
                <div className="ai-icon"><Icon name="sparkles" size={20} /></div>
                <div><strong>Trợ lý học tập AI</strong><p>Sẵn sàng giải đáp mọi thắc mắc của bạn.</p></div>
                <button aria-label="Mở trợ lý AI" onClick={() => showNotice('Trợ lý AI: Bạn muốn ôn tập chủ đề nào hôm nay?')}><Icon name="arrow" size={17} /></button>
              </section>
            </aside>
          </div>
          <footer className="page-footer">© 2026 EduAI <span>•</span> Học thông minh, tiến bộ mỗi ngày</footer>
        </div>
      </main>
      {notice && <div className="toast" role="status"><span><Icon name="check" size={16} /></span>{notice}</div>}
      {menuOpen && <button className="sidebar-backdrop" aria-label="Đóng menu" onClick={() => setMenuOpen(false)} />}
    </div>
  )
}

export default App
