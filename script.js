// ================================================
// PORTFOLIO SCRIPT - BRUTALIST INTELLIGENCE v2.0
// ================================================

// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// ---- Mobile Navigation ----
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.style.overflow = "";
  });
});

document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ---- Smooth Scrolling ----
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 64,
        behavior: "smooth",
      });
    }
  });
});

// ---- Navbar Scroll Effect ----
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ---- Active Navigation Highlight ----
function updateActiveNavLink() {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}
window.addEventListener("scroll", updateActiveNavLink);
updateActiveNavLink();

// ---- Intersection Observer: Reveal Animations ----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stagger children with .reveal-item class
        const items = entry.target.querySelectorAll(".reveal-item");
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add("visible");
          }, 150 * i);
        });
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  },
);

document.querySelectorAll(".reveal-section").forEach((section) => {
  revealObserver.observe(section);
});

// Also observe individual items that are direct children (e.g. in hero)
const itemObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal-item").forEach((item) => {
  itemObserver.observe(item);
});

// ---- Loading Screen ----
const loadingScreen = document.getElementById("loading-screen");
const loadingBarFill = document.querySelector(".loading-bar-fill");
let loadProgress = 0;

function updateLoadingProgress() {
  loadProgress += Math.random() * 25 + 10;
  if (loadProgress > 100) loadProgress = 100;

  if (loadingBarFill) {
    loadingBarFill.style.width = loadProgress + "%";
  }

  if (loadProgress < 100) {
    setTimeout(updateLoadingProgress, 150);
  } else {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      document.body.classList.add("loaded");
    }, 400);
  }
}

window.addEventListener("load", () => {
  updateLoadingProgress();
});

// ---- Form Submission ----
const contactForm = document.querySelector(".form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    const submitBtn = contactForm.querySelector(".form-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const contactData = {
        name,
        email,
        subject: subject || "Contact from Portfolio",
        message,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      };

      let contacts = JSON.parse(
        localStorage.getItem("portfolio_contacts") || "[]",
      );
      contacts.push(contactData);
      localStorage.setItem("portfolio_contacts", JSON.stringify(contacts));

      showNotification(
        `Thank you ${name}! Your message has been received.`,
        "success",
      );
      sendToTelegramBot(name, email, subject, message);
      contactForm.reset();
    } catch (err) {
      showNotification("Error sending message. Please try again.", "error");
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ---- Telegram Bot ----
function sendToTelegramBot(name, email, subject, message) {
  const BOT_TOKEN = window.TELEGRAM_BOT_TOKEN || "";
  const CHAT_ID = window.TELEGRAM_CHAT_ID || "";

  const telegramMessage = `
🤖 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Subject:* ${subject || "Contact from Portfolio"}
💬 *Message:*
${message}

⏰ *Time:* ${new Date().toLocaleString()}
🌐 *Source:* Portfolio Website
    `;

  if (BOT_TOKEN && CHAT_ID) {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) openTelegramApp(name, email, subject, message);
      })
      .catch(() => openTelegramApp(name, email, subject, message));
  } else {
    openTelegramApp(name, email, subject, message);
  }
}

function openTelegramApp(name, email, subject, message) {
  const msg = `Hi! I'm ${name} (${email}).\n\nSubject: ${subject || "Contact from Portfolio"}\n\nMessage: ${message}\n\nI found you through your portfolio website.`;
  const url = `https://t.me/hudutin?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ---- Notification System ----
function showNotification(message, type = "info") {
  document.querySelectorAll(".notification").forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      notification.classList.add("show");
    });
  });

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 400);
  }, 3500);
}

// ---- Project Modal ----
const projectModal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const closeButtons = document.querySelectorAll(".close");

const projectData = {
  yololabel: {
    title: "YOLOLabel AI",
    subtitle:
      "AI-Powered Bounding Box Labeling Tool with Active Learning & MLOps",
    overview:
      "A complete active learning loop for object detection: Label images → Train model → Auto-predict → Review → Repeat. Features a built-in MLOps dashboard for tracking training history, model versions, and experiments. Built with FastAPI backend and Vanilla JS frontend.",
    contributions:
      "I independently designed and built the entire tool from scratch — backend architecture, AI pipeline, database schema, frontend canvas editor, and MLOps dashboard. The system implements a full active learning cycle with uncertainty-based smart queuing.",
    features: [
      {
        title: "Canvas Labeling Editor",
        description:
          "Draw, resize, and move bounding boxes with keyboard shortcuts. Multi-class support with unlimited classes, auto-save, and YOLO-format import/export.",
      },
      {
        title: "Active Learning (v2.0)",
        description:
          "Smart queue ranking images by model uncertainty (multi-factor scoring). Prediction caching in SQLite, cycle tracking, and accept/reject review workflow.",
      },
      {
        title: "MLOps Dashboard (v2.0)",
        description:
          "Training history with per-epoch metrics, model registry with version stages (none → staging → production → archived), auto-promote best models, and side-by-side run comparison.",
      },
      {
        title: "Playground (v2.0)",
        description:
          "Drag & drop images/videos to live test any registry model. Displays inference latency, active detections, threshold tuning, and audit logging.",
      },
    ],
    techStack: [
      "FastAPI",
      "YOLO11",
      "PyTorch",
      "SQLite",
      "Vanilla JS",
      "HTML5 Canvas",
      "Python",
      "Ultralytics",
    ],
    team: {
      size: 1,
      role: "Full-Stack AI Engineer",
      focus: [
        "Designed complete system architecture",
        "Built FastAPI backend with 7-table SQLite schema",
        "Implemented active learning uncertainty scoring",
        "Developed canvas-based annotation editor",
        "Created MLOps dashboard with model registry",
      ],
    },
    results: {
      architecture: "FastAPI + Vanilla JS SPA",
      database: "SQLite (7 tables, WAL mode)",
      features: "Labeling + Active Learning + MLOps + Playground",
      models: "YOLO11/YOLO26 support",
      status: "Open Source on GitHub",
    },
    links: [
      {
        text: "GitHub Repository",
        url: "https://github.com/hdtinh57/YOLOLabel_AI",
        icon: "fab fa-github",
      },
    ],
  },
  smartdocqa: {
    title: "Smart Document Q&A System",
    subtitle: "Multi-modal RAG System for Intelligent Document Querying",
    overview:
      "A cutting-edge Retrieval-Augmented Generation (RAG) system supporting multi-modal document processing (PDFs, Images, and Text). Built with local Vision-Language Models (VLMs) and dense-sparse vector search for high precision, complete with a caching layer and hallucination-free querying.",
    contributions:
      "I independently engineered the entire RAG pipeline—from initial document parsing and OCR extraction to vector database integration with Qdrant and the interactive UI via Streamlit.",
    features: [
      {
        title: "Multi-modal OCR Processing",
        description:
          "Utilizes Mistral OCR API and local Qwen3-VL to extract text, tables, and complex layouts with high precision from images and PDFs.",
      },
      {
        title: "Dense-Sparse Vector Search",
        description:
          "Employs BGE-M3 embeddings combined with Qdrant collection payload indexing for fast and highly accurate semantic retrieval.",
      },
      {
        title: "Hallucination-free Retrieval",
        description:
          "Enforces strict source filtering and score thresholding logic directly within Qdrant to neutralize stale or deleted documents.",
      },
      {
        title: "Interactive UI",
        description:
          "Built with Streamlit featuring a dual-pane interface: an interactive LLM chat paired with a dedicated document viewer (Original PDF vs. OCR Results).",
      },
    ],
    techStack: [
      "Python",
      "Streamlit",
      "Qdrant",
      "Mistral OCR",
      "Google Gemini 2.5",
      "LangChain",
      "HuggingFace",
    ],
    team: {
      size: 1,
      role: "AI Engineer / Full-stack Developer",
      focus: [
        "Designed complete RAG architecture",
        "Built integration with Qdrant and BGE-M3",
        "Handled PDF and image OCR via Mistral / Qwen-VL",
        "Developed interactive UI using Streamlit",
      ],
    },
    results: {
      inferenceModel: "Gemini-2.5-flash / Qwen3-VL",
      database: "Qdrant (Local Vector DB)",
      architecture: "Langchain RAG Pipeline",
      status: "Open Source on GitHub",
    },
    links: [
      {
        text: "GitHub Repository",
        url: "https://github.com/hdtinh57/SmartDocQA",
        icon: "fab fa-github",
      },
    ],
  },
  navigation: {
    title: "AI-Powered Navigation for the Visually Impaired",
    subtitle:
      "Lightweight Real-time Object Detection & Voice-Guided Assistance",
    overview:
      "A graduation capstone project developed by a team of four, designed to assist visually impaired users with real-time environmental understanding. The system integrates lightweight object detection, depth estimation, and natural language feedback to enable safe and independent navigation.",
    contributions:
      "As the primary AI developer, I led the design and optimization of the object detection and depth estimation modules. I proposed a lightweight alternative to traditional 3D object detection, achieving faster inference without sacrificing spatial precision.",
    features: [
      {
        title: "Lightweight Object Detection",
        description:
          "Optimized YOLO11 model achieving ~90% detection accuracy while maintaining real-time performance on edge devices.",
      },
      {
        title: "Depth Estimation",
        description:
          "Integrated Depth Anything V2 for precise distance measurement with 94.7% accuracy within ±30 cm.",
      },
      {
        title: "Voice-Guided Feedback",
        description:
          "Utilized GPT-4o for generating natural spoken navigation cues with bidirectional interaction.",
      },
      {
        title: "Accessibility-Centered Design",
        description:
          "Intuitive voice feedback and low-latency processing for real-world deployment.",
      },
    ],
    techStack: [
      "YOLO11",
      "Depth Anything V2",
      "wav2vec-base-vietnamese-250h",
      "ElevenLabs",
      "GPT-4o",
      "Python",
      "OpenCV",
      "PyTorch",
    ],
    team: {
      size: 4,
      role: "AI Engineer / Research Lead",
      focus: [
        "Proposed and designed core AI architecture",
        "Led model benchmarking and lightweight optimization",
        "Developed and trained detection and depth modules",
        "Built and tested full integration pipeline",
      ],
    },
    results: {
      detectionAccuracy: "~90%",
      depthAccuracy: "94.7% within ±30 cm",
      latency: "Real-time (30 FPS)",
      deployment: "Web application",
    },
    links: [],
  },
  tempromot: {
    title: "LLM-Guided Multi-Object Tracking (TempRMOT)",
    subtitle: "Research Publication — MLHMI 2025",
    overview:
      "A collaborative research project integrating Temporally Enhanced Referring Multi-Object Tracking with Large Language Models to improve retail scene understanding and customer behavior analysis.",
    contributions:
      "As the research engineer of a 3-member team, I focused on exploring TempRMOT architecture, building the labeling pipeline and annotation tools, and supporting model training and evaluation.",
    features: [
      {
        title: "Hybrid Architecture",
        description:
          "Integrated TempRMOT with LLMs for improved multi-object tracking and temporal reasoning.",
      },
      {
        title: "Retail Analytics Focus",
        description:
          "Designed for retail environments to analyze customer behavior through video sequences.",
      },
      {
        title: "Performance Results",
        description:
          "81.8% Exact Match, 84.5% Semantic Similarity on custom retail dataset, 90.07% on Refer-KITTI-V2.",
      },
      {
        title: "Academic Contribution",
        description: "Published at MLHMI 2025 International Conference.",
      },
    ],
    techStack: [
      "TempRMOT",
      "Large Language Models",
      "PyTorch",
      "OpenCV",
      "Python",
      "Computer Vision",
    ],
    team: {
      size: 3,
      role: "Research Engineer",
      focus: [
        "Researched TempRMOT methodologies",
        "Designed labeling tools and data pipeline",
        "Supported dataset collection and annotation",
        "Assisted in training and evaluating TempRMOT",
      ],
    },
    results: {
      exactMatch: "81.8%",
      semanticSimilarity: "84.5%",
      referKittiV2: "90.07%",
      publication: "MLHMI 2025 — DOI: 10.1109/MLHMI66056.2025.00018",
    },
    links: [
      {
        text: "View Publication",
        url: "https://doi.org/10.1109/MLHMI66056.2025.00018",
        icon: "fas fa-external-link-alt",
      },
    ],
  },
  gptjson: {
    title: "GPT-JSON: Intelligent Q&A over Structured Data",
    subtitle: "LLM-powered WebApp for Conversational JSON Querying",
    overview:
      "A personal utility project that enables users to interact with JSON files through natural language queries using LLMs for parsing, retrieval, and contextual answers.",
    contributions:
      "I independently designed and built the entire pipeline — from frontend to model integration using LangChain, ChromaDB, and Gradio.",
    features: [
      {
        title: "Conversational Data Access",
        description:
          "Query complex JSON data in natural language with grounded responses.",
      },
      {
        title: "Vector-based Retrieval",
        description:
          "ChromaDB for efficient semantic search and context retrieval.",
      },
      {
        title: "LLM Integration",
        description:
          "OpenAI GPT models via LangChain for context-aware JSON reasoning.",
      },
      {
        title: "Lightweight WebApp",
        description:
          "Built with Gradio for fast deployment and browser-based interaction.",
      },
    ],
    techStack: ["OpenAI API", "LangChain", "ChromaDB", "Gradio", "Python"],
    team: {
      size: 1,
      role: "AI Engineer / Full-stack Developer",
      focus: [
        "Designed system architecture and prompt pipeline",
        "Implemented semantic retrieval using ChromaDB",
        "Developed Gradio-based interactive interface",
        "Integrated GPT model for JSON reasoning",
      ],
    },
    results: {
      usability: "Natural-language access to structured JSON data",
      latency: "Real-time responses (<2s)",
      deployment: "Local + hosted prototype via Gradio",
    },
    links: [
      {
        text: "View Colab Notebook",
        url: "https://colab.research.google.com/drive/1sXu8hfet21bB9ctB1UD9iQgfLZWKFUAk#scrollTo=msgQ_YLwcdUm",
        icon: "fab fa-google",
      },
    ],
  },
  newsagent: {
    title: "Automated News Aggregation & Content Agent",
    subtitle:
      "AI-Powered Multi-LLM Content Pipeline — Internal Product at Future Space",
    overview:
      "An end-to-end automated news aggregation and content generation system. Crawls news from multiple sources, deduplicates content, then uses Multi-LLM orchestration to filter, tag, and rewrite articles for SEO optimization.",
    contributions:
      "I independently architected and implemented the entire pipeline from scratch including the ETL workflow in n8n, Supabase schema, and integrating OpenAI, Gemini, and Jina AI.",
    features: [
      {
        title: "Multi-Source News Crawling",
        description:
          "Automated crawlers using n8n for 20+ news sources with smart scheduling and rate limiting.",
      },
      {
        title: "Intelligent Deduplication",
        description:
          "Semantic similarity and hash-based matching for duplicate detection.",
      },
      {
        title: "Multi-LLM Orchestration",
        description:
          "GPT-4o-mini for classification/tagging, Google Gemini for SEO-optimized rewriting.",
      },
      {
        title: "Unstructured Content Parsing",
        description:
          "Jina AI Reader API for clean extraction from messy web pages.",
      },
      {
        title: "Automated Publishing",
        description:
          "CMS API integration with scheduled auto-publishing and human review checkpoints.",
      },
    ],
    techStack: [
      "n8n",
      "Supabase (PostgreSQL)",
      "OpenAI API",
      "Google Gemini API",
      "Jina AI Reader",
      "JavaScript",
      "Webhook APIs",
    ],
    team: {
      size: 1,
      role: "AI Engineer / System Architect",
      focus: [
        "Designed complete system architecture",
        "Built n8n automation workflows",
        "Developed Multi-LLM orchestration",
        "Created database schema and API integrations",
        "Reduced editorial workload by ~80%",
      ],
    },
    results: {
      sourcesIntegrated: "20+ news sources",
      dailyArticles: "150-200 articles/day",
      workloadReduction: "~80% reduction",
      contentQuality: "Consistent SEO-optimized output",
      uptime: "99%+ reliability",
    },
    links: [],
  },
  llm_optimization: {
    title: "LLM Optimization & CoT Distillation Pipeline",
    subtitle: "End-to-End Local LLM Fine-tuning & Deployment",
    overview:
      "An automated pipeline built to fine-tune and distill Chain-of-Thought (CoT) reasoning capabilities from large teacher models (like Gemini 2.5 Flash and Qwen3.5-Flash) into a highly optimized, compact 0.8B student model that runs locally on consumer hardware.",
    contributions:
      "I architected the entire pipeline from dataset synthesis through model quantization. Specifically utilizing Unsloth for ultra-fast, memory-efficient QLoRA fine-tuning and exporting directly to GGUF format for Ollama deployment.",
    features: [
      {
        title: "Synthetic CoT Distillation",
        description:
          "Generated a custom reasoning dataset using high-tier teacher models to transfer explicit logical reasoning capabilities into the lightweight student.",
      },
      {
        title: "Hardware-Optimized Fine-Tuning",
        description:
          "Leveraged Unsloth and QLoRA to fine-tune the model drastically reducing VRAM consumption, allowing training on a standard 8GB GPU.",
      },
      {
        title: "Native GGUF Quantization",
        description:
          "Exported the trained model directly to GGUF format for ultra-fast, lightweight CPU/GPU inference via Llama.cpp.",
      },
      {
        title: "Local API Deployment",
        description:
          "Deployed the optimized model locally using an integrated FastAPI backend and native Ollama serving.",
      },
    ],
    techStack: [
      "Python",
      "PyTorch",
      "Unsloth",
      "QLoRA",
      "FastAPI",
      "Ollama",
      "GGUF",
    ],
    team: {
      size: 1,
      role: "AI Engineer",
      focus: [
        "Designed end-to-end LLM fine-tuning pipeline",
        "Synthesized CoT datasets using Google Gemini/Qwen APIs",
        "Executed model quantization and GGUF exports",
        "Configured local deployment with FastAPI and Ollama",
      ],
    },
    results: {
      hardwareRequirement: "8GB VRAM Consumer GPU",
      performance: "CoT Reasoning at >7 tokens/sec locally",
      modelFormat: "4-bit Quantized GGUF",
    },
    links: [
      {
        text: "GitHub Repository",
        url: "https://github.com/hdtinh57/LLM_Optimization",
        icon: "fab fa-github",
      },
    ],
  },
};


function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  // Extract the project image/video from the DOM card itself
  // Assuming the user clicked a details button, we can find the matching project card by matching data-project
  const btn = document.querySelector(`.details-btn[data-project="${projectId}"]`);
  let mediaHtml = '';
  if (btn) {
      const card = btn.closest('.project-card');
      const projectImageContainer = card.querySelector('.project-image');
      if (projectImageContainer) {
          // Clone the inner HTML (the icon, image, or video + project number)
          mediaHtml = projectImageContainer.innerHTML;
          // We can remove the project number span if we don't want it in the modal
          mediaHtml = mediaHtml.replace(/<span class="project-number">.*?<\/span>/g, '');
      }
  }

  modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
        </div>

        ${
          mediaHtml
            ? `
        <div class="modal-hero-media">
            ${mediaHtml}
        </div>`
            : ""
        }

        <div class="modal-content-grid">
            <div class="modal-main">
                <div class="project-overview">
                    <h3><i class="fas fa-info-circle"></i> Overview</h3>
                    <p>${project.overview}</p>
                </div>

                ${
                  project.contributions
                    ? `
                <div class="project-contributions">
                    <h3><i class="fas fa-user-cog"></i> My Contributions</h3>
                    <p>${project.contributions}</p>
                </div>`
                    : ""
                }

                <div class="project-features">
                    <h3><i class="fas fa-bolt"></i> Key Features</h3>
                    ${project.features
                      .map(
                        (f) => `
                        <div class="feature-item">
                            <h4>${f.title}</h4>
                            <p>${f.description}</p>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>

            <div class="modal-sidebar">
                ${
                  project.team
                    ? `
                <div class="project-team sidebar-section">
                    <h3><i class="fas fa-users"></i> Team & Role</h3>
                    <div class="team-info">
                        <div><strong>Team Size:</strong> ${project.team.size} members</div>
                        <div><strong>My Role:</strong> ${project.team.role}</div>
                        <div class="mt-2"><strong>Key Focus:</strong>
                            <ul>${project.team.focus.map((f) => `<li>${f}</li>`).join("")}</ul>
                        </div>
                    </div>
                </div>`
                    : ""
                }

                ${
                  project.results
                    ? `
                <div class="project-results sidebar-section">
                    <h3><i class="fas fa-chart-line"></i> Results</h3>
                    <div class="results-grid">
                        ${Object.entries(project.results)
                          .map(
                            ([key, val]) => `
                            <div class="result-item">
                                <span class="result-label">${key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                                <span class="result-value">${val}</span>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>`
                    : ""
                }

                <div class="tech-stack sidebar-section">
                    <h3><i class="fas fa-code"></i> Tech Stack</h3>
                    <div class="tech-tags">
                        ${project.techStack.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
                    </div>
                </div>

                ${
                  project.links && project.links.length > 0
                    ? `
                <div class="project-links sidebar-section">
                    ${project.links
                      .map(
                        (l) => `
                        <a href="${l.url}" target="_blank" class="project-link-btn">
                            <i class="${l.icon}"></i> ${l.text}
                        </a>
                    `,
                      )
                      .join("")}
                </div>`
                    : ""
                }
            </div>
        </div>
    `;

  // Autoplay video in modal if exists
  const modalVideo = modalBody.querySelector('video');
  if (modalVideo) {
      modalVideo.play().catch(() => {});
  }

  projectModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  projectModal.style.display = "none";
  document.body.style.overflow = "";
}

// Event delegation for project details buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".details-btn");
  if (btn) {
    openProjectModal(btn.dataset.project);
  }
});

closeButtons.forEach((btn) => btn.addEventListener("click", closeModal));

window.addEventListener("click", (e) => {
  if (e.target === projectModal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---- Video Hover to Play ----
document.querySelectorAll(".project-image-video").forEach((container) => {
  const video = container.querySelector("video");
  if (!video) return;

  const card = container.closest(".project-card");
  card.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });
  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

// ---- Cleanup ----
window.addEventListener("beforeunload", () => {
  window.removeEventListener("scroll", updateActiveNavLink);
});

// ---- Auto-update Counters ----
const projectCounter = document.getElementById("project-counter");
if (projectCounter) {
  const projectCount = Object.keys(projectData).length;
  projectCounter.textContent = `${projectCount}+`;
}

const pubCounter = document.getElementById("publication-counter");
if (pubCounter) {
  let pubCount = 0;
  Object.values(projectData).forEach((proj) => {
    if (proj.results && proj.results.publication) {
      pubCount++;
    }
  });
  pubCounter.textContent = pubCount;
}

const expCounter = document.getElementById("experience-counter");
if (expCounter) {
  const expTimeline = document.querySelector("#experience .timeline");
  if (expTimeline) {
    const dateElements = expTimeline.querySelectorAll(".timeline-date");
    let totalMonths = 0;
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    dateElements.forEach((el) => {
      const text = el.textContent.trim();
      // Regex match formats like "Jan 2024 — Apr 2024" or "Oct 2025 — Present"
      const regex =
        /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})\s*[-—]\s*(Present|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4}))/i;
      const match = text.match(regex);

      if (match) {
        const startMonthStr = match[1];
        const startYear = parseInt(match[2]);
        const startMonth = monthMap[startMonthStr];

        let endMonth, endYear;
        if (match[3].toLowerCase() === "present") {
          const now = new Date();
          endMonth = now.getMonth();
          endYear = now.getFullYear();
        } else {
          const endMonthStr = match[4];
          endMonth = monthMap[endMonthStr];
          endYear = parseInt(match[5]);
        }

        let diff = (endYear - startYear) * 12 + (endMonth - startMonth);
        diff += 1; // Inclusive (e.g. Jan to Jan is 1 month)
        if (diff > 0) totalMonths += diff;
      }
    });

    let years = Math.floor(totalMonths / 12);
    if (years === 0) years = 1; // Fallback to 1+ if < 12 months
    expCounter.textContent = `${years}+`;
  }
}
