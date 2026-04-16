(function () {
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index-en';

  const itPages = {
    'index-en': '../index.html',
    'about-en': '../chi-sono.html',
  };

  function loadComponent(url, placeholderId, callback) {
    fetch(url)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        const el = document.getElementById(placeholderId);
        if (el) {
          el.outerHTML = html;
          if (callback) callback();
        }
      });
  }

  function onHeaderLoaded() {
    // Active nav link
    document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === page) {
        link.classList.add('nav-link--active');
      }
    });
    // Lang switch: point IT to the equivalent IT page
    const langLink = document.getElementById('lang-other-link');
    if (langLink && itPages[page]) langLink.href = itPages[page];

    // Hamburger menu
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('header-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
      document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  loadComponent('header-en.html', 'site-header-placeholder', onHeaderLoaded);
  loadComponent('footer-en.html', 'site-footer-placeholder');
})();
