// Interaction only: mobile menu, dark mode, cursor-following dot.

// 1. Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// 2. Dark mode (remembers the choice with the same "theme" key as your other pages)
try { if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark"); } catch (e) {}
document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  try { localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
});

// 3. Soft dot that follows the mouse (skipped on touch screens and reduced-motion)
const blob = document.querySelector(".blob");
const canHover = matchMedia("(hover: hover)").matches;
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (blob && canHover && !calm) {
  let x = -200, y = -200, tx = -200, ty = -200;
  addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
  (function move() {
    x += (tx - x) * 0.12; y += (ty - y) * 0.12;
    blob.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(move);
  })();
} else if (blob) { blob.remove(); }
