import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import heroPhoto from './assets/images/profile/developer-hero.png'
import { Icon } from './components/ui/Icon'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { ProjectDetails } from './pages/ProjectDetails'
import { getProjectById } from './data/projects'
import { skillGroups, type SkillGroup } from './data/skills'
import { contactEmail, githubProfileUrl, resumeUrl, socialLinks } from './data/socialLinks'
import './App.css'

const currentYear = new Date().getFullYear()

const heroHighlights = [
  {
    icon: 'layers',
    value: '2+',
    label: 'Major projects',
    glow: 'bg-rose-500/20',
    iconStyle: 'border-rose-400/20 bg-rose-500/10 text-rose-300',
    labelStyle: 'text-rose-200/80',
  },
  {
    icon: 'code',
    value: 'Full-stack',
    label: 'Development',
    glow: 'bg-violet-500/20',
    iconStyle: 'border-violet-400/20 bg-violet-500/10 text-violet-300',
    labelStyle: 'text-violet-200/80',
  },
  {
    icon: 'mobile',
    value: 'Mobile app',
    label: 'Development',
    glow: 'bg-amber-400/15',
    iconStyle: 'border-amber-300/20 bg-amber-400/10 text-amber-200',
    labelStyle: 'text-amber-100/80',
  },
  {
    icon: 'spark',
    value: 'Modern UI',
    label: 'Development',
    glow: 'bg-teal-400/15',
    iconStyle: 'border-teal-300/20 bg-teal-400/10 text-teal-200',
    labelStyle: 'text-teal-100/80',
  },
] as const

const navItems = [
  ['Skills', '/#skills'],
  ['Projects', '/#projects'],
  ['Education', '/#education'],
  ['Contact', '/#contact'],
  ['About', '/#about'],
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sectionIds = navItems.map(([, href]) => href.slice(2))
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const active = sectionIds
        .filter((id) => {
          const section = document.getElementById(id)
          return section && section.getBoundingClientRect().top <= 220
        })
        .at(-1)
      setActiveSection(active ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="nav-shell container" aria-label="Main navigation">
        <a className="brand" href="/#home" aria-label="Abhishek Sharma, home">
          <span className="brand-mark">A<span>S</span></span>
          <span>Abhishek Sharma</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'x' : 'menu'} />
        </button>
        <div className={`nav-links${menuOpen ? ' nav-links-open' : ''}`}>
          {navItems.map(([label, href]) => {
            const sectionId = href.slice(2)
            return (
              <a
                aria-current={activeSection === sectionId ? 'location' : undefined}
                className={activeSection === sectionId ? 'is-active' : undefined}
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            )
          })}
          {resumeUrl
            ? <a className="nav-resume" href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Resume <Icon name="download" size={15} /></a>
            : <span aria-disabled="true" className="nav-resume resume-placeholder" title="Add the supplied resume PDF to public/resume/Abhishek-Sharma-Resume.pdf">Resume <Icon name="download" size={15} /></span>}
        </div>
      </nav>
    </header>
  )
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]['icon'] }) {
  if (icon === 'linkedin') {
    return <span aria-hidden="true" className="linkedin-mark">in</span>
  }

  return <Icon name={icon} />
}

function Hero() {
  return (
    <section className="hero section-wrap flex min-h-[clamp(650px,100svh,820px)] items-center pt-[clamp(100px,12vh,132px)] pb-[clamp(38px,6vh,58px)] max-[760px]:min-h-0 max-[760px]:pt-[112px] max-[760px]:pb-[60px]" id="home">
      <div className="hero-grid container grid min-h-[clamp(470px,calc(100svh-220px),570px)] grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] grid-rows-[1fr_auto] items-center max-[1050px]:min-h-[470px] max-[1050px]:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] max-[760px]:flex max-[760px]:min-h-0 max-[760px]:flex-col max-[760px]:gap-2">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            <span>B.Tech Student</span><i /><span>Full-Stack Developer</span><i /><span>Mobile App Developer</span>
          </div>
          <p className="hero-greeting">Hi, I’m</p>
          <h1><span className="hero-first-name">Abhishek</span><span>Sharma</span></h1>
          <h2>Full-Stack &amp; Mobile App Developer</h2>
          <p className="hero-description">
            I’m a B.Tech student at Kanpur Institute of Technology, currently in my 5th semester, focused on building modern web applications, full-stack systems, and mobile experiences.
          </p>
          <div className="hero-actions">
            <a className="button button-primary min-h-11 rounded-xl px-5 shadow-[0_8px_24px_rgba(250,49,82,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(250,49,82,0.36)]" href="#projects"><Icon name="arrow" /> View Projects</a>
            <a className="button button-secondary min-h-11 rounded-xl px-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5" href="#contact"><Icon name="mail" /> Contact Me</a>
            <div className="social-links">
              {socialLinks.map((link) => link.href ? (
                <a
                  aria-label={link.icon === 'github' ? 'GitHub Profile' : 'Email Abhishek Sharma'}
                  className="social-icon h-10 w-10 border-white/10 bg-white/[0.035] shadow-[0_5px_16px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-400/40 hover:bg-rose-500/10 hover:shadow-[0_8px_22px_rgba(250,49,82,0.14)]"
                  href={link.href}
                  key={link.label}
                  {...(link.label === 'GitHub' ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ) : (
                <span
                  aria-label="LinkedIn profile not configured"
                  className="social-icon is-placeholder h-10 w-10 border-white/10 bg-white/[0.035] shadow-[0_5px_16px_rgba(0,0,0,0.25)] backdrop-blur-md"
                  key={link.label}
                  title={`Add your ${link.label} link in src/data/socialLinks.ts`}
                >
                  <SocialIcon icon={link.icon} />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-visual relative z-0 aspect-[3/2] w-full min-w-0 max-w-full self-center max-[760px]:mt-4 max-[760px]:self-auto" aria-label="Abhishek working at his laptop">
          <img
            alt="Abhishek Sharma working on a laptop"
            className="hero-image absolute max-w-none"
            height="1024"
            src={heroPhoto}
            width="1536"
            fetchPriority="high"
            loading="eager"
          />
        </div>
        <div className="highlight-grid relative z-[2] grid w-full max-w-[550px] grid-cols-4 gap-3 max-[1050px]:grid-cols-2 max-[760px]:grid-cols-2">
          {heroHighlights.map((highlight) => (
            <div
              className="highlight-card group relative isolate flex min-h-[108px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.065] via-white/[0.025] to-white/[0.01] px-2 py-3.5 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_16px_34px_rgba(0,0,0,0.32)]"
              key={highlight.value}
            >
              <span aria-hidden="true" className={`pointer-events-none absolute -right-5 -top-6 -z-10 h-20 w-20 rounded-full blur-2xl ${highlight.glow}`} />
              <span className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl border shadow-inner ${highlight.iconStyle}`}>
                <Icon name={highlight.icon} size={17} />
              </span>
              <strong className="text-[11px] font-bold tracking-[-0.02em] text-zinc-100 sm:text-xs">{highlight.value}</strong>
              <span className={`mt-1 text-[9px] font-medium tracking-wide sm:text-[10px] ${highlight.labelStyle}`}>{highlight.label}</span>
            </div>
          ))}
        </div>
      </div>
      <a className="scroll-cue" href="#skills"><span /> Scroll to explore</a>
    </section>
  )
}

function SectionHeading({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-heading reveal">
      <span className="section-number">{number}</span>
      <div className="section-heading-copy">
        <p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="section-intro">{children}</p>}
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="container">
        <SectionHeading number="06" eyebrow="A little about me" title={<>Curious by nature.<br /><span>Builder by choice.</span></>} />
        <div className="about-content reveal">
          <p className="about-lead">I’m a B.Tech student at Kanpur Institute of Technology, currently in my 5th semester, and I love turning ideas into software people can actually use.</p>
          <div className="about-details">
            <p>I work with JavaScript, React, React Native, Node.js, Express, NestJS, MongoDB, and REST APIs, and I’m especially interested in Android/mobile engineering and modern UI development.</p>
            <p>Real-world projects are where I learn best. I enjoy working through the details, solving unexpected problems, and refining each experience until the whole product feels considered.</p>
            <div className="about-note"><Icon name="spark" /><span>Currently exploring the space between thoughtful interfaces and dependable systems.</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const groups = Object.keys(skillGroups) as SkillGroup[]
  const [activeGroup, setActiveGroup] = useState<SkillGroup>('Frontend')

  return (
    <section className="skills section-pad" id="skills">
      <div className="container">
        <SectionHeading number="02" eyebrow="What I work with" title={<>A toolkit for <span>building things.</span></>} />
        <div className="skills-panel reveal">
          <div className="skill-tabs" role="tablist" aria-label="Skill categories">
            {groups.map((group) => (
              <button key={group} className={`skill-tab${activeGroup === group ? ' active' : ''}`} type="button" role="tab" aria-selected={activeGroup === group} onClick={() => setActiveGroup(group)}>
                {group}
              </button>
            ))}
          </div>
          <div className="skill-content" role="tabpanel">
            <div className="skill-content-heading"><span className="skill-category-icon"><Icon name={activeGroup === 'Frontend' || activeGroup === 'Programming' ? 'code' : activeGroup === 'Backend' ? 'server' : activeGroup === 'Mobile' ? 'mobile' : 'spark'} /></span><div><span className="eyebrow">SPECIALTY</span><h3>{activeGroup}</h3></div><span className="skill-count">{skillGroups[activeGroup].length.toString().padStart(2, '0')} technologies</span></div>
            <div className="skill-list">{skillGroups[activeGroup].map((skill, index) => <span className="skill-chip" key={`${activeGroup}-${skill}`} style={{ animationDelay: `${index * 35}ms` }}><span />{skill}</span>)}</div>
          </div>
        </div>
        <p className="skills-footnote reveal"><Icon name="spark" size={15} /> Always learning, always adding the right tool for the job.</p>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="education section-pad" id="education">
      <div className="container">
        <SectionHeading number="04" eyebrow="The learning journey" title={<>Learning the <span>foundations.</span></>} />
        <div className="education-card reveal">
          <div className="education-symbol">K<span>·</span></div>
          <div className="education-main"><p className="eyebrow">CURRENTLY PURSUING</p><h3>B.Tech</h3><p>Kanpur Institute of Technology</p></div>
          <div className="education-meta"><span className="education-status"><i /> IN PROGRESS</span><strong>5th Semester</strong><span>Computer Science / Engineering</span></div>
          <div className="education-decoration">K·I·T</div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [formMessage, setFormMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!contactEmail) {
      setFormMessage('Add your email address in src/data/socialLinks.ts to enable this form.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio message from ${formData.get('name') ?? ''}`)
    const message = [
      `Name: ${formData.get('name') ?? ''}`,
      `Email: ${formData.get('email') ?? ''}`,
      '',
      `${formData.get('message') ?? ''}`,
    ].join('\n')
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(message)}`
    setFormMessage('Your email app should open with your message.')
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="container">
        <SectionHeading number="05" eyebrow="Let’s connect" title={<>Have something in <span>mind?</span></>}><>Looking for an intern, a collaborator, or someone to build with? I’d love to hear what you’re working on.</></SectionHeading>
        <div className="contact-layout reveal">
          <div className="contact-copy">
            <span className="contact-icon"><Icon name="mail" size={23} /></span>
            <h3>Let’s make<br />something useful.</h3>
            <p>My inbox is open for opportunities, project ideas, and good conversations about software.</p>
            <a className="contact-email" href={`mailto:${contactEmail}`} aria-label="Email Abhishek Sharma">{contactEmail}</a>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${contactEmail}`} aria-label="Email Me">
                <Icon name="mail" /> Email Me
              </a>
              <a className="button button-secondary" href={githubProfileUrl} aria-label="GitHub Profile" rel="noopener noreferrer" target="_blank">
                <Icon name="github" /> GitHub Profile
              </a>
            </div>
            {resumeUrl
              ? <a className="contact-email" href={resumeUrl} rel="noopener noreferrer" target="_blank">Resume PDF <Icon name="download" size={15} /></a>
              : <span className="placeholder-note">Resume PDF not available in the project yet.</span>}
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" placeholder="How should I address you?" required /></div>
            <div className="form-row"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="you@example.com" required /></div>
            <div className="form-row"><label htmlFor="contact-message">A little about your idea</label><textarea id="contact-message" name="message" placeholder="Tell me what you have in mind..." rows={4} required /></div>
            <button className="button button-primary form-submit" type="submit">Send a message <Icon name="arrow" /></button>
            <p aria-live="polite" className="form-note">{formMessage || (contactEmail ? 'This form opens your email app to send the message.' : 'The form needs a contact email before it can send messages.')}</p>
          </form>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <ProjectsSection />
      <Education />
      <Contact />
      <About />
    </main>
  )
}

function NotFound() {
  return (
    <main className="project-not-found container">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>This page isn’t here.</h1>
      <a className="button button-primary" href="/">Back to home</a>
    </main>
  )
}

function Footer() {
  const linkedInProfileUrl = socialLinks.find((link) => link.label === 'LinkedIn')?.href

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-identity">
          <a className="brand footer-brand" href="/#home"><span className="brand-mark">A<span>S</span></span><span>Abhishek Sharma</span></a>
          <span>Full-Stack &amp; Mobile App Developer</span>
        </div>
        <div className="footer-links">
          <a aria-label="GitHub Profile" href={githubProfileUrl} rel="noopener noreferrer" target="_blank"><Icon name="github" /></a>
          <a aria-label="Email Abhishek Sharma" href={`mailto:${contactEmail}`}><Icon name="mail" /></a>
          {linkedInProfileUrl && (
            <a aria-label="LinkedIn Profile" href={linkedInProfileUrl} rel="noopener noreferrer" target="_blank">LinkedIn</a>
          )}
          {resumeUrl
            ? <a aria-label="Open resume PDF" href={resumeUrl} rel="noopener noreferrer" target="_blank"><Icon name="download" /></a>
            : <span aria-disabled="true" title="Resume PDF not available in the project yet">Resume unavailable</span>}
        </div>
        <span>Designed &amp; Built by Abhishek Sharma</span>
        <a className="back-top" href="/#home">Back to top <Icon name="arrow-up-right" size={15} /></a>
        <span className="footer-year">© {currentYear} Abhishek Sharma. All rights reserved.</span>
      </div>
    </footer>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') window.scrollTo(0, 0)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    const project = location.pathname.startsWith('/projects/')
      ? getProjectById(location.pathname.split('/').at(-1))
      : null
    document.title = project
      ? `${project.title} | Abhishek Sharma`
      : 'Abhishek Sharma | Full-Stack & Mobile App Developer'
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<ProjectDetails />} path="/projects/:projectId" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Footer />
    </>
  )
}

export default App
