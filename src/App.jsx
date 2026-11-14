import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Award, BriefcaseBusiness, Check, Code2, Database, Download, ExternalLink, Github, GraduationCap, LayoutPanelTop, Linkedin, Menu, Moon, Send, Server, Sun, Terminal, X, ChartNoAxesColumnIncreasing, Sparkles, Mail, MapPin, Phone } from 'lucide-react'
import { achievements, certifications, education, profile, projects, skillGroups } from './data'

const nav = [['Home', 'home'], ['About', 'about'], ['Skills', 'skills'], ['Projects', 'projects'], ['Education', 'education'], ['Contact', 'contact']]
const iconMap = { code: Code2, layout: LayoutPanelTop, server: Server, database: Database, chart: ChartNoAxesColumnIncreasing, terminal: Terminal }

function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function SectionHeading({ eyebrow, title, detail }) {
  return <Reveal className="section-heading"><span className="eyebrow"><i />{eyebrow}</span><h2>{title}</h2>{detail && <p>{detail}</p>}</Reveal>
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [role, setRole] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const visibleProjects = useMemo(() => filter === 'All' ? projects : projects.filter(project => project.category === filter || project.stack.includes(filter)), [filter])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])
  useEffect(() => { const id = window.setTimeout(() => setLoaded(true), 700); return () => clearTimeout(id) }, [])
  useEffect(() => { const id = window.setInterval(() => setRole(value => (value + 1) % 2), 2600); return () => clearInterval(id) }, [])
  useEffect(() => {
    if (!selectedProject) return
    const closeOnEscape = event => { if (event.key === 'Escape') setSelectedProject(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedProject])
  useEffect(() => {
    const openCard = event => {
      if (event.target.closest('a, button')) return
      const card = event.target.closest('.project-card')
      if (!card) return
      const title = card.querySelector('h3')?.textContent
      setSelectedProject(projects.find(project => project.title === title) || null)
    }
    document.addEventListener('click', openCard)
    return () => document.removeEventListener('click', openCard)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }), { rootMargin: '-35% 0px -55% 0px' })
    nav.forEach(([, id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  const go = id => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const submit = event => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    const subject = encodeURIComponent(form.subject)
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setFormStatus('Your email app should open with the message ready to send.')
  }

  return <>
    <AnimatePresence>{!loaded && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}><span className="loader-mark">ka<span>.</span></span><div className="loader-line"><i /></div></motion.div>}</AnimatePresence>
    <div className="site-shell">
      <header className="topbar"><a className="brand" href="#home" onClick={e => { e.preventDefault(); go('home') }} aria-label="Kumar Anshu home">ka<span>.</span></a>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{nav.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}>{label}</a>)}</nav>
        <div className="nav-actions"><button className="icon-button theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><a className="nav-resume" href="/resume.pdf" download>Resume <Download size={14} /></a><button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-grid" />
          <div className="hero-copy"><span className="availability"><i /> OPEN TO OPPORTUNITIES</span><p className="hero-kicker">Hi, I'm</p><h1>Kumar<br /><span>Anshu.</span></h1><div className="role-line"><span className="role-prefix">I’m a</span><AnimatePresence mode="wait"><motion.span key={role} className="role-text" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: .25 }}>{['Python Backend Developer', 'Data Analyst'][role]}</motion.span></AnimatePresence><b className="typing-caret" /></div><p className="hero-description">I build practical digital solutions with <strong>Python, Django, REST APIs,</strong> and data analytics.</p>
            <div className="hero-actions"><button className="button button-primary" onClick={() => go('projects')}>Explore my work <ArrowDownRight size={17} /></button><button className="button button-quiet" onClick={() => go('contact')}>Let’s connect <ArrowUpRight size={16} /></button></div>
            <div className="hero-social"><span>FIND ME ON</span><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a><span className="social-rule" /></div>
          </div>
          <div className="hero-visual"><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="visual-glow"/><div className="profile-frame"><div className="frame-top"><span>PROFILE / 001</span><span className="live-dot" /></div><div className="portrait"><img className="portrait-photo" src={profile.photo} alt="Kumar Anshu"/><div className="portrait-caption">BUILDING WITH PURPOSE</div><div className="portrait-index">IN<br/>01</div></div><div className="frame-bottom"><span>COMPUTER SCIENCE</span><span>INDIA · IST</span></div></div><div className="float-chip chip-python"><span className="chip-symbol">Py</span><span><b>Python</b><small>Daily driver</small></span></div><div className="float-chip chip-django"><span className="chip-django-mark">d</span><span><b>Django</b><small>Backend stack</small></span></div><div className="float-note"><Sparkles size={14}/><span>Curious by nature<br/><b>Consistent by choice.</b></span></div></div>
          <div className="hero-bottom"><span>01 — INTRODUCTION</span><button onClick={() => go('about')}>SCROLL TO EXPLORE <ArrowDown size={14}/></button><span>SCROLL / 06</span></div>
        </section>

        <section className="section-wrap about-section" id="about"><SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Good work starts<br/>with <em>curiosity.</em></>} detail="The person behind the projects."/><div className="about-content"><Reveal className="about-lead"><p className="large-copy">I’m a computer science student who enjoys turning ideas into useful, well-built software.</p><p>Currently pursuing a B.Tech in Computer Science and Engineering at Bengal College of Engineering and Technology, I’m focused on Python development, backend systems, and data analytics.</p><p>I like understanding how things work end to end — from shaping a database and building an API to presenting information clearly. I’m always learning, building practical projects, and looking for opportunities to contribute to real-world work.</p><button className="text-link" onClick={() => go('contact')}>A little more about what I can do <ArrowRight size={16}/></button></Reveal><Reveal className="about-aside" delay={.1}><div className="about-stat"><span className="stat-number">01</span><span className="stat-label">FOCUS<br/><b>Backend &amp; Python</b></span></div><div className="about-stat"><span className="stat-number">02</span><span className="stat-label">ALSO EXPLORING<br/><b>Data &amp; analytics</b></span></div><div className="about-quote">“Stay curious.<br/><em>Build with intent.</em>”</div></Reveal></div></section>

        <section className="section-wrap skills-section" id="skills"><SectionHeading eyebrow="THE TOOLKIT" title={<>Skills I bring<br/><em>to the table.</em></>} detail="Tools and concepts I’m learning and using to build."/><div className="skills-grid">{skillGroups.map((group, index) => { const Icon = iconMap[group.icon]; return <Reveal key={group.title} delay={index * .055}><article className="skill-card"><div className="skill-card-head"><span className="skill-icon"><Icon size={18}/></span><span className="skill-index">0{index + 1}</span></div><h3>{group.title}</h3><div className="skill-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div><div className="card-accent"/></article></Reveal> })}</div><p className="skills-footnote"><span className="mini-dot"/> Always learning, always adding to the toolkit.</p></section>

        <section className="section-wrap projects-section" id="projects"><SectionHeading eyebrow="SELECTED WORK" title={<>Built to solve<br/><em>real problems.</em></>} detail="A few practical projects exploring full-stack development and thoughtful interfaces."/><div className="project-toolbar"><span className="project-count">{projects.length} PROJECTS <i /></span><div className="filter-tabs" role="group" aria-label="Filter projects">{['All', 'Backend', 'Frontend'].map(item => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="projects-grid">{visibleProjects.map((project, index) => <Reveal key={project.id} delay={index * .08}><article className="project-card"><div className={`project-art art-${project.art}`}><div className="art-window"><div className="window-bar"><span/><span/><span/><b>{project.eyebrow}</b></div>{project.art === 'cafe' ? <div className="cafe-ui"><div className="cafe-sidebar"><i/><i/><i/><i/></div><div className="cafe-content"><small>GOOD MORNING</small><strong>Find your<br/>next favorite.</strong><div className="coffee-cups"><span>☕</span><span>◒</span><span>✳</span></div></div></div> : project.art === 'code' ? <div className="code-ui"><div className="code-file">◈ &nbsp; review.py <small>×</small></div><div className="code-lines"><i/><i/><i/><i/><i/></div><div className="review-panel"><b>✦ REVIEW SUMMARY</b><span/><span/><span/></div></div> : <div className="trade-ui"><small>PORTFOLIO VALUE</small><strong>$24,680.50 <i>+8.24%</i></strong><div className="trade-chart"><svg viewBox="0 0 340 110" role="img" aria-label="Decorative rising market chart"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#63e8c5" stopOpacity=".28"/><stop offset="1" stopColor="#63e8c5" stopOpacity="0"/></linearGradient></defs><path d="M0 84 C24 78 26 54 48 64 S78 87 102 57 S143 70 165 45 S199 62 222 38 S252 45 272 28 S308 45 340 8 V110 H0Z" fill="url(#chartFill)"/><path d="M0 84 C24 78 26 54 48 64 S78 87 102 57 S143 70 165 45 S199 62 222 38 S252 45 272 28 S308 45 340 8" fill="none" stroke="#63e8c5" strokeWidth="2.5"/></svg></div></div>}</div><div className="art-shine"/></div><div className="project-info"><div className="project-meta"><span>{project.eyebrow}</span><span className="project-mark">{project.icon}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.repo} target="_blank" rel="noreferrer"><Github size={15}/> {project.repo === profile.github ? 'GitHub profile' : 'Repository'} <ArrowUpRight size={13}/></a>{project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={13}/></a> : <span className="unavailable-link">No live demo</span>}</div></div></article></Reveal>)}</div></section>

        <section className="section-wrap journey-section" id="education"><SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>Learning with<br/><em>purpose.</em></>} detail="A foundation in computer science, with room to keep growing."/><div className="journey-grid"><Reveal className="education-panel"><div className="timeline-rail"><span/></div><div className="education-content"><span className="eyebrow"><i/> EDUCATION</span><div className="degree-icon"><GraduationCap size={22}/></div><span className="education-label">BACHELOR’S DEGREE</span><h3>{education.degree}</h3><p className="school-name">{education.school} <span>({education.short})</span></p><p className="education-note">Building a strong foundation in software development and computer science.</p><div className="education-details">{education.graduationYear && <span>Expected {education.graduationYear}</span>}{education.cgpa && <span>CGPA {education.cgpa}</span>}</div></div></Reveal><Reveal className="cert-panel" delay={.12}><div className="cert-panel-top"><span className="eyebrow"><i/> CERTIFICATIONS</span><Award size={19}/></div><div className="certification-list">{certifications.map(certification => <article className="certification-item" key={certification.name}><a className="certificate-preview" href={certification.image} target="_blank" rel="noreferrer" aria-label={`Open ${certification.name} certificate in a new tab`}><img src={certification.image} alt={`${certification.name} certificate awarded to Kumar Anshu`}/></a><div className="cert-copy"><span className="cert-label">{certification.label}</span><h3>{certification.name}</h3><p>{certification.issuer}{certification.date ? ` · ${certification.date}` : ''}</p></div></article>)}</div></Reveal></div>
          <Reveal className="learning-strip"><span className="learning-icon"><BriefcaseBusiness size={18}/></span><div><span className="eyebrow">ALWAYS IN PROGRESS</span><h3>Learning through building.</h3><p>{achievements.length ? achievements.join(' · ') : 'Personal projects, coding practice, and new technical concepts — growing one step at a time.'}</p></div><span className="learning-arrow">↗</span></Reveal></section>

        <section className="contact-section" id="contact"><div className="contact-glow"/><div className="section-wrap contact-inner"><SectionHeading eyebrow="GET IN TOUCH" title={<>Have a good one<br/><em>in mind?</em></>} detail="I’m open to opportunities, collaborations, and thoughtful conversations."/><div className="contact-grid"><Reveal className="contact-copy"><p className="contact-lead">Let’s make something<br/><em>useful together.</em></p><p className="contact-intro">Whether you’re hiring for a junior developer role or have a project idea, I’d be glad to hear from you.</p><a className="contact-email" href={`mailto:${profile.email}`}><span className="contact-icon"><Mail size={17}/></span><span><small>EMAIL ME AT</small><b>{profile.email}</b></span><ArrowUpRight size={17}/></a><div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={13}/></a></div><div className="location-note"><MapPin size={14}/> India · Open to remote opportunities</div></Reveal><Reveal className="contact-form-wrap" delay={.1}><form className="contact-form" onSubmit={submit}><div className="form-top"><span>START A CONVERSATION</span><Send size={16}/></div><label>Your name<input required minLength="2" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="How should I call you?" /></label><label>Email address<input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@company.com" /></label><label>Subject<input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="What's this about?" /></label><label>Your message<textarea required minLength="10" rows="3" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="A few details about your idea..." /></label><button className="button button-primary form-submit" type="submit">Send message <ArrowUpRight size={16}/></button>{formStatus && <p className="form-status" role="status"><Check size={15}/>{formStatus}</p>}<p className="form-disclaimer">Submitting opens your email app with this message addressed to me.</p></form></Reveal></div></div></section>
      </main>
      <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) setSelectedProject(null) }}><motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" initial={{ opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}><div className="modal-top"><span className="eyebrow"><i/>{selectedProject.eyebrow}</span><button className="icon-button" aria-label="Close project details" onClick={() => setSelectedProject(null)}><X size={17}/></button></div><h2 id="project-modal-title">{selectedProject.title}</h2><p>{selectedProject.details}</p><span className="modal-label">TECHNOLOGIES</span><div className="project-tags">{selectedProject.stack.map(tag => <span key={tag}>{tag}</span>)}</div><a className="button button-primary modal-repo" href={selectedProject.repo} target="_blank" rel="noreferrer"><Github size={15}/> View repository <ArrowUpRight size={14}/></a></motion.section></motion.div>}</AnimatePresence>

      <footer className="footer"><div className="footer-top"><a className="brand" href="#home" onClick={e => { e.preventDefault(); go('home') }}>ka<span>.</span></a><p>Building thoughtfully. Learning constantly.</p><div className="footer-social"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a><button onClick={() => go('home')} aria-label="Back to top"><ArrowDown size={16}/></button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kumar Anshu</span><span>DESIGNED &amp; BUILT WITH INTENTION <i/> INDIA</span><button onClick={() => go('home')}>BACK TO TOP ↑</button></div></footer>
    </div>
  </>
}

export default App
