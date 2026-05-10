import { Button } from '../ui/Button.jsx';
import { TechTag } from '../ui/TechTag.jsx';
import { ThemeProfileTransition } from './ThemeProfileTransition.jsx';
import { profile, proofStats } from '../../data/profile.js';

const heroChips = ['AI Agents', 'RAG Systems', 'Computer Vision', 'Desktop AI', 'MLOps'];

export function Hero({ themeState }) {
  return (
    <section id="home" className="hero section-block">
      <div className="hero-bg-text" aria-hidden="true">AGENTIC</div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="system-status"><span aria-hidden="true" /> AI SYSTEMS ONLINE</p>
          <h1>{profile.headline}</h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="tag-list" aria-label="Core capabilities">
            {heroChips.map((chip, index) => (
              <TechTag tone={index === 0 ? 'signal' : 'default'} key={chip}>{chip}</TechTag>
            ))}
          </div>
          <div className="hero-actions">
            <Button as="a" className="btn-primary" href="#mission-logs">
              <i className="fas fa-folder-open" aria-hidden="true" /> View Mission Logs
            </Button>
            <Button as="a" href="#contact">
              <i className="fas fa-paper-plane" aria-hidden="true" /> Send Signal
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <ThemeProfileTransition profileImages={profile.profileImages} themeState={themeState} />
          <div className="proof-strip">
            {proofStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
