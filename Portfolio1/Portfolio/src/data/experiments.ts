export interface Experiment {
  id: string;
  title: string;
  text: string;
  status: string;
}

export const experiments: Experiment[] = [
  {
    id: 'budgetup',
    title: 'Paisa / Budgetup',
    text: 'A personal budgeting progressive web app.',
    status: '[CONFIRM] status and link',
  },
  {
    id: 'weapon-detection',
    title: 'Weapon detection',
    text: 'An object-detection project built on YOLOv8.',
    status: '[CONFIRM] status and link',
  },
  {
    id: 'try-on',
    title: 'Virtual try-on',
    text: 'A local or cloud-assisted virtual try-on application.',
    status: 'In progress',
  },
];
