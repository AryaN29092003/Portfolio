import { useEffect, useRef, useState } from 'react';
import { nav, site } from '../data/site';
import { useNavInk } from '../hooks/useNavInk';
import './Nav.css';

export function Nav() {
  const [open, setOpen] = useState(false);
  const railRef = useRef<HTMLElement>(null);
  useNavInk(railRef);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Desktop: single rotated strip ── */}
      <header className="nav-rail" ref={railRef} aria-label="Site navigation">
        <ul className="nav-rail__strip" role="list">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`}>{n.label}</a>
            </li>
          ))}
          <li><a href={site.resume}>Resume</a></li>
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
          </li>
          <li>
            <a href="#top" className="nav-rail__name">{site.name}</a>
          </li>
        </ul>
      </header>

      {/* ── Mobile: slim top bar + overlay sheet ── */}
      <div className={`nav-top${open ? ' nav-top--open' : ''}`}>
        <a className="nav-top__name" href="#top" onClick={close}>
          {site.name}
        </a>
        <button
          className="nav-top__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <div id="mobile-menu" className="nav-top__sheet" hidden={!open}>
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={close}>
              {n.label}
            </a>
          ))}
          <a href={site.resume} onClick={close}>Resume</a>
          <a href={site.github} target="_blank" rel="noreferrer" onClick={close}>
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}
