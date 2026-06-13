/**
 * RTL / LTR Direction Toggle
 */
(function () {
  const STORAGE_KEY = 'site-direction';

  function getPreferredDirection() {
    return localStorage.getItem(STORAGE_KEY) || 'ltr';
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(STORAGE_KEY, dir);
    updateToggleLabel(dir);
  }

  function updateToggleLabel(dir) {
    const btn = document.getElementById('rtlToggle');
    const mobileBtn = document.getElementById('rtlToggleMobile');
    [btn, mobileBtn].forEach(function (el) {
      if (!el) return;
      el.textContent = dir === 'ltr' ? 'LTR' : 'RTL';
      el.setAttribute('aria-label', dir === 'ltr' ? 'Switch to RTL' : 'Switch to LTR');
      el.setAttribute('title', dir === 'ltr' ? 'Switch to Right-to-Left' : 'Switch to Left-to-Right');
    });
  }

  function initDirection() {
    const dir = getPreferredDirection();
    applyDirection(dir);
  }

  function bindRtlToggle() {
    const btn = document.getElementById('rtlToggle');
    const mobileBtn = document.getElementById('rtlToggleMobile');
    [btn, mobileBtn].forEach(function (el) {
      if (!el || el.dataset.bound) return;
      el.dataset.bound = 'true';
      el.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('dir') || 'ltr';
        applyDirection(current === 'ltr' ? 'rtl' : 'ltr');
      });
    });
    updateToggleLabel(document.documentElement.getAttribute('dir') || getPreferredDirection());
  }

  window.initRtlToggle = bindRtlToggle;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDirection);
  } else {
    initDirection();
  }
})();
