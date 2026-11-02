// 1. Mobile menu
const menuBtn = document.getElementById("menuBtn"), navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// 2. Typing effect (home only)
const typing = document.getElementById("typing");
if (typing) {
  const words = ["Inquisitive CS Undergraduate", "Building Useful · Usable · Data-Driven Systems", "Python · Java · Analytics", "Inspiring Data Analyst", "Lifelong Learner"];
  let w = 0, c = 0, deleting = false;
  (function type() {
    const word = words[w];
    typing.textContent = word.substring(0, c);
    if (!deleting && c < word.length) c++;
    else if (!deleting) { deleting = true; return setTimeout(type, 1200); }
    else if (c > 0) c--;
    else { deleting = false; w = (w + 1) % words.length; }
    setTimeout(type, deleting ? 50 : 100);
  })();
}

// 3. Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// 4. Count-up (about page)
document.querySelectorAll(".n").forEach(el => {
  const t = +el.dataset.target; let n = 0;
  const id = setInterval(() => { el.textContent = ++n; if (n >= t) clearInterval(id); }, 300);
});

// 5. Back to top
const top = document.getElementById("topLink");
if (top) top.addEventListener("click", e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

// 6. Shooting stars in the background
const sky = document.createElement("div");
sky.className = "sky";
for (let i = 0; i < 7; i++) {
  const s = document.createElement("span");
  s.className = "shoot";
  s.style.left = (30 + Math.random() * 70) + "%";
  s.style.top = (Math.random() * 55) + "%";
  s.style.setProperty("--d", (7 + Math.random() * 7).toFixed(1) + "s");
  s.style.setProperty("--delay", (i * 1.6).toFixed(1) + "s");
  sky.appendChild(s);
}
document.body.prepend(sky);

// 7. Tarot card art (matches the reference cover) + page frame
const NS = 'http://www.w3.org/2000/svg';
const defs = document.createElement('div');
defs.innerHTML = "<svg width='0' height='0' style='position:absolute' aria-hidden='true'><defs>" +
  "<g id='flo' fill='none' stroke='currentColor' stroke-width='1.1' stroke-linecap='round'>" +
  "<path d='M2 40 C2 14 22 2 44 4 C58 5 64 16 56 24 C50 30 40 26 42 18 C43 13 50 14 50 18'/>" +
  "<path d='M2 40 C8 30 18 28 24 34 C28 40 22 46 17 42'/><path d='M2 58 C10 50 18 52 20 62'/>" +
  "<path d='M44 4 C48 -2 56 0 58 4'/><path d='M16 8 C10 14 10 22 16 24'/>" +
  "<circle cx='14' cy='15' r='3.6'/><circle cx='14' cy='15' r='1' fill='currentColor'/>" +
  "<path fill='currentColor' fill-opacity='.35' d='M24 22 C32 15 40 19 36 29 C30 32 24 28 24 22Z'/></g>" +
  "<g id='sun' fill='none' stroke='currentColor' stroke-width='.9' stroke-linecap='round'><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(0)'/><path d='M0 -26 L0 -36' transform='rotate(22.5)'/><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(45.0)'/><path d='M0 -26 L0 -36' transform='rotate(67.5)'/><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(90.0)'/><path d='M0 -26 L0 -36' transform='rotate(112.5)'/><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(135.0)'/><path d='M0 -26 L0 -36' transform='rotate(157.5)'/><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(180.0)'/><path d='M0 -26 L0 -36' transform='rotate(202.5)'/><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(225.0)'/><path d='M0 -26 L0 -36' transform='rotate(247.5)'/><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(270.0)'/><path d='M0 -26 L0 -36' transform='rotate(292.5)'/><path d='M0 -24 C4 -29 -4 -34 0 -39 C3 -43 -2 -46 1 -50' transform='rotate(315.0)'/><path d='M0 -26 L0 -36' transform='rotate(337.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(7.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(22.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(37.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(52.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(67.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(82.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(97.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(112.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(127.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(142.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(157.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(172.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(187.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(202.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(217.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(232.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(247.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(262.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(277.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(292.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(307.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(322.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(337.5)'/><path d='M0 -54 L0 -60' stroke-width='.5' transform='rotate(352.5)'/>" +
  "<circle r='22'/><circle r='18' stroke-width='.5'/><circle r='9' stroke-width='.6'/>" +
  "<path fill='currentColor' fill-opacity='.5' d='M0 -16 L3 -3 L16 0 L3 3 L0 16 L-3 3 L-16 0 L-3 -3Z'/>" +
  "<path d='M-11 -11 L-3 -3 M11 -11 L3 -3 M11 11 L3 3 M-11 11 L-3 3' stroke-width='.5'/><circle r='2' fill='currentColor'/></g>" +
  "</defs></svg>";
document.body.prepend(defs.firstChild);

document.querySelectorAll('.tarot').forEach(card => {
  const s = card.querySelector('.sym'); if (s) s.remove();
  const art = document.createElementNS(NS, 'svg');
  art.setAttribute('viewBox', '0 0 220 330'); art.setAttribute('class', 'art'); art.setAttribute('aria-hidden', 'true');
  art.innerHTML =
    "<use href='#flo' transform='translate(10 10)'/><use href='#flo' transform='translate(210 10) scale(-1 1)'/>" +
    "<use href='#flo' transform='translate(10 320) scale(1 -1)'/><use href='#flo' transform='translate(210 320) scale(-1 -1)'/>" +
    "<g fill='none' stroke='currentColor' stroke-width='.8'><path d='M110 44 V104 M110 214 V226'/>" +
    "<circle cx='110' cy='62' r='6'/><circle cx='110' cy='90' r='11'/>" +
    "<path fill='currentColor' d='M110 80 L113 90 L110 100 L107 90Z'/></g>" +
    "<use href='#sun' transform='translate(110 160) scale(1.05)'/>";
  card.prepend(art);
});

const frame = document.createElement('div');
frame.className = 'frame';
frame.innerHTML = ['tl','tr','bl','br'].map(c => "<svg class='fc " + c + "' viewBox='0 0 70 70'><use href='#flo'/></svg>").join('');
document.body.prepend(frame);
