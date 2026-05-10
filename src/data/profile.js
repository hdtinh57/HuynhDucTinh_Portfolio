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
    dark: '/portfolio-assets/images/profile/dark.png',
    light: '/portfolio-assets/images/profile/light.png',
    transition: '/portfolio-assets/images/profile/transition.mp4',
    transitionReverse: '/portfolio-assets/images/profile/transition-reverse.mp4',
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
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/hdtinh57', icon: 'fab fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hdtinh57', icon: 'fab fa-linkedin-in' },
  { label: 'Telegram', href: 'https://t.me/hudutin', icon: 'fab fa-telegram-plane' },
];
