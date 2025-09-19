function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.add('show');
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.remove('show');
}

const projects = [
  {
    id: 1,
    title: 'Khair Islamic Logo',
    description: 'Creative logo design for app.',
    category: 'design',
    tags: ['Logo Design', 'Brand Identity', 'Illustrator'],
    image: 'img/khair.png',
    demoLink: 'https://www.behance.net/gallery/232153095/Khair-Islamic-Logo-Design',
    codeLink: null,
    year: '2025'
  },
  {
    id: 2,
    title: 'Abrag Logo Design',
    description: 'Creative logo design for Abrag company.',
    category: 'design',
    tags: ['Logo Design', 'Brand Identity', 'Illustrator'],
    image: 'img/abrag.png',
    demoLink: 'https://www.behance.net/gallery/225553605/office-logo',
    codeLink: null,
    year: '2025'
  },
  {
    id: 3,
    title: 'More Road Logo Design',
    description: 'Creative logo design for web devoloper.',
    category: 'design',
    tags: ['Logo Design', 'Brand Identity', 'Illustrator'],
    image: 'img/more.png',
    demoLink: 'https://www.behance.net/gallery/230815047/Moreroad-Logo-Design',
    codeLink: null,
    year: '2025'
  },
  {
    id: 4,
    title: 'M25 Fonts Logo',
    description: 'Creaive logo design for a font website.',
    category: 'design',
    tags: ['Logo Design', 'Brand Identity', 'Illustrator'],
    image: 'img/m25.png',
    demoLink: 'https://www.behance.net/gallery/231470719/M25-Fonts-Logo-design',
    codeLink: null,
    year: '2025'
  },
  {
    id: 5,
    title: 'M25 Fonts Website',
    description: 'M25 fonts website.',
    category: 'development',
    tags: ['HTML', 'CSS', 'Responsive Design'],
    image: 'img/webm.jpg',
    demoLink: 'https://m25fonts.netlify.app',
    codeLink: 'https://github.com/Am8li8/m25-beta',
    year: '2025'
  },
  {
    id: 6,
    title: 'Malek Portfolio',
    description: 'Malek Mahmoud Portfolio Website.',
    category: 'development',
    tags: ['HTML', 'CSS', 'Responsive Design'],
    image: 'img/malek.png',
    demoLink: 'https://malek-mahmoud.vercel.app/',
    codeLink: 'https://github.com/Am8li8/malek-mahmoud',
    year: '2025'
  }
];

// DOM Elements
let currentFilter = 'all';
const projectsGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
  if (projectsGrid) renderProjects();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');
      setActiveFilter(filter);
      filterProjects(filter);
    });
  });

  // Add smooth scroll behavior to anchor links
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest && e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const target = anchor.getAttribute('href');
      if (!target || target === '#') return; // تجاهل href="#" أو فارغ
      smoothScrollTo(target);
    }
  });
}

// Set active filter button
function setActiveFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(button => {
    button.classList.remove('active');
    if (button.getAttribute('data-filter') === filter) {
      button.classList.add('active');
    }
  });
}

// Filter projects based on category
function filterProjects(filter) {
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  if (!projectsGrid) return;

  // Add fade out animation
  projectsGrid.style.opacity = '0';
  projectsGrid.style.transform = 'translateY(20px)';

  setTimeout(() => {
    renderProjects(filteredProjects);
    // Add fade in animation
    projectsGrid.style.opacity = '1';
    projectsGrid.style.transform = 'translateY(0)';
  }, 150);
}

// Render projects to the grid
function renderProjects(projectsToRender = projects) {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = '';

  projectsToRender.forEach((project, index) => {
    const projectCard = createProjectCard(project, index);
    projectsGrid.appendChild(projectCard);
  });
}

// Create a project card element
function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.animationDelay = `${index * 0.1}s`;

  const tagsHTML = project.tags.map(tag =>
    `<span class="project-tag">${tag}</span>`
  ).join('');

  const codeLink = project.codeLink
    ? `<a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" class="project-code-link">
         <i class="fa-brands fa-github"></i>
       </a>`
    : '';

  card.innerHTML = `
    <div class="project-image-container">
      <img src="${project.image}" alt="${project.title}" class="project-image">
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
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe project cards for scroll animations
function observeProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    observer.observe(card);
  });
}

// Call observe function after rendering projects
const originalRenderProjects = renderProjects;
renderProjects = function (projectsToRender = projects) {
  originalRenderProjects(projectsToRender);
  setTimeout(observeProjectCards, 100);
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
    navMenu.classList.remove('active');
  }
}, 250);

window.addEventListener('resize', handleResize);
