/* ============================================================
   ❤️ EDIT YOUR DETAILS HERE — ONLY THESE 7 LINES ❤️
   ------------------------------------------------------------
   1. Change the names, date, photos and music below.
   2. Save the file.
   3. Double-click index.html. Done!

   PHOTOS: put photo1.jpg, photo2.jpg, photo3.jpg
           in the SAME folder as index.html,
           OR change the paths below to your own.

   MUSIC:  put our-song.mp3 in the SAME folder as index.html,
           OR change MUSIC_FILE below to your own mp3.
   ============================================================ */

const GIRLFRIEND_NAME = "Bujji";        // <-- EDIT: her name, e.g. "Aisha"
const MY_NAME         = "Mohan";       // <-- EDIT: your name, e.g. "Rohan"
const BIRTHDAY_DATE   = "4 September";   // <-- EDIT: her birthday, e.g. "14 February 2026"

const PHOTO_1 = "IMG-20260703-WA0049.jpg";              // <-- EDIT: path to 1st photo
const PHOTO_2 = "IMG-20260703-WA0057.jpg";              // <-- EDIT: path to 2nd photo
const PHOTO_3 = "photo3.jpg";              // <-- EDIT: path to 3rd photo

const MUSIC_FILE = "birthday-love/music/music.mp3";         // <-- EDIT: path to your romantic song

/* ============================================================
   You do NOT need to edit anything below this line.
   Everything below uses the settings above automatically.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. Apply names, date, photos, music ---------- */
  function applySettings() {
    document.querySelectorAll('[data-girlfriend-name]').forEach((el) => {
      el.textContent = GIRLFRIEND_NAME;
    });
    document.querySelectorAll('[data-my-name]').forEach((el) => {
      el.textContent = MY_NAME;
    });
    document.querySelectorAll('[data-birthday-date]').forEach((el) => {
      el.textContent = BIRTHDAY_DATE;
    });
    document.title = 'Happy Birthday, ' + GIRLFRIEND_NAME + ' ❤️';

    const photos = [PHOTO_1, PHOTO_2, PHOTO_3];
    document.querySelectorAll('[data-photo]').forEach((img, i) => {
      img.src = photos[i] || photos[0];
      img.alt = 'Beautiful memory with ' + GIRLFRIEND_NAME + ' ❤️';
    });

    const source = document.getElementById('music-source');
    if (source) {
      source.src = MUSIC_FILE;
      document.getElementById('bg-music').load();
    }
  }

  /* ---------- 2. Photo fallback (pretty placeholder if photo missing) ---------- */
  function handlePhotoFallbacks() {
    const photos = [PHOTO_1, PHOTO_2, PHOTO_3];
    document.querySelectorAll('[data-photo]').forEach((img, idx) => {
      img.addEventListener('error', function onErr() {
        img.removeEventListener('error', onErr);
        img.style.display = 'none';
        const wrap = img.closest('.photo-wrap');
        if (wrap && !wrap.querySelector('.photo-placeholder')) {
          const div = document.createElement('div');
          div.className = 'photo-placeholder';
          div.innerHTML = '❤️<small>Add your photo<br/>' + photos[idx] + '</small>';
          wrap.prepend(div);
        }
      });
      if (img.complete && img.naturalWidth === 0) {
        img.dispatchEvent(new Event('error'));
      }
    });
  }

  /* ---------- 3. Fade-in animations on scroll ---------- */
  let observer = null;
  function observeReveals() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
            // Start typewriter when love letter appears
            if (e.target.closest && e.target.closest('#love-message')) {
              startTypewriterOnce();
            }
          }
        });
      }, { threshold: 0.15 });
    }
    els.forEach((el) => observer.observe(el));
  }

  /* ---------- 4. Floating heart particles + glowing dots ---------- */
  const HEARTS = ['❤️', '💖', '💕', '💗', '🤍', '✨'];
  const heartsLayer = document.getElementById('floating-hearts');
  const particlesLayer = document.getElementById('particles');

  function spawnFloatingHearts() {
    if (!heartsLayer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    heartsLayer.innerHTML = '';
    const count = window.innerWidth < 560 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const h = document.createElement('span');
      h.className = 'float-heart';
      h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      h.style.left = Math.random() * 100 + 'vw';
      h.style.fontSize = (12 + Math.random() * 20) + 'px';
      h.style.opacity = (0.35 + Math.random() * 0.5).toFixed(2);
      h.style.animationDuration = (7 + Math.random() * 8) + 's';
      h.style.animationDelay = (Math.random() * 8) + 's';
      heartsLayer.appendChild(h);
    }
  }

  function spawnParticles() {
    if (!particlesLayer) return;
    particlesLayer.innerHTML = '';
    const count = window.innerWidth < 560 ? 18 : 32;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = 3 + Math.random() * 6;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.animationDelay = (Math.random() * 3) + 's';
      p.style.animationDuration = (2 + Math.random() * 3) + 's';
      particlesLayer.appendChild(p);
    }
  }

  /* ---------- 5. Confetti when "Open Your Surprise" is clicked ---------- */
  const confettiLayer = document.getElementById('confetti-layer');
  const CONFETTI = ['❤️', '💖', '💕', '✨', '🎉', '💗', '🤍'];

  function burstConfetti(n) {
    if (!confettiLayer) return;
    for (let i = 0; i < n; i++) {
      const c = document.createElement('span');
      c.className = 'confetti-piece';
      c.textContent = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
      c.style.left = (40 + Math.random() * 20) + 'vw';
      c.style.top = (35 + Math.random() * 20) + 'vh';
      c.style.fontSize = (14 + Math.random() * 24) + 'px';
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 320;
      c.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      c.style.setProperty('--dy', Math.sin(angle) * dist - 120 + 'px');
      confettiLayer.appendChild(c);
      setTimeout(() => c.remove(), 2000);
    }
  }

  /* ---------- 6. Reveal surprise sections ---------- */
  const surpriseBtn = document.getElementById('surprise-btn');

  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      // Show hidden sections
      document.querySelectorAll('#surprise, #gallery, #love-message, #finale')
        .forEach((s) => s.classList.remove('hidden'));

      observeReveals();

      // Confetti celebration 🎉
      burstConfetti(70);
      setTimeout(() => burstConfetti(50), 450);

      // Smooth scroll to the message
      setTimeout(() => {
        document.getElementById('surprise').scrollIntoView({ behavior: 'smooth' });
      }, 150);

      // Change button so she knows it's opened
      surpriseBtn.textContent = 'Enjoy, My Love ❤️';
    });
  }

  /* ---------- 7. Typewriter love message 💌 ---------- */
  const LOVE_MESSAGE_TEXT =
    'If I could give you one thing today, I would give you the ability to ' +
    'see yourself through my eyes — then you would know just how special you are to me.';

  let typewriterStarted = false;
  function startTypewriterOnce() {
    if (typewriterStarted) return;
    typewriterStarted = true;
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    let i = 0;
    el.classList.remove('done');
    const timer = setInterval(() => {
      el.textContent = LOVE_MESSAGE_TEXT.slice(0, ++i);
      if (i >= LOVE_MESSAGE_TEXT.length) {
        clearInterval(timer);
        el.classList.add('done');
      }
    }, 35);
  }

  /* ---------- 8. Music button — NO autoplay, click to play/stop ---------- */
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicLabel = document.getElementById('music-label');
  const audio = document.getElementById('bg-music');

  if (musicBtn && audio) {
    musicBtn.addEventListener('click', async () => {
      try {
        if (audio.paused) {
          await audio.play();
          musicBtn.classList.add('playing');
          musicBtn.setAttribute('aria-pressed', 'true');
          if (musicIcon) musicIcon.textContent = '❤️';
          if (musicLabel) musicLabel.textContent = 'Our Song ♡ Playing';
        } else {
          audio.pause();
          musicBtn.classList.remove('playing');
          musicBtn.setAttribute('aria-pressed', 'false');
          if (musicIcon) musicIcon.textContent = '🎵';
          if (musicLabel) musicLabel.textContent = 'Play Our Song';
        }
      } catch (err) {
        if (musicLabel) musicLabel.textContent = 'Add ' + MUSIC_FILE;
        console.warn('Music file missing? Add your song as ' + MUSIC_FILE, err);
      }
    });
    audio.addEventListener('error', () => {
      if (musicLabel && audio.paused) musicLabel.textContent = 'Add ' + MUSIC_FILE;
    });
  }

  /* ---------- Init ---------- */
  applySettings();
  handlePhotoFallbacks();
  spawnFloatingHearts();
  spawnParticles();
  observeReveals();

  window.addEventListener('resize', () => {
    spawnFloatingHearts();
    spawnParticles();
  });
})();
