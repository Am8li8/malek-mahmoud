const fills = document.querySelectorAll('.fill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.3
});

fills.forEach(fill => {
  observer.observe(fill);
});

  // =========== كود السلايدر هنا ===========

document.querySelectorAll('.project-card').forEach(card => {
  const track = card.querySelector('.slider-track');
  const prevBtn = card.querySelector('.slider-prev');
  const nextBtn = card.querySelector('.slider-next');
  
  // جمع كل الصور والفيديوهات مع بعض
  const slides = track.querySelectorAll('img, video');
  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // التحكم بالأزرار
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // التحكم بالسحب باللمس
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      nextBtn.click();
    } else if (startX < endX - 50) {
      prevBtn.click();
    }
  });

  // التحكم بالسحب بالماوس
  let isDown = false;

  track.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.clientX;
  });

  track.addEventListener('mouseup', e => {
    if (!isDown) return;
    isDown = false;
    endX = e.clientX;
    if (startX > endX + 50) {
      nextBtn.click();
    } else if (startX < endX - 50) {
      prevBtn.click();
    }
  });

  // منع سحب الصور والفيديوهات نفسها
  slides.forEach(media => {
    media.addEventListener('dragstart', e => e.preventDefault());
  });
});

const icons = document.querySelectorAll('.social-icon');

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    // هنا ممكن تضيف أي تأثير قبل الانتقال للرابط
    console.log(`Navigating to: ${icon.href}`);
  });
});

const goUpBtn = document.querySelector('.goup');

  if (goUpBtn) {
    goUpBtn.classList.remove('show');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 160) {
        goUpBtn.classList.add('show');
      } else {
        goUpBtn.classList.remove('show');
      }
    });

    goUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // كل السيكشنات بالـ ID
const sections = document.querySelectorAll('.about-all, .khebra-all, .content, .container');
const bars = document.querySelectorAll('.skill-bar');

window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add('show');
    }
  });

  bars.forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight - 50) {
      bar.classList.add('show');
    }
  });
});
