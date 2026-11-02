// ===== 1. Mobile menu toggle =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// ===== 2. Dark mode (remembers your choice) =====
const themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ===== 3. Typing effect (home page only) =====
const typing = document.getElementById("typing");
if (typing) {
  const words = ["Inquisitive CS Undergraduate", "Building Useful · Usable · Data-Driven Systems", "Python · Java · Analytics", "Inspiring Data Analyst", "Lifelong Learner"]; // change these
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

// ===== 4. Scroll reveal =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== 5. Count-up numbers (home page only) =====
document.querySelectorAll(".num").forEach(el => {
  const target = +el.dataset.target;
  let n = 0;
  const timer = setInterval(() => {
    n++;
    el.textContent = n;
    if (n >= target) clearInterval(timer);
  }, 300);
});

// ===== 6. Project filter (projects page only) =====
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    projects.forEach(p => {
      p.style.display =
        btn.dataset.filter === "all" || p.dataset.type === btn.dataset.filter ? "" : "none";
    });
  });
});

// ===== 7. Back to top =====
document.getElementById("topLink").addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
