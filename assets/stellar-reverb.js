// Stellar Reverb Custom JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize floating elements
  initFloatingElements();
  
  // Initialize glitch effects
  initGlitchEffects();
  
  // Initialize product interactions
  initProductInteractions();
  
  // Initialize navigation effects
  initNavigationEffects();
  
  // Initialize form enhancements
  initFormEnhancements();
  
});

// Floating Elements System
function initFloatingElements() {
  const container = document.querySelector('.stellar-floating-elements');
  if (!container) return;
  
  const symbols = ['📻', '🎵', '⚡', '🌌', '📡', '🎧', '✨', '🔮', '🎶', '🛸', '💫', '🌟', '🎸', '🎤', '🎹'];
  
  function createFloatingElement() {
    if (container.children.length >= 15) return;
    
    const element = document.createElement('div');
    element.className = 'floating-item';
    element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = '0s';
    element.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    // Random color variation
    const colors = ['var(--neon-magenta)', 'var(--cyan-blue)', 'var(--radioactive-green)', 'var(--electric-yellow)'];
    element.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 25000);
  }
  
  // Create initial elements
  for (let i = 0; i < 9; i++) {
    setTimeout(createFloatingElement, i * 2000);
  }
  
  // Continue creating elements
  setInterval(createFloatingElement, 3000);
}

// Glitch Effects
function initGlitchEffects() {
  // Hero title glitch
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setInterval(() => {
      heroTitle.style.textShadow = `
        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--neon-magenta),
        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 var(--cyan-blue)
      `;
      setTimeout(() => {
        heroTitle.style.textShadow = '0 0 30px var(--neon-magenta)';
      }, 100);
    }, 5000);
  }
  
  // Random glitch on section titles
  const sectionTitles = document.querySelectorAll('.section-title-stellar');
  sectionTitles.forEach(title => {
    setInterval(() => {
      title.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
      setTimeout(() => {
        title.style.transform = 'translateX(0)';
      }, 100);
    }, 8000 + Math.random() * 5000);
  });
}

// Product Interactions
function initProductInteractions() {
  // Product card hover effects
  const productCards = document.querySelectorAll('.product-card-stellar');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
      
      // Add random color shift to border
      const colors = ['var(--neon-magenta)', 'var(--cyan-blue)', 'var(--radioactive-green)'];
      this.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.borderColor = 'var(--cyan-blue)';
    });
  });
  
  // Add to cart button effects
  const addToCartButtons = document.querySelectorAll('.btn-stellar, .product-cta');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.disabled) return;
      
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Button feedback
      const originalText = this.textContent;
      this.textContent = 'ADDED!';
      this.style.background = 'linear-gradient(45deg, var(--radioactive-green), var(--cyan-blue))';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = 'linear-gradient(45deg, var(--neon-magenta), var(--cyan-blue))';
      }, 2000);
    });
  });
}

// Navigation Effects
function initNavigationEffects() {
  // Signal Seekers special effects
  const signalSeekersLink = document.querySelector('.signal-seekers-nav');
  if (signalSeekersLink) {
    // Add particle trail on hover
    signalSeekersLink.addEventListener('mouseenter', function() {
      createParticleTrail(this);
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Form Enhancements
function initFormEnhancements() {
  // Newsletter signup
  const newsletterForms = document.querySelectorAll('.optin-form, .newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      const button = this.querySelector('button, .optin-button');
      
      if (email && validateEmail(email)) {
        // Success animation
        button.innerHTML = '<i class="fas fa-check"></i> SIGNAL RECEIVED';
        button.style.background = 'linear-gradient(45deg, var(--radioactive-green), var(--electric-yellow))';
        
        // Create success particles
        createSuccessParticles(button);
        
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-satellite-dish"></i> INITIATE SIGNAL';
          button.style.background = 'linear-gradient(45deg, var(--cyan-blue), var(--radioactive-green))';
          this.querySelector('input[type="email"]').value = '';
        }, 3000);
      } else {
        // Error animation
        button.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          button.style.animation = '';
        }, 500);
      }
    });
  });
  
  // Input focus effects
  const inputs = document.querySelectorAll('.optin-input, input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--neon-magenta)';
      this.style.boxShadow = '0 0 20px rgba(225, 60, 250, 0.3)';
    });
    
    input.addEventListener('blur', function() {
      this.style.borderColor = 'var(--cyan-blue)';
      this.style.boxShadow = 'none';
    });
  });
}

// Filter System
function initFilterSystem() {
  const filterItems = document.querySelectorAll('.filter-item');
  const productCards = document.querySelectorAll('.product-card-stellar');
  
  filterItems.forEach(item => {
    item.addEventListener('click', function() {
      // Update active state
      filterItems.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.textContent.toLowerCase();
      
      // Filter products with animation
      productCards.forEach((card, index) => {
        setTimeout(() => {
          if (filterValue === 'all transmissions' || 
              card.dataset.category === filterValue ||
              card.textContent.toLowerCase().includes(filterValue)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
          } else {
            card.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        }, index * 50);
      });
    });
  });
}

// Utility Functions
function createParticleTrail(element) {
  const rect = element.getBoundingClientRect();
  const particles = 5;
  
  for (let i = 0; i < particles; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = rect.left + Math.random() * rect.width + 'px';
      particle.style.top = rect.top + Math.random() * rect.height + 'px';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = 'var(--neon-magenta)';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.animation = 'particleFloat 1s ease-out forwards';
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }, i * 100);
  }
}

function createSuccessParticles(element) {
  const rect = element.getBoundingClientRect();
  const particles = 10;
  
  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.textContent = '✨';
    particle.style.position = 'fixed';
    particle.style.left = rect.left + rect.width / 2 + 'px';
    particle.style.top = rect.top + rect.height / 2 + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.fontSize = '1rem';
    particle.style.color = 'var(--electric-yellow)';
    
    const angle = (i / particles) * Math.PI * 2;
    const velocity = 50 + Math.random() * 50;
    
    particle.style.animation = `explodeParticle 1s ease-out forwards`;
    particle.style.setProperty('--angle', angle + 'rad');
    particle.style.setProperty('--velocity', velocity + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.8);
    }
  }
  
  @keyframes particleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-50px) scale(0);
    }
  }
  
  @keyframes explodeParticle {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(
        calc(cos(var(--angle)) * var(--velocity)),
        calc(sin(var(--angle)) * var(--velocity))
      ) scale(0);
    }
  }
`;
document.head.appendChild(style);

// Initialize filter system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initFilterSystem();
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out';
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.product-card-stellar, .matrix-item, .capsule-section');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Konami code for easter egg
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  window.konamiProgress = window.konamiProgress || 0;
  
  if (e.keyCode === konamiCode[window.konamiProgress]) {
    window.konamiProgress++;
    if (window.konamiProgress === konamiCode.length) {
      activateEasterEgg();
      window.konamiProgress = 0;
    }
  } else {
    window.konamiProgress = 0;
  }
});

function activateEasterEgg() {
  // Create cosmic explosion effect
  const explosion = document.createElement('div');
  explosion.style.position = 'fixed';
  explosion.style.top = '50%';
  explosion.style.left = '50%';
  explosion.style.transform = 'translate(-50%, -50%)';
  explosion.style.fontSize = '5rem';
  explosion.textContent = '🌌';
  explosion.style.zIndex = '99999';
  explosion.style.animation = 'explode 2s ease-out forwards';
  
  document.body.appendChild(explosion);
  
  // Add temporary cosmic mode
  document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
  
  setTimeout(() => {
    explosion.remove();
    document.body.style.filter = '';
  }, 2000);
  
  // Show secret message
  alert('🚀 COSMIC FREQUENCY UNLOCKED! You\'ve discovered the hidden transmission! 🚀');
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Parallax effect for hero section
window.addEventListener('scroll', throttle(function() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
}, 16));

console.log('🚀 Stellar Reverb systems online. Cosmic frequencies activated.');
