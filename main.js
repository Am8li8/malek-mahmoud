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

window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
});


const slide = document.querySelector(".logo-slide");
if (slide) {
  const copy = slide.cloneNode(true);
  document.querySelector(".logos").appendChild(copy);
}

  document.addEventListener("DOMContentLoaded", function() {
    // نجيب كل عناصر h1 في الصفحة
    const headings = document.querySelectorAll("h1");

    // نعدل عليهم واحد واحد
    headings.forEach(h1 => {
      h1.style.fontFamily = "'Space Mono', monospace"; // font-family اللي عايزه
      h1.style.fontWeight = "700"; // الوزن (bold مثلاً)
    });
  });