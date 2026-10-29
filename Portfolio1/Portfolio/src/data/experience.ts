export interface Role {
  id: string;
  title: string;
  org: string;
  when: string;
  points: string[];
  size: 'large' | 'medium' | 'small';
}

export const roles: Role[] = [
  {
    id: 'newscape',
    title: 'Software Engineer',
    org: 'Newscape Consulting',
    when: 'Feb 2026 to present',
    points: [
      'Healthcare data integration pipelines on Databricks, PySpark, Delta Lake, Kafka and MongoDB.',
      'Reusable ETL frameworks with schema validation, Delta MERGE, Change Data Feed and event-driven processing.',
    ],
    size: 'large',
  },
  {
    id: 'verifylens',
    title: 'AI Backend Engineer Intern',
    org: 'VerifyLens, PMAccelerator',
    when: 'Sep to Dec 2025',
    points: ['FastAPI backend, PostgreSQL schema, JWT auth and claim verification pipelines.'],
    size: 'medium',
  },
  {
    id: 'linde',
    title: 'Intern',
    org: 'Linde Engineering India',
    when: 'Jan to May 2025',
    points: ['Automated extraction of 15+ data fields from PDFs, cutting manual entry time by 90%.'],
    size: 'small',
  },
  {
    id: 'tdnvm',
    title: 'Freelance backend developer',
    org: 'TDNVM community website',
    when: '[CONFIRM] dates',
    points: ['FastAPI backend, REST APIs and authentication.'],
    size: 'small',
  },
  {
    id: 'education',
    title: 'BTech, Computer Software Engineering',
    org: 'Navrachana University',
    when: 'Aug 2021 to May 2025',
    points: ['GPA 9.23 / 10.00'],
    size: 'small',
  },
  {
    id: 'cert',
    title: 'Databricks Certified Data Engineer Associate',
    org: 'Databricks',
    when: 'Issued Sep 22, 2026, expires Sep 22, 2028',
    points: ['Certificate ID 194781517. [CONFIRM] Credential link.'],
    size: 'medium',
  },
];
