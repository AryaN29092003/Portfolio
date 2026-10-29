import { experiments } from '../data/experiments';
import { SectionHeading } from '../components/SectionHeading';
import './Experiments.css';

export function Experiments() {
  return (
    <section id="experiments" className="experiments theme-dusk" aria-labelledby="experiments-title">
      <div className="section__inner">
        <SectionHeading id="experiments" number="05">
          On the side
        </SectionHeading>
        <ul className="experiments__list" role="list">
          {experiments.map((e) => (
            <li key={e.id} className="experiments__row">
              <h3>{e.title}</h3>
              <p>{e.text}</p>
              <p className="experiments__status">{e.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
