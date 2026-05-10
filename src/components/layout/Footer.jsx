import { navItems, profile, socials } from '../../data/profile.js';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>{profile.handle}</strong>
          <p>{profile.role}</p>
        </div>
        <div className="footer-links">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </div>
        <div className="footer-socials">
          {socials.map((social) => (
            <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} key={social.href}>
              <i className={social.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
