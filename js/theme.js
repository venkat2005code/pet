/**
 * Theme Toggle - Dark / Light Mode
 */
(function () {
  const STORAGE_KEY = 'site-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const btn = document.getElementById('themeToggle');
    const mobileBtn = document.getElementById('themeToggleMobile');
    [btn, mobileBtn].forEach(function (el) {
      if (!el) return;
      el.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
      el.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);
  }

  function bindThemeToggle() {
    const btn = document.getElementById('themeToggle');
    const mobileBtn = document.getElementById('themeToggleMobile');
    [btn, mobileBtn].forEach(function (el) {
      if (!el || el.dataset.bound) return;
      el.dataset.bound = 'true';
      el.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
    updateToggleIcon(document.documentElement.getAttribute('data-theme') || getPreferredTheme());
  }

  window.initThemeToggle = bindThemeToggle;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
