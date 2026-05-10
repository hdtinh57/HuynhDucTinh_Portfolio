import { useState } from 'react';
import { profile, socials } from '../../data/profile.js';
import { Button } from '../ui/Button.jsx';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validateForm(form) {
  if (form.name.trim().length < 2) return 'Name must be at least 2 characters.';
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Enter a valid email address.';
  if (form.message.trim().length < 10) return 'Message must be at least 10 characters.';
  if (form.name.length > 100 || form.email.length > 120 || form.subject.length > 160 || form.message.length > 2000) {
    return 'Message fields are too long.';
  }
  return '';
}

export function ContactTransmission() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validateForm(form);

    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/.netlify/functions/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Unable to send message.');
      }

      setForm(initialForm);
      setStatus({ type: 'success', message: 'Signal received. I will reply soon.' });
    } catch {
      setStatus({ type: 'error', message: 'Transmission failed. Please email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-block contact-section">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">transmission.open()</p>
          <h2>Send Signal</h2>
          <p className="lede">Recruiting for AI systems, agents, RAG, CV, or deployment-heavy ML work? Send a message directly to my Telegram inbox.</p>
          <div className="contact-lines">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
          </div>
          <div className="footer-socials contact-socials">
            {socials.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} key={social.href}>
                <i className={social.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={updateField} autoComplete="name" required maxLength={100} />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required maxLength={120} />
          </label>
          <label>
            Subject
            <input name="subject" value={form.subject} onChange={updateField} maxLength={160} />
          </label>
          <label>
            Message
            <textarea name="message" value={form.message} onChange={updateField} required rows="6" maxLength={2000} />
          </label>
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
          <Button className="btn-primary" type="submit" disabled={isSubmitting}>
            <i className={isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'} aria-hidden="true" />
            {isSubmitting ? 'Transmitting...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  );
}
