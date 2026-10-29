import { useEffect } from 'react';

/**
 * Watches light-themed sections with IntersectionObserver.
 * Adds "nav-on-light" to <body> when one is centred in the viewport,
 * removes it otherwise. The nav strip uses that class to switch colour.
 */
export function useNavInk(_railRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.theme-light'),
    );
    if (sections.length === 0) return;

    const check = () => {
      const mid40 = window.innerHeight * 0.4;
      const mid60 = window.innerHeight * 0.6;
      const onLight = sections.some((s) => {
        const r = s.getBoundingClientRect();
        return r.top < mid60 && r.bottom > mid40;
      });
      document.body.classList.toggle('nav-on-light', onLight);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);
}
