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
  }

  loadComponent('header.html', 'site-header-placeholder', onHeaderLoaded);
  loadComponent('footer.html', 'site-footer-placeholder');
})();
