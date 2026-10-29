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
    <header className={`nav${open ? ' nav--open' : ''}`}>
      <a className="nav__name" href="#top" onClick={close}>
        {site.name}
      </a>

      <nav className="nav__links" aria-label="Primary">
        {nav.map((n) => (
          <a key={n.id} href={`#${n.id}`}>
            {n.label}
          </a>
        ))}
        <a href={site.resume}>Resume</a>
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>

      <button
        className="nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        {nav.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={close}>
            {n.label}
          </a>
        ))}
        <a href={site.resume} onClick={close}>
          Resume
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" onClick={close}>
          GitHub
        </a>
      </div>
    </header>
  );
}
