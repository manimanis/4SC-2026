/**
 * assets/js/main-ui.js
 * Thème et utilitaires d'interface pour 4SC-2026
 */
(function () {
  'use strict';

  // 1. Theme Management (Dark Mode vs Light Mode)
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggleButton(theme);
  };

  const updateThemeToggleButton = (theme) => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    if (theme === 'dark') {
      themeBtn.innerHTML = '☀️ <span class="d-none d-sm-inline ms-1">Mode Clair</span>';
      themeBtn.setAttribute('aria-label', 'Activer le mode clair');
      themeBtn.className = 'btn btn-warning btn-sm rounded-pill px-3 py-1 ms-auto d-print-none';
    } else {
      themeBtn.innerHTML = '🌙 <span class="d-none d-sm-inline ms-1">Mode Sombre</span>';
      themeBtn.setAttribute('aria-label', 'Activer le mode sombre');
      themeBtn.className = 'btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 ms-auto d-print-none';
    }
  };

  // Apply theme early on load
  const currentTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  document.addEventListener('DOMContentLoaded', () => {
    // Nettoyage immédiat de tout ancien résidu injecté
    document.querySelectorAll('.img-modal-overlay, .img-modal-close, .chapters-drawer, .drawer-toggle-btn').forEach(el => el.remove());

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      updateThemeToggleButton(currentTheme);
      themeBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }

    // Enhanced Clipboard Copy Feedback via Event Delegation
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-clipboard');
      if (btn && !btn.classList.contains('copied')) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg me-1"></i> Copié !';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('copied');
        }, 2000);
      }
    });
  });
})();
