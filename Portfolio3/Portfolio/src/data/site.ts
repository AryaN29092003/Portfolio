// Everything personal lives in /src/data so copy can be edited without touching components.
// Items marked [CONFIRM] are placeholders that need your input before publishing.

const base = import.meta.env.BASE_URL;

export const site = {
  name: 'Arya Nazare',
  headline: 'Systems that move data, and make sense of it.',
  intro:
    "I'm a software engineer building backend services and data pipelines, with a growing focus on applied AI. Currently at Newscape Consulting, working on healthcare data integration.",
  email: 'arya.nazare29@gmail.com',
  github: 'https://github.com/AryaN29092003',
  linkedin: 'https://linkedin.com/in/arya-nazare-3a22b8292',
  // Drop your PDF at /public/resume.pdf (see README). A copy without your phone number is recommended.
  resume: `${base}resume.pdf`,
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',
};

export const nav = [
  { id: 'work', label: '/work' },
  { id: 'approach', label: '/about' },
  { id: 'contact', label: '/contact' },
];

// Order matters: it drives the section counter in the bottom bar.
export const sections = [
  { id: 'top', label: 'Opening' },
  { id: 'work', label: 'Selected work' },
  { id: 'approach', label: 'Approach' },
  { id: 'experience', label: 'Experience' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'contact', label: 'Contact' },
];

export const approach = {
  heading: 'How I work',
  points: [
    {
      title: 'Backend systems',
      text: 'I start from the data and its contracts: the schema, the auth model, the shape of each request. The endpoints follow.',
    },
    {
      title: 'Automation',
      text: 'If someone retypes the same thing twice, it should be a script. At Linde, pulling fields out of PDFs cut manual data entry by 90%.',
    },
    {
      title: 'Data workflows',
      text: 'Pipelines should be reusable and checkable: validate at the edges, process incrementally, and trace what ran.',
    },
    {
      title: 'Applied AI',
      text: 'A model is one part of a backend. The parsing, scoring and verification around it decide whether it is useful.',
    },
  ],
};
