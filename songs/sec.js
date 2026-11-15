/*!
 * songs/sec.js — "Two songs that describe you" engine
 * --------------------------------------------------------------------------
 * What it does
 *   1. Injects two full-screen acts into #main-scroll-container, directly
 *      BEFORE the last section (the iMessage finale /last.html). React markup
 *      is never touched — the nodes are added after hydration.
 *   2. Drives each act from ONE 20-second timeline. If the mp3 plays, the
 *      timeline follows audio.currentTime; if the file is missing / autoplay
 *      is blocked by the browser (normal on phones), it silently falls back to
 *      a requestAnimationFrame clock, so lyrics still animate perfectly.
 *   3. Tap anywhere on an act (or the Play pill) to start / pause the sound.
 *
 * Assets the user drops in (just overwrite these, same names):
 *      /songs/sec-1.mp3   /songs/sec-2.mp3
 *      /songs/photo-1.jpg /songs/photo-2.jpg
 *
 * No dependencies. Loaded with `defer`, runs after the page is parsed.
 */
(function () {
  'use strict';

  if (window.__SONGS_ACTS__) return;
  window.__SONGS_ACTS__ = true;

  var DUR_DEFAULT = 20; /* fallback, only used if an act has no `dur` */

  /* How the timing works
     --------------------
     Each act declares `dur` (its real audio length) and each line declares
     `at` (seconds). If the mp3 you drop in turns out to be a slightly
     different length, the act snaps to the file's real duration and every
     line time is rescaled by the same factor — so nothing drifts out of sync.
  */

  /* ------------------------------------------------------------------ data -- */
  var ACTS = [
    {
      id: 'song-act-1',
      kind: 'song',
      num: '01',
      kicker: 'Song · 24 seconds',
      dur: 24,
      audio: '/songs/sec-1.mp3',
      photo: '/songs/photo-1.jpg',
      photoFallback: '/ref/girl3.jpg',
      meta: 'Woh taazgi hai',
      btn: 'Play song',
      label: 'Song 1',
      /* verbatim lines — `at` = seconds when the line appears */
      lines: [
        { at: 0.5, text: 'Woh taazgi hai jisse phool bhi jale' },
        { at: 6.4, text: 'Chamak se chand bhi dhale' },
        { at: 12.4, text: 'Hai saadgi jaise lori ho koyi' },
        { at: 18.2, text: 'Woh jaise chandni khile' }
      ]
    },
    {
      id: 'song-act-2',
      kind: 'dialogue',
      num: '02',
      kicker: 'Dialogue · 11 seconds',
      dur: 11,
      audio: '/songs/sec-2.mp3',
      photo: '/songs/photo-2.jpg',
      photoFallback: '/ref/girl9.jpg',
      meta: 'Madam',
      btn: 'Play dialogue',
      label: 'Dialogue',
      quote: [
        { at: 0.3, cls: 'sec-q-a', text: 'Madammm sir…' },
        { at: 3.0, cls: 'sec-q-b', text: 'Madammm' },
        { at: 5.8, cls: 'sec-q-c', text: 'antheee' }
      ],
      sign: { at: 8.3, text: 'ek hi dialogue, aur poora scene madam ka' }
    }
  ];

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  /* -------------------------------------------------------------- templates */
  function mediaHTML(a) {
    return (
      '<div class="sec-media">' +
        '<img class="sec-photo" src="' + a.photo + '" alt="" decoding="async" fetchpriority="high" draggable="false" data-fallback="' + a.photoFallback + '">' +
        '<div class="sec-shade"></div>' +
        '<div class="sec-vignette"></div>' +
        '<div class="sec-grain"></div>' +
      '</div>'
    );
  }

  function topHTML(a) {
    return (
      '<div class="sec-top">' +
        '<span class="sec-num">' + a.num + '</span>' +
        '<span class="sec-kicker">' + a.kicker + '</span>' +
        '<span class="sec-rule"></span>' +
      '</div>'
    );
  }

  function footHTML(a) {
    return (
      '<div class="sec-foot">' +
        '<div class="sec-progress"><span></span></div>' +
        '<div class="sec-foot-row">' +
          '<span class="sec-meta">' + a.meta + '</span>' +
          '<button class="sec-btn" type="button" aria-label="' + a.btn + '">' +
            '<span class="sec-btn-ico">&#9654;</span>' +
            '<span class="sec-btn-txt">Play</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function songHTML(a) {
    var dots = '';
    for (var i = 0; i < a.lines.length; i++) dots += '<i></i>';
    var lines = a.lines
      .map(function (l) {
        return '<p class="sec-line" data-at="' + l.at + '" data-state="next">' + l.text + '</p>';
      })
      .join('');

    return (
      '<section class="sec-act sec-act--song" id="' + a.id + '" data-kind="song" aria-label="' + a.label + '">' +
        mediaHTML(a) +
        '<div class="sec-inner">' +
          topHTML(a) +
          '<div class="sec-stage">' +
            '<div class="sec-lyrics">' + lines + '</div>' +
            '<div class="sec-dots" aria-hidden="true">' + dots + '</div>' +
          '</div>' +
          footHTML(a) +
        '</div>' +
      '</section>'
    );
  }

  function dialogueHTML(a) {
    var lines = a.quote
      .map(function (l) {
        return '<p class="sec-q-line ' + l.cls + '" data-at="' + l.at + '" data-state="next">' + l.text + '</p>';
      })
      .join('');

    return (
      '<section class="sec-act sec-act--dialogue" id="' + a.id + '" data-kind="dialogue" aria-label="' + a.label + '">' +
        mediaHTML(a) +
        '<div class="sec-inner">' +
          topHTML(a) +
          '<div class="sec-stage">' +
            '<div class="sec-quote">' + lines +
              '<p class="sec-q-sign" data-at="' + a.sign.at + '" data-state="next">' + a.sign.text + '</p>' +
            '</div>' +
          '</div>' +
          footHTML(a) +
        '</div>' +
      '</section>'
    );
  }

  /* ---------------------------------------------------- background music --
   * The site's own background song (#bgMusic) lives inside the section-1
   * iframe (birthday.html). That iframe keeps playing even when it is scrolled
   * out of view, so without this the song act and the background track would
   * play over each other. While a song act is live we fade the background
   * track out and pause it; when the act stops, we fade it back in.
   */
  var bgState = { el: null, wasPlaying: false, pausedByUs: false, fadeTimer: 0 };

  function bgMusic() {
    if (bgState.el && bgState.el.ownerDocument) return bgState.el;
    var frames = document.querySelectorAll('iframe');
    for (var i = 0; i < frames.length; i++) {
      var src = frames[i].getAttribute('src') || '';
      if (src.indexOf('birthday') === -1) continue;
      try {
        var doc = frames[i].contentDocument;
        var el = doc && doc.getElementById('bgMusic');
        if (el) {
          bgState.el = el;
          if (!el.__secVolume) el.__secVolume = el.volume || 0.7;
          return el;
        }
      } catch (e) {
        /* cross-origin iframe — nothing we can do, and nothing to fix */
      }
    }
    return null;
  }

  function fadeTo(el, target, ms, done) {
    if (bgState.fadeTimer) {
      clearInterval(bgState.fadeTimer);
      bgState.fadeTimer = 0;
    }
    var start = el.volume;
    var t0 = performance.now();
    bgState.fadeTimer = setInterval(function () {
      var k = Math.min(1, (performance.now() - t0) / ms);
      try {
        el.volume = Math.max(0, Math.min(1, start + (target - start) * k));
      } catch (e) {}
      if (k >= 1) {
        clearInterval(bgState.fadeTimer);
        bgState.fadeTimer = 0;
        if (done) done();
      }
    }, 40);
  }

  function muteBackground() {
    var el = bgMusic();
    if (!el) return;
    if (!el.paused) {
      bgState.wasPlaying = true;
      bgState.pausedByUs = true;
      fadeTo(el, 0, 320, function () {
        try { el.pause(); } catch (e) {}
      });
    }
  }

  function unmuteBackground() {
    if (!bgState.pausedByUs) return;
    bgState.pausedByUs = false;
    var el = bgMusic();
    if (!el || !bgState.wasPlaying) return;
    try {
      el.volume = 0;
      var pr = el.play();
      if (pr && pr.catch) pr.catch(function () { /* autoplay blocked → stay quiet */ });
      fadeTo(el, el.__secVolume || 0.7, 600);
    } catch (e) {}
  }

  /* ------------------------------------------------------------- insertion */
  function findFinale() {
    var c = document.getElementById('main-scroll-container');
    if (!c) return null;

    var ifr = c.querySelector('iframe[src*="last.html"]');
    if (ifr) {
      var sec = ifr.closest ? ifr.closest('section') : null;
      if (sec) return sec;
    }
    /* fallback: last <section> child of the scroll container */
    var kids = c.children;
    for (var i = kids.length - 1; i >= 0; i--) {
      if (kids[i].tagName === 'SECTION') return kids[i];
    }
    return null;
  }

  function inject() {
    if (document.getElementById('song-act-1')) return true;

    var anchor = findFinale();
    if (!anchor || !anchor.parentNode) return false;

    var holder = document.createElement('div');
    holder.id = 'songs-holder';
    holder.innerHTML = songHTML(ACTS[0]) + dialogueHTML(ACTS[1]);

    /* keep DOM order: act 1 → act 2 → finale */
    var parent = anchor.parentNode;
    while (holder.firstChild) {
      parent.insertBefore(holder.firstChild, anchor);
    }
    return true;
  }

  /* --------------------------------------------------------------- wiring */
  function setup(a) {
    var el = document.getElementById(a.id);
    if (!el) return null;

    var photo = el.querySelector('.sec-photo');
    if (photo) {
      photo.addEventListener('error', function () {
        var fb = photo.getAttribute('data-fallback');
        if (fb && photo.getAttribute('src') !== fb) photo.setAttribute('src', fb);
      });
    }

    var declared = a.dur || DUR_DEFAULT;

    var nodes = el.querySelectorAll('.sec-line, .sec-q-line, .sec-q-sign');
    var items = [];
    for (var i = 0; i < nodes.length; i++) {
      var at = parseFloat(nodes[i].getAttribute('data-at')) || 0;
      items.push({ el: nodes[i], at: at, frac: at / declared });
    }
    /* stable order by time, regardless of markup order */
    items.sort(function (x, y) { return x.at - y.at; });

    var act = {
      el: el,
      cfg: a,
      dur: declared,
      items: items,
      dots: el.querySelectorAll('.sec-dots i'),
      bar: el.querySelector('.sec-progress > span'),
      btn: el.querySelector('.sec-btn'),
      btnTxt: el.querySelector('.sec-btn-txt'),
      btnIco: el.querySelector('.sec-btn-ico'),
      audio: null,
      audioBroken: false,
      running: false,
      paused: false,
      mode: 'silent',
      t: 0,
      lastPerf: 0,
      idx: -2,
      raf: 0
    };

    applyDur(declared);

    /* idle look: the first item sits there, faint */
    if (act.items.length) act.items[0].el.setAttribute('data-state', 'idle');

    /* the zoom length follows the act's real duration */
    function applyDur(d) {
      if (!(d > 0)) return;
      act.dur = d;
      el.style.setProperty('--sec-dur', d + 's');
      for (var i = 0; i < act.items.length; i++) {
        act.items[i].at = act.items[i].frac * d;
      }
      act.idx = -2; /* force a repaint against the new times */
      if (act.running) paint();
    }

    /* audio is created lazily so nothing is downloaded twice */
    function audio() {
      if (act.audio || act.audioBroken) return act.audio;
      try {
        var au = new Audio();
        au.preload = 'metadata';
        au.loop = false;
        au.src = a.audio;
        au.addEventListener('error', function () {
          act.audioBroken = true;
          if (act.btn) act.btn.hidden = true; /* nothing to play → hide pill */
          if (act.running) act.mode = 'silent';
        });
        /* a trimmed mp3 can decode to 23.98 s → paint "24", not "23" */
        function roundDur(d) {
          return Math.round(d);
        }

        au.addEventListener('loadedmetadata', function () {
          /* Trust the file's real length over our guess — but only when it is
             close to the declared length (i.e. a trimmed clip). If a full
             3-minute song got dropped in, we keep the short act and just play
             its first `dur` seconds, which is what the brief asks for. */
          var d = au.duration;
          if (!isFinite(d) || d < 3) return;
          var ratio = d / declared;
          if (ratio >= 0.75 && ratio <= 1.25) {
            applyDur(d);
            var k = el.querySelector('.sec-kicker');
            if (k) k.textContent = a.kicker.split('·')[0].trim() + ' · ' + roundDur(d) + ' seconds';
          }
        });
        au.addEventListener('playing', function () {
          if (act.running && !act.paused) act.mode = 'audio';
          /* only now does it make sense to duck the site's background song —
             if the browser blocked our mp3, we leave the music alone instead
             of leaving her in silence. */
          if (act.running) muteBackground();
        });
        au.addEventListener('ended', function () {
          act.mode = 'silent';
          if (act.running && !act.paused) {
            act.t = 0;
            act.lastPerf = performance.now();
          }
        });
        act.audio = au;
      } catch (e) {
        act.audioBroken = true;
      }
      return act.audio;
    }

    function trySound() {
      var au = audio();
      if (!au || act.audioBroken) return;
      try {
        au.currentTime = act.t > 0.25 ? act.t : 0;
      } catch (e) {}
      var p = null;
      try {
        p = au.play();
      } catch (e) {
        p = null;
      }
      if (p && p.catch) {
        p.catch(function () {
          /* autoplay blocked — animation keeps going on the rAF clock */
          if (act.mode === 'audio') act.mode = 'silent';
        });
      }
    }

    function paint() {
      var t = act.t;
      var idx = -1;
      for (var i = 0; i < act.items.length; i++) {
        if (t >= act.items[i].at) idx = i;
      }
      if (idx !== act.idx) {
        act.idx = idx;
        for (var j = 0; j < act.items.length; j++) {
          var st = j === idx ? 'active' : j < idx ? 'past' : 'next';
          act.items[j].el.setAttribute('data-state', st);
        }
        for (var k = 0; k < act.dots.length; k++) {
          act.dots[k].className = k <= idx ? 'on' : '';
        }
      }
      if (act.bar) act.bar.style.transform = 'scaleX(' + (Math.min(t, act.dur) / act.dur).toFixed(4) + ')';
    }

    function loop() {
      act.raf = 0;
      if (!act.running) return;

      var now = performance.now();
      var t;

      if (act.mode === 'audio' && act.audio && !act.audio.paused && !act.audio.ended) {
        t = act.audio.currentTime;
        if (t > act.dur) t = act.dur; /* file longer than declared → hold */
        if (t >= act.dur) {
          /* loop the act */
          try { act.audio.currentTime = 0; } catch (e) {}
          t = 0;
        }
      } else {
        t = act.t + (now - act.lastPerf) / 1000;
        if (t >= act.dur) t = 0;
      }

      act.t = t;
      act.lastPerf = now;
      paint();
      act.raf = requestAnimationFrame(loop);
    }

    function play() {
      if (act.running) return;
      act.running = true;
      act.paused = false;
      act.t = 0;
      act.idx = -2;
      act.mode = 'silent';
      act.lastPerf = performance.now();
      act.el.classList.remove('is-live', 'is-paused');
      void act.el.offsetWidth; /* restart the Ken Burns zoom */
      act.el.classList.add('is-live');
      paint();
      trySound();
      if (!act.raf) act.raf = requestAnimationFrame(loop);
      setBtn(true);
    }

    function stop() {
      if (!act.running) return;
      act.running = false;
      act.paused = false;
      if (act.raf) {
        cancelAnimationFrame(act.raf);
        act.raf = 0;
      }
      if (act.audio) {
        try { act.audio.pause(); } catch (e) {}
        act.mode = 'silent';
      }
      act.el.classList.remove('is-live', 'is-paused');
      unmuteBackground();
      /* reset to the idle frame so the next visit starts clean */
      act.t = 0;
      act.idx = -2;
      for (var i = 0; i < act.items.length; i++) {
        act.items[i].el.setAttribute('data-state', i === 0 ? 'idle' : 'next');
      }
      for (var k = 0; k < act.dots.length; k++) act.dots[k].className = k === 0 ? 'on' : '';
      if (act.bar) act.bar.style.transform = 'scaleX(0)';
      setBtn(false);
    }

    function pause() {
      if (!act.running || act.paused) return;
      act.paused = true;
      act.el.classList.add('is-paused');
      if (act.audio) {
        try { act.audio.pause(); } catch (e) {}
      }
      act.mode = 'silent';
      if (act.raf) {
        cancelAnimationFrame(act.raf);
        act.raf = 0;
      }
      setBtn(false, true);
    }

    function resume() {
      if (!act.running || !act.paused) return;
      act.paused = false;
      act.el.classList.remove('is-paused');
      act.lastPerf = performance.now();
      trySound();
      if (!act.raf) act.raf = requestAnimationFrame(loop);
      setBtn(true);
    }

    function setBtn(playing, paused) {
      if (!act.btn) return;
      if (act.btnIco) act.btnIco.innerHTML = playing && !paused ? '&#10074;&#10074;' : '&#9654;';
      if (act.btnTxt) act.btnTxt.textContent = playing && !paused ? 'Pause' : paused ? 'Resume' : 'Play';
    }

    /* one tap target for the whole act, plus the pill */
    el.addEventListener('click', function (ev) {
      if (ev.target && ev.target.closest && ev.target.closest('.sec-btn')) return;
      if (!act.running) return;
      if (act.paused) resume();
      else pause();
    });

    if (act.btn) {
      act.btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (!act.running) return;
        if (act.paused) resume();
        else pause();
      });
    }

    act.play = play;
    act.stop = stop;
    act.resume = resume;
    act.trySound = trySound;
    return act;
  }

  /* ---------------------------------------------------------------- boot --
   * The gate ("Khol de parda") is what renders #main-scroll-container, so the
   * mount can land seconds after load — and a React re-render could, in
   * theory, drop our nodes. So: try now, keep retrying, and watch the DOM.
   */
  var acts = window.__songsActs || (window.__songsActs = []);
  var mounting = false;
  var observedIO = null;

  function mount() {
    if (mounting) return true;
    if (document.getElementById('song-act-1')) return true;
    mounting = true;

    var ok = false;
    try {
      ok = inject();
    } catch (e) {
      ok = false;
    }

    if (!ok) {
      mounting = false;
      return false;
    }

    acts = window.__songsActs = ACTS.map(setup).filter(Boolean);
    if (!acts.length) {
      mounting = false;
      return true;
    }

    /* one act live at a time, and only while mostly on screen */
    if ('IntersectionObserver' in window) {
      if (observedIO) observedIO.disconnect();
      observedIO = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var act = null;
            for (var i = 0; i < acts.length; i++) if (acts[i].el === entry.target) act = acts[i];
            if (!act) return;

            if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
              for (var j = 0; j < acts.length; j++) {
                if (acts[j] !== act) acts[j].stop();
              }
              act.play();
            } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.2) {
              act.stop();
            }
          });
        },
        { threshold: [0, 0.2, 0.55, 0.92] }
      );
      acts.forEach(function (a) { observedIO.observe(a.el); });
    } else {
      acts.forEach(function (a, i) { if (i === 0) a.play(); });
    }

    /* first real gesture on the page → let the browser permit sound */
    var unlocked = false;
    function unlock(ev) {
      if (unlocked) return;
      /* a tap ON an act is a play/pause tap — leave it alone */
      if (ev && ev.target && ev.target.closest && ev.target.closest('.sec-act')) return;
      unlocked = true;
      acts.forEach(function (a) {
        if (a.running && !a.paused && a.trySound) a.trySound();
      });
    }
    document.addEventListener('pointerdown', unlock, { passive: true });
    document.addEventListener('touchstart', unlock, { passive: true });

    /* stop the sound when the tab goes to the back */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        acts.forEach(function (a) {
          if (a.running && a.audio) {
            try { a.audio.pause(); } catch (e) {}
            a.mode = 'silent';
          }
        });
      }
    });

    window.__songsReady = true;
    mounting = false;
    return true;
  }

  /* keep trying for a while, then keep watching the DOM for a re-render */
  var tries = 0;
  function boot() {
    if (mount()) return;
    if (++tries < 200) setTimeout(boot, 200); /* ≤ 40 s of patient retries */
  }

  var watchTimer = 0;
  function watch() {
    if (!('MutationObserver' in window) || !document.body) return;
    var mo = new MutationObserver(function () {
      if (watchTimer) return;
      watchTimer = setTimeout(function () {
        watchTimer = 0;
        if (!document.getElementById('song-act-1')) {
          tries = 0;
          mount();
        }
      }, 250);
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
