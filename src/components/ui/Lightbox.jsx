import { useEffect, useState } from 'react';

export function Lightbox({ gallery, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + gallery.length) % gallery.length);
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % gallery.length);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gallery.length, onClose]);

  if (!gallery.length) return null;

  const item = gallery[index];

  return (
    <div className="lightbox-overlay active" role="dialog" aria-modal="true" aria-label="Project screenshot viewer">
      <button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={onClose}>
        <i className="fas fa-times" aria-hidden="true" />
      </button>
      <button
        className="lightbox-prev"
        type="button"
        aria-label="Previous image"
        onClick={() => setIndex((current) => (current - 1 + gallery.length) % gallery.length)}
      >
        <i className="fas fa-chevron-left" aria-hidden="true" />
      </button>
      <figure className="lightbox-content">
        <img src={item.src} alt={item.caption} />
        <figcaption>{item.caption} ({index + 1}/{gallery.length})</figcaption>
      </figure>
      <button
        className="lightbox-next"
        type="button"
        aria-label="Next image"
        onClick={() => setIndex((current) => (current + 1) % gallery.length)}
      >
        <i className="fas fa-chevron-right" aria-hidden="true" />
      </button>
    </div>
  );
}
