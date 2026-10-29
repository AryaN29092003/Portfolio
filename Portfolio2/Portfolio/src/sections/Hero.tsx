import { site } from '../data/site';
import './Hero.css';

export function Hero() {
  return (
    <section id="top" className="hero theme-dark" aria-labelledby="hero-title">
      <div className="hero__inner section__inner">
        <h1 id="hero-title" className="hero__name">
          <span className="hero__line">
            <span>Arya</span>
          </span>
          <span className="hero__line">
            <span>Nazare</span>
          </span>
        </h1>

        <div className="hero__body">
          <span className="hero__node" aria-hidden="true" />
          <p className="hero__headline">{site.headline}</p>
          <p className="hero__intro">{site.intro}</p>
          <p className="hero__links">
            <a href={site.resume}>Resume</a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
