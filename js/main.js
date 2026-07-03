/**
 * Main JavaScript - Header, Footer, Navigation, Modals, FAQ
 */
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function getPageLinks() {
    return {
      home1: 'index.html',
      home2: 'home-2.html',
      about: 'about.html',
      packages: 'packages.html',
      gallery: 'gallery.html',
      reviews: 'reviews.html',
      trainers: 'trainers.html',
      contact: 'contact.html'
    };
  }

  function isActive(page) {
    return currentPage === page ? 'active' : '';
  }

  function isHomeActive() {
    return currentPage === 'index.html' || currentPage === 'home-2.html' ? 'active' : '';
  }

  function renderHeader() {
    const links = getPageLinks();
    const header = document.getElementById('site-header');
    if (!header) return;

    header.innerHTML = `
      <div class="header-inner">
        <a href="${links.home1}" class="site-logo">
          <div class="logo-mark"><i class="fa-solid fa-dog"></i></div>
          <span class="logo-word">${SITE_CONFIG.logoText}</span>
        </a>

        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <nav class="main-nav" id="mainNav">
          <ul class="nav-list">
            <li class="nav-item" data-dropdown>
              <a href="#" class="nav-link ${isHomeActive()}">
                Home <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
              </a>
              <div class="nav-dropdown">
                <a href="${links.home1}" class="dropdown-link ${isActive('index.html')}">Home 1</a>
                <a href="${links.home2}" class="dropdown-link ${isActive('home-2.html')}">Home 2</a>
              </div>
            </li>
            <li class="nav-item">
              <a href="${links.about}" class="nav-link ${isActive('about.html')}">About</a>
            </li>
            <li class="nav-item">
              <a href="${links.packages}" class="nav-link ${isActive('packages.html')}">Packages</a>
            </li>
            <li class="nav-item">
              <a href="${links.reviews}" class="nav-link ${isActive('reviews.html')}">Reviews</a>
            </li>
            <li class="nav-item">
              <a href="${links.trainers}" class="nav-link ${isActive('trainers.html')}">Trainers</a>
            </li>
            <li class="nav-item">
              <a href="${links.contact}" class="nav-link ${isActive('contact.html')}">Contact</a>
            </li>
          </ul>
          <div class="mobile-nav-actions">
            <button class="theme-toggle" id="themeToggleMobile" aria-label="Toggle theme"><i class="fa-solid fa-moon"></i></button>
            <button class="rtl-toggle" id="rtlToggleMobile" aria-label="Toggle direction">LTR</button>
          </div>
        </nav>

        <div class="header-actions">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme"><i class="fa-solid fa-moon"></i></button>
          <button class="rtl-toggle" id="rtlToggle" aria-label="Toggle direction">LTR</button>
          <a href="${links.contact}" class="btn btn-primary" style="margin-left: 12px;">Book Session</a>
        </div>
      </div>
    `;

    initHeaderEvents();

    if (window.initThemeToggle) window.initThemeToggle();
    if (window.initRtlToggle) window.initRtlToggle();
  }

  function renderFooter() {
    const links = getPageLinks();
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="site-logo" style="margin-bottom:16px;">
              <div class="logo-mark" style="color:#f5f5f5;"><i class="fa-solid fa-dog"></i></div>
              <span class="logo-word" style="color:#ffffff;font-weight:700;">${SITE_CONFIG.logoText}</span>
            </div>
            <p>${SITE_CONFIG.projectDescription}</p>
            <div class="footer-social">
              <a href="#" class="social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" class="social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" class="social-link" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="#" class="social-link" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>
          <div>
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="${links.home1}">Home 1</a></li>
              <li><a href="${links.home2}">Home 2</a></li>
              <li><a href="${links.about}">About Us</a></li>
              <li><a href="${links.packages}">Packages</a></li>
              <li><a href="${links.trainers}">Trainers</a></li>
              <li><a href="${links.contact}">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-heading">Packages</h4>
            <ul class="footer-links">
              <li><a href="${links.packages}">In-Home Training</a></li>
              <li><a href="${links.packages}">Behavior Consultation</a></li>
              <li><a href="${links.packages}">Video Consultations</a></li>
              <li><a href="${links.packages}">Puppy Packages</a></li>
              <li><a href="${links.contact}">Book a Session</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-heading">Contact Us</h4>
            <div class="footer-contact-item">
              <span class="icon"><i class="fa-solid fa-location-dot"></i></span>
              <span>${SITE_CONFIG.contactAddress}</span>
            </div>
            <div class="footer-contact-item">
              <span class="icon"><i class="fa-solid fa-phone"></i></span>
              <span>${SITE_CONFIG.contactPhone}</span>
            </div>
            <div class="footer-contact-item">
              <span class="icon"><i class="fa-solid fa-envelope"></i></span>
              <span>${SITE_CONFIG.contactEmail}</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${SITE_CONFIG.year} ${SITE_CONFIG.logoText}. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    `;
  }

  function initHeaderEvents() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
      mobileToggle.addEventListener('click', function () {
        mobileToggle.classList.toggle('active');
        mainNav.classList.toggle('open');
      });
    }

    document.querySelectorAll('[data-dropdown]').forEach(function (item) {
      const link = item.querySelector('.nav-link');
      if (link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            item.classList.toggle('open');
          }
        });
      }

      item.addEventListener('mouseenter', function () {
        if (window.innerWidth > 1024) item.classList.add('open');
      });
      item.addEventListener('mouseleave', function () {
        if (window.innerWidth > 1024) item.classList.remove('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-dropdown]')) {
        document.querySelectorAll('[data-dropdown].open').forEach(function (el) {
          if (window.innerWidth <= 1024) el.classList.remove('open');
        });
      }
    });

  }

  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (el) {
          el.classList.remove('open');
        });
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you! Your message has been sent. We will get back to you soon.');
        form.reset();
      });
    }
  }

  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        form.reset();
      });
    }
  }

  function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Your in-home session has been booked! We will confirm your appointment via email shortly.');
        form.reset();
      });
    }
  }

  function init() {
    renderHeader();
    renderFooter();
    initFAQ();
    initContactForm();
    initNewsletter();
    initBookingForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
