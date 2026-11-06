import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { useState } from 'react';
import { about, caseStudies, projects, resume, site, work } from '../data/content';
import type { ProjectId } from '../data/content';
import type { SectionId } from '../data/design';

export type Kind = 'a' | 'b' | 'c';
export type Act =
  | { t: 'case'; id: ProjectId }
  | { t: 'go'; to: SectionId }
  | { t: 'link'; href: string }
  | { t: 'download'; href: string };
export interface TileSpec {
  key: string;
  kind: Kind;
  area: [number, number, number, number]; // desktop grid-area: row start / col start / row end / col end
  span: number; // mobile column span
  cls?: string;
  act?: Act;
  arrow?: boolean;
  body: ReactNode;
}

const Arrow = () => (
  <span className="arr">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
  </span>
);
const Pills = ({ xs }: { xs: string[] }) => (
  <div className="pills">{xs.map((x) => <span className="pill" key={x}>{x}</span>)}</div>
);
const Meta = ({ children }: { children: ReactNode }) => <div className="meta">{children}</div>;

function CopyChip() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copy"
      onClick={() => {
        navigator.clipboard?.writeText(site.email).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        });
      }}
    >
      {done ? 'copied' : 'copy'}
    </button>
  );
}

const T = (id: string, kind: Kind, area: TileSpec['area'], span: number, body: ReactNode, extra: Partial<TileSpec> = {}): TileSpec => ({
  key: id, kind, area, span, body, ...extra,
});
const title = (name: string) => T('title', 'c', [1, 1, 7, 3], 2, <div className="tt">{name}</div>, { cls: 'ttile' });
const Bullets = ({ xs }: { xs: string[] }) => (
  <ul className="blist">{xs.map((x) => <li key={x}>{x}</li>)}</ul>
);
// The real resume, embedded. Browsers that cannot show a PDF inline (most phones) fall back to the page image.
const PdfPreview = () => (
  <>
    <object className="pdfobj" data={`${site.resume}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} type="application/pdf" aria-label="Resume preview">
      <img src={site.resumePreview} alt="Resume, page 1" />
    </object>
    <a className="dochit" href={site.resume} target="_blank" rel="noreferrer" aria-label="Open the resume PDF" />
  </>
);
const Points = ({ xs }: { xs: string[] }) => <Bullets xs={xs} />;

function caseTiles(pid: ProjectId, mobile: boolean): TileSpec[] {
  const c = caseStudies[pid];
  const n = String(Object.keys(caseStudies).indexOf(pid) + 1).padStart(2, '0');
  const head = T('head', 'c', [1, 1, 3, 9], 2, (
    <><Meta>case study · {n}</Meta><div className="h xxl">{c.title}</div><div className="s">{c.summary}</div><div className="s role">{c.role}</div></>
  ));
  const status = T('status', 'b', [1, 9, 3, 13], 2, <><Meta>status</Meta><div className="h xl">{c.status}</div></>);
  const problem = T('problem', 'a', [3, 1, 5, 5], 2, <><Meta>the problem</Meta><div className="s">{c.problem}</div></>);
  const arch = T('arch', 'c', [3, 5, 7, 9], 2, <><Meta>architecture and decisions</Meta><Bullets xs={c.architecture} /></>);
  const mine = T('mine', 'a', [5, 1, 7, 5], 2, <><Meta>my contribution</Meta><Bullets xs={c.contribution} /></>);
  const out: TileSpec[] = [head, status, problem, arch];
  if (c.figure) {
    const fig = T('figure', 'a', [3, 9, 7, 13], 2, (
      <div className="figbox">
        <Meta>{c.figureNote}</Meta>
        <img className="figimg" src={c.figure} alt={c.figureNote} />
        <Pills xs={c.stack} />
      </div>
    ));
    out.push(fig, mine);
  } else {
    const hasLinks = c.links.length > 0;
    out.push(
      T('stack', 'a', [3, 9, hasLinks ? 5 : 7, 13], 2, <><Meta>built with</Meta><Pills xs={c.stack} /></>),
    );
    if (hasLinks) {
      out.push(T('links', 'b', [5, 9, 7, 13], 2, (
        <><Meta>code</Meta><div className="h">{c.links[0].label}</div></>
      ), { act: { t: 'link', href: c.links[0].href }, arrow: true }));
    }
    out.push(mine);
  }
  if (mobile) {
    // single column order: keep the story linear
    const order = ['head', 'status', 'problem', 'arch', 'figure', 'stack', 'links', 'mine'];
    out.sort((x, y) => order.indexOf(x.key) - order.indexOf(y.key));
  }
  return out;
}

export function getTiles(id: SectionId | 'case', mobile: boolean, pid: ProjectId = 'healthcare'): TileSpec[] {
  switch (id) {
    case 'work':
      return [
        title('work'),
        T('newscape', 'b', [1, 3, 5, 8], 2, (
          <>
            <Meta>{work.newscape.meta}</Meta>
            <div className="h">{work.newscape.title}</div>
            <div className="s">{work.newscape.org}</div>
            <Points xs={work.newscape.points} />
            <div className="big">{work.newscape.big}</div>
            <div className="cap">{work.newscape.cap}</div>
          </>
        ), { act: { t: 'case', id: 'healthcare' }, arrow: true }),
        T('verifylens', 'a', [1, 8, 4, 13], 2, (
          <><Meta>{work.verifylens.meta}</Meta><div className="h">{work.verifylens.title}</div><div className="s">{work.verifylens.org}</div><Points xs={work.verifylens.points} /></>
        ), { act: { t: 'case', id: 'verifylens' }, arrow: true }),
        T('linde', 'c', [4, 8, 7, 13], 2, (
          <><Meta>{work.linde.meta}</Meta><div className="h">{work.linde.title}</div><div className="s">{work.linde.org}</div><Points xs={work.linde.points} /></>
        )),
        T('count', 'a', [5, 3, 7, 6], 1, (<><div className="bignum">{work.roles.count}</div><div className="s">{work.roles.label}</div></>)),
        T('stack', 'c', [5, 6, 7, 8], 1, <Pills xs={work.stack} />),
      ];
    case 'projects': {
      const hc = caseStudies.healthcare;
      const open = (id: ProjectId): Act => ({ t: 'case', id });
      const featured = T('featured', 'a', [1, 3, 5, 9], 2, (
        <>
          <Meta>01 · featured</Meta><div className="h xl">{hc.title}</div><div className="s">{hc.summary}</div>
          <Pills xs={hc.stack.slice(0, 4)} /><div className="cta">read the case study</div>
        </>
      ), { act: open('healthcare'), arrow: true });
      const vl = (area: TileSpec['area'], span: number) => T('verifylens', 'c', area, span, (
        <><Meta>02</Meta><div className="h">{caseStudies.verifylens.title}</div><div className="s">{caseStudies.verifylens.summary}</div></>
      ), { act: open('verifylens'), arrow: true });
      const ja = (area: TileSpec['area'], span: number) => T('job', 'a', area, span, (
        <><Meta>03</Meta><div className="h">{caseStudies['job-assistant'].title}</div><div className="s">{caseStudies['job-assistant'].summary}</div></>
      ), { act: open('job-assistant'), arrow: true });
      const exp = (area: TileSpec['area'], span: number) => T('experiments', 'c', area, span, (
        <>
          <Meta>experiments</Meta>
          <ul className="blist exp">
            {projects.experiments.map((e) => (
              <li key={e.title}>
                {e.href ? <a href={e.href} target="_blank" rel="noreferrer">{e.title}</a> : <b>{e.title}</b>}
                <span> · {e.text} {e.status}</span>
              </li>
            ))}
          </ul>
        </>
      ));
      if (mobile) {
        return [
          title('projects'), featured,
          T('outcome', 'b', [1, 1, 1, 1], 1, <><Meta>outcome</Meta><div className="bigm">{projects.outcome.big}</div></>),
          ja([1, 1, 1, 1], 1), vl([1, 1, 1, 1], 2), exp([1, 1, 1, 1], 2),
        ];
      }
      return [
        title('projects'), featured,
        T('outcome', 'b', [1, 9, 3, 13], 1, (<><div className="big">{projects.outcome.big}</div><div className="cap">{projects.outcome.cap}</div></>)),
        vl([3, 9, 5, 13], 2), ja([5, 3, 7, 7], 1), exp([5, 7, 7, 13], 1),
      ];
    }
    case 'about': {
      const p = about.points;
      const pt = (i: number, area: TileSpec['area'], kind: Kind) => T(`p${i}`, kind, area, 1, (
        <><Meta>0{i + 1}</Meta><div className="h">{p[i].title}</div><div className="s">{p[i].text}</div></>
      ));
      return [
        title('about'),
        T('intro', 'a', [1, 3, 3, 9], 2, <><Meta>hello</Meta><div className="intro">{about.headline}</div><div className="s">{about.intro}</div></>),
        T('cert', 'b', [1, 9, 3, 13], 2, <><Meta>certified</Meta><div className="h">{about.cert.title}</div><div className="s">{about.cert.sub}</div><div className="s">{about.cert.id}</div></>),
        pt(0, [3, 3, 7, 5], 'a'), pt(1, [3, 5, 7, 7], 'c'), pt(2, [3, 7, 7, 9], 'a'), pt(3, [3, 9, 7, 11], 'c'),
        T('edu', 'a', [3, 11, 7, 13], 2, <><Meta>education</Meta><div className="h">{about.education.title}</div><div className="s">{about.education.sub}</div></>),
      ];
    }
    case 'contact':
      return [
        title('contact'),
        T('hello', 'b', [1, 3, 5, 9], 2, (
          <>
            <Meta>open to roles</Meta><div className="hello">SAY HELLO.</div>
            <a className="mail" href={`mailto:${site.email}`}>{site.email}</a><div><CopyChip /></div>
          </>
        )),
        T('github', 'a', [1, 9, 3, 13], 1, <><Meta>code</Meta><div className="h">GitHub</div></>, { act: { t: 'link', href: site.github }, arrow: true }),
        T('linkedin', 'c', [3, 9, 5, 13], 1, <><Meta>network</Meta><div className="h">LinkedIn</div></>, { act: { t: 'link', href: site.linkedin }, arrow: true }),
        T('based', 'a', [5, 3, 7, 9], 2, <><Meta>based in</Meta><div className="h">{site.location}</div><div className="s">{site.openTo}</div></>),
        T('resume', 'c', [5, 9, 7, 13], 2, <><Meta>also</Meta><div className="h">Resume</div></>, { act: { t: 'go', to: 'resume' }, arrow: true }),
      ];
    case 'resume':
      return [
        title('resume'),
        T('preview', 'c', [1, 3, 7, 9], 2, <><Meta>resume.pdf</Meta><PdfPreview /></>, { cls: 'previewtile' }),
        T('download', 'b', [1, 9, 3, 13], 2, <><Meta>pdf</Meta><div className="hello" style={{ fontSize: mobile ? 34 : 40 }}>DOWNLOAD</div></>, { act: { t: 'download', href: site.resume }, arrow: true }),
        T('summary', 'a', [3, 9, 5, 13], 2, <><Meta>summary</Meta><div className="h">{resume.summary.title}</div><div className="s">{resume.summary.sub}</div></>),
        T('stack', 'a', [5, 9, 7, 13], 2, <Pills xs={resume.stack} />),
      ];
    case 'case':
      return caseTiles(pid, mobile);
  }
}

export function Tile({ s, i, mobile, onAct }: { s: TileSpec; i: number; mobile: boolean; onAct: (a: Act) => void }) {
  const style = {
    ...(mobile ? { gridColumn: `span ${s.span}` } : { gridArea: s.area.join('/') }),
    '--d': `${mobile ? (0.3 + i * 0.06).toFixed(2) : (0.35 + i * 0.07).toFixed(2)}s`,
  } as CSSProperties;
  const cls = `tile t-${s.kind} ${s.cls ?? ''} ${s.act ? 'nav' : ''}`;
  const inner = <>{s.body}{s.arrow && <Arrow />}</>;
  const a = s.act;
  if (a && (a.t === 'link' || a.t === 'download')) {
    return (
      <a className={cls} style={style} href={a.href} target={a.t === 'link' ? '_blank' : undefined} rel="noreferrer" download={a.t === 'download' ? '' : undefined}>
        {inner}
      </a>
    );
  }
  if (a) {
    const key = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAct(a); } };
    return <div className={cls} style={style} role="button" tabIndex={0} onClick={() => onAct(a)} onKeyDown={key}>{inner}</div>;
  }
  return <div className={cls} style={style}>{inner}</div>;
}
