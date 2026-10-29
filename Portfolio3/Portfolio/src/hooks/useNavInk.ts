import { useEffect } from 'react';

/**
 * Reads the --nav-ink CSS custom property from whichever section
 * currently overlaps the centre of the left rail, and writes it
 * onto the rail element as --current-nav-ink so the strip can
 * use it without inheriting from a fixed-position ancestor.
 */
export function useNavInk(railRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // The rail sits at x = 0..navStrip. We sample the midpoint.
    const sampleX = 10;

    const update = () => {
      // Find the topmost element at the horizontal centre of the rail,
      // at the vertical centre of the viewport.
      const el = document.elementFromPoint(sampleX, window.innerHeight / 2);
      if (!el) return;
      // Walk up to the nearest section with a theme class.
      const section = el.closest<HTMLElement>(
        '.theme-dark, .theme-dusk, .theme-light',
      );
      const ink = section
        ? getComputedStyle(section).getPropertyValue('--nav-ink').trim()
        : '#ffffff';
      rail.style.setProperty('--current-nav-ink', ink || '#ffffff');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [railRef]);
}
