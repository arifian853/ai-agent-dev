/**
 * Arifian Portfolio — Interactive Controller
 * Soft Editorial Materialism & Rosewood Mood
 * Zero external dependencies — Pure Modern JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dynamic Clock for Jakarta Local Time (WIB / UTC+7) ---
  const clockElement = document.getElementById('local-time-clock');
  function updateJakartaTime() {
    if (!clockElement) return;
    const now = new Date();
    // Format in Asia/Jakarta timezone
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    clockElement.textContent = `${formatter.format(now)} WIB`;
  }
  updateJakartaTime();
  setInterval(updateJakartaTime, 1000);

  // Update current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --- 2. Adaptive Header on Scroll ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- 3. Mobile Navigation Drawer ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // --- 4. Scroll Spy with IntersectionObserver ---
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // --- 5. Accessible Toast Notification System ---
  const toastContainer = document.getElementById('toast-container');
  function showToast(message, duration = 3200) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 260);
    }, duration);
  }

  // --- 6. Clipboard Copy Email ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'arifian@subtle.web.id';
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied ${email} to clipboard!`);
      } catch (err) {
        // Fallback prompt
        window.prompt('Copy email:', email);
      }
    });
  }

  // --- 7. Live Token Tester (Bento Interactive Widget) ---
  const radiusSlider = document.getElementById('radius-slider');
  const radiusVal = document.getElementById('radius-val');
  const liveSample = document.getElementById('live-sample');
  const toneButtons = document.querySelectorAll('.btn-tone');

  if (radiusSlider && radiusVal && liveSample) {
    radiusSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      radiusVal.textContent = `${val}px`;
      liveSample.style.borderRadius = `${val}px`;
    });
  }

  if (toneButtons && liveSample) {
    toneButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        toneButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tone = btn.getAttribute('data-tone');
        if (tone === 'surface') {
          liveSample.style.background = 'var(--bg-surface)';
          liveSample.style.color = 'var(--text-main)';
          liveSample.style.borderColor = 'var(--border-subtle)';
        } else if (tone === 'variant') {
          liveSample.style.background = 'var(--bg-surface-variant)';
          liveSample.style.color = 'var(--text-main)';
          liveSample.style.borderColor = 'var(--border-subtle)';
        } else if (tone === 'container') {
          liveSample.style.background = 'var(--primary-container)';
          liveSample.style.color = 'var(--on-primary-container)';
          liveSample.style.borderColor = 'transparent';
        }
      });
    });
  }

  // --- 8. Project Category Filter ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.animation = 'toast-in 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 9. Project Modal Data & Dynamic View ---
  const projectData = {
    'subtle-ds': {
      category: 'DESIGN SYSTEM • 2025–2026',
      title: 'Subtle Design System: Soft Editorial Materialism',
      metrics: [
        { label: 'Color Moods', val: '8 Palettes' },
        { label: 'Token Scale', val: '42 Tokens' },
        { label: 'Contrast Ratio', val: '4.8:1+ (AA)' }
      ],
      html: `
        <p><strong>The Challenge:</strong> Modern UI component libraries often oscillate between overly mechanical utility kits and flashy, hyper-animated themes that tire enterprise users. Arifian created <em>Subtle</em> as a complete design language balancing editorial white-space, tonal materiality, and Material-inspired ergonomics.</p>
        
        <h4>Core Architecture Deliverables</h4>
        <ul>
          <li><strong>Universal Token Contract:</strong> A strict 42-token hierarchy with automated alias mapping across Light, Dark, and Tonal moods including Teal, Slate, Beige, and Rosewood.</li>
          <li><strong>WCAG 2.2 AA Accessibility Audit:</strong> Dedicated correction tokens for high-density environments ensuring strict contrast compliance on every surface.</li>
          <li><strong>Dual Type Scale:</strong> Responsive editorial typography for expressive marketing pages, coupled with dense 12–14px product typography for operational tools.</li>
          <li><strong>Signature Soft Mosaic Pattern:</strong> Asymmetrical surface layout replacing boring uniform SaaS cards with hierarchical information weight.</li>
        </ul>

        <h4>System Outcomes</h4>
        <p>Adopted as the foundational benchmark for multi-brand applications, cutting UI implementation time by 60% and harmonizing developer-designer handoffs.</p>
      `
    },
    'lumina-cloud': {
      category: 'ENTERPRISE SAAS • 2024–2025',
      title: 'Lumina Cloud Telemetry Console',
      metrics: [
        { label: 'MTTD Reduction', val: '-38%' },
        { label: 'Managed Nodes', val: '2.4M' },
        { label: 'Active Squads', val: '14 Teams' }
      ],
      html: `
        <p><strong>The Challenge:</strong> DevOps teams managing large distributed Kubernetes clusters suffered from severe alert fatigue and cluttered tables containing hundreds of unranked metrics.</p>

        <h4>Design Strategy & Execution</h4>
        <ul>
          <li><strong>Calm Status Hierarchy:</strong> Redesigned severity levels into semantic priority colors (High, Normal, Low) that direct attention without anxiety-inducing alarms.</li>
          <li><strong>Floating Contextual Inspectors:</strong> Replaced disruptive page navigations with side-panel slide drawers, keeping engineers within their active operational mental model.</li>
          <li><strong>Keyboard-First Command Ergonomics:</strong> Introduced quick filtering, fuzzy command search, and instant node health diagnostics via keyboard hotkeys.</li>
        </ul>

        <h4>Measured Impact</h4>
        <p>Telemetry operators resolved node anomalies 38% faster, and satisfaction ratings across 14 internal engineering squads increased from 61 to 91 NPS.</p>
      `
    },
    'monochrome-ledger': {
      category: 'FINTECH & CREATORS • 2023–2024',
      title: 'Monochrome Ledger & Invoicing Platform',
      metrics: [
        { label: 'Transacted ARR', val: '$18M+' },
        { label: 'App Store Rating', val: '4.9 / 5' },
        { label: 'Bookkeeping Saved', val: '4 hrs/wk' }
      ],
      html: `
        <p><strong>The Challenge:</strong> Solo founders and boutique design agencies needed an accounting experience that felt empowering, clean, and distraction-free rather than intimidating.</p>

        <h4>Key Innovations</h4>
        <ul>
          <li><strong>Editorial Financial Overview:</strong> Transformed dry balance sheets into clean, readable typography with subtle tonal status capsules.</li>
          <li><strong>One-Click Instant Invoicing:</strong> Streamlined multi-currency invoices with automatic Stripe/Wise synchronization and payment tracking.</li>
          <li><strong>Tactile Micro-interactions:</strong> Designed reassuring confirm feedback for high-stakes financial operations.</li>
        </ul>

        <h4>Result</h4>
        <p>Processed over $18,000,000 in creator invoices within 12 months with a 99.4% retention rate among creative studio subscribers.</p>
      `
    },
    'verdant-catalog': {
      category: 'EDITORIAL COMMERCE • 2023',
      title: 'Verdant Living Specimen Catalog',
      metrics: [
        { label: 'AOV Increase', val: '+29%' },
        { label: 'Lighthouse Score', val: '99 / 100' },
        { label: 'Specimen Entries', val: '450+' }
      ],
      html: `
        <p><strong>The Challenge:</strong> A luxury horticultural archive needed a digital flagship to showcase extremely rare botanical specimens to international collectors.</p>

        <h4>Design Approach</h4>
        <ul>
          <li><strong>Editorial Specimen Cards:</strong> Combined high-resolution botanical photography with taxonomic nomenclature in JetBrains Mono.</li>
          <li><strong>Provenance & Care Tracking:</strong> Integrated care difficulty indices, humidity guides, and documented botanical origins.</li>
          <li><strong>Performant Image Architecture:</strong> Implemented fluid responsive layouts and modern image formats for sub-second page loads.</li>
        </ul>

        <h4>Result</h4>
        <p>Delivered an organic +29% lift in average order value and won multiple web design showcase honors for editorial typography.</p>
      `
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('project-modal-close');
  const modalCloseAction = document.getElementById('modal-close-action');
  const modalInquireAction = document.getElementById('modal-inquire-action');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalContent = document.getElementById('modal-project-content');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;

    const metricsHtml = data.metrics.map(m => `
      <div class="modal-metric-item">
        <div class="modal-metric-val">${m.val}</div>
        <div class="modal-metric-lbl">${m.label}</div>
      </div>
    `).join('');

    modalContent.innerHTML = `
      <div class="modal-metric-banner">
        ${metricsHtml}
      </div>
      ${data.html}
    `;

    projectModal.showModal();
    projectModal.focus();
  }

  function closeProjectModal() {
    if (projectModal && projectModal.open) {
      projectModal.close();
    }
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project');
      if (pid) openProjectModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeProjectModal);
  if (modalInquireAction) modalInquireAction.addEventListener('click', closeProjectModal);

  // Close modal when clicking backdrop
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeProjectModal();
      }
    });
  }

  // --- 10. Soft Command Bar (Cmd + K Modal) ---
  const cmdDialog = document.getElementById('cmd-dialog');
  const cmdBtn = document.getElementById('cmd-btn');
  const openCmdHint = document.getElementById('open-cmd-hint');
  const cmdCloseBtn = document.getElementById('cmd-close-btn');
  const cmdSearchInput = document.getElementById('cmd-search-input');
  const cmdResults = document.getElementById('cmd-results');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCommandBar() {
    if (!cmdDialog) return;
    cmdDialog.showModal();
    if (cmdSearchInput) {
      cmdSearchInput.value = '';
      cmdSearchInput.focus();
      filterCommandItems('');
    }
  }

  function closeCommandBar() {
    if (cmdDialog && cmdDialog.open) {
      cmdDialog.close();
    }
  }

  function filterCommandItems(query) {
    const q = query.toLowerCase().trim();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (cmdBtn) cmdBtn.addEventListener('click', openCommandBar);
  if (openCmdHint) openCmdHint.addEventListener('click', openCommandBar);
  if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCommandBar);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdDialog?.open) {
        closeCommandBar();
      } else {
        openCommandBar();
      }
    }
  });

  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', (e) => {
      filterCommandItems(e.target.value);
    });
  }

  // Handle Command Item Clicks
  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      executeCommand(item);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(item);
      }
    });
  });

  function executeCommand(item) {
    const action = item.getAttribute('data-action');
    closeCommandBar();

    if (action === 'goto') {
      const target = item.getAttribute('data-target');
      if (target) {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (action === 'copy-email') {
      navigator.clipboard.writeText('arifian@subtle.web.id').then(() => {
        showToast('Copied arifian@subtle.web.id to clipboard!');
      });
    } else if (action === 'toggle-inspector') {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        skillsSection.scrollIntoView({ behavior: 'smooth' });
        const slider = document.getElementById('radius-slider');
        slider?.focus();
        showToast('Adjust corner radius slider to preview live token scale!');
      }
    }
  }

  // Backdrop click on Cmd Modal
  if (cmdDialog) {
    cmdDialog.addEventListener('click', (e) => {
      const rect = cmdDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeCommandBar();
      }
    });
  }

  // --- 11. Contact Form Client-side Validation & Feedback ---
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';

      // Validate Name
      if (!nameInput.value.trim()) {
        if (nameError) nameError.textContent = 'Please provide your name.';
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        if (emailError) emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        if (emailError) emailError.textContent = 'Please enter a valid email format (e.g. name@domain.com).';
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        if (messageError) messageError.textContent = 'Please share at least a short sentence regarding your project requirements.';
        isValid = false;
      }

      if (!isValid) return;

      // Mock successful transmission
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Delivering Message...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Message Delivered</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
          `;
        }

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been received. Arifian will review your note and respond within 24 hours.`;
        }

        showToast('Message sent successfully! Thank you.');
        contactForm.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = `
              <span>Deliver Message</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            `;
          }
        }, 5000);
      }, 700);
    });
  }
});
