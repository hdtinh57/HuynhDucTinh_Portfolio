import { proofItems } from '../../data/profile.js';

export function ProofLayer() {
  return (
    <section id="proof" className="section-block proof-layer">
      <div className="container">
        <header className="section-header">
          <div>
            <p className="eyebrow">proof.layer()</p>
            <h2>Signals recruiters can verify</h2>
          </div>
          <p className="lede">Publication, source code, and product evidence in one credibility layer.</p>
        </header>
        <div className="proof-grid">
          {proofItems.map((item) => (
            <a
              className="proof-card"
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
