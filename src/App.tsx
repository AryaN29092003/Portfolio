import { useMemo, useRef } from 'react';
import { sections } from './data/site';
import { useActiveSection } from './hooks/useActiveSection';
import { useScrollProgress } from './hooks/useScrollProgress';
import { Nav } from './components/Nav';
import { StatusBar } from './components/StatusBar';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import { Approach } from './sections/Approach';
import { Experience } from './sections/Experience';
import { Experiments } from './sections/Experiments';
import { Contact } from './sections/Contact';

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const active = useActiveSection(ids);
  useScrollProgress(mainRef);

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <Nav />
      <main ref={mainRef} className="page">
        <div className="rail" aria-hidden="true">
          <span className="rail__base" />
          <span className="rail__fill" />
        </div>
        <Hero />
        <Work />
        <Approach />
        <Experience />
        <Experiments />
        <Contact />
      </main>
      <StatusBar active={active} />
    </>
  );
}
