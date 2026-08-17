/* KROSS×OVER - site behaviour (no dependencies) */
(function () {
  'use strict';

  /* ---- mobile drawer ---- */
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('drawer');

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる');
      drawer.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        burger.click();
        burger.focus();
      }
    });
  }

  /* ---- scroll reveal ---- */
  var targets = document.querySelectorAll('.rv');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!targets.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = Number(el.getAttribute('data-delay') || 0);
      setTimeout(function () { el.classList.add('is-in'); }, delay);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
