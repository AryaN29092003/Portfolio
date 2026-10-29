import type { Project } from '../data/projects';

/** The expanded view of one project: meta on the left, story on the right. */
export function CaseStudy({ project }: { project: Project }) {
  return (
    <div className="case__grid">
      <div className="case__meta">
        <h3 className="case__title">{project.title}</h3>
        <dl>
          <dt>Role</dt>
          <dd>{project.role}</dd>
          <dt>Status</dt>
          <dd>{project.status}</dd>
          <dt>Built with</dt>
          <dd>{project.stack.join(', ')}</dd>
        </dl>
        {project.links.length > 0 && (
          <p className="case__links">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </p>
        )}

      </div>

      <div className="case__story">
        <figure className="case__figure">
          <figcaption>{project.figureNote}</figcaption>
        </figure>
        <div className="case__cols">
          <section>
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </section>
          <section>
            <h4>Architecture and decisions</h4>
            <ul>
              {project.architecture.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4>My contribution</h4>
            <ul>
              {project.contribution.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
