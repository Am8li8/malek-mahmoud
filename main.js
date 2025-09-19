function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.add('show');
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.remove('show');
}

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// حركة الماوس
window.addEventListener("mousemove", function(e){
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// تغيير الشكل عند المرور على اللينك
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("mouseenter", () => {
    cursorDot.classList.add("active");
    cursorOutline.classList.add("active");
  });
  link.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("active");
    cursorOutline.classList.remove("active");
  });
});

