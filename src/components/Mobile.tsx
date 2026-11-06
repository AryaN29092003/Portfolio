import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { art } from '../art/art';
import { INFO, ICONS, ORDER, THEMES, sizeMobile, starsMobile } from '../data/design';
import type { SectionId, ThemeId } from '../data/design';
import type { NavApi } from '../App';
import { Tile, getTiles } from './tiles';

const css = (v: Record<string, string | number>) => v as CSSProperties;
const CX = 195, CY = 360;
const Collapse = ({ onClick, back }: { onClick: () => void; back?: boolean }) => (
  <button type="button" className="collapse" onClick={onClick}>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={back ? 'M19 12H5M11 6l-6 6 6 6' : 'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5'} />
    </svg>
    <span>{back ? 'projects' : 'collapse'}</span>
  </button>
);

function palVars(theme: ThemeId, id: SectionId | 'case') {
  const [c1, c2, c3, acc, acct] = THEMES[theme].pal[id];
  return css({ '--c1': c1, '--c2': c2, '--c3': c3, '--acc': acc, '--acct': acct, '--base': THEMES[theme].base });
}

export function Mobile({ theme, nav, onTheme }: { theme: ThemeId; nav: NavApi; onTheme: () => void }) {
  const T = THEMES[theme];
  const a = art[theme];
  const { pv, pg, cs } = nav.s;
  const at = pg ? ORDER.indexOf(pg) : 0;
  const sx = useRef<number | null>(null);
  const sy = useRef(0);
  const begin = (x: number, y: number) => { sx.current = x; sy.current = y; };
  const end = (x: number, y: number) => {
    if (sx.current == null || !pg || cs) { sx.current = null; return; }
    const dx = x - sx.current, dy = y - sy.current;
    sx.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      const n = at + (dx < 0 ? 1 : -1);
      if (n >= 0 && n < ORDER.length) nav.go(ORDER[n]);
    }
  };
  const tap = (id: SectionId) => (pv === id ? nav.open(id) : nav.preview(id));
  return (
    <div className="m">
      <div className={`stage pv-${pv ?? 'none'} ${pg ? 'open' : 'closed'} org-${pg ?? 'work'} ${cs ? 'cs-on' : ''}`} style={{ background: T.top }}>
        <div className="band" style={{ background: a.gradient }} />
        <div className="fillb" style={{ background: T.bottom }} />
        <div className="bgtap" onClick={() => nav.preview(null)} />
        <div className="frame">
        <div className="scaler" aria-hidden="true">
          <div className="ringwrap"><div className="ringin" dangerouslySetInnerHTML={{ __html: a.ring }} /></div>
          <div className="disc" style={{ position: 'absolute', left: 473, top: 183, width: 494, height: 494, borderRadius: '50%', background: a.discMobile, filter: 'blur(24px)' }} />
        </div>
        <svg aria-hidden="true" className="ministars" viewBox="0 0 390 844" dangerouslySetInnerHTML={{ __html: a.minorMobile }} />
        <div className="orbit">
          {ORDER.map((id) => {
            const [x, y] = starsMobile[id];
            return (
              <div className="keep" key={id} style={{ left: x - CX, top: y - CY }}>
                <div className={`bead k-${id}`} style={css({ '--c': T.stars[id], '--s': `${sizeMobile[id]}px` })}>
                  <i /><b />
                  <button type="button" className="hit" aria-label={`Preview ${id}`} onClick={() => tap(id)} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="name">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19"><path d="M12 1 L14 10 L23 12 L14 14 L12 23 L10 14 L1 12 L10 10 Z" fill={T.stars.work} /></svg>
          arya nazare
        </div>
        <button type="button" className="skip" onClick={() => nav.open('resume')}>
          skip to resume<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <div className="hint" aria-hidden="true">tap a star to preview · tap again to open</div>
        <button type="button" className="themebtn" onClick={onTheme} aria-label="Switch colour theme"><i style={{ background: T.dot }} />{T.label}</button>
        {ORDER.map((id) => (
          <button
            type="button"
            key={id}
            className={`dock dock-${id}`}
            style={css({ '--c': id === 'resume' ? '#8A7FD6' : T.stars[id] })}
            tabIndex={pv === id ? 0 : -1}
            onClick={() => nav.open(id)}
          >
            <span className="dockin">
              <span className="cico"><svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[id] }} /></span>
              <span className="ctag">{INFO[id].tag}</span>
              <span className="ctitle">{id}</span>
              <span className="csub">{INFO[id].sub}</span>
              <span className="copen">tap to open</span>
            </span>
          </button>
        ))}
        </div>
        <div
          className={`deck at-${at}`}
          inert={!pg}
          onTouchStart={(e) => begin(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={(e) => end(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
          onMouseDown={(e) => begin(e.clientX, e.clientY)}
          onMouseUp={(e) => end(e.clientX, e.clientY)}
        >
          <div className="track">
            {ORDER.map((id, i) => (
              <section className="panel" key={id} style={palVars(theme, id)} aria-label={id}>
                <div className="pbg" />
                <div className="scroll">
                  <div className="phead">
                    <Collapse onClick={nav.close} />
                    <div className="dots">
                      {ORDER.map((o) => <button key={o} type="button" aria-label={o} className={`dot ${o === id ? 'on' : ''}`} onClick={() => nav.go(o)} />)}
                    </div>
                  </div>
                  <div className="mgrid">
                    {getTiles(id, true).map((s, k) => <Tile key={s.key} s={s} i={k} mobile onAct={nav.onAct} />)}
                  </div>
                  <div className="pfoot">
                    {i > 0 ? <button type="button" className="lnk" onClick={() => nav.go(ORDER[i - 1])}>← {ORDER[i - 1]}</button> : <span />}
                    {i < ORDER.length - 1 ? <button type="button" className="lnk" onClick={() => nav.go(ORDER[i + 1])}>{ORDER[i + 1]} →</button> : <span />}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
        <section className="case" style={palVars(theme, 'case')} aria-label="Case study" aria-hidden={!cs} inert={!cs}>
          <div className="pbg" />
          <div className="scroll">
            <div className="phead"><div style={{ display: 'flex', gap: 8 }}><Collapse onClick={nav.close} /><Collapse back onClick={nav.closeCase} /></div></div>
            <div className="mgrid">
              {getTiles('case', true, nav.s.cp).map((s, k) => <Tile key={s.key} s={s} i={k} mobile onAct={nav.onAct} />)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
