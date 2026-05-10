# Agentic AI Portfolio Rebrand Design

## Goal

Rebrand the portfolio from a general AI Engineer showcase into a recruiter-focused **Agentic AI Engineer** portfolio. The first impression should communicate an elite builder who ships autonomous AI systems, RAG products, computer vision systems, desktop AI applications, and deployment-grade ML infrastructure.

## Audience

Primary audience: AI recruiters.

The page should let recruiters understand within 10 seconds:
- the candidate is an Agentic AI Engineer, not only a model user;
- the candidate builds end-to-end AI systems;
- the candidate has proof through projects, metrics, publication, and production-oriented tools;
- the candidate is available and easy to contact.

## Visual Direction

Use **Agentic Systems Command Center** as the core direction.

The design should feel like a sharp AI systems control room: dark industrial surfaces, telemetry panels, thin borders, grid lines, signal accents, and restrained motion. Avoid generic purple-gradient AI visuals and rounded SaaS card templates.

The approved preview direction is the command-center hero with:
- system status label;
- large technical headline;
- capability chips;
- mission-log CTA;
- profile media panel;
- proof counters.

## Theme and Profile Transition

The theme toggle is the signature interaction.

States:
- **Dark mode**: no-sunglasses profile image; operator / command-center mood.
- **Light mode**: sunglasses profile image; field-ready elite-builder mood.

Transition behavior:
- dark to light: play the provided video from no sunglasses to sunglasses;
- light to dark: play the same video in reverse;
- after playback, swap to the matching static profile image for quality and performance;
- if `prefers-reduced-motion` is enabled, skip video playback and immediately swap theme and image.

The theme control must be keyboard accessible and must preserve readable contrast in both themes.

## Information Architecture

### 1. Hero / Command Deck

Purpose: make the positioning obvious immediately.

Content:
- headline: Agentic AI Engineer building autonomous AI systems from research to production;
- short supporting copy about LLM agents, RAG systems, computer vision, desktop AI products, and MLOps;
- proof chips: AI Agents, RAG, Computer Vision, Desktop AI, MLOps;
- primary CTA: View Mission Logs;
- secondary CTA: Send Signal / Contact;
- profile theme transition module.

### 2. Capability Matrix

Replace the current generic skills tag list with a capability matrix organized by outcomes:
- Agentic Workflows;
- LLM / RAG Systems;
- Computer Vision;
- AI Product Deployment.

Each capability should show tools plus what the candidate can build with them.

### 3. Mission Logs

Replace “Projects” with mission-style case studies.

Each project card should show:
- problem;
- system built;
- AI/agent role;
- stack;
- impact or result;
- links and screenshots where available.

Projects should emphasize AI Stock Advisor, AI Stock Advisor Rust/Tauri, SmartDocQA, YOLOLabel AI, News Agent, navigation, TempRMOT, and GPT-JSON.

### 4. Operational Timeline

Keep experience and education, but frame them as deployment history. Show roles, dates, systems built, and production/research responsibilities.

### 5. Proof Layer

Surface credibility items near the project section:
- publication;
- metrics;
- screenshots;
- GitHub links;
- downloadable CV.

### 6. Contact / Transmission

Keep the contact form and Telegram delivery. Rename the section to feel aligned with the system metaphor, but keep it easy for recruiters to understand.

## React Migration

Migrate from static HTML/CSS/vanilla JS to **Vite + React**.

Recommended structure:

```text
src/
  data/
    projects.js
    profile.js
  components/
    layout/
      Navbar.jsx
      Footer.jsx
    hero/
      Hero.jsx
      ThemeProfileTransition.jsx
    sections/
      CapabilityMatrix.jsx
      MissionLogs.jsx
      OperationalTimeline.jsx
      ProofLayer.jsx
      ContactTransmission.jsx
    ui/
      Button.jsx
      TechTag.jsx
      Modal.jsx
      Lightbox.jsx
  hooks/
    useThemeTransition.js
    useReducedMotion.js
  styles/
    tokens.css
    global.css
    components.css
```

Existing hardcoded project and profile data should move into `src/data`. Components should stay small and focused.

Netlify should build Vite and publish `dist`.

## Contact and Security

Keep `netlify/functions/sendMessage.js`, but improve it for public form handling:
- validate name, email, subject, and message on the server;
- enforce length limits;
- avoid returning raw internal error messages to the client;
- keep Telegram credentials in Netlify environment variables only.

Remove localStorage contact storage because it stores personal data without a user benefit.

## Accessibility and Responsiveness

Requirements:
- keyboard-accessible navigation, modals, lightbox, and theme toggle;
- reduced-motion fallback for theme video and section reveals;
- readable contrast in dark and light mode;
- responsive layouts for mobile, tablet, and desktop;
- no horizontal overflow on small screens.

## Testing and QA

Verify:
- `npm run build` passes;
- dark to light theme transition;
- light to dark reverse transition;
- reduced-motion fallback;
- mobile navigation;
- project modal and gallery lightbox;
- contact form validation and success/error states;
- responsive breakpoints at 375, 768, 1024, and 1440px.

## Out of Scope

Do not add:
- CMS;
- analytics;
- new backend services beyond the existing Netlify Function;
- heavy 3D/WebGL effects;
- unrelated content rewrites beyond what supports the rebrand.
