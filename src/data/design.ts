import { art, starsMobile } from '../art/art';

export type SectionId = 'work' | 'projects' | 'about' | 'contact' | 'resume';
export const ORDER: SectionId[] = ['work', 'projects', 'about', 'contact', 'resume'];
export type ThemeId = 'aurora' | 'nebula';

export const ICONS: Record<SectionId | 'case', string> = {
  case: '',
  work: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  projects: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  about: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  resume: '<path d="M6 3h8l5 5v13H6zM14 3v5h5M9 13h7M9 17h7"/>',
};

export const INFO: Record<SectionId, { tag: string; sub: string }> = {
  work: { tag: 'selected builds', sub: 'Pipelines and products' },
  projects: { tag: 'case studies', sub: 'How they were built' },
  about: { tag: 'who i am', sub: 'Python, data, APIs' },
  contact: { tag: 'say hello', sub: 'Email and socials' },
  resume: { tag: 'the pdf', sub: 'Open the latest copy' },
};

// Desktop constellation (offsets from the orbit centre at 720,430 on the 1440x900 stage).
export const starsDesktop: Record<SectionId, { x: number; y: number; size: number; card: { left: number; top: number }; ang: number }> = {
  work: { x: -48, y: -274, size: 9, card: { left: -232, top: -128 }, ang: 350 },
  contact: { x: -263, y: 70, size: 8, card: { left: -196, top: -90 }, ang: 255 },
  about: { x: -92, y: 252, size: 7, card: { left: -190, top: 10 }, ang: 200 },
  projects: { x: 262, y: -85, size: 8, card: { left: 38, top: -70 }, ang: 72 },
  resume: { x: 390, y: 330, size: 6.5, card: { left: 34, top: -110 }, ang: 130 },
};
export const sizeMobile: Record<SectionId, number> = { work: 11, projects: 10, contact: 10, about: 9, resume: 9 };
export const originDesktop: Record<SectionId | 'case', [number, number]> = {
  case: [608, 340], work: [672, 156], projects: [982, 345], about: [628, 683], contact: [457, 500], resume: [1110, 760],
};
export { starsMobile };

type Pal = [string, string, string, string, string]; // c1 c2 c3 accent accentText
export const THEMES: Record<ThemeId, {
  label: string; base: string; top: string; bottom: string; dot: string;
  stars: Record<SectionId, string>; pal: Record<SectionId | 'case', Pal>;
}> = {
  aurora: {
    label: 'aurora', base: '#04101F', top: '#0B2B4B', bottom: '#030B1A', dot: '#B6FF3B',
    stars: { work: '#B6FF3B', contact: '#3DF2C8', about: '#3DD9FF', projects: '#3D7BFF', resume: '#F6F3E4' },
    pal: {
      work: ['#B6FF3B', '#3DF2C8', '#3D7BFF', '#A5F02B', '#08210F'],
      projects: ['#3D7BFF', '#2F4FD8', '#3DD9FF', '#3D6BFF', '#FFFFFF'],
      about: ['#3DD9FF', '#3D7BFF', '#3DF2C8', '#2BC4EE', '#05182A'],
      contact: ['#3DF2C8', '#3DD9FF', '#B6FF3B', '#2FE0B5', '#04261F'],
      resume: ['#3D7BFF', '#3DF2C8', '#B6FF3B', '#F6F3E4', '#08162E'],
      case: ['#3D7BFF', '#2F4FD8', '#3DD9FF', '#3D6BFF', '#FFFFFF'],
    },
  },
  nebula: {
    label: 'nebula', base: '#07030F', top: '#000000', bottom: '#08031A', dot: '#FFC93C',
    stars: { work: '#FFC93C', contact: '#FF9A3C', about: '#FF6FA8', projects: '#C04BE0', resume: '#F6F3E4' },
    pal: {
      work: ['#FFC93C', '#FF9A3C', '#C04BE0', '#F5B921', '#1A0B2E'],
      projects: ['#C04BE0', '#5B3DE0', '#FF6FA8', '#B13FD8', '#FFFFFF'],
      about: ['#FF6FA8', '#C04BE0', '#FFC93C', '#F2578F', '#FFFFFF'],
      contact: ['#FF9A3C', '#FF6FA8', '#5B3DE0', '#F5822F', '#1F0A1A'],
      resume: ['#5B3DE0', '#8A6BFF', '#F28BB5', '#F6F3E4', '#140B30'],
      case: ['#C04BE0', '#5B3DE0', '#FF6FA8', '#B13FD8', '#FFFFFF'],
    },
  },
};
export const gradientOf = (t: ThemeId) => art[t].gradient;
