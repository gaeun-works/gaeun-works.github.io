// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== FADE UP ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

fadeElements.forEach((el) => observer.observe(el));

// ===== HERO STATS COUNTER ANIMATION =====
function animateCounter(el, target, suffix, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    if (suffix === '%') {
      el.textContent = Math.floor(eased * target) + suffix;
    } else if (suffix === '×') {
      el.textContent = (eased * target).toFixed(1) + suffix;
    } else if (suffix === 'K') {
      el.textContent = (eased * target).toFixed(0) + suffix;
    } else if (suffix === 'K+') {
      el.textContent = (eased * target).toFixed(0) + 'K+';
    } else {
      el.textContent = Math.floor(eased * target) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Trigger counter animation when hero is visible
const heroStats = document.querySelectorAll('.hero-stat-value');
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const values = [
          { el: heroStats[0], target: 71, suffix: '%' },
          { el: heroStats[1], target: 3, suffix: '×' },
          { el: heroStats[2], target: 480, suffix: 'K' },
          { el: heroStats[3], target: 1, suffix: 'K+' },
        ];
        values.forEach(({ el, target, suffix }, i) => {
          setTimeout(() => animateCounter(el, target, suffix, 1200), i * 150);
        });
        heroObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

if (heroStats.length > 0) {
  heroObserver.observe(heroStats[0].closest('.hero-stats'));
}

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CURSOR GLOW EFFECT (SUBTLE) =====
const glowFollower = document.createElement('div');
glowFollower.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.05), transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
`;
document.body.appendChild(glowFollower);

document.addEventListener('mousemove', (e) => {
  glowFollower.style.left = e.clientX + 'px';
  glowFollower.style.top = e.clientY + 'px';
});

// ===== ACTIVE NAV INDICATOR =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.project-card, .award-card, .framework-step').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      card.style.transition = '';
    }, 500);
  });
});

// ===== PAGE LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
