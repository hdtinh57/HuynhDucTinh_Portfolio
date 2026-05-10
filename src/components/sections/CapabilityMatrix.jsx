import { capabilities } from '../../data/profile.js';
import { TechTag } from '../ui/TechTag.jsx';

export function CapabilityMatrix() {
  return (
    <section id="capabilities" className="section-block">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">capability.matrix()</p>
          <h2>AI systems I can ship</h2>
          <p className="lede">A recruiter-readable map of the outcomes behind the tools.</p>
        </header>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article className="capability-card" key={capability.title}>
              <p className="eyebrow">{capability.signal}</p>
              <h3>{capability.title}</h3>
              <p>{capability.outcome}</p>
              <div className="tag-list">
                {capability.tools.map((tool) => (
                  <TechTag key={tool}>{tool}</TechTag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
