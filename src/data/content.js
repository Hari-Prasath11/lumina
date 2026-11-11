// All portfolio content lives here, kept in sync with the résumé (public/Hari-Prasath-Resume.pdf).

export const profile = {
  name: 'Hari Prasath P',
  role: 'Full-Stack Engineer',
  title: 'Co-Founder, Glide',
  location: 'Chennai, India',
  availability: 'Open to opportunities',
  email: 'phariprasath11123@gmail.com',
  phone: '+91 73052 24995',
  linkedin: 'https://www.linkedin.com/in/hari-prasath-p-537303210/',
  linkedinHandle: 'in/hari-prasath-p',
  github: 'https://github.com/Hari-Prasath11',
  githubHandle: 'Hari-Prasath11',
  resume: '/Hari-Prasath-Resume.pdf',
  summary:
    'Full-stack developer with 2+ years of experience building scalable web applications across 8+ products using Python, FastAPI, Flask, Django and React, backed by PostgreSQL and MongoDB. Co-founder of Glide, a WhatsApp-first clinic platform that lets patients skip crowded waiting halls.',
}

export const stats = [
  { value: '2+', label: 'Years of experience' },
  { value: '8+', label: 'Products shipped' },
  { value: '100+', label: 'PRs at Glide in 6 weeks' },
  { value: '1,500+', label: 'Automated tests at Glide' },
]

export const featured = {
  name: 'Glide',
  role: 'Co-Founder & Full-Stack Engineer',
  url: 'https://glideapp.in',
  urlLabel: 'glideapp.in',
  logo: '/glide-logo.png',
  tagline: 'WhatsApp-first clinic management SaaS',
  description:
    'Patients book tokens on WhatsApp in 6 Indian languages and wait at home on a live queue, instead of in a crowded waiting hall. Built from zero by a two-person team and running in production on AWS Mumbai.',
  highlights: [
    {
      title: 'Self-learning wait times',
      text: 'Each doctor’s pace updates after every visit; ETAs are weighted by a ladder of evidence per patient category.',
    },
    {
      title: 'Real-time queues',
      text: 'Postgres LISTEN/NOTIFY to Server-Sent Events, with a transactional WhatsApp outbox and LLM fallback.',
    },
    {
      title: 'Production-grade ops',
      text: 'Terraform, Docker, Sentry and GitHub Actions with zero-downtime, auto-rollback deploys. DPDP Act 2023 compliant.',
    },
  ],
  stack: ['FastAPI', 'PostgreSQL 16', 'React 19', 'TypeScript', 'WhatsApp Cloud API', 'AWS', 'Terraform'],
}

export const experience = [
  {
    company: 'Glide',
    initials: 'G',
    logo: '/glide-logo.png',
    url: 'https://glideapp.in',
    about: 'WhatsApp-first clinic management SaaS',
    roles: [
      {
        title: 'Co-Founder & Full-Stack Engineer',
        period: 'Sep 2026 — Present',
        points: [
          'Co-founded and co-built Glide from zero: a 29-module FastAPI monolith on PostgreSQL 16 with a typed React 19 + TypeScript console.',
          'Designed a self-learning wait-time predictor with per-doctor pace and evidence-weighted ETAs, with accuracy tracked in the admin.',
          'Built real-time queues (LISTEN/NOTIFY → SSE) and a WhatsApp Cloud API pipeline with a transactional outbox (SKIP LOCKED leases, retries) and rules-first message understanding, with Claude, Gemini and Vertex as a fallback.',
          'Built the lab module, prescription vitals, multi-branch management, schedule-overlap detection and the “Ask Glide” staff assistant.',
          'Shipped 100+ reviewed PRs in 6 weeks with 1,500+ automated tests, including a simulated busy clinic day. Led field sales to clinics across Chennai.',
        ],
      },
    ],
  },
  {
    company: 'Softborne Technology Solutions',
    initials: 'S',
    about: 'Product engineering for US enterprise clients',
    roles: [
      {
        title: 'Full-Stack Developer',
        period: 'Oct 2025 — Present',
        points: [
          'Led the design and delivery of AI-powered workflows on the Boombirds platform (React, Node.js microservices, MongoDB, Neo4j, GCP).',
          'Architected full-stack solutions in React, Node.js, FastAPI, Flask and MongoDB, from design to production.',
          'Introduced Gemini-powered PR reviews in Bitbucket Pipelines, standardising reviews and cutting manual effort.',
          'Migrated the admin portal from React-Admin to React 18 + TypeScript with TanStack Query and Router, on FastAPI, PostgreSQL and Alembic (AWS).',
          'Drove architecture reviews and API contract design, worked with US clients on requirements, and mentored juniors.',
        ],
      },
      {
        title: 'Junior Software Engineer',
        period: 'Sep 2024 — Sep 2025',
        points: [
          'Built the OWL Admin platform (React-Admin + FastAPI): allocator, manager, job-title and bulk-upload CRUD modules.',
          'Built OWL Product features in Flask, FastAPI, HTMX and Jinja, with interactive Highcharts dashboards.',
          'Enhanced Boombirds and Propelme (React, Node.js) with custom image processing, reusable UI and stronger auth.',
          'Engineered DBT data models and optimised SQL transformations for scalable analytics pipelines.',
        ],
      },
    ],
  },
]

export const projects = [
  {
    name: 'Boombirds',
    kind: 'AI workflow platform',
    description:
      'AI-powered workflows on React frontends and Node.js microservices, with a MongoDB and Neo4j data layer on GCP.',
    stack: ['React', 'Node.js', 'Neo4j', 'GCP', 'Gemini'],
  },
  {
    name: 'OWL Admin Portal',
    kind: 'Enterprise admin',
    description:
      'CRUD and bulk-upload workflows, migrated from React-Admin to React 18 + TypeScript with TanStack.',
    stack: ['TypeScript', 'TanStack', 'FastAPI', 'PostgreSQL'],
  },
  {
    name: 'OWL Product',
    kind: 'Analytics dashboards',
    description:
      'Interactive Highcharts dashboards surfacing business insights, built across Flask, FastAPI, HTMX and Jinja.',
    stack: ['Flask', 'FastAPI', 'HTMX', 'Highcharts'],
  },
]

export const skills = [
  {
    group: 'Backend',
    items: ['Python', 'FastAPI', 'Flask', 'Django', 'Node.js', 'async SQLAlchemy', 'REST / OpenAPI'],
  },
  {
    group: 'Frontend',
    items: ['TypeScript', 'JavaScript', 'React', 'TanStack Router & Query', 'Tailwind CSS', 'Vite'],
  },
  {
    group: 'Data & Cloud',
    items: ['SQL', 'PostgreSQL', 'MongoDB', 'Neo4j', 'DBT', 'AWS', 'GCP', 'Docker', 'Terraform', 'GitHub Actions'],
  },
  {
    group: 'AI & Integrations',
    items: ['Claude', 'Gemini', 'Vertex AI', 'LLM integration', 'WhatsApp Business Cloud API'],
  },
]

export const education = {
  degree: 'B.Tech, Information Technology',
  school: 'DMI College of Engineering, Chennai',
  period: '2020 — 2024',
  detail: 'CGPA 8.52',
}

export const certifications = [
  { name: 'FastAPI', issuer: 'Udemy' },
  { name: 'REST APIs with Flask', issuer: 'Udemy' },
  { name: 'Google IT Automation with Python', issuer: 'Coursera' },
]

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
