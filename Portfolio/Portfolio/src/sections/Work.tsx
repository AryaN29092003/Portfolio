import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { projects } from '../data/projects';
import { SectionHeading } from '../components/SectionHeading';
import { CaseStudy } from './CaseStudy';
import './Work.css';

const areas = ['a', 'b', 'c'];

export function Work() {
  const [currentId, setCurrentId] = useState(projects[0].id);
  const [open, setOpen] = useState(true);
  const current = projects.find((p) => p.id === currentId) ?? projects[0];
  const panelRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const reduced = useReducedMotion();

  // After the person opens or switches a project, bring the case study into view.
  useEffect(() => {
    if (!touched.current || !open) return;
    panelRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  }, [currentId, open, reduced]);

  const toggle = (id: string) => {
    touched.current = true;
    if (open && id === currentId) {
      setOpen(false);
    } else {
      setCurrentId(id);
      setOpen(true);
    }
  };

  return (
    <section id="work" className="work theme-light" aria-labelledby="work-title">
      <div className="section__inner">
        <SectionHeading id="work" number="02">
          Selected work
        </SectionHeading>

        <ul className="bento work__bento" role="list">
          {projects.map((p, i) => {
            const isOpen = open && p.id === currentId;
            return (
              <li key={p.id} className="tile tile--project" style={{ gridArea: areas[i] }} data-open={isOpen}>
                <h3 className="tile__heading">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="case-panel"
                    onClick={() => toggle(p.id)}
                    className="tile__button"
                  >
                    <span className="tile__title">{p.title}</span>
                    <span className="tile__summary">{p.summary}</span>
                    <span className="tile__stack">{p.stack.slice(0, 4).join(', ')}</span>
                    <span className="tile__hint" aria-hidden="true">
                      {isOpen ? 'Close' : 'Open'}
                    </span>
                  </button>
                </h3>
              </li>
            );
          })}

          <li className="tile tile--empty" style={{ gridArea: 'e1' }} aria-hidden="true" data-tone="1" />
          <li className="tile tile--empty" style={{ gridArea: 'e2' }} aria-hidden="true" data-tone="2" />
          <li className="tile tile--empty" style={{ gridArea: 'e3' }} aria-hidden="true" data-tone="3" />
          <li className="tile tile--now" style={{ gridArea: 'now' }}>
            <p className="tile__title">Currently</p>
            <p className="tile__summary">Building a virtual try-on app.</p>
          </li>
        </ul>

        <div id="case-panel" ref={panelRef} className="case" data-open={open} role="region" aria-label={`${current.title} case study`} inert={!open}>
          <div className="case__clip">
            <CaseStudy key={current.id} project={current} />
          </div>
        </div>
      </div>
    </section>
  );
}
