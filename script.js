// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
            } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});


    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
            e.preventDefault();
        const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
                });
            }
        });
    });

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe all sections for animations
sections.forEach(section => {
    observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}


// Typewriter effect with multiple texts (like portfolioWebsite)
const typewriterTexts = [
    "Hi, my name's Tinh",
    "I like listening to music 🎵",
    "I_like_to_code.py",
    "And I'm addicted to ☕️"
];

let currentTextIndex = 0;
let isDeleting = false;
let currentText = '';
let typewriterSpeed = 100;

function typewriterEffect() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const fullText = typewriterTexts[currentTextIndex];
    
    if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typewriterSpeed = 50;
    } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typewriterSpeed = 100;
    }

    typewriterElement.textContent = currentText;

    if (!isDeleting && currentText === fullText) {
        typewriterSpeed = 2000; // Pause at end
        setTimeout(() => {
            isDeleting = true;
            typewriterEffect();
        }, typewriterSpeed);
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        typewriterSpeed = 500; // Pause before next text
        setTimeout(() => {
            typewriterEffect();
        }, typewriterSpeed);
    } else {
        setTimeout(() => {
            typewriterEffect();
        }, typewriterSpeed);
    }
}


// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Form submission handling - Multiple options without email
const contactForm = document.querySelector('.form');
    if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        try {
            // Option 1: Save to localStorage (for demo purposes)
            const contactData = {
                name: name,
                email: email,
                subject: subject || 'Contact from Portfolio',
                message: message,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            
            // Get existing contacts or create new array
            let contacts = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
            contacts.push(contactData);
            localStorage.setItem('portfolio_contacts', JSON.stringify(contacts));
            
            // Option 2: Log to console (for development)
            console.log('New Contact Form Submission:', contactData);
            
            // Option 3: Display success message with contact info
            showNotification(`Thank you ${name}! Your message has been received. I'll get back to you soon!`, 'success');
            
            // Option 4: Send to Telegram Bot
            sendToTelegramBot(name, email, subject, message);
            
            // Option 5: Show alternative contact methods
            setTimeout(() => {
                showAlternativeContactMethods(name);
            }, 2000);
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Error processing form:', error);
            showNotification('Error processing your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Function to view stored contacts (for admin purposes)
function viewStoredContacts() {
    const contacts = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    console.log('Stored Contacts:', contacts);
    return contacts;
}

// Function to clear stored contacts
function clearStoredContacts() {
    localStorage.removeItem('portfolio_contacts');
    console.log('All contacts cleared');
}

// Function to send message to Telegram Bot
function sendToTelegramBot(name, email, subject, message) {
    // Get credentials from environment variables or use empty strings
    const BOT_TOKEN = window.TELEGRAM_BOT_TOKEN || '';
    const CHAT_ID = window.TELEGRAM_CHAT_ID || '';
    
    // Debug: Log credentials (remove in production)
    console.log('Telegram Bot Debug:', {
        hasToken: !!BOT_TOKEN,
        hasChatId: !!CHAT_ID,
        tokenLength: BOT_TOKEN.length,
        chatIdLength: CHAT_ID.length
    });
    
    // Format the message for Telegram
    const telegramMessage = `
🤖 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Subject:* ${subject || 'Contact from Portfolio'}
💬 *Message:*
${message}

⏰ *Time:* ${new Date().toLocaleString()}
🌐 *Source:* Portfolio Website
    `;
    
    // Method 1: Direct Telegram Bot API (requires server-side proxy for CORS)
    if (BOT_TOKEN && CHAT_ID) {
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage,
                parse_mode: 'Markdown'
            })
        })
        .then(response => {
            console.log('Telegram API Response Status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Telegram API Response:', data);
            if (data.ok) {
                console.log('✅ Message sent to Telegram successfully');
                showNotification('Message also sent to Telegram!', 'success');
            } else {
                console.error('❌ Telegram API error:', data);
                showNotification('Telegram bot unavailable, opening alternative contact methods...', 'info');
                openTelegramApp(name, email, subject, message);
            }
        })
        .catch(error => {
            console.error('❌ Network error sending to Telegram:', error);
            showNotification('Network error, trying alternative contact methods...', 'info');
            openTelegramApp(name, email, subject, message);
        });
    } else {
        // Method 2: Open Telegram app with pre-filled message
        openTelegramApp(name, email, subject, message);
    }
}

// Function to open Telegram app with pre-filled message
function openTelegramApp(name, email, subject, message) {
    const telegramMessage = `Hi! I'm ${name} (${email}). 

Subject: ${subject || 'Contact from Portfolio'}

Message: ${message}

I found you through your portfolio website.`;

    // Try to open Telegram app
    const telegramUrl = `https://t.me/cykablyat572?text=${encodeURIComponent(telegramMessage)}`;
    
    // Open in new tab
    const telegramWindow = window.open(telegramUrl, '_blank');
    
    if (telegramWindow) {
        showNotification('Opening Telegram app...', 'info');
    } else {
        // Fallback: Show manual instructions
        showTelegramInstructions(name, email, subject, message);
    }
}

// Function to show Telegram instructions
function showTelegramInstructions(name, email, subject, message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
            <h3 style="margin-bottom: 1rem; color: #333;">📱 Contact via Telegram</h3>
            <p style="margin-bottom: 1.5rem; color: #666;">
                Copy the message below and send it to <strong>@cykablyat572</strong> on Telegram:
            </p>
            <div style="
                background: #f5f5f5;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                text-align: left;
                font-family: monospace;
                white-space: pre-wrap;
                max-height: 200px;
                overflow-y: auto;
            ">Hi! I'm ${name} (${email}).

Subject: ${subject || 'Contact from Portfolio'}

Message: ${message}

I found you through your portfolio website.</div>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
                <button onclick="copyToClipboard('Hi! I\\'m ${name} (${email}).\\n\\nSubject: ${subject || 'Contact from Portfolio'}\\n\\nMessage: ${message}\\n\\nI found you through your portfolio website.')" style="
                    background: #0088cc;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                ">📋 Copy Message</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    background: #333;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                ">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Message copied to clipboard!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Message copied to clipboard!', 'success');
    }
}

// Function to show alternative contact methods
function showAlternativeContactMethods(name) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
            <h3 style="margin-bottom: 1rem; color: #333;">Thanks ${name}! Let's connect directly:</h3>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0;">
                <a href="https://www.linkedin.com/in/hdtinh57" target="_blank" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.8rem 1.5rem;
                    background: #0077b5;
                    color: white;
                    text-decoration: none;
                    border-radius: 25px;
                    transition: transform 0.3s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fab fa-linkedin"></i>
                    LinkedIn
                </a>
                <a href="https://github.com/hdtinh57" target="_blank" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.8rem 1.5rem;
                    background: #333;
                    color: white;
                    text-decoration: none;
                    border-radius: 25px;
                    transition: transform 0.3s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fab fa-github"></i>
                    GitHub
                </a>
                <a href="mailto:huynhductinh57@gmail.com" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.8rem 1.5rem;
                    background: #ea4335;
                    color: white;
                    text-decoration: none;
                    border-radius: 25px;
                    transition: transform 0.3s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-envelope"></i>
                    Email
                </a>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #333;
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 25px;
                cursor: pointer;
                margin-top: 1rem;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 10000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);

// Active navigation link highlighting
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            }
        });
    }

// Add active link styles
const activeLinkStyles = document.createElement('style');
activeLinkStyles.textContent = `
    .nav-link.active {
        color: #667eea;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeLinkStyles);

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active link on page load
updateActiveNavLink();

// Loading Screen Management
const loadingScreen = document.getElementById('loading-screen');
let loadingProgress = 0;

// Simulate loading progress
function updateLoadingProgress() {
    loadingProgress += Math.random() * 30;
    if (loadingProgress > 100) loadingProgress = 100;
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = loadingProgress + '%';
    }
    
    if (loadingProgress < 100) {
        setTimeout(updateLoadingProgress, 200);
    } else {
        // Hide loading screen after completion
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
            
            // Initialize typewriter effect after loading
            setTimeout(() => {
                typewriterEffect();
            }, 500);
        }, 500);
    }
}

// Start loading animation
window.addEventListener('load', () => {
    updateLoadingProgress();
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
function debounceScroll(callback, delay = 16) {
    return function(...args) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => callback.apply(this, args), delay);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounceScroll(() => {
    updateActiveNavLink();
    
    // Parallax effect for floating shapes
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'portfolio-assets/images/profile/your-photo.png',
        'portfolio-assets/images/profile/your-photo-about.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Start preloading when DOM is ready
document.addEventListener('DOMContentLoaded', preloadImages);


// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Performance Metrics:');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('Total Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
}

measurePerformance();

// Optimize animations for 60fps
function optimizeAnimations() {
    let ticking = false;
    
    function updateAnimations() {
        // Your animation logic here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    return requestTick;
}

// Memory optimization: Clean up event listeners
function cleanup() {
    // Remove event listeners when page unloads
    window.removeEventListener('scroll', optimizedScrollHandler);
    window.removeEventListener('load', updateLoadingProgress);
}

window.addEventListener('beforeunload', cleanup);

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
                opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
                opacity: 1;
            }
`;
document.head.appendChild(loadingStyles);

// Smooth reveal animation for elements
function revealElements() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Run reveal animation on scroll
window.addEventListener('scroll', revealElements);

// Run on page load
revealElements();

// Add hover effects for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Project Modal Functionality
const projectModal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeButtons = document.querySelectorAll('.close');

// Project data
const projectData = {
    navigation: {
        title: "AI-Powered Navigation for the Visually Impaired",
        subtitle: "Lightweight Real-time Object Detection & Voice-Guided Assistance",
        
        overview:
            "A graduation capstone project developed by a team of four, designed to assist visually impaired users with real-time environmental understanding. The system integrates lightweight object detection, depth estimation, and natural language feedback to enable safe and independent navigation.",
        
        contributions:
            "As the primary AI developer, I led the design and optimization of the object detection and depth estimation modules. I proposed a lightweight alternative to traditional 3D object detection, achieving faster inference without sacrificing spatial precision. I also handled dataset preparation, benchmarking, model training, and full-system validation.",
        
        features: [
            {
                title: "Lightweight Object Detection",
                description:
                    "Implemented an optimized YOLO11 model achieving ~90% detection accuracy while maintaining real-time performance on edge devices."
            },
            {
                title: "Depth Estimation",
                description:
                    "Integrated Depth Anything V2 for precise distance measurement with 94.7% accuracy within ±30 cm, providing reliable spatial awareness."
            },
            {
                title: "Voice-Guided Feedback",
                description:
                    "Utilized GPT-4o for generating natural spoken navigation cues, integrating both speech-to-text and text-to-speech modules for full bidirectional interaction."
            },
            {
                title: "Accessibility-Centered Design",
                description:
                    "Developed with a strong focus on usability and inclusivity, providing intuitive voice feedback and low-latency processing for real-world deployment."
            }
        ],
        
        techStack: [
            "YOLO11",
            "Depth Anything V2",
            "wav2vec-base-vietnamese-250h",
            "ElevenLabs",
            "GPT-4o",
            "Python",
            "OpenCV",
            "PyTorch"
        ],
        
        team: {
            size: 4,
            role: "AI Engineer / Research Lead",
            focus: [
                "Proposed and designed core AI architecture",
                "Led model benchmarking and lightweight optimization",
                "Developed and trained detection and depth modules",
                "Built and tested full integration pipeline with real-world evaluation"
            ]
        },
        
        results: {
            detectionAccuracy: "~90%",
            depthAccuracy: "94.7% within ±30 cm",
            latency: "Real-time (30 FPS)",
            deployment: "Web application"
        },
        
        links: [
            // {
            //     text: "View Publication",
            //     url: "https://doi.org/10.1109/MLHMI66056.2025.00018",
            //     icon: "fas fa-external-link-alt"
            // },
            // {
            //     text: "GitHub Repository",
            //     url: "https://github.com/hdtinh57",
            //     icon: "fab fa-github"
            // }
        ]
    },
    tempromot: {
        title: "LLM-Guided Multi-Object Tracking (TempRMOT)",
        subtitle: "Research Publication – International Conference MLHMI 2025",
    
        overview:
            "A collaborative research project that integrates Temporally Enhanced Referring Multi-Object Tracking (TempRMOT) with Large Language Models (LLMs) to improve retail scene understanding and customer behavior analysis. The system enhances tracking precision and contextual comprehension across time-based visual data.",
    
        contributions:
            "As the research engineer of a 3-member team, I focused on exploring TempRMOT architecture and building the supporting data infrastructure. My key contributions included researching related works, developing the labeling pipeline and annotation tools, assisting with dataset collection, implementing data preprocessing scripts, and supporting model training and evaluation.",
    
        features: [
            {
                title: "Hybrid Architecture",
                description:
                    "Integrated TempRMOT with LLMs for improved multi-object tracking, temporal reasoning, and semantic understanding."
            },
            {
                title: "Retail Analytics Focus",
                description:
                    "Designed specifically for retail environments to analyze customer behavior and product interactions through video sequences."
            },
            {
                title: "Performance Results",
                description:
                    "Achieved 81.8% Exact Match and 84.5% Semantic Similarity on a custom retail dataset."
            },
            {
                title: "Academic Contribution",
                description:
                    "Published at the 2025 International Conference on Machine Learning and Human-Machine Interaction (MLHMI)."
            }
        ],
    
        techStack: [
            "TempRMOT",
            "Large Language Models (LLMs)",
            "PyTorch",
            "OpenCV",
            "Python",
            "Labeling Pipeline",
            "Computer Vision"
        ],
    
        team: {
            size: 3,
            role: "Research Engineer",
            focus: [
                "Researched TempRMOT and related tracking methodologies",
                "Designed and implemented labeling tools and data pipeline",
                "Supported dataset collection and annotation workflow",
                "Assisted in training, fine-tuning, and evaluating TempRMOT"
            ]
        },
    
        results: {
            exactMatch: "81.8%",
            semanticSimilarity: "84.5%",
            publication: "MLHMI 2025 – DOI: 10.1109/MLHMI66056.2025.00018"
        },
    
        links: [
            {
                text: "View Publication",
                url: "https://doi.org/10.1109/MLHMI66056.2025.00018",
                icon: "fas fa-external-link-alt"
            },
            // {
            //     text: "GitHub Repository",
            //     url: "https://github.com/hdtinh57",
            //     icon: "fab fa-github"
            // }
        ]
    },
    gptjson: {
        title: "GPT-JSON: Intelligent Q&A over Structured Data",
        subtitle: "LLM-powered WebApp for Conversational JSON Querying",
    
        overview:
            "A personal utility project that enables users to interact with JSON files through natural language queries. The system uses Large Language Models to parse user questions, retrieve relevant fields, and generate contextual answers — simplifying how non-technical users explore structured data.",
    
        contributions:
            "I independently designed and built the entire pipeline — from frontend to model integration. The system uses LangChain and OpenAI’s GPT models for query reasoning, ChromaDB for vector-based retrieval, and a Gradio web interface for real-time interaction.",
    
        features: [
            {
                title: "Conversational Data Access",
                description: 
                    "Allows users to query complex JSON data in natural language, with responses grounded on file contents."
            },
            {
                title: "Vector-based Retrieval",
                description:
                    "Embeds JSON entries into ChromaDB for efficient semantic search and context retrieval."
            },
            {
                title: "LLM Integration",
                description:
                    "Uses OpenAI GPT models orchestrated via LangChain for context-aware reasoning and JSON-structured outputs."
            },
            {
                title: "Lightweight WebApp",
                description:
                    "Built with Gradio for fast deployment and intuitive browser-based interaction."
            }
        ],
    
        techStack: [
            "OpenAI API",
            "LangChain",
            "ChromaDB",
            "Gradio",
            "Python"
        ],
    
        team: {
            size: 1,
            role: "AI Engineer / Full-stack Developer",
            focus: [
                "Designed system architecture and prompt pipeline",
                "Implemented semantic retrieval using ChromaDB",
                "Developed Gradio-based interactive interface",
                "Integrated GPT model for JSON reasoning and response generation"
            ]
        },
    
        results: {
            usability: "Enabled natural-language access to structured JSON data",
            latency: "Real-time responses (<2s average)",
            deployment: "Local + hosted prototype via Gradio"
        },
    
        links: [
            {
                text: "View Colab Notebook",
                url: "https://colab.research.google.com/drive/1sXu8hfet21bB9ctB1UD9iQgfLZWKFUAk#scrollTo=msgQ_YLwcdUm",
                icon: "fab fa-google"
            },
            // {
            //     text: "View on GitHub",
            //     url: "https://github.com/hdtinh57",
            //     icon: "fab fa-github"
            // }
        ]
    },
    
};

// Open project details modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
        </div>
        <div class="modal-body">
            <div class="project-overview">
                <h3><i class="fas fa-info-circle"></i> Project Overview</h3>
                <p>${project.overview}</p>
            </div>
            
            ${project.contributions ? `
            <div class="project-contributions">
                <h3><i class="fas fa-user-cog"></i> My Contributions</h3>
                <p>${project.contributions}</p>
            </div>
            ` : ''}
            
            <div class="project-features">
                ${project.features.map(feature => `
                    <div class="feature-item">
                        <h4>${feature.title}</h4>
                        <p>${feature.description}</p>
                    </div>
                `).join('')}
            </div>
            
            ${project.team ? `
            <div class="project-team">
                <h3><i class="fas fa-users"></i> Team & Role</h3>
                <div class="team-info">
                    <div class="team-size">
                        <strong>Team Size:</strong> ${project.team.size} members
                    </div>
                    <div class="team-role">
                        <strong>My Role:</strong> ${project.team.role}
                    </div>
                    <div class="team-focus">
                        <strong>Key Focus Areas:</strong>
                        <ul>
                            ${project.team.focus.map(focus => `<li>${focus}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            ` : ''}
            
            ${project.results ? `
            <div class="project-results">
                <h3><i class="fas fa-chart-line"></i> Key Results</h3>
                <div class="results-grid">
                    ${Object.entries(project.results).map(([key, value]) => `
                        <div class="result-item">
                            <span class="result-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                            <span class="result-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="tech-stack">
                <h3><i class="fas fa-code"></i> Technology Stack</h3>
                <div class="tech-tags">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            ${project.links && project.links.length > 0 ? `
            <div class="project-links">
                ${project.links.map(link => `
                    <a href="${link.url}" target="_blank" class="project-link-btn">
                        <i class="${link.icon}"></i>
                        ${link.text}
                    </a>
                `).join('')}
            </div>
            ` : ''}
        </div>
    `;
    
    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


// Close modal
function closeModal() {
    projectModal.style.display = 'none';
    document.body.style.overflow = '';
}

// Event listeners for buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.details-btn')) {
        const projectId = e.target.closest('.details-btn').dataset.project;
        openProjectModal(projectId);
    }
});

// Close modal events
closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});


// Force cache reload on page load
window.addEventListener('load', () => {
    // Clear all caches
    if ('caches' in window) {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
                console.log('🗑️ Cleared cache:', cacheName);
            });
        });
    }
    
    // Force reload if this is a cached version
    if (performance.navigation.type === 2) { // Back/forward cache
        console.log('🔄 Detected cached page, forcing reload...');
        window.location.reload(true);
    }
});

// Console welcome message
console.log(`
%c🚀 Portfolio Website v1.0.1
%cChào mừng bạn đến với portfolio của tôi!
%cĐược phát triển với ❤️ và JavaScript
`, 
'color: #667eea; font-size: 20px; font-weight: bold;',
'color: #333; font-size: 14px;',
'color: #666; font-size: 12px;'
);