/*!
 * _magpdf.js — "Download PDF" button for the magazine flipbook
 * ------------------------------------------------------------------------
 * The flipbook in section-4 is React-rendered, so the button is injected
 * next to its toolbar (FILM & SHARE / ROTATE) and re-injected if a
 * re-render ever drops it. No build step, no dependencies.
 *
 * The PDF itself ships as a static file:
 *   /downloads/Prerana-Birthday-Magazine.pdf   (18 pages, A4-ish, 2.2 MB)
 */
(function () {
  'use strict';

  if (window.__MAG_PDF__) return;
  window.__MAG_PDF__ = true;

  var PDF_URL = '/downloads/Prerana-Birthday-Magazine.pdf';
  var FILE_NAME = 'Prerana-Birthday-Magazine.pdf';

  var BTN_CLASS =
    'magpdf-btn flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] ' +
    'font-semibold tracking-wider uppercase backdrop-blur-md shadow-md ' +
    'transition-all cursor-pointer active:scale-95';

  var STYLE = [
    '.magpdf-btn{background:rgba(28,24,21,.82);color:#f0d9a8;',
    'border:1px solid rgba(212,175,106,.55);white-space:nowrap;',
    'font-family:Montserrat,Helvetica Neue,Arial,sans-serif;',
    '-webkit-tap-highlight-color:transparent;}',
    '.magpdf-btn:hover{background:#1c1815;color:#f5e7d5;border-color:#d4af6a;}',
    '.magpdf-btn:disabled{opacity:.6;cursor:progress;}',
    '.magpdf-btn svg{width:14px;height:14px;flex:0 0 auto;}',
    '.magpdf-btn .magpdf-short{display:none;}',
    '[data-magpdf-row]{flex-wrap:wrap !important;justify-content:center !important;',
    'row-gap:6px !important;column-gap:6px !important;',
    'max-width:calc(100vw - 16px) !important;}',
    '[data-magpdf-bar]{flex-wrap:wrap !important;row-gap:6px !important;',
    'column-gap:6px !important;max-width:calc(100vw - 20px) !important;',
    'padding-left:10px !important;padding-right:10px !important;}',
    '@media (max-width:520px){.magpdf-btn{font-size:10px;padding:4px 10px;}',
    '.magpdf-btn .magpdf-txt{display:none;}',
    '.magpdf-btn .magpdf-short{display:inline;}}'
  ].join('\n');

  var ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M4 19h16"/></svg>';

  function injectStyles() {
    if (document.getElementById('magpdf-style')) return;
    var st = document.createElement('style');
    st.id = 'magpdf-style';
    st.textContent = STYLE;
    document.head.appendChild(st);
  }

  function makeButton() {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = BTN_CLASS;
    b.setAttribute('aria-label', 'Download the whole magazine as a PDF');
    b.setAttribute('data-no-flip', 'true');
    b.innerHTML = ICON + '<span class="magpdf-txt">Download PDF</span><span class="magpdf-short">PDF</span>';
    b.addEventListener('click', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      // a real <a download> click — survives iframes, iOS share sheets, etc.
      var a = document.createElement('a');
      a.href = PDF_URL;
      a.download = FILE_NAME;
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 1500);

      // tiny bit of feedback so the tap does not feel dead
      var original = b.innerHTML;
      b.disabled = true;
      b.innerHTML = ICON + '<span class="magpdf-txt">Downloading…</span><span class="magpdf-short">…</span>';
      setTimeout(function () {
        b.disabled = false;
        b.innerHTML = original;
      }, 1800);
    });
    return b;
  }

  /* find the flipbook toolbar: the row that holds FILM & SHARE / ROTATE */
  function toolbarHost() {
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var t = (btns[i].innerText || '').toUpperCase();
      if (t.indexOf('ROTATE') !== -1 || t.indexOf('AUTO FLIP') !== -1) {
        var host = btns[i].parentElement;
        // walk up to the pill row that also contains FILM & SHARE
        var p = host;
        for (var k = 0; k < 3 && p; k++) {
          if ((p.innerText || '').toUpperCase().indexOf('FILM & SHARE') !== -1) return p;
          p = p.parentElement;
        }
        return host;
      }
    }
    return null;
  }

  function place() {
    if (document.querySelector('.magpdf-btn')) return true;
    var host = toolbarHost();
    if (!host) return false;

    injectStyles();
    var btn = makeButton();

    // sit right before the FILM & SHARE pill when we can find it
    var ref = null;
    var kids = host.children;
    for (var i = 0; i < kids.length; i++) {
      if ((kids[i].innerText || '').toUpperCase().indexOf('FILM & SHARE') !== -1) {
        ref = kids[i];
        break;
      }
    }
    if (ref) host.insertBefore(btn, ref);
    else host.appendChild(btn);

    // Tag the two toolbars so the wrap CSS above can catch them on phones.
    // (Careful: the gate button reads "PREVIEW" — must not be mistaken for PREV.)
    try {
      var row = host;
      for (var d = 0; d < 3 && row; d++) {
        if ((row.innerText || '').toUpperCase().indexOf('FILM & SHARE') !== -1) {
          row.setAttribute('data-magpdf-row', '1');
          break;
        }
        row = row.parentElement;
      }

      // the bottom PREV / NEXT pill bar — it overflows on a 390 px phone
      var all = document.querySelectorAll('button');
      for (var q = 0; q < all.length; q++) {
        var t = (all[q].innerText || '').trim().toUpperCase();
        if (t.indexOf('NEXT') !== -1) {
          var bar = all[q].parentElement;
          if (bar && (bar.innerText || '').toUpperCase().indexOf('PREV') !== -1) {
            bar.setAttribute('data-magpdf-bar', '1');
          }
          break;
        }
      }
    } catch (e) {}

    // make sure it never gets swallowed by the flipbook's click handler
    ['pointerdown', 'mousedown', 'touchstart', 'pointerup', 'mouseup', 'touchend', 'click']
      .forEach(function (evt) {
        btn.addEventListener(evt, function (e) { e.stopPropagation(); }, { passive: true });
      });

    return true;
  }

  var tries = 0;
  function boot() {
    if (place()) return;
    if (++tries < 240) setTimeout(boot, 250);   // ~60 s of patience
  }

  // if React ever re-renders the toolbar and our button disappears, put it back
  function watch() {
    if (!('MutationObserver' in window) || !document.body) return;
    var pending = 0;
    var mo = new MutationObserver(function () {
      if (pending) return;
      pending = setTimeout(function () {
        pending = 0;
        place();
      }, 300);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function start() {
    boot();
    watch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
