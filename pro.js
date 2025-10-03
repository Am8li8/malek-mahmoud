function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.classList.add("show");
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.classList.remove("show");
}

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const clickSound = document.getElementById("clickSound");

// حركة الماوس
window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
});

// تغيير الشكل عند المرور على اللينك
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursorDot.classList.add("active");
    cursorOutline.classList.add("active");
  });
  link.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("active");
    cursorOutline.classList.remove("active");
  });
});

// تشغيل الصوت عند الكليك
window.addEventListener("click", () => {
  clickSound.currentTime = 0; // علشان يعيد الصوت من الأول
  clickSound.play();
});

const projects = [
  {
    id: 1,
    title: "Khair Islamic Logo",
    description: "Creative logo design for app.",
    category: "design",
    tags: ["Logo Design", "Brand Identity", "Illustrator"],
    image: "img/khair.png",
    demoLink:
      "https://www.behance.net/gallery/232153095/Khair-Islamic-Logo-Design",
    codeLink: null,
    year: "2025",
  },
  {
    id: 2,
    title: "Abrag Logo Design",
    description: "Creative logo design for Abrag company.",
    category: "design",
    tags: ["Logo Design", "Brand Identity", "Illustrator"],
    image: "img/abrag.png",
    demoLink: "https://www.behance.net/gallery/225553605/office-logo",
    codeLink: null,
    year: "2025",
  },
  {
    id: 3,
    title: "More Road Logo Design",
    description: "Creative logo design for web devoloper.",
    category: "design",
    tags: ["Logo Design", "Brand Identity", "Illustrator"],
    image: "img/more.png",
    demoLink: "https://www.behance.net/gallery/230815047/Moreroad-Logo-Design",
    codeLink: null,
    year: "2025",
  },
  {
    id: 4,
    title: "M25 Fonts Logo",
    description: "Creaive logo design for a font website.",
    category: "design",
    tags: ["Logo Design", "Brand Identity", "Illustrator"],
    image: "img/m25.png",
    demoLink: "https://www.behance.net/gallery/231470719/M25-Fonts-Logo-design",
    codeLink: null,
    year: "2025",
  },
  {
    id: 5,
    title: "M25 Fonts Website",
    description: "M25 fonts website.",
    category: "development",
    tags: ["HTML", "CSS", "Responsive Design"],
    image: "img/webm.jpg",
    demoLink: "https://m25fonts.netlify.app",
    codeLink: "https://github.com/Am8li8/m25-beta",
    year: "2025",
  },
  {
    id: 6,
    title: "Malek Portfolio",
    description: "Malek Mahmoud Portfolio Website.",
    category: "development",
    tags: ["HTML", "CSS", "Responsive Design"],
    image: "img/malek.png",
    demoLink: "https://malek-mahmoud.vercel.app/",
    codeLink: "https://github.com/Am8li8/malek-mahmoud",
    year: "2025",
  },
];

// DOM Elements
let currentFilter = "all";
const projectsGrid = document.getElementById("projectsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  if (projectsGrid) renderProjects();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      setActiveFilter(filter);
      filterProjects(filter);
    });
  });

  // Add smooth scroll behavior to anchor links
  document.addEventListener("click", function (e) {
    const anchor = e.target.closest && e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const target = anchor.getAttribute("href");
      if (!target || target === "#") return; // تجاهل href="#" أو فارغ
      smoothScrollTo(target);
    }
  });
}

// Set active filter button
function setActiveFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.getAttribute("data-filter") === filter) {
      button.classList.add("active");
    }
  });
}

// Filter projects based on category
function filterProjects(filter) {
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  if (!projectsGrid) return;

  // Add fade out animation
  projectsGrid.style.opacity = "0";
  projectsGrid.style.transform = "translateY(20px)";

  setTimeout(() => {
    renderProjects(filteredProjects);
    // Add fade in animation
    projectsGrid.style.opacity = "1";
    projectsGrid.style.transform = "translateY(0)";
  }, 150);
}

// Render projects to the grid
function renderProjects(projectsToRender = projects) {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = "";

  const fragment = document.createDocumentFragment();

  projectsToRender.forEach((project, index) => {
    const projectCard = createProjectCard(project, index);
    fragment.appendChild(projectCard);
  });

  projectsGrid.appendChild(fragment);
}

// Create a project card element
function createProjectCard(project, index) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.style.animationDelay = `${index * 0.1}s`;

  const tagsHTML = project.tags
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");

  const codeLink = project.codeLink
    ? `<a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" class="project-code-link">
         <i class="fa-brands fa-github"></i>
       </a>`
    : "";

  card.innerHTML = `
    <div class="project-image-container">
      <img data-src="${project.image}" alt="${project.title}" class="project-image lazy-image">
      <div class="project-overlay"></div>
      <div class="project-year">${project.year}</div>
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">${tagsHTML}</div>
      <div class="project-links">
        <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="project-link">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          View Project
        </a>
        ${codeLink}
      </div>
    </div>
  `;

  return card;
}

// Smooth scrolling for internal links
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe project cards for scroll animations
function observeProjectCards() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    observer.observe(card);
  });
}

// Lazy loading images
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll(".lazy-image");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Call observe + lazy load after rendering projects
const originalRenderProjects = renderProjects;
renderProjects = function (projectsToRender = projects) {
  originalRenderProjects(projectsToRender);
  setTimeout(() => {
    observeProjectCards();
    lazyLoadImages();
  }, 100);
};

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize for responsive behavior
const handleResize = debounce(() => {
  if (window.innerWidth > 768 && navMenu) {
    navMenu.classList.remove("active");
  }
}, 250);

window.addEventListener("resize", handleResize);

window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
});


  document.addEventListener("DOMContentLoaded", function() {
    // نجيب كل عناصر h1 في الصفحة
    const headings = document.querySelectorAll("h1");

    // نعدل عليهم واحد واحد
    headings.forEach(h1 => {
      h1.style.fontFamily = "'Space Mono', monospace"; // font-family اللي عايزه
      h1.style.fontWeight = "700"; // الوزن (bold مثلاً)
    });
  });


  // ---- replace your createProjectCard(...) with this function ----
function createProjectCard(project, index) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.style.animationDelay = `${index * 0.1}s`;
  card.tabIndex = 0; // keyboard focusable

  const tagsHTML = project.tags
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");

  const codeLink = project.codeLink
    ? `<a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" class="project-code-link">
         <i class="fa-brands fa-github"></i>
       </a>`
    : "";

  card.innerHTML = `
    <div class="project-image-container">
      <img data-src="${project.image}" alt="${project.title}" class="project-image lazy-image">
      <div class="project-overlay"></div>
      <div class="project-year">${project.year}</div>
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">${tagsHTML}</div>
      <div class="project-links">
        <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="project-link">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          View Project
        </a>
        ${codeLink}
      </div>
    </div>
  `;

  // open modal when clicking the card BUT ignore clicks on <a> (links)
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return; // لو ضغط على لينك متفتحش المودال
    openModal(project);
  });

  // keyboard: open modal on Enter
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(project);
    }
  });

  return card;
}

// ---- modal functions (add these once in pro.js) ----
function openModal(project) {
  const modal = document.getElementById("projectModal");
  if (!modal) return console.warn("projectModal element not found");

  // set content
  const img = document.getElementById("modalImage");
  const title = document.getElementById("modalTitle");
  const desc = document.getElementById("modalDescription");
  const tagsEl = document.getElementById("modalTags");
  const demo = document.getElementById("modalDemo");
  const code = document.getElementById("modalCode");

  img.src = project.image || "";
  img.alt = project.title || "Project image";
  title.textContent = project.title || "";
  desc.textContent = project.description || "";
  tagsEl.innerHTML = (project.tags || []).map(t => `<span>${t}</span>`).join("");

  // demo link
  demo.href = project.demoLink || "#";
  if (!project.demoLink) demo.style.display = "none";
  else demo.style.display = "";

  // code link
  if (project.codeLink) {
    code.href = project.codeLink;
    code.style.display = "";
  } else {
    code.style.display = "none";
  }

  // show modal
  modal.setAttribute("aria-hidden", "false");
  // prevent body scroll while modal open
  document.documentElement.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = ""; // restore scroll
}

// close button
document.addEventListener("click", function (e) {
  // close when pressing the close button
  if (e.target.matches(".modal-close")) {
    closeModal();
  }

  // close when click on overlay (outside modal-content)
  if (e.target.id === "projectModal") {
    closeModal();
  }
});

// close on ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
