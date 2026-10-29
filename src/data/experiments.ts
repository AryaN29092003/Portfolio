export interface Experiment {
  id: string;
  title: string;
  text: string;
  status: string;
  link?: string;
}

export const experiments: Experiment[] = [
  {
    id: 'budgetup',
    title: 'Paisa / Budgetup',
    text: 'A personal budgeting progressive web app.',
    status: 'GitHub',
    link: 'https://github.com/AryaN29092003/budgetup',
  },
  {
    id: 'weapon-detection',
    title: 'Weapon detection',
    text: 'An object-detection project built on YOLOv8.',
    status: 'GitHub',
    link: 'https://github.com/AryaN29092003/YOLO-V8-Weapon-Detection-System',
  },
  {
    id: 'try-on',
    title: 'Virtual try-on',
    text: 'A local or cloud-assisted virtual try-on application.',
    status: 'In progress',
  },
];
