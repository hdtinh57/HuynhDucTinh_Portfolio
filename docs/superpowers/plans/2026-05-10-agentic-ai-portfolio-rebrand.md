# Agentic AI Portfolio Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio to Vite + React and implement the Agentic Systems Command Center rebrand for an AI Engineer / Agentic AI Engineer audience.

**Architecture:** Replace the single static HTML/JS page with a Vite React app composed from focused data, hook, layout, hero, section, and UI components. Keep Netlify Functions for Telegram contact delivery, improve server-side validation, and publish the Vite `dist` output.

**Tech Stack:** Vite, React, vanilla CSS modules-by-file via global imports, Netlify Functions, Playwright/manual browser QA.

---

## File Structure

Create or modify these files:

```text
package.json                         # npm scripts and Vite/React dependencies
index.html                           # Vite root HTML shell
netlify.toml                         # Vite build and dist publish config
netlify/functions/sendMessage.js     # Telegram contact function with validation
src/main.jsx                         # React entrypoint
src/App.jsx                          # Page composition and modal/lightbox state
src/data/profile.js                  # Profile, nav, capabilities, timeline, proof data
src/data/projects.js                 # Mission log project data and gallery paths
src/hooks/useReducedMotion.js        # prefers-reduced-motion hook
src/hooks/useThemeTransition.js      # dark/light theme and profile video transition state
src/components/layout/Navbar.jsx     # Fixed nav and mobile nav
src/components/layout/Footer.jsx     # Footer links and identity
src/components/hero/Hero.jsx         # Command Deck hero content
src/components/hero/ThemeProfileTransition.jsx # Theme toggle/profile media module
src/components/sections/CapabilityMatrix.jsx   # Outcome-based skills matrix
src/components/sections/MissionLogs.jsx        # Project case-study cards
src/components/sections/OperationalTimeline.jsx # Experience + education timeline
src/components/sections/ProofLayer.jsx         # Metrics, publication, CV, proof links
src/components/sections/ContactTransmission.jsx # Contact form UI and client validation
src/components/ui/Button.jsx         # Shared button component
src/components/ui/TechTag.jsx        # Shared tech/capability tag component
src/components/ui/Modal.jsx          # Accessible project modal
src/components/ui/Lightbox.jsx       # Gallery lightbox
src/styles/tokens.css                # Theme tokens and CSS variables
src/styles/global.css                # Reset, base layout, accessibility, responsive shell
src/styles/components.css            # Component-level styles
```

Static assets stay under `portfolio-assets/`. Add the new profile transition assets there:

```text
portfolio-assets/images/profile/profile-dark.png
portfolio-assets/images/profile/profile-light.png
portfolio-assets/images/profile/profile-transition.mp4
```

If the final file names differ, update `src/data/profile.js` only.

---

### Task 1: Initialize Vite React Project Shell

**Files:**
- Create: `package.json`
- Modify: `index.html`
- Modify: `netlify.toml`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/components.css`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "agentic-ai-portfolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Replace `index.html` with Vite shell**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Huynh Duc Tinh - Agentic AI Engineer building autonomous AI systems, RAG products, computer vision systems, and deployment-grade ML infrastructure."
    />
    <meta
      name="keywords"
      content="Agentic AI Engineer, AI Engineer, AI Agents, RAG, Computer Vision, LLM, MLOps, Portfolio"
    />
    <meta name="author" content="Huynh Duc Tinh" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#070807" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Huynh Duc Tinh - Agentic AI Engineer" />
    <meta
      property="og:description"
      content="Building autonomous AI systems from research to production."
    />
    <meta property="og:image" content="/portfolio-assets/images/profile/profile-dark.png" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Huynh Duc Tinh - Agentic AI Engineer" />
    <meta
      property="twitter:description"
      content="Building autonomous AI systems from research to production."
    />
    <meta property="twitter:image" content="/portfolio-assets/images/profile/profile-dark.png" />
    <title>Huynh Duc Tinh | Agentic AI Engineer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Update `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
```

- [ ] **Step 4: Create `src/main.jsx`**

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 5: Create temporary `src/App.jsx`**

```jsx
function App() {
  return (
    <main className="app-shell">
      <section className="section-block">
        <div className="container">
          <p className="eyebrow">AI SYSTEMS ONLINE</p>
          <h1>Agentic AI Portfolio Rebrand</h1>
          <p className="lede">React shell is ready.</p>
        </div>
      </section>
    </main>
  );
}

export default App;
```

- [ ] **Step 6: Create `src/styles/tokens.css`**

```css
:root {
  --bg-primary: #070807;
  --bg-secondary: #0d100e;
  --bg-card: #101511;
  --bg-elevated: #171f18;
  --text-primary: #f4f7ef;
  --text-secondary: #b9c2b8;
  --text-muted: #758072;
  --border-color: #263126;
  --border-hover: #556255;
  --accent: #d7ff3f;
  --accent-secondary: #5fffd2;
  --accent-dim: rgba(215, 255, 63, 0.12);
  --danger: #ff6b2b;
  --shadow-signal: 0 0 28px rgba(215, 255, 63, 0.18);
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Space Mono', 'Fira Code', monospace;
  --speed-fast: 160ms;
  --speed-normal: 280ms;
  --speed-slow: 620ms;
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-sharp: cubic-bezier(0.77, 0, 0.175, 1);
}

:root[data-theme='light'] {
  --bg-primary: #f4f1e8;
  --bg-secondary: #e9e2d2;
  --bg-card: #fffaf0;
  --bg-elevated: #ffffff;
  --text-primary: #11150f;
  --text-secondary: #3c4438;
  --text-muted: #687160;
  --border-color: #c9c2ae;
  --border-hover: #181d15;
  --accent: #11150f;
  --accent-secondary: #0d7f68;
  --accent-dim: rgba(17, 21, 15, 0.08);
  --shadow-signal: 0 16px 60px rgba(17, 21, 15, 0.12);
}
```

- [ ] **Step 7: Create `src/styles/global.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background: var(--bg-primary);
}

body {
  min-width: 320px;
  overflow-x: hidden;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background var(--speed-slow) var(--ease-out), color var(--speed-slow) var(--ease-out);
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

img,
video {
  display: block;
  max-width: 100%;
}

.container {
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}

.section-block {
  border-bottom: 1px solid var(--border-color);
  padding: clamp(5rem, 10vw, 9rem) 0;
}

.eyebrow {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.lede {
  color: var(--text-secondary);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  max-width: 680px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 8: Create placeholder `src/styles/components.css`**

```css
.app-shell {
  min-height: 100vh;
  background:
    linear-gradient(rgba(215, 255, 63, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(215, 255, 63, 0.04) 1px, transparent 1px),
    var(--bg-primary);
  background-size: 48px 48px;
}
```

- [ ] **Step 9: Install dependencies**

Run: `npm install`

Expected: `node_modules/` exists and `package-lock.json` is created. Do not commit `package-lock.json` unless project policy changes; it is currently ignored.

- [ ] **Step 10: Build the shell**

Run: `npm run build`

Expected: Vite build completes and creates `dist/`.

- [ ] **Step 11: Commit**

```bash
git add package.json index.html netlify.toml src/main.jsx src/App.jsx src/styles/tokens.css src/styles/global.css src/styles/components.css
git commit -m "feat: initialize React portfolio shell"
```

---

### Task 2: Add Data Model for Profile, Capabilities, Timeline, Proof, and Projects

**Files:**
- Create: `src/data/profile.js`
- Create: `src/data/projects.js`

- [ ] **Step 1: Create `src/data/profile.js`**

```js
export const profile = {
  name: 'Huynh Duc Tinh',
  handle: 'H.D.TINH',
  role: 'Agentic AI Engineer',
  headline: 'Building autonomous AI systems from research to production.',
  summary:
    'I design and ship LLM agents, RAG systems, computer vision products, desktop AI applications, and deployment-grade ML infrastructure.',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'huynhductinh57@gmail.com',
  phone: '+84 908 695 723',
  profileImages: {
    dark: '/portfolio-assets/images/profile/profile-dark.png',
    light: '/portfolio-assets/images/profile/profile-light.png',
    transition: '/portfolio-assets/images/profile/profile-transition.mp4',
    fallbackDark: '/portfolio-assets/images/profile/your-photo.png',
    fallbackLight: '/portfolio-assets/images/profile/your-photo-about.jpg',
  },
};

export const navItems = [
  { label: 'Command', href: '#home' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Mission Logs', href: '#mission-logs' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Proof', href: '#proof' },
  { label: 'Contact', href: '#contact' },
];

export const proofStats = [
  { label: 'AI Systems Built', value: '9+' },
  { label: 'Publication', value: '1' },
  { label: 'Builder Mode', value: '24/7' },
];

export const capabilities = [
  {
    title: 'Agentic Workflows',
    signal: 'autonomy.layer',
    outcome: 'Designs multi-step AI workflows for crawling, rewriting, synthesis, research, and tool-using assistants.',
    tools: ['AI Agents', 'n8n', 'OpenAI API', 'Gemini API', 'Jina AI', 'Webhook APIs'],
  },
  {
    title: 'LLM / RAG Systems',
    signal: 'retrieval.core',
    outcome: 'Builds grounded document Q&A, knowledge bases, vector retrieval, and hallucination-resistant answer pipelines.',
    tools: ['LangChain', 'Qdrant', 'ChromaDB', 'Pinecone', 'BGE-M3', 'Mistral OCR'],
  },
  {
    title: 'Computer Vision',
    signal: 'vision.stack',
    outcome: 'Ships real-time detection, depth estimation, multi-object tracking, annotation tools, and model evaluation loops.',
    tools: ['YOLO11', 'TempRMOT', 'Depth Anything V2', 'OpenCV', 'PyTorch', 'Qwen-VL'],
  },
  {
    title: 'AI Product Deployment',
    signal: 'deploy.ops',
    outcome: 'Turns AI prototypes into usable products with APIs, desktop packaging, local storage, and optimized inference.',
    tools: ['FastAPI', 'Docker', 'Tauri 2.0', 'SQLite', 'TensorRT', 'ONNX Runtime'],
  },
];

export const timeline = [
  {
    company: 'Future Space Technology JSC',
    role: 'Full Stack AI Engineer',
    date: 'Oct 2025 — Present',
    summary:
      'Directed end-to-end AI product lifecycles as the sole core engineer, handling architecture, APIs, AI workflows, and deployment.',
    highlights: [
      'Developed AI Agent pipelines for data crawling, rewriting, and synthesis.',
      'Built real-time Computer Vision systems integrated with Next.js dashboards.',
      'Optimized inference latency using TensorRT and ONNX Runtime.',
    ],
    tags: ['AI Agents', 'Docker', 'TensorRT', 'ONNX', 'Next.js'],
  },
  {
    company: 'AiTA Lab, FPT University',
    role: 'AI Researcher',
    date: 'Jan 2025 — Jul 2025',
    summary:
      'Conducted research on distributed machine learning and privacy-preserving training techniques.',
    highlights: ['Explored federated learning architectures for privacy-preserving ML.'],
    tags: ['Federated Learning', 'Privacy-Preserving ML'],
  },
  {
    company: 'QAI FPT Software Quy Nhon',
    role: 'AI Engineer Intern',
    date: 'Jan 2024 — Apr 2024',
    summary:
      'Implemented RAG pipelines and backend services for enterprise AI proof-of-concepts.',
    highlights: [
      'Implemented RAG pipelines with Pinecone and ChromaDB.',
      'Developed FastAPI services to expose AI capabilities.',
      'Delivered Sales Support, Data Query, and Form-Filler chatbot POCs.',
    ],
    tags: ['LangChain', 'OpenAI', 'ChromaDB', 'FastAPI'],
  },
];

export const education = [
  {
    school: 'FPT School of Business & Technology',
    degree: 'Master of Software Engineering — AI',
    date: '2025 — Present',
    summary: 'Deepening expertise in AI system design, LLM research, and scalable intelligent applications.',
  },
  {
    school: 'FPT University Ho Chi Minh City',
    degree: 'Bachelor of Artificial Intelligence',
    date: '2021 — 2025',
    summary: 'Built a foundation in Machine Learning, NLP, and Computer Vision. Graduated with GPA 8.3/10.',
  },
];

export const proofItems = [
  {
    label: 'Published Research',
    value: 'MLHMI 2025',
    detail: 'LLM-guided multi-object tracking for retail scene understanding.',
    href: 'https://doi.org/10.1109/MLHMI66056.2025.00018',
  },
  {
    label: 'Desktop AI Product',
    value: 'Single-binary app',
    detail: 'AI Stock Advisor packaged for local desktop distribution.',
    href: 'https://github.com/hdtinh57/AI-Fintech',
  },
  {
    label: 'Open Source Systems',
    value: 'GitHub portfolio',
    detail: 'RAG, CV labeling, LLM optimization, and stock advisory systems.',
    href: 'https://github.com/hdtinh57',
  },
  {
    label: 'Download CV',
    value: 'PDF',
    detail: 'English CV for recruiters and technical reviewers.',
    href: '/CV/AIEngineer-HuynhDucTinh-Eng.pdf',
  },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/hdtinh57', icon: 'fab fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hdtinh57', icon: 'fab fa-linkedin-in' },
  { label: 'Telegram', href: 'https://t.me/hudutin', icon: 'fab fa-telegram-plane' },
];
```

- [ ] **Step 2: Create `src/data/projects.js`**

```js
export const projects = [
  {
    id: 'ai-stock-advisor',
    title: 'AI Stock Advisor',
    signal: 'market.agent',
    featured: true,
    image: '/portfolio-assets/images/projects/ai-stock-advisor/chat-main.png',
    problem: 'Vietnamese retail investors need fast, contextual stock research without manually gathering news, indicators, and reports.',
    system: 'Full-stack desktop advisory app with Gemini tool calling, stock research, technical/fundamental analysis, RAG knowledge base, watchlists, alerts, and PDF reports.',
    aiRole: 'Agent researches articles, invokes stock tools, calculates indicators, and streams personalized investment insights.',
    impact: 'Single .exe distribution with chat, screener, compare, alerts, and knowledge base.',
    stack: ['Gemini AI', 'React', 'FastAPI', 'RAG', 'SQLite', 'PyInstaller'],
    links: [{ label: 'GitHub', href: 'https://github.com/hdtinh57/AI-Fintech', icon: 'fab fa-github' }],
    gallery: [
      { src: '/portfolio-assets/images/projects/ai-stock-advisor/chat-main.png', caption: 'AI Chat Interface' },
      { src: '/portfolio-assets/images/projects/ai-stock-advisor/chat-analysis.png', caption: 'Automated Research & Indicators' },
      { src: '/portfolio-assets/images/projects/ai-stock-advisor/watchlist.png', caption: 'Watchlist' },
      { src: '/portfolio-assets/images/projects/ai-stock-advisor/screener.png', caption: 'Stock Screener' },
      { src: '/portfolio-assets/images/projects/ai-stock-advisor/compare.png', caption: 'Stock Comparison' },
      { src: '/portfolio-assets/images/projects/ai-stock-advisor/alerts.png', caption: 'Price Alerts' },
      { src: '/portfolio-assets/images/projects/ai-stock-advisor/knowledge.png', caption: 'Knowledge Base' },
    ],
  },
  {
    id: 'ai-broker-rust',
    title: 'AI Stock Advisor Rust Edition',
    signal: 'native.agent',
    featured: true,
    problem: 'Desktop AI tools need native performance, secure local secrets, and a small footprint.',
    system: 'Rust/Tauri rewrite with React UI, SQLite local storage, Stronghold secret storage, and Gemini function calling.',
    aiRole: 'Local-first assistant streams stock analysis through Tauri events while keeping user data private.',
    impact: 'Native desktop experience with ~15MB footprint and encrypted key storage.',
    stack: ['Rust', 'Tauri 2.0', 'React', 'SQLite', 'Gemini API'],
    links: [{ label: 'GitHub', href: 'https://github.com/hdtinh57/AI-Broker-Rust', icon: 'fab fa-github' }],
    gallery: [],
  },
  {
    id: 'smartdocqa',
    title: 'Smart Document Q&A',
    signal: 'retrieval.agent',
    featured: true,
    image: '/portfolio-assets/images/projects/smartdocqa/smartdocqa.png',
    problem: 'Documents with PDFs, images, tables, and layouts need accurate parsing before they can be queried reliably.',
    system: 'Multi-modal RAG system using OCR, BGE-M3 embeddings, Qdrant retrieval, and an interactive Streamlit interface.',
    aiRole: 'Retrieval pipeline grounds answers in parsed document evidence and filters stale or low-confidence sources.',
    impact: 'Hallucination-resistant document Q&A for PDFs and images.',
    stack: ['RAG', 'Qdrant', 'Mistral OCR', 'BGE-M3', 'Streamlit'],
    links: [{ label: 'GitHub', href: 'https://github.com/hdtinh57/SmartDocQA', icon: 'fab fa-github' }],
    gallery: [{ src: '/portfolio-assets/images/projects/smartdocqa/smartdocqa.png', caption: 'SmartDocQA Interface' }],
  },
  {
    id: 'yololabel',
    title: 'YOLOLabel AI',
    signal: 'vision.ops',
    featured: true,
    image: '/portfolio-assets/images/projects/yololabel-ai/yololabel-ai.png',
    problem: 'Object detection teams need faster dataset labeling, model review, and active learning loops.',
    system: 'Canvas labeling editor with YOLO model training, uncertainty ranking, prediction review, and MLOps dashboard.',
    aiRole: 'Model predictions and active learning prioritize the most useful images for human review.',
    impact: 'Complete Label → Train → Predict → Review loop in one tool.',
    stack: ['YOLO11', 'FastAPI', 'SQLite', 'Active Learning', 'Canvas'],
    links: [{ label: 'GitHub', href: 'https://github.com/hdtinh57/YOLOLabel_AI', icon: 'fab fa-github' }],
    gallery: [{ src: '/portfolio-assets/images/projects/yololabel-ai/yololabel-ai.png', caption: 'YOLOLabel AI Interface' }],
  },
  {
    id: 'newsagent',
    title: 'Automated News Aggregation Agent',
    signal: 'content.agent',
    problem: 'Editorial teams spend too much time collecting, filtering, deduplicating, rewriting, and publishing news.',
    system: 'n8n and Supabase pipeline that crawls 20+ sources, deduplicates articles, orchestrates multiple LLMs, and supports publishing workflows.',
    aiRole: 'Agents classify, tag, rewrite, and prepare SEO-optimized content with human checkpoints.',
    impact: '~80% editorial workload reduction and 150-200 articles/day pipeline capacity.',
    stack: ['n8n', 'Supabase', 'GPT-4o-mini', 'Gemini', 'Jina AI'],
    links: [],
    gallery: [],
  },
  {
    id: 'navigation',
    title: 'AI Navigation for Visually Impaired',
    signal: 'assistive.vision',
    problem: 'Visually impaired users need low-latency environmental understanding and voice-guided navigation.',
    system: 'Real-time object detection and depth estimation pipeline integrated with natural language guidance.',
    aiRole: 'Vision models detect objects and estimate distance; language layer converts scene state into spoken guidance.',
    impact: '~90% object detection accuracy and 94.7% depth accuracy within ±30 cm.',
    stack: ['YOLO11', 'Depth Anything V2', 'GPT-4o', 'PyTorch'],
    links: [],
    gallery: [],
  },
  {
    id: 'temprmot',
    title: 'LLM-Guided Multi-Object Tracking',
    signal: 'research.vision',
    video: '/portfolio-assets/images/projects/temprmot/temprmot-web.mp4',
    problem: 'Retail video understanding needs object tracking plus temporal reasoning over customer behavior.',
    system: 'Hybrid research system combining TempRMOT with LLM-assisted scene understanding and annotation pipelines.',
    aiRole: 'LLM layer improves interpretation of tracked objects and retail scene behavior.',
    impact: 'Published at MLHMI 2025 with 81.8% Exact Match and 84.5% Semantic Similarity.',
    stack: ['LLM', 'TempRMOT', 'PyTorch', 'OpenCV'],
    links: [{ label: 'Paper', href: 'https://doi.org/10.1109/MLHMI66056.2025.00018', icon: 'fas fa-external-link-alt' }],
    gallery: [],
  },
  {
    id: 'gptjson',
    title: 'GPT-JSON',
    signal: 'structured.qa',
    problem: 'Users need natural-language access to structured JSON data without writing custom queries.',
    system: 'LLM-powered app for conversational JSON querying with retrieval and lightweight web interaction.',
    aiRole: 'LLM interprets questions, retrieves relevant JSON context, and generates grounded responses.',
    impact: 'Real-time natural-language access to structured data.',
    stack: ['OpenAI', 'LangChain', 'ChromaDB', 'Gradio'],
    links: [{ label: 'Colab', href: 'https://colab.research.google.com/drive/1sXu8hfet21bB9ctB1UD9iQgfLZWKFUAk#scrollTo=msgQ_YLwcdUm', icon: 'fab fa-google' }],
    gallery: [],
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.js src/data/projects.js
git commit -m "feat: add portfolio content data model"
```

---

### Task 3: Build Shared UI Components and Hooks

**Files:**
- Create: `src/hooks/useReducedMotion.js`
- Create: `src/hooks/useThemeTransition.js`
- Create: `src/components/ui/Button.jsx`
- Create: `src/components/ui/TechTag.jsx`
- Create: `src/components/ui/Modal.jsx`
- Create: `src/components/ui/Lightbox.jsx`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Create `src/hooks/useReducedMotion.js`**

```js
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener('change', updatePreference);

    return () => query.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}
```

- [ ] **Step 2: Create `src/hooks/useThemeTransition.js`**

```js
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

export function useThemeTransition(profileImages) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [theme, setTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayImage, setDisplayImage] = useState(profileImages.dark);

  const effectiveImages = useMemo(
    () => ({
      dark: profileImages.dark || profileImages.fallbackDark,
      light: profileImages.light || profileImages.fallbackLight,
      transition: profileImages.transition,
    }),
    [profileImages],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    setDisplayImage(theme === 'dark' ? effectiveImages.dark : effectiveImages.light);
  }, [effectiveImages.dark, effectiveImages.light, theme]);

  function setThemeInstant(nextTheme) {
    setTheme(nextTheme);
    setIsTransitioning(false);
    setDisplayImage(nextTheme === 'dark' ? effectiveImages.dark : effectiveImages.light);
  }

  async function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const video = videoRef.current;

    if (prefersReducedMotion || !video || !effectiveImages.transition) {
      setThemeInstant(nextTheme);
      return;
    }

    setIsTransitioning(true);
    setTheme(nextTheme);

    if (nextTheme === 'light') {
      video.currentTime = 0;
      video.playbackRate = 1;
    } else {
      video.currentTime = Math.max(video.duration || 0, 0.01);
      video.playbackRate = -1;
    }

    try {
      await video.play();
    } catch {
      setThemeInstant(nextTheme);
    }
  }

  function handleVideoEnded() {
    const nextImage = theme === 'dark' ? effectiveImages.dark : effectiveImages.light;
    setDisplayImage(nextImage);
    setIsTransitioning(false);
  }

  return {
    theme,
    videoRef,
    displayImage,
    isTransitioning,
    prefersReducedMotion,
    toggleTheme,
    handleVideoEnded,
  };
}
```

- [ ] **Step 3: Create `src/components/ui/Button.jsx`**

```jsx
export function Button({ as: Component = 'button', className = '', children, ...props }) {
  return (
    <Component className={`btn ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/TechTag.jsx`**

```jsx
export function TechTag({ children, tone = 'default' }) {
  return <span className={`tech-tag tech-tag-${tone}`}>{children}</span>;
}
```

- [ ] **Step 5: Create `src/components/ui/Modal.jsx`**

```jsx
import { useEffect } from 'react';

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
    <div className="modal-overlay active" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
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
                  <span className="tech-tag" key={item}>{item}</span>
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
                <button type="button" className="gallery-item" key={item.src} onClick={() => onOpenLightbox(project.gallery, index)}>
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
```

- [ ] **Step 6: Create `src/components/ui/Lightbox.jsx`**

```jsx
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
      <button className="lightbox-prev" type="button" aria-label="Previous image" onClick={() => setIndex((current) => (current - 1 + gallery.length) % gallery.length)}>
        <i className="fas fa-chevron-left" aria-hidden="true" />
      </button>
      <figure className="lightbox-content">
        <img src={item.src} alt={item.caption} />
        <figcaption>{item.caption} ({index + 1}/{gallery.length})</figcaption>
      </figure>
      <button className="lightbox-next" type="button" aria-label="Next image" onClick={() => setIndex((current) => (current + 1) % gallery.length)}>
        <i className="fas fa-chevron-right" aria-hidden="true" />
      </button>
    </div>
  );
}
```

- [ ] **Step 7: Append base UI styles to `src/styles/components.css`**

```css
.btn {
  align-items: center;
  border: 1px solid var(--border-hover);
  background: transparent;
  color: var(--text-primary);
  display: inline-flex;
  font-size: 0.78rem;
  font-weight: 900;
  gap: 0.6rem;
  justify-content: center;
  letter-spacing: 0.08em;
  padding: 0.85rem 1.25rem;
  text-transform: uppercase;
  transition: background var(--speed-fast), border-color var(--speed-fast), color var(--speed-fast), transform var(--speed-fast);
}

.btn:hover,
.btn:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-primary);
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background: transparent;
  color: var(--accent);
}

.tech-tag {
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  display: inline-flex;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  padding: 0.35rem 0.65rem;
}

.tech-tag-signal {
  border-color: var(--accent);
  color: var(--accent);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.modal-overlay,
.lightbox-overlay {
  align-items: center;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  inset: 0;
  justify-content: center;
  overflow-y: auto;
  padding: 1.25rem;
  position: fixed;
  z-index: 2000;
}

.modal-container {
  background: var(--bg-secondary);
  border: 1px solid var(--border-hover);
  box-shadow: var(--shadow-signal);
  max-height: 92vh;
  max-width: 980px;
  overflow-y: auto;
  position: relative;
  width: min(100%, 980px);
}

.modal-close,
.lightbox-close,
.lightbox-prev,
.lightbox-next {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  min-height: 44px;
  min-width: 44px;
}

.modal-close {
  position: sticky;
  top: 0;
  float: right;
  z-index: 2;
}

.modal-body {
  padding: clamp(1.5rem, 4vw, 3rem);
}

.modal-header {
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
}

.modal-header h2 {
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -0.06em;
  line-height: 0.95;
  margin: 0.5rem 0 1rem;
  text-transform: uppercase;
}

.modal-media {
  border: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.modal-media img,
.modal-media video {
  width: 100%;
}

.modal-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1.5fr) minmax(240px, 0.8fr);
}

.modal-grid h3 {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  margin: 1rem 0 0.5rem;
  text-transform: uppercase;
}

.modal-links {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.modal-links a {
  border: 1px solid var(--border-color);
  padding: 0.75rem;
}

.gallery-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-top: 2rem;
}

.gallery-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-align: left;
}

.gallery-item span {
  display: block;
  font-size: 0.78rem;
  padding: 0.65rem;
}

.lightbox-content {
  max-width: min(92vw, 1100px);
  text-align: center;
}

.lightbox-content img {
  border: 1px solid var(--border-hover);
  max-height: 78vh;
  object-fit: contain;
}

.lightbox-content figcaption {
  color: var(--text-secondary);
  margin-top: 0.75rem;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
  position: fixed;
  z-index: 2;
}

.lightbox-close { right: 1rem; top: 1rem; }
.lightbox-prev { left: 1rem; top: 50%; }
.lightbox-next { right: 1rem; top: 50%; }

@media (max-width: 760px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/hooks/useReducedMotion.js src/hooks/useThemeTransition.js src/components/ui/Button.jsx src/components/ui/TechTag.jsx src/components/ui/Modal.jsx src/components/ui/Lightbox.jsx src/styles/components.css
git commit -m "feat: add shared React UI primitives"
```

---

### Task 4: Implement Layout and Hero Command Deck

**Files:**
- Create: `src/components/layout/Navbar.jsx`
- Create: `src/components/layout/Footer.jsx`
- Create: `src/components/hero/ThemeProfileTransition.jsx`
- Create: `src/components/hero/Hero.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Create `src/components/layout/Navbar.jsx`**

```jsx
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
        <button className="nav-toggle" type="button" aria-expanded={isOpen} aria-controls="nav-menu" onClick={() => setIsOpen((current) => !current)}>
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
```

- [ ] **Step 2: Create `src/components/layout/Footer.jsx`**

```jsx
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
```

- [ ] **Step 3: Create `src/components/hero/ThemeProfileTransition.jsx`**

```jsx
export function ThemeProfileTransition({ profileImages, themeState }) {
  const {
    theme,
    videoRef,
    displayImage,
    isTransitioning,
    toggleTheme,
    handleVideoEnded,
  } = themeState;

  return (
    <div className="profile-console">
      <div className="profile-console-label">THEME TRANSITION: {theme === 'dark' ? 'DARK' : 'LIGHT'}</div>
      <div className="profile-media" data-transitioning={isTransitioning}>
        <img src={displayImage} alt="Huynh Duc Tinh profile" />
        {profileImages.transition && (
          <video
            ref={videoRef}
            src={profileImages.transition}
            muted
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
          />
        )}
      </div>
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={theme === 'light'}>
        <span>{theme === 'dark' ? 'Engage Light Mode' : 'Return Dark Mode'}</span>
        <i className="fas fa-adjust" aria-hidden="true" />
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/hero/Hero.jsx`**

```jsx
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
```

- [ ] **Step 5: Modify `src/App.jsx`**

```jsx
import { useState } from 'react';
import { Hero } from './components/hero/Hero.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Lightbox } from './components/ui/Lightbox.jsx';
import { Modal } from './components/ui/Modal.jsx';
import { profile } from './data/profile.js';
import { useThemeTransition } from './hooks/useThemeTransition.js';

function App() {
  const themeState = useThemeTransition(profile.profileImages);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  function openLightbox(gallery, index) {
    setLightbox({ gallery, index });
  }

  return (
    <>
      <Navbar />
      <main className="app-shell">
        <Hero themeState={themeState} />
      </main>
      <Footer />
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} onOpenLightbox={openLightbox} />
      {lightbox && (
        <Lightbox gallery={lightbox.gallery} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

export default App;
```

- [ ] **Step 6: Append layout and hero styles to `src/styles/components.css`**

```css
.navbar {
  backdrop-filter: blur(18px);
  background: color-mix(in srgb, var(--bg-primary) 88%, transparent);
  border-bottom: 1px solid var(--border-color);
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
}

.nav-container {
  align-items: center;
  display: flex;
  height: 68px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}

.nav-logo {
  align-items: center;
  display: inline-flex;
  font-family: var(--font-mono);
  font-weight: 900;
  gap: 0.6rem;
  letter-spacing: 0.08em;
}

.logo-signal {
  background: var(--accent);
  box-shadow: 0 0 18px var(--accent);
  height: 8px;
  width: 8px;
}

.nav-menu {
  align-items: center;
  display: flex;
  gap: 1.4rem;
}

.nav-menu a {
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.nav-menu a:hover,
.nav-menu a:focus-visible {
  color: var(--accent);
}

.nav-toggle {
  background: transparent;
  border: 0;
  display: none;
  gap: 5px;
  flex-direction: column;
}

.nav-toggle span:not(.sr-only) {
  background: var(--text-primary);
  height: 2px;
  width: 24px;
}

.hero {
  min-height: 100vh;
  overflow: hidden;
  padding-top: clamp(7rem, 12vw, 10rem);
  position: relative;
}

.hero-bg-text {
  color: color-mix(in srgb, var(--text-primary) 5%, transparent);
  font-size: clamp(6rem, 16vw, 18rem);
  font-weight: 950;
  left: 50%;
  letter-spacing: -0.08em;
  line-height: 0.8;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.hero-grid {
  align-items: center;
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  position: relative;
  z-index: 1;
}

.system-status {
  align-items: center;
  border: 1px solid var(--border-color);
  color: var(--accent);
  display: inline-flex;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  gap: 0.6rem;
  letter-spacing: 0.12em;
  margin-bottom: 1.5rem;
  padding: 0.45rem 0.7rem;
  text-transform: uppercase;
}

.system-status span {
  background: var(--accent);
  box-shadow: 0 0 18px var(--accent);
  height: 7px;
  width: 7px;
}

.hero h1 {
  font-size: clamp(3.1rem, 7vw, 6.6rem);
  font-weight: 950;
  letter-spacing: -0.08em;
  line-height: 0.9;
  max-width: 850px;
  text-transform: uppercase;
}

.hero-summary {
  border-left: 2px solid var(--accent);
  color: var(--text-secondary);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  line-height: 1.7;
  margin: 1.5rem 0;
  max-width: 640px;
  padding-left: 1.1rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.8rem;
}

.profile-console {
  position: relative;
}

.profile-console-label {
  background: var(--accent);
  color: var(--bg-primary);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 900;
  left: -0.85rem;
  letter-spacing: 0.08em;
  padding: 0.5rem 0.65rem;
  position: absolute;
  top: -0.85rem;
  z-index: 3;
}

.profile-media {
  aspect-ratio: 3 / 4;
  background: var(--bg-secondary);
  border: 1px solid var(--border-hover);
  overflow: hidden;
  position: relative;
}

.profile-media::after {
  border: 1px solid var(--accent);
  content: '';
  inset: 1rem;
  opacity: 0.32;
  pointer-events: none;
  position: absolute;
}

.profile-media img,
.profile-media video {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.profile-media video {
  inset: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.profile-media[data-transitioning='true'] video {
  opacity: 1;
}

.theme-toggle {
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  display: flex;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  justify-content: space-between;
  letter-spacing: 0.06em;
  margin-top: 0.85rem;
  padding: 0.85rem;
  text-transform: uppercase;
  width: 100%;
}

.proof-strip {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 0.85rem;
}

.proof-strip div {
  border: 1px solid var(--border-color);
  padding: 0.8rem;
}

.proof-strip strong {
  color: var(--accent);
  display: block;
  font-family: var(--font-mono);
  font-size: 1.4rem;
  line-height: 1;
}

.proof-strip span {
  color: var(--text-muted);
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  margin-top: 0.35rem;
  text-transform: uppercase;
}

.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 2.5rem 0;
}

.footer-grid {
  align-items: center;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr auto auto;
}

.footer-links,
.footer-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

@media (max-width: 860px) {
  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    display: none;
    flex-direction: column;
    left: 0;
    padding: 1.25rem;
    position: absolute;
    right: 0;
    top: 68px;
  }

  .nav-menu.active {
    display: flex;
  }

  .hero-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    max-width: 420px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Build**

Run: `npm run build`

Expected: PASS. The page renders the hero and nav.

- [ ] **Step 8: Commit**

```bash
git add src/App.jsx src/components/layout/Navbar.jsx src/components/layout/Footer.jsx src/components/hero/Hero.jsx src/components/hero/ThemeProfileTransition.jsx src/styles/components.css
git commit -m "feat: build command deck hero"
```

---

### Task 5: Implement Content Sections

**Files:**
- Create: `src/components/sections/CapabilityMatrix.jsx`
- Create: `src/components/sections/MissionLogs.jsx`
- Create: `src/components/sections/OperationalTimeline.jsx`
- Create: `src/components/sections/ProofLayer.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Create `src/components/sections/CapabilityMatrix.jsx`**

```jsx
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
```

- [ ] **Step 2: Create `src/components/sections/MissionLogs.jsx`**

```jsx
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
```

- [ ] **Step 3: Create `src/components/sections/OperationalTimeline.jsx`**

```jsx
import { education, timeline } from '../../data/profile.js';
import { TechTag } from '../ui/TechTag.jsx';

export function OperationalTimeline() {
  return (
    <section id="timeline" className="section-block">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">deployment.history()</p>
          <h2>Operational Timeline</h2>
          <p className="lede">Roles and education framed as systems built, researched, and deployed.</p>
        </header>
        <div className="timeline-list">
          {timeline.map((item) => (
            <article className="timeline-card" key={`${item.company}-${item.date}`}>
              <div>
                <p className="eyebrow">{item.date}</p>
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
              </div>
              <div>
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.degree}>
              <p className="eyebrow">{item.date}</p>
              <h3>{item.degree}</h3>
              <strong>{item.school}</strong>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/components/sections/ProofLayer.jsx`**

```jsx
import { proofItems } from '../../data/profile.js';

export function ProofLayer() {
  return (
    <section id="proof" className="section-block proof-layer">
      <div className="container">
        <header className="section-header split-header">
          <div>
            <p className="eyebrow">proof.layer()</p>
            <h2>Signals recruiters can verify</h2>
          </div>
          <p className="lede">Publication, source code, product evidence, and CV access in one credibility layer.</p>
        </header>
        <div className="proof-grid">
          {proofItems.map((item) => (
            <a className="proof-card" href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} key={item.label}>
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
```

- [ ] **Step 5: Modify `src/App.jsx`**

```jsx
import { useState } from 'react';
import { Hero } from './components/hero/Hero.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { CapabilityMatrix } from './components/sections/CapabilityMatrix.jsx';
import { ContactTransmission } from './components/sections/ContactTransmission.jsx';
import { MissionLogs } from './components/sections/MissionLogs.jsx';
import { OperationalTimeline } from './components/sections/OperationalTimeline.jsx';
import { ProofLayer } from './components/sections/ProofLayer.jsx';
import { Lightbox } from './components/ui/Lightbox.jsx';
import { Modal } from './components/ui/Modal.jsx';
import { profile } from './data/profile.js';
import { useThemeTransition } from './hooks/useThemeTransition.js';

function App() {
  const themeState = useThemeTransition(profile.profileImages);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  function openLightbox(gallery, index) {
    setLightbox({ gallery, index });
  }

  return (
    <>
      <Navbar />
      <main className="app-shell">
        <Hero themeState={themeState} />
        <CapabilityMatrix />
        <MissionLogs onSelectProject={setSelectedProject} />
        <OperationalTimeline />
        <ProofLayer />
        <ContactTransmission />
      </main>
      <Footer />
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} onOpenLightbox={openLightbox} />
      {lightbox && (
        <Lightbox gallery={lightbox.gallery} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

export default App;
```

- [ ] **Step 6: Add temporary `ContactTransmission` placeholder so build passes**

Create `src/components/sections/ContactTransmission.jsx`:

```jsx
export function ContactTransmission() {
  return (
    <section id="contact" className="section-block">
      <div className="container">
        <p className="eyebrow">transmission.open()</p>
        <h2>Send Signal</h2>
        <p className="lede">Contact form will be connected in the next task.</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Append section styles to `src/styles/components.css`**

```css
.section-header {
  margin-bottom: clamp(2rem, 5vw, 4rem);
}

.section-header h2 {
  font-size: clamp(2.4rem, 6vw, 5rem);
  font-weight: 950;
  letter-spacing: -0.07em;
  line-height: 0.92;
  margin: 0.45rem 0 0.75rem;
  text-transform: uppercase;
}

.split-header {
  align-items: end;
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.55fr);
}

.capability-grid,
.proof-grid,
.education-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.capability-card,
.timeline-card,
.education-card,
.proof-card,
.mission-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  transition: border-color var(--speed-fast), transform var(--speed-fast), background var(--speed-fast);
}

.capability-card:hover,
.timeline-card:hover,
.education-card:hover,
.proof-card:hover,
.mission-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}

.capability-card,
.education-card,
.proof-card {
  padding: clamp(1.25rem, 3vw, 2rem);
}

.capability-card h3,
.education-card h3,
.timeline-card h3,
.mission-card h3 {
  font-size: 1.35rem;
  line-height: 1.1;
  margin: 0.55rem 0 0.75rem;
  text-transform: uppercase;
}

.capability-card p,
.education-card p,
.proof-card p,
.timeline-card p,
.timeline-card li,
.mission-card p {
  color: var(--text-secondary);
}

.capability-card .tag-list,
.mission-card .tag-list,
.timeline-card .tag-list {
  margin-top: 1rem;
}

.mission-grid {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.mission-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mission-card.featured {
  border-color: var(--border-hover);
}

.mission-media {
  align-items: center;
  aspect-ratio: 16 / 8;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.mission-media img,
.mission-media video {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.mission-media i {
  color: var(--text-muted);
  font-size: 2.5rem;
}

.mission-media span {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  bottom: 0.8rem;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  left: 0.8rem;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.5rem;
  position: absolute;
  text-transform: uppercase;
}

.mission-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(1.25rem, 3vw, 1.75rem);
}

.mission-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
}

.timeline-list {
  display: grid;
  gap: 1rem;
}

.timeline-card {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(220px, 0.42fr) minmax(0, 1fr);
  padding: clamp(1.25rem, 3vw, 2rem);
}

.timeline-card ul {
  list-style: square;
  margin: 1rem 0 0 1.2rem;
}

.education-grid {
  margin-top: 1rem;
}

.proof-card span {
  color: var(--text-muted);
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.proof-card strong {
  color: var(--accent);
  display: block;
  font-size: 1.5rem;
  margin: 0.4rem 0;
}

@media (max-width: 860px) {
  .split-header,
  .capability-grid,
  .mission-grid,
  .timeline-card,
  .proof-grid,
  .education-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Build**

Run: `npm run build`

Expected: PASS. Sections render below hero.

- [ ] **Step 9: Commit**

```bash
git add src/App.jsx src/components/sections/CapabilityMatrix.jsx src/components/sections/MissionLogs.jsx src/components/sections/OperationalTimeline.jsx src/components/sections/ProofLayer.jsx src/components/sections/ContactTransmission.jsx src/styles/components.css
git commit -m "feat: add agentic portfolio sections"
```

---

### Task 6: Implement Contact Form and Harden Netlify Function

**Files:**
- Modify: `src/components/sections/ContactTransmission.jsx`
- Modify: `netlify/functions/sendMessage.js`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Replace `src/components/sections/ContactTransmission.jsx`**

```jsx
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
```

- [ ] **Step 2: Replace `netlify/functions/sendMessage.js`**

```js
const https = require('https');

const LIMITS = {
  name: 100,
  email: 120,
  subject: 160,
  message: 2000,
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function sanitizeText(value, maxLength) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function validatePayload(body) {
  const data = JSON.parse(body || '{}');
  const name = sanitizeText(data.name, LIMITS.name);
  const email = sanitizeText(data.email, LIMITS.email);
  const subject = sanitizeText(data.subject || 'Contact from Portfolio', LIMITS.subject);
  const message = sanitizeText(data.message, LIMITS.message);

  if (name.length < 2) return { error: 'Name must be at least 2 characters.' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: 'Enter a valid email address.' };
  if (message.length < 10) return { error: 'Message must be at least 10 characters.' };

  return { value: { name, email, subject, message } };
}

function sendTelegramMessage(botToken, chatId, text) {
  const payload = JSON.stringify({
    chat_id: chatId,
    text,
  });

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
          return;
        }
        reject(new Error(`Telegram API responded with ${res.statusCode}: ${responseBody}`));
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing Telegram environment variables.');
    return jsonResponse(500, { success: false, error: 'Server configuration error.' });
  }

  let payload;
  try {
    payload = validatePayload(event.body);
  } catch {
    return jsonResponse(400, { success: false, error: 'Invalid request body.' });
  }

  if (payload.error) {
    return jsonResponse(400, { success: false, error: payload.error });
  }

  const { name, email, subject, message } = payload.value;
  const telegramMessage = [
    'New Portfolio Contact',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    message,
    '',
    `Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
  ].join('\n');

  try {
    await sendTelegramMessage(botToken, chatId, telegramMessage);
    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error('Telegram delivery failed:', error);
    return jsonResponse(502, { success: false, error: 'Message delivery failed.' });
  }
};
```

- [ ] **Step 3: Append contact styles to `src/styles/components.css`**

```css
.contact-grid {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  grid-template-columns: minmax(0, 0.8fr) minmax(320px, 1.1fr);
}

.contact-section h2 {
  font-size: clamp(2.5rem, 7vw, 5.8rem);
  font-weight: 950;
  letter-spacing: -0.08em;
  line-height: 0.9;
  margin: 0.5rem 0 1rem;
  text-transform: uppercase;
}

.contact-lines {
  border-top: 1px solid var(--border-color);
  display: grid;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.contact-lines a,
.contact-lines span {
  color: var(--text-secondary);
}

.contact-socials {
  margin-top: 1.5rem;
}

.contact-form {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  display: grid;
  gap: 1rem;
  padding: clamp(1.25rem, 4vw, 2rem);
}

.contact-form label {
  color: var(--text-muted);
  display: grid;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  gap: 0.4rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact-form input,
.contact-form textarea {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  outline: none;
  padding: 0.9rem 1rem;
  resize: vertical;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--accent);
}

.form-status {
  border: 1px solid var(--border-color);
  padding: 0.75rem;
}

.form-status.success {
  border-color: var(--accent-secondary);
  color: var(--accent-secondary);
}

.form-status.error {
  border-color: var(--danger);
  color: var(--danger);
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ContactTransmission.jsx netlify/functions/sendMessage.js src/styles/components.css
git commit -m "feat: add secure contact transmission"
```

---

### Task 7: Final QA, Asset Fallbacks, and Service Worker Cleanup

**Files:**
- Modify: `src/data/profile.js`
- Delete or leave unused: `sw.js`
- Modify: `.gitignore`

- [ ] **Step 1: Confirm profile transition assets exist**

Run: `ls -la portfolio-assets/images/profile`

Expected: See either the final assets below or fallback files:

```text
profile-dark.png
profile-light.png
profile-transition.mp4
your-photo.png
your-photo-about.jpg
```

If `profile-dark.png`, `profile-light.png`, or `profile-transition.mp4` do not exist yet, keep the fallbacks in `src/data/profile.js` and set the missing values to empty strings:

```js
profileImages: {
  dark: '',
  light: '',
  transition: '',
  fallbackDark: '/portfolio-assets/images/profile/your-photo.png',
  fallbackLight: '/portfolio-assets/images/profile/your-photo-about.jpg',
},
```

- [ ] **Step 2: Add `.superpowers/` to `.gitignore`**

Append this line to `.gitignore`:

```gitignore
.superpowers/
```

- [ ] **Step 3: Remove service worker registration leftovers**

No service worker is registered by the new `index.html`. Leave `sw.js` unreferenced for this migration unless the user explicitly wants PWA behavior restored. Do not delete `sw.js` in this task because deleting existing files is avoidable and service worker cleanup can be handled separately.

- [ ] **Step 4: Build production output**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 5: Start preview server**

Run: `npm run dev`

Expected: Vite prints a local URL.

- [ ] **Step 6: Browser QA checklist**

Open the local URL and verify:

```text
[ ] 375px: no horizontal overflow, nav toggles, hero profile stays visible.
[ ] 768px: capability and mission cards stack cleanly.
[ ] 1024px: hero two-column layout is readable.
[ ] 1440px: command-center grid and proof strip feel intentional.
[ ] Dark to light toggle updates theme and profile image/video state.
[ ] Light to dark toggle returns to dark state.
[ ] Reduced motion browser setting skips video transition.
[ ] Open Log opens a project modal.
[ ] Escape closes modal.
[ ] Gallery image opens lightbox when a project has gallery items.
[ ] Escape closes lightbox.
[ ] Contact form blocks invalid email and short message.
[ ] Contact form shows an error if Netlify function is unavailable locally.
```

- [ ] **Step 7: Commit**

```bash
git add .gitignore src/data/profile.js
git commit -m "chore: finalize portfolio rebrand QA setup"
```

---

## Self-Review

Spec coverage:
- React/Vite migration: Tasks 1-5.
- Agentic Systems Command Center visual direction: Tasks 1, 4, 5.
- Theme/profile transition: Tasks 3, 4, 7.
- Capability matrix: Task 5.
- Mission logs: Tasks 2 and 5.
- Operational timeline: Tasks 2 and 5.
- Proof layer: Tasks 2 and 5.
- Contact and Telegram function hardening: Task 6.
- Accessibility and responsive QA: Tasks 3, 4, 7.
- Netlify dist publish: Task 1.

Placeholder scan: no TBD/TODO/fill-later placeholders are intentionally left in the plan. Asset names are explicit and fallback behavior is specified.

Type consistency: component names, data property names, and hook return fields are consistent across tasks.
