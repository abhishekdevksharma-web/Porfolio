import type { Project } from '../../data/projects'

export function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return <img className="project-image-preview" src={project.image} alt={`${project.title} preview`} loading="lazy" />
  }

  if (project.preview === 'movie') return <MovieMockup />
  if (project.preview === 'quiz') return <QuizMockup />

  return (
    <div className="generic-project-preview">
      <span>{project.type}</span>
      <strong>{project.title}</strong>
      <span>Project preview</span>
    </div>
  )
}

function QuizMockup() {
  return (
    <div className="mockup quiz-mockup" aria-label="Illustration of the Quiz System admin dashboard">
      <div className="mockup-top"><span className="mini-brand"><span>Q</span> Quiz System</span><span className="mockup-avatar">AS</span></div>
      <div className="quiz-app">
        <aside className="quiz-sidebar"><span className="sidebar-logo">Q</span><i className="selected" /><i /><i /><i /><span className="sidebar-bottom" /></aside>
        <div className="quiz-main">
          <div className="mockup-greeting"><div><span>QUIZ WORKSPACE</span><strong>Good morning, Admin <b>✦</b></strong></div><span className="quiz-create">＋ New quiz</span></div>
          <div className="quiz-stats"><div><small>Quiz library</small><strong>Manage</strong></div><div><small>Question bank</small><strong>Organize</strong></div><div><small>Student results</small><strong>Review</strong></div></div>
          <div className="chart-panel"><div className="chart-title">Student activity <span>Last 7 days⌄</span></div><div className="chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="chart-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div>
        </div>
      </div>
      <div className="mockup-float"><span className="float-check">✓</span><span>Quiz submitted<strong>Response recorded</strong></span></div>
    </div>
  )
}

function MovieMockup() {
  return (
    <div className="mockup movie-mockup" aria-label="Illustration of MovieHUB running in a mobile phone">
      <div className="phone-device">
        <div className="phone-speaker" />
        <div className="phone-screen">
          <div className="phone-status"><span>9:41</span><span>●●● ▰</span></div>
          <div className="movie-topbar"><b><span>Movie</span>HUB<span className="movie-spark">✦</span></b><span className="movie-avatar">A</span></div>
          <div className="movie-feature"><div className="movie-poster-art"><span className="poster-glow" /><span className="poster-shape" /><span className="poster-title">BEYOND<br /><b>THE EDGE</b></span><span className="poster-tag">FEATURED</span></div><div className="movie-feature-info"><span>SCI-FI&nbsp; · &nbsp;FEATURED</span><b>Discover your<br />next favorite.</b><small>▶ &nbsp; Explore now</small></div></div>
          <div className="phone-section-title">Continue exploring <span>See all →</span></div>
          <div className="movie-row"><span className="thumb thumb-one">NIGHT<br />SHIFT</span><span className="thumb thumb-two">THE<br />ORBIT</span><span className="thumb thumb-three">WILD<br />HORIZON</span></div>
          <div className="download-progress"><span className="download-icon">↓</span><span>Episode download<strong>Download controls</strong></span><span className="progress-ring" aria-label="Download progress indicator" /></div>
          <div className="phone-nav"><span className="active">⌂<small>Home</small></span><span>↓<small>Downloads</small></span><span>⚙<small>Settings</small></span></div>
        </div>
      </div>
      <div className="movie-float"><span className="speed-icon">↯</span><span>Download manager<strong>Pause · Resume · Remove</strong></span></div>
    </div>
  )
}
