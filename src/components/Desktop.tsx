import type { CSSProperties } from 'react';
import { art } from '../art/art';
import { INFO, ICONS, ORDER, THEMES, originDesktop, starsDesktop } from '../data/design';
import type { SectionId, ThemeId } from '../data/design';
import type { NavApi } from '../App';
import { Tile, getTiles } from './tiles';

const css = (v: Record<string, string | number>) => v as CSSProperties;
const Collapse = ({ onClick, back }: { onClick: () => void; back?: boolean }) => (
  <button type="button" className="collapse" onClick={onClick}>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={back ? 'M19 12H5M11 6l-6 6 6 6' : 'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5'} />
    </svg>
    <span>{back ? 'projects' : 'collapse'}</span>
  </button>
);

function Page({ id, theme, open, nav }: { id: SectionId | 'case'; theme: ThemeId; open: boolean; nav: NavApi }) {
  const [c1, c2, c3, acc, acct] = THEMES[theme].pal[id];
  const [ox, oy] = originDesktop[id];
  const tiles = getTiles(id, false, nav.s.cp);
  const onAct = nav.onAct;
  return (
    <section
      className={`page pg-${id} ${open ? 'open' : ''}`}
      style={css({ '--c1': c1, '--c2': c2, '--c3': c3, '--acc': acc, '--acct': acct, '--base': THEMES[theme].base, '--ox': `calc(var(--offx, 0px) + ${ox}px)`, '--oy': `calc(var(--offy, 0px) + ${oy}px)` })}
      aria-label={id === 'case' ? 'Case study' : id}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="pgbg">
        <div className="blobs"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
        <div className="ribs" /><div className="ribs2" /><div className="vig" />
      </div>
      <div className="pgframe">
        <div className="pgtop">
          <Collapse onClick={nav.close} />
          {id === 'case' && <Collapse back onClick={nav.closeCase} />}
        </div>
        <div className="pgsec">{id === 'case' ? 'case study' : id}</div>
        <div className="grid">
          {tiles.map((s, i) => <Tile key={s.key} s={s} i={i} mobile={false} onAct={onAct} />)}
        </div>
      </div>
    </section>
  );
}

export function Desktop({ theme, nav, onTheme }: { theme: ThemeId; nav: NavApi; onTheme: () => void }) {
  const T = THEMES[theme];
  const a = art[theme];
  return (
    <div className="d">
      <div className={`stage pv-${nav.s.pv ?? 'none'}`} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: T.top, color: '#F6F3E4', fontFamily: "'Bricolage Grotesque Variable','Bricolage Grotesque',system-ui,sans-serif" }}>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="flute" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="turbulence" baseFrequency="0.045 0.0012" numOctaves={1} seed={4} result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale={90} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <div className="band" style={{ background: a.gradient }} />
        <div className="fillb" style={{ background: T.bottom }} />
        <svg aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs><filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={7} /><feColorMatrix type="saturate" values="0" /></filter></defs>
          <rect width="100%" height="100%" filter="url(#grain)" style={{ mixBlendMode: 'overlay', opacity: 0.3 }} />
        </svg>
        <div className="frame">
        <div className="ringwrap" aria-hidden="true"><div className="ringin" dangerouslySetInnerHTML={{ __html: a.ring }} /></div>
        <div className="disc" aria-hidden="true" style={{ position: 'absolute', left: 473, top: 183, width: 494, height: 494, borderRadius: '50%', background: a.gradient, backgroundSize: '1440px 900px', backgroundPosition: '-473px -183px', filter: 'blur(24px)' }} />
        <svg aria-hidden="true" viewBox="0 0 1440 900" style={{ position: 'absolute', left: 0, top: 0, width: 1440, height: 900, pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: a.minor }} />
        <div className="orbit">
          {ORDER.map((id) => {
            const s = starsDesktop[id];
            const info = INFO[id];
            const on = nav.s.pv === id;
            return (
              <div className="keep" key={id} style={{ left: s.x, top: s.y }}>
                <div className={`bead k-${id} ${on ? 'on' : ''}`} style={css({ '--c': T.stars[id], '--s': `${s.size}px` })}>
                  <button
                    type="button"
                    className="hit"
                    aria-label={`Open ${id}`}
                    onMouseEnter={() => nav.preview(id)}
                    onMouseLeave={() => nav.preview(null)}
                    onFocus={() => nav.preview(id)}
                    onBlur={() => nav.preview(null)}
                    onClick={(e) => { nav.preview(null); nav.open(id); (e.currentTarget as HTMLElement).blur(); }}
                  />
                  <i /><b />
                  <div className={`card c-${id}`} aria-hidden="true" style={{ left: s.card.left, top: s.card.top }}>
                    <div className="cico"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[id] }} /></div>
                    <div className="ctag">{info.tag}</div>
                    <div className="ctitle">{id}</div>
                    <div className="csub">{info.sub}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', left: 64, top: 44, display: 'flex', alignItems: 'center', gap: 14, fontSize: 20, letterSpacing: '-0.3px' }}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path d="M12 1 L14 10 L23 12 L14 14 L12 23 L10 14 L1 12 L10 10 Z" fill={T.stars.work} /></svg>
          arya nazare
        </div>
        <div className="hint" aria-hidden="true">hover a star · click to open</div>
        <button type="button" className="skip" onClick={() => nav.open('resume')}>
          skip to resume
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <button type="button" className="themebtn" onClick={onTheme} aria-label="Switch colour theme">
          <i style={{ background: T.dot }} />{T.label}
        </button>
        </div>
        {ORDER.map((id) => <Page key={id} id={id} theme={theme} open={nav.s.pg === id} nav={nav} />)}
        <Page id="case" theme={theme} open={nav.s.cs} nav={nav} />
      </div>
    </div>
  );
}
