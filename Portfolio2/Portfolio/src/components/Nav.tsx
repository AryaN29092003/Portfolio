import { useEffect, useState } from 'react';
import { nav, site } from '../data/site';
import './Nav.css';

export function Nav() {
  const [open, setOpen] = useState(false);

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
      <header className="nav-rail" aria-label="Site navigation">
        {/*
          One <ul> rotated 90deg counter-clockwise so it reads
          left-to-right when tilted. Width = 100vh so it spans the
          full page height. Items are spaced with justify-content:
          space-between, giving equal gaps from top to bottom.
          The name is the last item so it sits at the bottom of
          the strip when rotated back into place.
        */}
        <ul className="nav-rail__strip" role="list">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`}>{n.label}</a>
            </li>
          ))}
          <li><a href={site.resume}>Resume</a></li>
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="#top" className="nav-rail__name">
              {site.name}
            </a>
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
