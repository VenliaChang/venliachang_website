/* Shared logic for all article pages */

/* ---- Language toggle ---- */
function initArticleLang(translations) {
  const saved = localStorage.getItem('venlia-lang') || 'zh';
  applyLang(saved, translations);

  document.getElementById('lang-toggle').addEventListener('click', () => {
    const next = localStorage.getItem('venlia-lang') === 'en' ? 'zh' : 'en';
    applyLang(next, translations);
  });
}

function applyLang(lang, translations) {
  localStorage.setItem('venlia-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

  // Show/hide content blocks
  document.querySelectorAll('.zh').forEach(el => el.style.display = lang === 'zh' ? '' : 'none');
  document.querySelectorAll('.en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');

  // data-i18n short strings
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key] !== undefined) el.innerHTML = translations[lang][key];
  });

  document.getElementById('lang-toggle').textContent = lang === 'zh' ? 'EN' : '中文';
}

/* ---- Nav ---- */
const navbar   = document.getElementById('navbar');
const burger   = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
