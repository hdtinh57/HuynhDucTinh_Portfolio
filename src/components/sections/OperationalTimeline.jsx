import { education, timeline } from '../../data/profile.js';
import { TechTag } from '../ui/TechTag.jsx';

export function OperationalTimeline() {
  return (
    <section id="timeline" className="section-block">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">deployment.history()</p>
          <h2>Operational Timeline</h2>
          <p className="lede">Roles and education framed as systems built, researched, and deployed.</p>
        </header>
        <div className="timeline-list">
          {timeline.map((item) => (
            <article className="timeline-card" key={`${item.company}-${item.date}`}>
              <div>
                <p className="eyebrow">{item.date}</p>
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
              </div>
              <div>
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.degree}>
              <p className="eyebrow">{item.date}</p>
              <h3>{item.degree}</h3>
              <strong>{item.school}</strong>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
