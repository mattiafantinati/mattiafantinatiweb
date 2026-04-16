(function () {
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

  const enPages = {
    'index':    'eng/index-en.html',
    'chi-sono': 'eng/about-en.html',
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
    // Lang switch: point EN to the equivalent EN page
    const langLink = document.getElementById('lang-other-link');
    if (langLink && enPages[page]) langLink.href = enPages[page];

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

  loadComponent('header.html', 'site-header-placeholder', onHeaderLoaded);
  loadComponent('footer.html', 'site-footer-placeholder');
})();
