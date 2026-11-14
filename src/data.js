export const profile = {
  name: 'Kumar Anshu',
  title: 'Python Backend Developer',
  photo: '/profile-kumar-anshu.jpeg',
  email: 'srifanshu.78@gmail.com',
  github: 'https://github.com/anshu6202',
  linkedin: 'https://www.linkedin.com/in/kumar-anshu2106',
}

export const projects = [
  { id: 1, title: 'Cafe Management System', category: 'Backend', eyebrow: '01 / WEB APPLICATION', description: 'A Django and PostgreSQL project for cafe menus and table bookings, with user authentication and a responsive customer experience.', details: 'Designed around common cafe workflows: guests can explore the menu and request a table, while authenticated staff can keep menu information organized. Django handles application logic and PostgreSQL stores the project data.', stack: ['Django', 'PostgreSQL', 'Python'], art: 'cafe', icon: '☕', repo: 'https://github.com/anshu6202', demo: '' },
  { id: 2, title: 'AI Code Review Platform', category: 'Backend', eyebrow: '02 / DEVELOPER TOOL', description: 'A Python and Django web app concept that presents code analysis and actionable review feedback in a focused, modern interface.', details: 'The project explores a developer workflow for submitting code and presenting analysis in a readable review view. The interface prioritizes clear feedback and a compact workspace for iterating on code.', stack: ['Python', 'Django', 'JavaScript'], art: 'code', icon: '⌘', repo: 'https://github.com/anshu6202', demo: '' },
  { id: 3, title: 'Trading Website', category: 'Frontend', eyebrow: '03 / FINTECH INTERFACE', description: 'A responsive trading dashboard concept using Django and PostgreSQL, with a data-focused market layout.', details: 'A responsive interface concept for browsing a trading dashboard, pairing a data-focused frontend with a Django backend and PostgreSQL persistence. The layout emphasizes readable market summaries and chart presentation.', stack: ['Django', 'JavaScript', 'PostgreSQL'], art: 'trade', icon: '↗', repo: 'https://github.com/anshu6202', demo: '' },
]

projects.push({ id: 4, title: 'Local Courier Problem Resolution System', category: 'Backend', eyebrow: '04 / COURIER OPERATIONS', description: 'A Django system for managing courier complaints, tracking SLA deadlines, notifying admins about approaching breaches, and escalating overdue cases.', details: 'The repository includes an idempotent Django management command that checks active complaints, creates admin notifications as deadlines approach, and records escalations for breached complaints. The README documents scheduling the command every five minutes. GitHub reports Python, CSS, JavaScript, and HTML in the repository.', stack: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS'], art: 'code', icon: 'LC', repo: 'https://github.com/anshu6202/local-courier-problem-resolution-system', demo: '' })

export const skillGroups = [
  { title: 'Programming languages', icon: 'code', skills: ['Python', 'C', 'SQL'] },
  { title: 'Frontend development', icon: 'layout', skills: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Backend development', icon: 'server', skills: ['Django', 'Django REST Framework', 'REST APIs'] },
  { title: 'Database management', icon: 'database', skills: ['PostgreSQL', 'Database Management Systems'] },
  { title: 'Data analytics', icon: 'chart', skills: ['NumPy', 'Pandas', 'Data Analysis'] },
  { title: 'Developer tools', icon: 'terminal', skills: ['Git', 'GitHub', 'VS Code'] },
]

export const education = { degree: 'B.Tech in Computer Science and Engineering', school: 'Bengal College of Engineering and Technology', short: 'BCET', graduationYear: '2027', cgpa: '7.7 / 10.0', coursework: [] }
export const certifications = [
  { name: 'Python Full Stack Developer Virtual Internship', issuer: 'EduSkills Academy', date: 'June – August 2026', label: 'VIRTUAL INTERNSHIP', image: '/python-fullstack-certificate.png' },
  { name: 'AI: Transformative Learning with TechSaksham', issuer: 'Microsoft & SAP · Implemented by Edunet Foundation', date: '', label: 'TECHSAKSHAM INTERNSHIP', image: '/techsaksham-certificate.jpeg' },
  { name: 'DecodeLabs Virtual Internship Program in Data Analytics', issuer: 'DecodeLabs', date: 'July 15 – August 15, 2026', label: 'DATA ANALYTICS · VIRTUAL INTERNSHIP', image: '/decodelabs-data-analytics-certificate.png' },
]
export const achievements = []
