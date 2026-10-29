import { roles } from '../data/experience';
import { SectionHeading } from '../components/SectionHeading';
import './Experience.css';

const areas: Record<string, string> = {
  newscape: 'nw',
  verifylens: 'vl',
  linde: 'li',
  tdnvm: 'td',
  education: 'ed',
  cert: 'ce',
};

export function Experience() {
  return (
    <section id="experience" className="experience theme-light" aria-labelledby="experience-title">
      <div className="section__inner">
        <SectionHeading id="experience" number="04">
          Experience
        </SectionHeading>
        <ul className="bento experience__bento" role="list">
          {roles.map((r) => (
            <li key={r.id} className={`tile tile--role tile--${r.size}`} style={{ gridArea: areas[r.id] }}>
              <p className="tile__when">{r.when}</p>
              <h3 className="tile__title">{r.title}</h3>
              <p className="tile__org">{r.org}</p>
              {r.points.map((pt) => (
                <p key={pt} className="tile__summary">
                  {pt}
                </p>
              ))}
            </li>
          ))}
          <li className="tile tile--empty" style={{ gridArea: 'e1' }} aria-hidden="true" data-tone="2" />
          <li className="tile tile--empty" style={{ gridArea: 'e2' }} aria-hidden="true" data-tone="1" />
          <li className="tile tile--empty" style={{ gridArea: 'e3' }} aria-hidden="true" data-tone="3" />
        </ul>
      </div>
    </section>
  );
}
