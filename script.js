/**
 * ============================================================================
 * ALEX RIVERA | FULL-STACK PORTFOLIO ENGINE
 * Vanilla JavaScript (ES6+) with zero external dependencies
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMobileNav();
  initActiveNavObserver();
  initSkillObserver();
  initSkillFilters();
  initProjectFilters();
  initProjectModal();
  initResumeModal();
  initInteractiveTerminal();
  initContactForm();
  initInboxModal();
  initBackToTop();
  initCurrentYear();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Dark / Light) with LocalStorage Persistence
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Dynamic Hero Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Full-Stack Developer',
    'Computer Science Student',
    'REST API Architect',
    'Frontend & UI Engineer',
    'Open-Source Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close drawer when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Active Navigation Link on Scroll (Intersection Observer)
   -------------------------------------------------------------------------- */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   5. Animated Skill Progress Bars
   -------------------------------------------------------------------------- */
function initSkillObserver() {
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  if (!skillSection || progressBars.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => bar.classList.add('animated'));
          obs.disconnect(); // Animate once
        }
      });
    }, { threshold: 0.15 });

    observer.observe(skillSection);
  } else {
    progressBars.forEach(bar => bar.classList.add('animated'));
  }
}

/* --------------------------------------------------------------------------
   6. Skills Filtering (Category Tabs)
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Projects Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'modal-enter 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Project Details Modal Dialog
   -------------------------------------------------------------------------- */
const projectsDatabase = {
  1: {
    title: "DevConnect — Social Network for Developers",
    category: "Full-Stack Application",
    duration: "4 Weeks",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Tailwind CSS"],
    overview: "DevConnect is a feature-rich developer community hub where coders can build interactive profiles, share markdown code snippets, comment on discussions, and follow other engineers.",
    architecture: "Built with a separated Client-Server model. The frontend connects to an Express REST API backend with bcrypt password hashing and token-based JWT authentication middleware. MongoDB schemas model users, posts, comments, and tech tags with cascading references.",
    keyFeatures: [
      "Secure user authentication (Registration, Login, Password Hashing, JWT in HttpOnly cookies)",
      "Developer profiles with live GitHub repository embedding",
      "Feed with real-time post creation, snippet highlighting, and threaded comments",
      "Search and tag indexing by programming language and framework"
    ],
    challenges: "Handling nested comment trees and preventing unauthorized deletion of user posts. Solved by implementing strict authorization middleware and lean MongoDB aggregation pipelines.",
    liveUrl: "https://example.com/demo/devconnect",
    githubUrl: "https://github.com/example/devconnect"
  },
  2: {
    title: "ShopSphere — Modern E-Commerce Platform",
    category: "Full-Stack Web App",
    duration: "3 Weeks",
    stack: ["JavaScript", "HTML5/CSS3", "Node.js", "Stripe API Mock", "LocalStorage"],
    overview: "A responsive online retail store equipped with dynamic category filters, instant keyword search, slide-out shopping cart drawer, and checkout processing simulation.",
    architecture: "Stateful frontend communicating with JSON mock endpoints. Cart state synchronizes seamlessly with browser LocalStorage to persist items across page reloads and sessions.",
    keyFeatures: [
      "Instant multi-attribute search and price-range slider filtering",
      "Responsive cart drawer with dynamic quantity adjusters and subtotal calculation",
      "Discount code validation system with percentage calculations",
      "Simulated Stripe payment checkout flow with card validation"
    ],
    challenges: "Managing cart state concurrency when products go out of stock. Resolved with optimistic UI updates and real-time inventory validation before order confirmation.",
    liveUrl: "https://example.com/demo/shopsphere",
    githubUrl: "https://github.com/example/shopsphere"
  },
  3: {
    title: "TaskFlow — Collaborative Kanban Board",
    category: "Frontend Web Application",
    duration: "2 Weeks",
    stack: ["HTML5 Drag & Drop", "CSS Grid & Flexbox", "Vanilla JavaScript", "IndexedDB"],
    overview: "A lightweight productivity tool built from the ground up without heavy external libraries. Enables users to organize tasks across configurable swimlanes with intuitive drag-and-drop interactions.",
    architecture: "Modular Vanilla JavaScript architecture leveraging the native HTML5 Drag and Drop API, custom event listeners, and IndexedDB storage for offline persistence.",
    keyFeatures: [
      "Native fluid HTML5 Drag-and-Drop between 'To Do', 'In Progress', and 'Completed' columns",
      "Priority color tags, deadline countdowns, and task labels",
      "JSON Import/Export feature to backup or transfer board state between devices",
      "Custom board search and task quick-filter"
    ],
    challenges: "Handling smooth drop target indicators across mobile touch devices. Solved by adding polyfilled touch-to-drag handlers for mobile screens.",
    liveUrl: "https://example.com/demo/taskflow",
    githubUrl: "https://github.com/example/taskflow"
  },
  4: {
    title: "WeatherPulse — Real-Time Climate Dashboard",
    category: "API & Data Integration",
    duration: "1.5 Weeks",
    stack: ["Vanilla JS", "Fetch API", "OpenWeatherMap API", "SVG Visualizations"],
    overview: "An ambient weather application providing live meteorology data, 5-day predictive forecasts, hourly atmospheric metrics, and interactive dynamic weather animations.",
    architecture: "Asynchronous JavaScript client querying OpenWeatherMap REST endpoints. Features automatic geolocation detection with graceful city-search fallbacks and client-side response caching.",
    keyFeatures: [
      "One-click browser geolocation or global city name search",
      "5-day predictive forecast cards with high/low temperature ranges",
      "Dynamic background ambiance that adapts to live weather conditions (Sunny, Rain, Snow, Night)",
      "Detailed climate telemetry: UV Index, humidity, wind direction, and air pressure"
    ],
    challenges: "Mitigating API rate limit throttling during rapid search queries. Implemented a debounce utility and in-memory TTL cache.",
    liveUrl: "https://example.com/demo/weatherpulse",
    githubUrl: "https://github.com/example/weatherpulse"
  },
  5: {
    title: "CodeVault — Snippet API & Microservice",
    category: "Backend RESTful Microservice",
    duration: "2 Weeks",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Swagger / OpenAPI", "Rate Limiting"],
    overview: "A developer microservice API allowing users to store, query, categorize, and share syntax-highlighted code snippets with rate limiting and API key management.",
    architecture: "Layered backend architecture (Controllers, Services, Repositories). Uses PostgreSQL with full-text search indexing, Docker containerization, and automated Swagger/OpenAPI documentation.",
    keyFeatures: [
      "RESTful CRUD operations with standard HTTP status codes and uniform error JSON formatting",
      "Token bucket rate limiting to prevent denial of service (DoS)",
      "PostgreSQL full-text search indexing across programming languages and tags",
      "Automated interactive Swagger UI documentation at /api-docs"
    ],
    challenges: "Preventing SQL injection and handling malicious code snippet payloads. Addressed with parameterized queries via pg library and strict DOMPurify sanitization.",
    liveUrl: "https://example.com/demo/codevault",
    githubUrl: "https://github.com/example/codevault"
  },
  6: {
    title: "Ultra-Responsive Portfolio Engine",
    category: "Frontend Architecture",
    duration: "1 Week",
    stack: ["Semantic HTML5", "CSS Custom Properties", "Modern JavaScript", "Canvas API"],
    overview: "The very portfolio you are browsing! Engineered with modern semantic standards, accessible dialogs, interactive CLI simulator, and zero external framework bloat.",
    architecture: "Pure vanilla web standards: CSS variables for theme management, IntersectionObserver for performance-first scroll tracking, and HTML5 Canvas particle physics.",
    keyFeatures: [
      "Dynamic Theme Engine (Dark & Light) with system preference detection and localStorage",
      "Interactive CLI / Terminal playground with custom commands and confetti celebration",
      "Client-side simulated contact inbox with instant form validation and storage",
      "100/100 Lighthouse performance-oriented architecture"
    ],
    challenges: "Creating rich interactive components (terminal, modals, confetti) while maintaining zero bundle dependencies and under 30KB total footprint.",
    liveUrl: "#home",
    githubUrl: "https://github.com/example/portfolio"
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-project-body');
  const modalLiveBtn = document.getElementById('modal-live-btn');
  const modalGithubBtn = document.getElementById('modal-github-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const viewButtons = document.querySelectorAll('.view-project-btn');

  if (!modal || !modalTitle || !modalBody) return;

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const project = projectsDatabase[projectId];

      if (!project) return;

      modalTitle.textContent = project.title;
      
      const stackBadges = project.stack.map(tech => `<span class="tag">${tech}</span>`).join(' ');
      const featureList = project.keyFeatures.map(feat => `<li>${feat}</li>`).join('');

      modalBody.innerHTML = `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
          ${stackBadges}
        </div>
        
        <h4 class="modal-section-title">Overview</h4>
        <p>${project.overview}</p>
        
        <h4 class="modal-section-title">Architecture &amp; Tech Details</h4>
        <p>${project.architecture}</p>
        
        <h4 class="modal-section-title">Key Highlights</h4>
        <ul class="modal-feature-list">
          ${featureList}
        </ul>

        <h4 class="modal-section-title">Engineering Challenge Solved</h4>
        <p>${project.challenges}</p>
      `;

      if (modalLiveBtn) modalLiveBtn.href = project.liveUrl;
      if (modalGithubBtn) modalGithubBtn.href = project.githubUrl;

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  }

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    const dialogRect = modal.getBoundingClientRect();
    const isInDialog = (
      e.clientX >= dialogRect.left &&
      e.clientX <= dialogRect.right &&
      e.clientY >= dialogRect.top &&
      e.clientY <= dialogRect.bottom
    );
    if (!isInDialog && e.target === modal) {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    }
  });
}

/* --------------------------------------------------------------------------
   9. Resume Modal Dialog & Print Handler
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const resumeNavBtn = document.getElementById('resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  function openResume() {
    if (typeof resumeModal.showModal === 'function') {
      resumeModal.showModal();
    } else {
      resumeModal.setAttribute('open', '');
    }
  }

  function closeResume() {
    if (typeof resumeModal.close === 'function') {
      resumeModal.close();
    } else {
      resumeModal.removeAttribute('open');
    }
  }

  if (resumeNavBtn) resumeNavBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResume();
    }
  });
}

/* --------------------------------------------------------------------------
   10. Interactive Terminal / CLI Playground
   -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  const clearBtn = document.getElementById('term-clear-btn');
  const pillBtns = document.querySelectorAll('.term-pill-btn');

  if (!form || !input || !body) return;

  const commandResponses = {
    help: `Available commands:
  • <span class="highlight-cmd">skills</span>       : View full breakdown of developer technical skills
  • <span class="highlight-cmd">projects</span>     : List featured full-stack projects
  • <span class="highlight-cmd">about</span>        : Summary of student background and education
  • <span class="highlight-cmd">contact</span>      : Display direct contact channels
  • <span class="highlight-cmd">sudo hire</span>    : Special recruiter command! (Try it 🎉)
  • <span class="highlight-cmd">clear</span>        : Clear the terminal screen
  • <span class="highlight-cmd">whoami</span>       : Display current shell user
  • <span class="highlight-cmd">quote</span>        : Get a programming quote`,
    
    skills: `🚀 Technical Skills Overview:
  • Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS
  • Backend : Node.js, Express.js, RESTful APIs, JWT Authentication
  • Database: MongoDB, PostgreSQL, SQL, Mongoose
  • Tools   : Git, GitHub, Postman, Linux CLI, Docker basics
  • CS Core : Data Structures, Algorithms, OOP, System Design Basics`,

    projects: `📁 Featured Projects:
  1. [Full-Stack] DevConnect — Social network for coders (React + Express + MongoDB)
  2. [Full-Stack] ShopSphere — E-commerce with cart & checkout simulation
  3. [Frontend]   TaskFlow   — Kanban board with native Drag & Drop
  4. [Backend]    CodeVault  — Snippet REST API with PostgreSQL & rate limiting
  5. [Frontend]   WeatherPulse — Real-time climate dashboard with OpenWeather`,

    about: `👤 Alex Rivera | Computer Science Student (Junior)
  • Education: B.S. in Computer Science (GPA: 3.85 / 4.0)
  • Location : San Francisco Bay Area, CA (Open to Remote / Relocation)
  • Objective: Seeking Software Engineer Internships / Junior Full-Stack Roles`,

    contact: `📬 Contact Channels:
  • Email    : alex.rivera.dev@example.com
  • GitHub   : github.com/alexrivera
  • LinkedIn : linkedin.com/in/alexrivera
  • Location : Open for on-site & remote opportunities`,

    whoami: `visitor@recruiter-node (Permission: HIRE_PERMITTED)`,

    quote: `💬 "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." – Martin Fowler`
  };

  function appendLine(htmlContent, className = 'term-output-line') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = htmlContent;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Display user command line
    appendLine(`alex@portfolio:~$ ${cmdRaw}`, 'term-user-line');

    if (cmd === 'clear') {
      body.innerHTML = '';
      return;
    }

    if (cmd === 'sudo hire' || cmd === 'hire') {
      appendLine(`🎉 [SUCCESS] Granting root interview offer privileges!`, 'term-success-line');
      appendLine(`Candidate Alex Rivera accepted into the hiring pipeline! Launching celebration fireworks... 🚀`, 'term-success-line');
      triggerConfetti();
      
      // Smooth scroll to contact after short delay
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1200);
      return;
    }

    if (commandResponses[cmd]) {
      appendLine(commandResponses[cmd]);
    } else {
      appendLine(`command not found: "${cmd}". Type <span class="highlight-cmd">help</span> for a list of available commands.`, 'term-error-line');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = '';
    handleCommand(val);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      body.innerHTML = '';
    });
  }

  pillBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      handleCommand(cmd);
    });
  });
}

/* --------------------------------------------------------------------------
   11. Pure Vanilla JS Confetti Particle Animation
   -------------------------------------------------------------------------- */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 120;
  const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#ffffff'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.5) * 18 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;

    particles.forEach(p => {
      if (p.alpha > 0) {
        activeParticles++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
}

/* --------------------------------------------------------------------------
   12. Contact Form with Validation & Local Storage Persistence
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const successBanner = document.getElementById('form-success-banner');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  updateInboxBadge();

  if (!form) return;

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      if (nameError) nameError.classList.add('visible');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
      if (nameError) nameError.classList.remove('visible');
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      if (emailError) emailError.classList.add('visible');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
      if (emailError) emailError.classList.remove('visible');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      if (messageError) messageError.classList.add('visible');
      isValid = false;
    } else {
      messageInput.classList.remove('is-invalid');
      if (messageError) messageError.classList.remove('visible');
    }

    if (!isValid) return;

    // Simulated Asynchronous API Call
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const btnIcon = submitBtn.querySelector('.btn-send-icon');

    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending Message...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';
    if (btnIcon) btnIcon.style.display = 'none';

    setTimeout(() => {
      // Create new message payload
      const newMessage = {
        id: Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value,
        message: messageInput.value.trim(),
        timestamp: new Date().toLocaleString()
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('portfolio_inbox_messages') || '[]');
      existing.unshift(newMessage);
      localStorage.setItem('portfolio_inbox_messages', JSON.stringify(existing));

      // Reset form controls
      form.reset();
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Message';
      if (btnSpinner) btnSpinner.style.display = 'none';
      if (btnIcon) btnIcon.style.display = 'inline-block';

      // Show success notification banner
      if (successBanner) {
        successBanner.style.display = 'flex';
        setTimeout(() => {
          successBanner.style.display = 'none';
        }, 5000);
      }

      updateInboxBadge();
      triggerConfetti();
    }, 900);
  });
}

function updateInboxBadge() {
  const badge = document.getElementById('inbox-count-badge');
  if (!badge) return;
  const existing = JSON.parse(localStorage.getItem('portfolio_inbox_messages') || '[]');
  badge.textContent = existing.length;
}

/* --------------------------------------------------------------------------
   13. Inbox / Stored Messages Modal Dialog
   -------------------------------------------------------------------------- */
function initInboxModal() {
  const inboxModal = document.getElementById('inbox-modal');
  const viewInboxBtn = document.getElementById('view-inbox-btn');
  const closeInboxBtn = document.getElementById('close-inbox-btn');
  const clearInboxBtn = document.getElementById('clear-inbox-btn');
  const messagesList = document.getElementById('inbox-messages-list');

  if (!inboxModal || !viewInboxBtn) return;

  function renderInbox() {
    const messages = JSON.parse(localStorage.getItem('portfolio_inbox_messages') || '[]');

    if (!messagesList) return;

    if (messages.length === 0) {
      messagesList.innerHTML = `<div class="inbox-empty">No messages submitted yet. Try sending a message using the form!</div>`;
      return;
    }

    messagesList.innerHTML = messages.map(msg => `
      <div class="inbox-item">
        <div class="inbox-item-header">
          <span class="inbox-sender">${escapeHtml(msg.name)} (${escapeHtml(msg.email)})</span>
          <span class="inbox-time">${escapeHtml(msg.timestamp)}</span>
        </div>
        <div class="inbox-sub">${escapeHtml(msg.subject)}</div>
        <div class="inbox-msg">${escapeHtml(msg.message)}</div>
      </div>
    `).join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  viewInboxBtn.addEventListener('click', () => {
    renderInbox();
    if (typeof inboxModal.showModal === 'function') {
      inboxModal.showModal();
    } else {
      inboxModal.setAttribute('open', '');
    }
  });

  if (closeInboxBtn) {
    closeInboxBtn.addEventListener('click', () => {
      if (typeof inboxModal.close === 'function') {
        inboxModal.close();
      } else {
        inboxModal.removeAttribute('open');
      }
    });
  }

  if (clearInboxBtn) {
    clearInboxBtn.addEventListener('click', () => {
      localStorage.removeItem('portfolio_inbox_messages');
      renderInbox();
      updateInboxBadge();
    });
  }

  inboxModal.addEventListener('click', (e) => {
    if (e.target === inboxModal) {
      if (typeof inboxModal.close === 'function') {
        inboxModal.close();
      } else {
        inboxModal.removeAttribute('open');
      }
    }
  });
}

/* --------------------------------------------------------------------------
   14. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   15. Current Year
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
