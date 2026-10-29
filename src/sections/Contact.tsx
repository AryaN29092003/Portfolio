import { site } from '../data/site';
import { GlyphField } from '../components/GlyphField';
import { SectionHeading } from '../components/SectionHeading';
import './Contact.css';

export function Contact() {
  return (
    <section id="contact" className="contact theme-dark" aria-labelledby="contact-title">
      <GlyphField />
      <div className="section__inner">
        <SectionHeading id="contact" number="06">
          Get in touch
        </SectionHeading>
        <a className="contact__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <ul className="contact__links" role="list">
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.resume}>Resume</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
