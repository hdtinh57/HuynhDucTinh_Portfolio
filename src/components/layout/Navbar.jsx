import { useState } from 'react';
import { navItems, profile } from '../../data/profile.js';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="navbar">
      <nav className="nav-container" aria-label="Main navigation">
        <a className="nav-logo" href="#home" onClick={closeMenu}>
          <span>{profile.handle}</span>
          <span className="logo-signal" aria-hidden="true" />
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span />
          <span />
          <span />
        </button>
        <div id="nav-menu" className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
