export interface Project {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  role: string;
  status: string;
  problem: string;
  architecture: string[];
  contribution: string[];
  links: { label: string; href: string }[];
  // Replace with a screenshot or diagram once available: put the file in /public/media.
  figureNote: string;
}

export const projects: Project[] = [
  {
    id: 'healthcare-pipelines',
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
    figureNote: 'Architecture diagram, kept general with no client details.',
  },
  {
    id: 'verifylens',
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
    figureNote: 'Screenshot or API diagram.',
  },
  {
    id: 'job-assistant',
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
    figureNote: 'Screenshot or flow diagram.',
  },
];
