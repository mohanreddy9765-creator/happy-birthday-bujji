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
const MY_NAME         = "BAVA";       // <-- EDIT: your name, e.g. "Rohan"
const BIRTHDAY_DATE   = "24 September";   // <-- EDIT: her birthday, e.g. "14 February 2026"

const PHOTO_1 = "IMG-20260703-WA0049.jpg";              // <-- EDIT: path to 1st photo
const PHOTO_2 = "IMG-20260703-WA0057.jpg";              // <-- EDIT: path to 2nd photo
const PHOTO_3 = "photo3.jpg";              // <-- EDIT: path to 3rd photo

// OPTIONAL extra photos — add photo4.jpg / photo5.jpg / photo6.jpg / photo7.jpg
// next to index.html and put their names here. Leave as "" to hide that slot.
const PHOTO_4 = "photo.jpg";              // <-- OPTIONAL: e.g. "photo4.jpg"
const PHOTO_5 = "phjotoWhatsApp Image 2026-09-24 at 10.32.19 PM.jpeg";              // <-- OPTIONAL: e.g. "photo5.jpg"
const PHOTO_6 = "WhatsApp Image 2026-09-24 at 10.20.56 PM (1).jpeg";              // <-- OPTIONAL: e.g. "photo6.jpg"
const PHOTO_7 = "photo 7.jpeg";              // <-- OPTIONAL: e.g. "photo7.jpg"

const MUSIC_FILE = "music.mp3";         // <-- EDIT: path to your romantic song

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

    const photos = [PHOTO_1, PHOTO_2, PHOTO_3, PHOTO_4, PHOTO_5, PHOTO_6, PHOTO_7];
    document.querySelectorAll('[data-photo]').forEach((img, i) => {
      const src = photos[i];
      const card = img.closest('.photo-card');
      if (!src) {
        // No photo configured for this slot → keep it hidden
        if (card) card.classList.add('hidden');
        return;
      }
      if (card) card.classList.remove('hidden');
      img.src = src;
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
    const photos = [PHOTO_1, PHOTO_2, PHOTO_3, PHOTO_4, PHOTO_5, PHOTO_6, PHOTO_7];
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

  /* Burst hearts exactly where she taps (extra exciting 💖) */
  function burstAt(x, y, n) {
    const layer = confettiLayer || document.body;
    for (let i = 0; i < (n || 14); i++) {
      const c = document.createElement('span');
      c.className = 'confetti-piece';
      c.style.position = 'fixed';
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      c.textContent = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
      c.style.fontSize = (14 + Math.random() * 22) + 'px';
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 180;
      c.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      c.style.setProperty('--dy', Math.sin(angle) * dist - 80 + 'px');
      layer.appendChild(c);
      setTimeout(() => c.remove(), 2000);
    }
  }

  /* ---------- 6. Reveal surprise sections ---------- */
  const surpriseBtn = document.getElementById('surprise-btn');

  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      // Show hidden sections
      document.querySelectorAll('#surprise, #gallery, #love-message, #reasons, #finale')
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

  /* ---------- 9. TAP interactions: gentle hearts on photo tap + reason cards 💖 ---------- */
  // NOTE: no popups, no counters — tapping a photo only showers a few hearts
  // where she taps. Kiss counter removed: counts only live on her phone and
  // can never reach you without a backend, so it was taken out.

  // Tap a photo → cute pop + small heart shower at her finger (photo stays as-is)
  document.querySelectorAll('[data-tap-photo]').forEach((card) => {
    card.addEventListener('click', (e) => {
      card.classList.remove('tap-pop');
      void card.offsetWidth; // restart animation
      card.classList.add('tap-pop');
      burstAt(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 12);
    });
  });

  // Tap reason cards → reveal the love note + mini celebration
  document.querySelectorAll('.reason-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (card.classList.contains('revealed')) return;
      card.classList.add('revealed');
      const msg = card.getAttribute('data-reason');
      const front = card.querySelector('.reason-front');
      if (front && msg) front.textContent = msg;
      burstAt(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 14);
    });
  });

  // Tap the last big heart → it sends her a flying kiss 😘 (visual only, nothing counted)
  const bigHeart = document.getElementById('big-heart');
  const KISS_EMOJI = ['😘', '💋'];
  let kissFlip = 0;

  function flyKiss(x, y) {
    const k = document.createElement('span');
    k.className = 'flying-kiss';
    k.textContent = KISS_EMOJI[kissFlip++ % KISS_EMOJI.length]; // always a kiss: 😘, 💋, 😘, 💋…
    k.style.left = x + 'px';
    k.style.top = y + 'px';
    k.style.fontSize = (22 + Math.random() * 22) + 'px';
    k.style.setProperty('--dx', ((Math.random() - 0.5) * 260) + 'px');
    k.style.setProperty('--dy', (-150 - Math.random() * 150) + 'px');
    document.body.appendChild(k);
    setTimeout(() => k.remove(), 1500);
  }

  if (bigHeart) {
    bigHeart.addEventListener('click', (e) => {
      const x = e.clientX || window.innerWidth / 2;
      const y = e.clientY || window.innerHeight / 2;
      for (let i = 0; i < 6; i++) {
        flyKiss(x + (Math.random() - 0.5) * 120, y + (Math.random() - 0.5) * 60);
      } // a shower of 6 kisses per tap, always 😘💋
      burstAt(x, y, 5); // just a few sparkle hearts around the kisses
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
