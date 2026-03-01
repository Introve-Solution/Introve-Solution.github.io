// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const overlay = document.createElement('div');
overlay.classList.add('mobile-overlay');
document.body.appendChild(overlay);

function toggleMenu() {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu on resize to prevent layout issues
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
    toggleMenu();
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Close mobile menu if it's open and the link is a nav link
    if (navLinks.classList.contains('active') && this.closest('.nav-links')) {
      toggleMenu();
    }

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .process-step, .feature-item, .mission-box, .vision-box').forEach(el => {
  observer.observe(el);
});

// Counter animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 30);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statItems = document.querySelectorAll('.stat-item h3');
      statItems.forEach((item, index) => {
        const values = [10, 500, 2000, 50];
        setTimeout(() => {
          animateCounter(item, values[index]);
        }, index * 100);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Services Carousel -- New
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const carouselVp = document.querySelector("#carousel-vp");
const cCarouselInner = document.querySelector("#cCarousel-inner");

if (prev && next && carouselVp && cCarouselInner) {
    let carouselInnerWidth = cCarouselInner.getBoundingClientRect().width;
    let leftValue = 0;

    // Movement value (card's width + gap)
    const item = document.querySelector(".cCarousel-item");
    const itemWidth = item ? item.getBoundingClientRect().width : 0;
    const gap = item ? parseFloat(window.getComputedStyle(cCarouselInner).getPropertyValue("gap")) : 0;
    const totalMovementSize = itemWidth + gap;

    prev.addEventListener("click", () => {
        if (leftValue < 0) {
            leftValue += totalMovementSize;
            cCarouselInner.style.left = leftValue + "px";
        }
    });

    next.addEventListener("click", () => {
        const carouselVpWidth = carouselVp.getBoundingClientRect().width;
        // Check if there's still space to scroll
        if (carouselInnerWidth - Math.abs(leftValue) > carouselVpWidth) {
            leftValue -= totalMovementSize;
            cCarouselInner.style.left = leftValue + "px";
        }
    });

    window.addEventListener('resize', () => {
        // Recalculate inner width on resize for the 'next' button logic
        carouselInnerWidth = cCarouselInner.getBoundingClientRect().width;
    });
}