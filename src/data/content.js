// ─────────────────────────────────────────────────────────────
//  Single source of truth — all résumé content lives here.
//  Extracted from Hari Prasath P's résumé.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Hari Prasath P',
  firstName: 'Hari',
  lastName: 'Prasath',
  role: 'Full Stack Developer',
  tagline: 'I build scalable, AI-powered web applications end-to-end.',
  location: 'Chennai, India',
  email: 'phariprasath11123@gmail.com',
  phone: '+91 73052 24995',
  linkedin: 'https://www.linkedin.com/in/hari-prasath-p-537303210/',
  linkedinHandle: 'in/hari-prasath-p',
  about:
    'Full-stack Developer with nearly 2 years of experience building scalable web applications across 7+ products using Python, FastAPI, Flask, Django, and React, backed by PostgreSQL and MongoDB. Focused on delivering clean, efficient, and impactful solutions to real-world problems.',
}

// Headline stats for the About section counters
export const stats = [
  { value: 7, suffix: '+', label: 'Products shipped' },
  { value: 2, suffix: ' yrs', label: 'Professional experience' },
  { value: 5, suffix: '+', label: 'Core languages & DBs' },
  { value: 100, suffix: '%', label: 'Ownership, end-to-end' },
]

export const experience = [
  {
    id: 'a2',
    role: 'Full Stack Developer (A2)',
    company: 'Softborne Technology Solutions Pvt. Ltd.',
    period: 'Oct 2025 — Present',
    current: true,
    summary:
      'Leading design and implementation of AI-powered capabilities, owning full-stack delivery from architecture through production.',
    points: [
      'Led the design and implementation of AI-powered capabilities for the Boombirds platform, integrating AI-driven workflows to enhance product functionality and developer productivity.',
      'Architected and delivered end-to-end full-stack solutions using React, Node.js, FastAPI, Flask, and MongoDB — owning development from design through production deployment.',
      'Designed and optimized RESTful APIs in Python (FastAPI/Flask) and Node.js, and built responsive, reusable React components, improving performance, scalability, and maintainability.',
      'Introduced AI-powered pull-request reviews via Bitbucket Pipelines using Gemini, standardizing reviews and reducing manual review effort across engineering teams.',
      'Drove architecture reviews and system-design discussions, defining scalable architecture and API contracts for new platform features.',
      'Collaborated with US-based clients on requirements, mentored junior engineers, and promoted engineering best practices.',
    ],
    stack: ['React', 'Node.js', 'FastAPI', 'Flask', 'MongoDB', 'Gemini AI'],
  },
  {
    id: 'a1',
    role: 'Junior Software Engineer (A1)',
    company: 'Softborne Technology Solutions Pvt. Ltd.',
    period: 'Sep 2024 — Sep 2025',
    current: false,
    summary:
      'Delivered full-stack features across multiple enterprise products, from admin platforms to analytics pipelines.',
    points: [
      'Developed and maintained the OWL Admin platform (React-Admin + FastAPI), delivering allocator, manager, job-title, and bulk-upload modules with full CRUD.',
      'Built OWL Product features using Flask, FastAPI, HTMX, Jinja, and Highcharts — interactive dashboards that surfaced actionable business insights.',
      'Enhanced Boombirds and Propelme using React and Node.js: custom image processing, reusable UI components, and authentication improvements.',
      'Engineered DBT data models and optimized SQL transformations to power scalable, maintainable analytics pipelines.',
      'Delivered full-stack features end-to-end while collaborating with PMs, designers, and QA in cross-functional Agile teams.',
      'Contributed to client requirement discussions, sprint planning, and production deployments, including post-release support for US-based enterprise customers.',
    ],
    stack: ['React-Admin', 'FastAPI', 'Flask', 'HTMX', 'Highcharts', 'DBT'],
  },
]

export const projects = [
  {
    id: 'boombirds',
    name: 'Boombirds',
    tagline: 'AI-powered workflow platform',
    year: '2025',
    accent: '#7fd7ff',
    description:
      'Led design and delivery of AI-powered capabilities, integrating AI-driven workflows to enhance product functionality and developer productivity. Built responsive React frontends and Node.js microservices backed by MongoDB and Neo4j, deployed on GCP.',
    highlights: [
      'AI-driven workflow orchestration',
      'React frontends + Node.js microservices',
      'MongoDB + Neo4j graph data layer',
      'Deployed on Google Cloud Platform',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'Neo4j', 'GCP', 'AI / Gemini'],
  },
  {
    id: 'owl-admin',
    name: 'OWL Admin Portal',
    tagline: 'Enterprise admin platform',
    year: '2024',
    accent: '#b0ffcf',
    description:
      'Built full CRUD operations and bulk-upload workflows across multiple product modules. Migrated the entire frontend from React-Admin to a custom React 18 + TypeScript stack with TanStack Query & Router, improving flexibility and maintainability.',
    highlights: [
      'Full CRUD + bulk-upload workflows',
      'Migrated React-Admin → React 18 + TypeScript',
      'TanStack Query & Router architecture',
      'FastAPI + PostgreSQL + Alembic on AWS',
    ],
    stack: ['React', 'TypeScript', 'TanStack', 'FastAPI', 'PostgreSQL', 'Alembic', 'AWS'],
  },
  {
    id: 'owl-product',
    name: 'OWL Product',
    tagline: 'Interactive analytics dashboards',
    year: '2024',
    accent: '#ffe08a',
    description:
      'Developed interactive dashboards with Highcharts that surfaced actionable business insights. Built product features across Flask, FastAPI, HTMX, and Jinja with Alembic-managed migrations.',
    highlights: [
      'Interactive Highcharts dashboards',
      'Actionable business insights',
      'Flask + FastAPI + HTMX + Jinja',
      'Alembic database migrations',
    ],
    stack: ['Flask', 'FastAPI', 'HTMX', 'Highcharts', 'Alembic'],
  },
  {
    id: 'propelme',
    name: 'Propelme',
    tagline: 'Product experience enhancements',
    year: '2024',
    accent: '#ff9ad5',
    description:
      "Enhanced Softborne's Propelme product with custom image handling, reusable UI components, and authentication improvements. Delivered full-stack features in React and Node.js, improving performance and user experience.",
    highlights: [
      'Custom image handling pipeline',
      'Reusable UI component library',
      'Authentication improvements',
      'Performance & UX gains',
    ],
    stack: ['React', 'Node.js'],
  },
]

// Skill graph — grouped into clusters. Used by the constellation visualization.
// Each cluster is a "hub" node; skills orbit their hub. `level` (0-1) drives node size.
export const skillClusters = [
  {
    id: 'languages',
    label: 'Languages',
    accent: '#7fd7ff',
    skills: [
      { name: 'Python', level: 0.95 },
      { name: 'JavaScript', level: 0.9 },
      { name: 'SQL', level: 0.85 },
      { name: 'TypeScript', level: 0.8 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: '#b0ffcf',
    skills: [
      { name: 'FastAPI', level: 0.95 },
      { name: 'Flask', level: 0.9 },
      { name: 'Django', level: 0.75 },
      { name: 'Node.js', level: 0.85 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    accent: '#ff9ad5',
    skills: [
      { name: 'React', level: 0.95 },
      { name: 'React-Admin', level: 0.8 },
      { name: 'HTML', level: 0.9 },
      { name: 'CSS', level: 0.9 },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    accent: '#c9b8ff',
    skills: [
      { name: 'PostgreSQL', level: 0.9 },
      { name: 'MongoDB', level: 0.85 },
      { name: 'Neo4j', level: 0.75 },
      { name: 'DBT', level: 0.7 },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & VCS',
    accent: '#ffe08a',
    skills: [
      { name: 'AWS', level: 0.8 },
      { name: 'GCP', level: 0.8 },
      { name: 'Git', level: 0.9 },
      { name: 'GitHub', level: 0.9 },
      { name: 'BitBucket', level: 0.8 },
    ],
  },
  {
    id: 'ai',
    label: 'AI Tools',
    accent: '#ffc9a0',
    skills: [
      { name: 'ChatGPT', level: 0.9 },
      { name: 'Copilot', level: 0.85 },
      { name: 'Claude', level: 0.9 },
      { name: 'Gemini', level: 0.85 },
    ],
  },
]

export const softSkills = [
  'Client Communication & Requirement Gathering',
  'Cross-functional Collaboration',
  'Mentoring & Code Review',
  'Problem Solving',
  'Ownership & Delivery',
  'Adaptability',
]

export const education = [
  {
    degree: 'B.Tech — Information Technology',
    school: 'DMI College of Engineering, Chennai',
    period: '2020 — 2024',
    detail: 'CGPA: 8.52',
  },
  {
    degree: 'HSC — Higher Secondary',
    school: 'Grace Matriculation Higher Secondary School, Chennai',
    period: '2020',
    detail: '80.3%',
  },
  {
    degree: 'SSLC — Secondary',
    school: 'Grace Matriculation Higher Secondary School, Chennai',
    period: '2018',
    detail: '87.2%',
  },
]

export const certifications = [
  { name: 'FastAPI — The Complete Course', issuer: 'Udemy', year: '2025' },
  { name: 'REST APIs with Flask & Python', issuer: 'Udemy', year: '2025' },
  { name: 'Google IT Automation with Python', issuer: 'Coursera', year: '' },
  { name: 'Python', issuer: 'GUVI', year: '' },
  { name: 'Typing — Senior in English (Distinction)', issuer: '', year: '' },
]

export const workshops = [
  { name: 'Internship Training — "Full Stack Development"', issuer: 'Retech Solutions' },
  { name: 'Workshop on Digital Technologies', issuer: 'TANSAM' },
]

// Section registry — drives the navbar + scroll spy. Keep ids in sync with section components.
export const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
