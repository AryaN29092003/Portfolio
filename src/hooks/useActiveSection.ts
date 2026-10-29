import { useEffect, useState } from 'react';

/** Returns the index of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = els.indexOf(entry.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
