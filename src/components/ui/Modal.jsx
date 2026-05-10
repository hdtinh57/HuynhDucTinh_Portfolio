import { useEffect } from 'react';
import { TechTag } from './TechTag.jsx';

export function Modal({ project, onClose, onOpenLightbox }) {
  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, project]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay active"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <article className="modal-container" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button className="modal-close" type="button" aria-label="Close project details" onClick={onClose}>
          <i className="fas fa-times" aria-hidden="true" />
        </button>
        <div className="modal-body">
          <header className="modal-header">
            <p className="eyebrow">{project.signal}</p>
            <h2 id="project-modal-title">{project.title}</h2>
            <p>{project.system}</p>
          </header>

          {(project.image || project.video) && (
            <div className="modal-media">
              {project.video ? (
                <video src={project.video} controls muted playsInline />
              ) : (
                <img src={project.image} alt={`${project.title} interface`} />
              )}
            </div>
          )}

          <div className="modal-grid">
            <section>
              <h3>Problem</h3>
              <p>{project.problem}</p>
              <h3>AI Role</h3>
              <p>{project.aiRole}</p>
              <h3>Impact</h3>
              <p>{project.impact}</p>
            </section>
            <aside>
              <h3>Stack</h3>
              <div className="tag-list">
                {project.stack.map((item) => (
                  <TechTag key={item}>{item}</TechTag>
                ))}
              </div>
              {project.links.length > 0 && (
                <div className="modal-links">
                  {project.links.map((link) => (
                    <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                      <i className={link.icon} aria-hidden="true" /> {link.label}
                    </a>
                  ))}
                </div>
              )}
            </aside>
          </div>

          {project.gallery.length > 0 && (
            <section className="gallery-grid" aria-label={`${project.title} screenshots`}>
              {project.gallery.map((item, index) => (
                <button
                  type="button"
                  className="gallery-item"
                  key={item.src}
                  onClick={() => onOpenLightbox(project.gallery, index)}
                >
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <span>{item.caption}</span>
                </button>
              ))}
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
