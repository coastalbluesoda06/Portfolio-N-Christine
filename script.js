const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

// ===== NAVIGATION / VIEW SWITCHER =====
function renderView(viewName) {
  document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const navBtn = document.getElementById(`nav-${viewName}`);
  if (navBtn) navBtn.classList.add('active');

  const target = document.getElementById('view-' + viewName) || document.getElementById('view-coming-soon');
  target.classList.add('active');
  fitAbout();
}

// Shrink the About and Achievements pages on desktop so all of each fits in one screen (no scrolling)
function fitAbout() {
  fitToScreen('view-about', '#view-about .ab');
  fitToScreen('view-education', '#view-education .ach');
}
function fitToScreen(viewId, sel) {
  const ab = document.querySelector(sel);
  if (!ab) return;
  // zoom-to-fit ENABLED so the About page fits in one screen
  ab.style.zoom = ''; ab.style.maxWidth = '';
  const view = document.getElementById(viewId);
  if (!view.classList.contains('active') || window.innerWidth < 901) return;
  let z = 1;
  for (let i = 0; i < 10; i++) {
    const abH = ab.getBoundingClientRect().height / z;
    const mainEl = document.querySelector('main');
    const other = ab.getBoundingClientRect().top + window.scrollY
      + parseFloat(getComputedStyle(mainEl).paddingBottom) + document.querySelector('footer').offsetHeight;
    const next = Math.min(1, Math.max(0.55, (window.innerHeight - other - 6) / abH));
    if (Math.abs(next - z) < 0.005 && i) break;
    z = next;
    ab.style.zoom = z.toFixed(3);
    // use the extra width the smaller scale frees up, so text wraps less and the page gets shorter
    ab.style.maxWidth = Math.min(1700, (window.innerWidth * 0.94) / z) + 'px';
  }
  // safety: shave the scale until nothing scrolls
  while (document.documentElement.scrollHeight > window.innerHeight + 1 && z > 0.5) {
    z -= 0.01;
    ab.style.zoom = z.toFixed(3);
    ab.style.maxWidth = Math.min(1700, (window.innerWidth * 0.94) / z) + 'px';
  }
  if (z >= 0.999) { ab.style.zoom = ''; ab.style.maxWidth = ''; }
}
// Achievements: stagger index so the entries appear one by one
document.querySelectorAll('#view-education .tl-item').forEach((el, i) => el.style.setProperty('--i', i));
document.querySelectorAll('#view-about .ab-cards .ab-card, #view-about .ab-skills > *').forEach((el, i, all) => el.style.setProperty('--k', el.closest('.ab-cards') ? [...el.parentNode.children].indexOf(el) : [...el.parentNode.children].indexOf(el)));
window.addEventListener('resize', fitAbout);
window.addEventListener('load', fitAbout);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAbout);

// ===== PAGE TRANSITION =====
const VIEWS = {
  home:     { rank: 'A',  suit: '♠', icon: 'home',  title: 'home' },
  about:    { rank: 'J',  suit: '♦', icon: 'user',  title: 'personal information' },
  education: { rank: 'K',  suit: '♣', icon: 'grad',  title: 'achievements' },
  family:   { rank: 'Q',  suit: '♥', icon: 'family', title: 'family' },
  contact:  { rank: '10', suit: '♠', icon: 'mail',  title: 'contact' }
};
let currentView = 'home', busy = false;

function pickRandomCard() {
  const availableViews = ['about', 'education', 'family', 'contact'];
  const randomView = availableViews[Math.floor(Math.random() * availableViews.length)];
  showView(randomView);
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
// mini playing card used as each page's symbol
function cardMark(name) {
  const v = VIEWS[name];
  return `<div class="mini-card"><div class="card-corner">${v.rank}<span class="card-suit">${v.suit}</span></div><div class="card-center">${icon(v.icon)}</div><div class="card-corner br">${v.rank}<span class="card-suit">${v.suit}</span></div></div>`;
}
document.querySelectorAll('[data-card]').forEach(el => { el.innerHTML = cardMark(el.dataset.card); });

async function showView(name) {
  if (busy) return;
  if (name === currentView) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { renderView(name); currentView = name; window.scrollTo(0, 0); return; }

  busy = true;
  const root = document.documentElement;
  const overlay = document.getElementById('flipOverlay');
  const pos = document.getElementById('flipPos');
  const card = document.getElementById('flipCard');
  const v = VIEWS[name];
  const red = (v.suit === '♦' || v.suit === '♥') ? ' red' : '';
  [pos, card].forEach(el => el.getAnimations().forEach(a => a.cancel()));

  document.getElementById('flipFront').innerHTML =
    `<div class="card-corner${red}">${v.rank}<span class="card-suit">${v.suit}</span></div>
     <div class="card-center">${icon(v.icon)}</div>
     <div class="card-title-text">${v.title}</div>
     <div class="card-corner br${red}">${v.rank}<span class="card-suit">${v.suit}</span></div>`;

  root.classList.add('transitioning');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.id === `nav-${name}`));

  const old = document.querySelector('.page-view.active');
  const discard = old.animate(
    [{ transform: 'none', opacity: 1 }, { transform: 'translate(45vw, 12vh) rotate(14deg)', opacity: 0 }],
    { duration: 320, easing: 'cubic-bezier(.5,0,.9,.4)', fill: 'forwards' }
  );
  await sleep(120);

  overlay.classList.add('show');
  pos.animate(
    [{ opacity: 0, transform: 'translateY(60px) scale(.85)' }, { opacity: 1, transform: 'none' }],
    { duration: 260, easing: 'ease-out', fill: 'both' }
  );
  const flip = card.animate(
    [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(180deg)' }],
    { duration: 450, delay: 100, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'both' }
  );
  await flip.finished;
  await sleep(120);

  discard.cancel();
  renderView(name);
  currentView = name;
  window.scrollTo(0, 0);
  overlay.classList.remove('show');
  pos.animate(
    [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-30px) scale(.92)' }],
    { duration: 220, easing: 'ease-in', fill: 'forwards' }
  );
  const incoming = document.querySelector('.page-view.active');
  incoming.animate(
    [{ opacity: 0, transform: 'translateY(-50px) rotate(-4deg) scale(.97)' }, { opacity: 1, transform: 'none' }],
    { duration: 400, easing: 'cubic-bezier(.2,.8,.3,1)' }
  );
  await sleep(400);
  root.classList.remove('transitioning');
  busy = false;
}

// ===== HAND OF CARDS: fan the deck out =====
const deck = document.getElementById('deck');
function layoutHand() {
  const cards = [...deck.children];
  const n = cards.length;
  cards.forEach((c, i) => {
    const off = i - (n - 1) / 2;
    c.style.setProperty('--rot', `${off * 7}deg`);
    c.style.setProperty('--y', `${off * off * 5}px`);
    c.style.zIndex = i + 1;
    c.tabIndex = 0;
    c.setAttribute('role', 'button');
  });
}
deck.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.target.click(); }
});
layoutHand();
 // Touch screens: lift the card first, then open the page
deck.addEventListener('click', e => {
  const card = e.target.closest('.nav-card');
  if (!card || !matchMedia('(hover: none)').matches) return;
  if (card.dataset.go) { delete card.dataset.go; return; }  // second pass: let it open
  e.stopPropagation();                                      // first pass: block the instant open
  card.classList.add('picked');
  setTimeout(() => {
    card.dataset.go = '1';
    card.click();
    card.classList.remove('picked');
  }, 280);
}, true);
// ===== SHUFFLE IN (right → left) =====
function playShuffle() {
  deck.classList.remove('pre');
  [...deck.children].forEach((card, i) => {
    card.classList.remove('dealt');
    void card.offsetWidth;                        // restart animation
    card.style.animationDelay = `${i * 110}ms`;
    card.classList.add('dealt');
  });
}

// Hidden until the card section scrolls into view, then the cards shuffle in from the right
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  deck.classList.remove('pre');
} else {
  let played = false;
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !played) {
        played = true;
        playShuffle();
      } else if (!e.isIntersecting && played) {
        // reset once fully out of view so it shuffles again on the next scroll down
        played = false;
        deck.classList.add('pre');
        [...deck.children].forEach(c => c.classList.remove('dealt'));
      }
    });
  }, { threshold: 0.15 }).observe(deck);
}

// Shuffle & pick: the deck shuffles a few times, then a card is chosen automatically and opens
let shuffling = false;
document.getElementById('shuffleBtn').addEventListener('click', async () => {
  if (shuffling || busy) return;
  shuffling = true;
  deck.classList.remove('pre');
  deck.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  [...deck.children].forEach(c => c.classList.remove('dealt', 'picked'));
  const rounds = reduceMotion ? 0 : 3;
  for (let r = 0; r < rounds; r++) {
    [...deck.children].forEach(c => c.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px'));
    deck.classList.add('riffle');
    await sleep(250);
    const cards = [...deck.children];                      // swap the order mid-hop
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    cards.forEach(c => deck.appendChild(c));
    layoutHand();
    await sleep(330);
    deck.classList.remove('riffle');
    void deck.offsetWidth;
  }
  const target = c => (c.getAttribute('onclick') || '').match(/showView\('(\w+)'\)/);
  const options = [...deck.children].filter(c => target(c) && target(c)[1] !== 'home');
  const chosen = options[Math.floor(Math.random() * options.length)];
  chosen.classList.add('picked');
  deck.classList.add('has-pick');
  await sleep(reduceMotion ? 500 : 1100);
  const view = target(chosen)[1];
  chosen.classList.remove('picked');
  deck.classList.remove('has-pick');
  shuffling = false;
  showView(view);
});

// ===== DARK MODE TOGGLE =====
const themeBtn = document.getElementById("themeBtn");
try { if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark"); } catch (e) {}
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  try { localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
});


// ===== CERTIFICATE LIGHTBOX =====
(function () {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  if (!lb || !lbImg) return;
  const close = () => { lb.classList.remove("open"); lbImg.removeAttribute("src"); };
  document.querySelectorAll(".cert-thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      lbImg.src = img.src; lbImg.alt = img.alt;
      lb.classList.add("open");
    });
  });
  document.querySelectorAll(".cert-thumb img").forEach((im) => { if (!im.complete) im.addEventListener("load", () => { if (typeof fitAbout === "function") fitAbout(); }); });
  lb.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();

// ===== TYPING EFFECT =====
const typing = document.getElementById("typing");
if (typing) {
  const words = ["inquisitive cs student", "python & java developer", "aspiring data analyst", "training coordinator & tutor"];
  let w = 0, c = 0, deleting = false;
  function type() {
    const word = words[w];
    typing.textContent = word.substring(0, c);
    if (!deleting && c < word.length) c++;
    else if (!deleting) { deleting = true; return setTimeout(type, 1200); }
    else if (c > 0) c--;
    else { deleting = false; w = (w + 1) % words.length; }
    setTimeout(type, deleting ? 50 : 100);
  }
  type();
}

// click the email on the home page to copy it
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const t = document.createElement('textarea');
      t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch (_) {}
      t.remove();
    }
    const label = btn.querySelector('.copy-label');
    label.textContent = 'Copied!';
    clearTimeout(btn._copyTimer);
    btn._copyTimer = setTimeout(() => { label.textContent = text; }, 1600);
  });
});
