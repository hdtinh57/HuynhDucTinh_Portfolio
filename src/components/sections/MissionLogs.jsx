import { projects } from '../../data/projects.js';
import { Button } from '../ui/Button.jsx';
import { TechTag } from '../ui/TechTag.jsx';

export function MissionLogs({ onSelectProject }) {
  return (
    <section id="mission-logs" className="section-block">
      <div className="container">
        <header className="section-header split-header">
          <div>
            <p className="eyebrow">selected.deployments()</p>
            <h2>Mission Logs</h2>
          </div>
          <p className="lede">Case studies framed by problem, system, AI role, and measurable impact.</p>
        </header>
        <div className="mission-grid">
          {projects.map((project) => (
            <article className={`mission-card ${project.featured ? 'featured' : ''}`} key={project.id}>
              <div className="mission-media">
                {project.video ? (
                  <video src={project.video} muted loop playsInline preload="metadata" />
                ) : project.image ? (
                  <img src={project.image} alt={`${project.title} interface`} loading="lazy" />
                ) : (
                  <i className="fas fa-microchip" aria-hidden="true" />
                )}
                <span>{project.signal}</span>
              </div>
              <div className="mission-body">
                <h3>{project.title}</h3>
                <p><strong>Problem:</strong> {project.problem}</p>
                <p><strong>System:</strong> {project.system}</p>
                <p><strong>Impact:</strong> {project.impact}</p>
                <div className="tag-list">
                  {project.stack.slice(0, 5).map((tool) => (
                    <TechTag key={tool}>{tool}</TechTag>
                  ))}
                </div>
                <div className="mission-actions">
                  <Button type="button" onClick={() => onSelectProject(project)}>Open Log</Button>
                  {project.links[0] && (
                    <Button as="a" href={project.links[0].href} target="_blank" rel="noreferrer">
                      <i className={project.links[0].icon} aria-hidden="true" /> {project.links[0].label}
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
