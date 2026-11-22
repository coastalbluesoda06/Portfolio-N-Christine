// Personal Information page: all content lives here, the HTML is only a shell.
const PI = {
  photo: "images/profile.jpg",
  name: "N Christine",
  course: "BSCS",
  bio: [
    "I'm a first-year Computer Science student at the University of the Cordilleras who uses Python, Java, and analytics to turn data into simple, useful tools.",
    "I've spent over a year as a training coordinator and run my own tutoring business, which taught me to explain complex ideas simply.",
    "I'm resilient and resourceful, and I'm working toward becoming a data analyst."
  ],
  motto: "You can't add days to your life, but you can add life to your days.",
  facts: [
    ["Nickname", ["Kris"]],
    ["Birthday", ["April 19, 2006", "20 years old"]],
    ["Sex · Status", ["Female", "Single"]],
    ["Nationality · Religion", ["Myanmar", "Christian"]],
    ["Hometown", ["Yangon, Myanmar"]],
    ["Current address", ["Guisad Sorung, Baguio, Philippines"]],
    ["College · 1st year", ["University of the Cordilleras", "BS Computer Science"]],
    ["Previous school", ["BTC Myitkyina"]],
    ["Parents", ["Nang Hee Syndang", "Yingthan Gin Zi"]],
    ["Hobbies", ["Gaming · Sketching · Self-studying"]],
    ["Languages", ["English · Burmese"]],
    ["Contact", ["nhchristine725@gmail.com", "0927 825 8065"]]
  ],
  skills: [
    ["Programming fundamentals", ["Python & Java basics", "HTML/CSS", "Code reading"]],
    ["Digital content & design", ["Web layouts", "Visual presentation", "Branding"]],
    ["Teaching & coordination", ["Instruction", "Lesson planning", "Team coordination"]]
  ]
};

const badge = n => `<span class="pi-badge">${n}</span>`;

document.getElementById("app").innerHTML = `
  <h1 class="pi-title">Personal Information</h1>
  <div class="pi-main">
    <section class="pi-left">
      <div class="pi-id">
        <img class="pi-photo" src="${PI.photo}" alt="${PI.name}" />
        <div><h2 class="pi-name">${PI.name}</h2><p class="pi-course">${PI.course}</p></div>
      </div>
      <div class="pi-bio">${PI.bio.map(t => `<p>${t}</p>`).join("")}</div>
      <blockquote class="pi-quote">${PI.motto}</blockquote>
    </section>
    <section class="pi-cards" aria-label="Personal details">
      ${PI.facts.map(([label, lines], i) => `
        <div class="pi-card">${badge(i + 1)}
          <div><h3>${label}</h3>${lines.map(l => `<p>${l}</p>`).join("")}</div>
        </div>`).join("")}
    </section>
  </div>
  <h2 class="pi-skills-title">Skills</h2>
  <div class="pi-skills">
    ${PI.skills.map(([title, chips], i) => `
      <div class="pi-skill">
        <h3>${badge(i + 1)}${title}</h3>
        <ul class="chips">${chips.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>`).join("")}
  </div>`;
