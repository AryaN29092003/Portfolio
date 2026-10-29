import { approach } from '../data/site';
import { GlyphField } from '../components/GlyphField';
import { SectionHeading } from '../components/SectionHeading';
import './Approach.css';

export function Approach() {
  return (
    <section id="approach" className="approach theme-dark" aria-labelledby="approach-title">
      <GlyphField />
      <div className="section__inner">
        <SectionHeading id="approach" number="03">
          {approach.heading}
        </SectionHeading>
        <div className="approach__points">
          {approach.points.map((p) => (
            <div key={p.title} className="approach__point">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
