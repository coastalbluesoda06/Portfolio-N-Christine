// 1. Mobile menu
const menuBtn = document.getElementById("menuBtn"), navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// 2. Dark mode toggle (same "theme" key as index.html, so the choice carries across pages)
try { if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark"); } catch (e) {}
const themeBtn = document.createElement("button");
themeBtn.className = "theme-btn";
themeBtn.setAttribute("aria-label", "Toggle dark mode");
themeBtn.innerHTML =
  "<svg class='i-moon' viewBox='0 0 24 24' aria-hidden='true'><path d='M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z'/></svg>" +
  "<svg class='i-sun' viewBox='0 0 24 24' aria-hidden='true'><circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'/></svg>";
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  try { localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
});
if (navLinks) navLinks.appendChild(themeBtn);

// 3. Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// 4. Count-up (about page)
document.querySelectorAll(".n").forEach(el => {
  const t = +el.dataset.target; let n = 0;
  const id = setInterval(() => { el.textContent = ++n; if (n >= t) clearInterval(id); }, 300);
});

// 5. Back to top
const topLink = document.getElementById("topLink");
if (topLink) topLink.addEventListener("click", e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
