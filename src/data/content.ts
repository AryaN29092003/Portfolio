// All personal copy lives here so it can be edited without touching components.
// Text is carried over from the previous portfolio (src/data in C:\projects\Portfolio).

const base = import.meta.env.BASE_URL;

export const site = {
  name: 'Arya Nazare',
  headline: 'Systems that move data, and make sense of it.',
  intro:
    "I'm a software engineer building backend services and data pipelines, with a growing focus on applied AI. Currently at Newscape Consulting, working on healthcare data integration.",
  email: 'arya.nazare29@gmail.com',
  github: 'https://github.com/AryaN29092003',
  linkedin: 'https://linkedin.com/in/arya-nazare-3a22b8292',
  resume: `${base}resume.pdf`,
  resumePreview: `${base}resume-preview.jpg`,
  location: 'Pune, India',
  openTo: 'Open to Python backend and data engineering roles.',
};

export const work = {
  newscape: {
    meta: 'Feb 2026 to present',
    title: 'Software Engineer',
    org: 'Newscape Consulting, Pune',
    points: [
      'Healthcare data integration pipelines on Databricks, PySpark, Delta Lake, Kafka and MongoDB.',
      'Reusable ETL frameworks with schema validation, Delta MERGE, Change Data Feed and event-driven processing.',
    ],
    big: '8+',
    cap: 'healthcare entity pipelines',
  },
  verifylens: {
    meta: 'Sep to Dec 2025 · Remote',
    title: 'AI Backend Engineer Intern',
    org: 'VerifyLens, PMAccelerator',
    points: ['FastAPI backend, PostgreSQL schema, JWT auth and claim verification pipelines.'],
  },
  linde: {
    meta: 'Jan to May 2025 · Vadodara',
    title: 'Intern',
    org: 'Linde Engineering India',
    points: ['Automated extraction of 15+ data fields from PDFs, cutting manual entry time by 90%.'],
  },
  roles: { count: '3', label: 'roles since January 2025' },
  stack: ['Python', 'FastAPI', 'Databricks'],
};

export type ProjectId = 'healthcare' | 'verifylens' | 'job-assistant';
export const PROJECT_IDS: ProjectId[] = ['healthcare', 'verifylens', 'job-assistant'];

export interface CaseData {
  title: string;
  summary: string;
  stack: string[];
  role: string;
  status: string;
  problem: string;
  architecture: string[];
  contribution: string[];
  links: { label: string; href: string }[];
  figure?: string;
  figureNote?: string;
}

export const caseStudies: Record<ProjectId, CaseData> = {
  healthcare: {
    title: 'Healthcare data integration pipelines',
    summary: 'Reusable ETL frameworks on Databricks that publish healthcare data as events.',
    stack: ['Databricks', 'PySpark', 'Delta Lake', 'Kafka', 'MongoDB', 'Avro', 'OpenTelemetry'],
    role: 'Software Engineer, Newscape Consulting (Feb 2026 to present)',
    status: 'In production use',
    problem:
      'Several kinds of healthcare records need to land in a lakehouse, stay correct as they change, and reach downstream systems as events.',
    architecture: [
      'Reusable ETL frameworks cover entities such as client, worker, visit, authorization, coverage, payor, episode of care and care team.',
      'Schema validation runs at ingestion, and Delta MERGE with Change Data Feed handles updates incrementally.',
      'Kafka publishing and MongoDB persistence services use Avro with a Schema Registry, with OpenTelemetry for tracing.',
    ],
    contribution: [
      'Designed and developed the integration pipelines and the reusable ETL frameworks.',
      'Built the Kafka publishing and MongoDB persistence services.',
      'Wrote shared Spark utilities for data validation, JSON normalization, offset management and incremental processing, and tuned performance across pipelines.',
    ],
    links: [],
    figure: `${base}media/healthcare_pipeline.png`,
    figureNote: 'Architecture overview, kept general with no client details.',
  },
  verifylens: {
    title: 'VerifyLens',
    summary: 'A FastAPI backend that turns audio and documents into verified claims.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'JWT'],
    role: 'AI Backend Engineer Intern, PMAccelerator (Sep to Dec 2025, remote)',
    status: 'Internship project',
    problem:
      'Spoken and written material needs to be turned into individual claims that can be checked, with a backend that keeps users and documents organized.',
    architecture: [
      'Modular REST APIs sit on a PostgreSQL schema.',
      'Pipelines handle audio transcription, claim generation and fact-verification.',
      'JWT authentication and document-upload flows secure and feed the system.',
    ],
    contribution: [
      'Built the FastAPI backend and designed the PostgreSQL schema.',
      'Implemented JWT authentication, document uploads and claim-extraction logic.',
      'Created the transcription, claim-generation and fact-verification pipelines.',
    ],
    links: [],
    figure: `${base}media/verifylens_workflow.png`,
    figureNote: 'Request and verification workflow.',
  },
  'job-assistant': {
    title: 'Job Assistant Agent',
    summary: 'A backend that matches resumes to remote jobs using Gemini.',
    stack: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'Google Gemini'],
    role: 'Backend developer',
    status: 'Personal project',
    problem:
      'Job seekers need listings, their profile and their resume in one place, with help judging fit and preparing for interviews.',
    architecture: [
      'A FastAPI service stores job listings, user profiles and resume data in Supabase (PostgreSQL) behind REST APIs.',
      'Gemini handles resume and job matching, candidate scoring and interview question generation.',
      'PDF resumes are parsed before analysis.',
    ],
    contribution: [
      'Built the backend and its REST APIs.',
      'Integrated Gemini for matching, scoring and interview Q&A.',
      'Implemented PDF resume parsing and the analysis workflow.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/AryaN29092003/Job-Assistant-Agent' }],
  },
};

export const projects = {
  outcome: { big: '8+', cap: 'entity types on one reusable framework' },
  experiments: [
    { title: 'Paisa / Budgetup', text: 'A personal budgeting progressive web app.', status: 'GitHub', href: 'https://github.com/AryaN29092003/budgetup' },
    { title: 'Weapon detection', text: 'An object-detection project built on YOLOv8.', status: 'GitHub', href: 'https://github.com/AryaN29092003/YOLO-V8-Weapon-Detection-System' },
    { title: 'Virtual try-on', text: 'A local or cloud-assisted virtual try-on application.', status: 'In progress', href: '' },
  ],
};

export const about = {
  headline: site.headline,
  intro: site.intro,
  cert: {
    title: 'Databricks Certified Data Engineer Associate',
    sub: 'Issued Sep 22, 2026, expires Sep 22, 2028',
    id: 'Certificate ID 194781517',
  },
  heading: 'How I work',
  points: [
    { title: 'Backend systems', text: 'I start from the data and its contracts: the schema, the auth model, the shape of each request. The endpoints follow.' },
    { title: 'Automation', text: 'If someone retypes the same thing twice, it should be a script. At Linde, pulling fields out of PDFs cut manual data entry by 90%.' },
    { title: 'Data workflows', text: 'Pipelines should be reusable and checkable: validate at the edges, process incrementally, and trace what ran.' },
    { title: 'Applied AI', text: 'A model is one part of a backend. The parsing, scoring and verification around it decide whether it is useful.' },
  ],
  education: { title: 'BTech, Computer Software Engineering', sub: 'Navrachana University · Aug 2021 to May 2025 · GPA 9.23 / 10.00' },
};

export const resume = {
  summary: { title: 'Python backend and data engineering', sub: '3 roles · Databricks certified' },
  stack: ['Python', 'FastAPI', 'PostgreSQL', 'Databricks', 'PySpark', 'Delta Lake'],
};
