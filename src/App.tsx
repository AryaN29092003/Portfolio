import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Desktop } from './components/Desktop';
import { Mobile } from './components/Mobile';
import type { Act } from './components/tiles';
import { THEMES } from './data/design';
import type { ProjectId } from './data/content';
import type { SectionId, ThemeId } from './data/design';

export interface NavState { pv: SectionId | null; pg: SectionId | null; cs: boolean; cp: ProjectId }
export interface NavApi {
  s: NavState;
  preview: (id: SectionId | null) => void;
  open: (id: SectionId) => void;
  go: (id: SectionId) => void;
  close: () => void;
  closeCase: () => void;
  onAct: (a: Act) => void;
}

function useMedia(q: string) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, [q]);
  return m;
}

function Fit({ w, h, top, bottom, extendX, children }: { w: number; h: number; top: string; bottom: string; extendX?: boolean; children: ReactNode }) {
  const [[k, ex, ey], setK] = useState<[number, number, number]>([1, 0, 0]);
  useEffect(() => {
    const f = () => {
      const s = Math.min(window.innerWidth / w, window.innerHeight / h);
      // The stage grows to the window on both axes, so backgrounds always reach every edge.
      setK([s, extendX ? Math.max(0, window.innerWidth / s - w) : 0, Math.max(0, window.innerHeight / s - h)]);
    };
    f();
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, [w, h, extendX]);
  return (
    <div className="fit" style={{ background: `linear-gradient(180deg,${top} 50%,${bottom} 50%)` }}>
      <div
        className="fitin"
        style={{ width: w + ex, height: h + ey, transform: `translate(-50%,-50%) scale(${k})`, ['--offx' as string]: `${ex / 2}px`, ['--offy' as string]: `${ey / 2}px` }}
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const mobile = useMedia('(max-width: 760px)');
  const [theme, setTheme] = useState<ThemeId>(() => {
    try { return localStorage.getItem('theme') === 'nebula' ? 'nebula' : 'aurora'; } catch { return 'aurora'; }
  });
  const [s, setS] = useState<NavState>({ pv: null, pg: null, cs: false, cp: 'healthcare' });
  const T = THEMES[theme];

  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch { /* private mode */ }
    document.documentElement.style.background = T.bottom;
  }, [theme, T.bottom]);

  const reset = useCallback(() => setS((p) => ({ ...p, pv: null, pg: null, cs: false })), []);
  const opened = s.pg !== null;

  // Browser back closes an open page instead of leaving the site.
  useEffect(() => {
    const onPop = () => reset();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [reset]);

  const nav = useMemo<NavApi>(() => {
    const open = (id: SectionId) => {
      if (!opened) history.pushState({ open: true }, '');
      setS((p) => ({ ...p, pv: null, pg: id, cs: false }));
    };
    return {
      s,
      preview: (id) => setS((p) => (p.pg ? p : { ...p, pv: id })),
      open,
      go: open,
      close: () => { if (history.state?.open) history.back(); else reset(); },
      closeCase: () => setS((p) => ({ ...p, cs: false })),
      onAct: (a) => { if (a.t === 'case') setS((p) => ({ ...p, cs: true, cp: a.id })); else if (a.t === 'go') open(a.to); },
    };
  }, [s, opened, reset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (s.cs) nav.closeCase(); else if (s.pg) nav.close(); else if (s.pv) nav.preview(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [s, nav]);

  const toggleTheme = () => setTheme((t) => (t === 'aurora' ? 'nebula' : 'aurora'));
  return mobile ? (
    <Fit w={390} h={844} top={T.top} bottom={T.bottom}><Mobile theme={theme} nav={nav} onTheme={toggleTheme} /></Fit>
  ) : (
    <Fit w={1440} h={900} extendX top={T.top} bottom={T.bottom}><Desktop theme={theme} nav={nav} onTheme={toggleTheme} /></Fit>
  );
}
