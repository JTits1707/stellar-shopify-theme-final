/**
 * Stellar Reverb Timeline Interactive JavaScript
 * Enhanced timeline functionality with cosmic effects and animations
 */

class StellarTimeline {
  constructor(container) {
    this.container = container;
    this.timeline = container.querySelector('.cosmic-timeline');
    this.items = container.querySelectorAll('.timeline-item');
    this.line = container.querySelector('.timeline-line');
    this.markers = container.querySelectorAll('.timeline-marker');
    this.currentIndex = 0;
    this.isAutoPlaying = false;
    this.autoPlayInterval = null;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupKeyboardNavigation();
    this.setupAutoPlay();
    this.setupParticleEffects();
    this.setupHashtagAnimations();
    this.initializeTimeline();
  }
  
  setupEventListeners() {
    // Marker click events
    this.markers.forEach((marker, index) => {
      marker.addEventListener('click', () => {
        this.goToItem(index);
        this.pauseAutoPlay();
      });
      
      marker.addEventListener('mouseenter', () => {
        this.showPreview(index);
        this.triggerParticleBurst(marker);
      });
      
      marker.addEventListener('mouseleave', () => {
        this.hidePreview();
      });
    });
    
    // Timeline item interactions
    this.items.forEach((item, index) => {
      const content = item.querySelector('.timeline-content');
      
      content?.addEventListener('click', () => {
        this.expandItem(index);
      });
      
      // Hashtag interactions
      const hashtags = item.querySelectorAll('.timeline-hashtag');
      hashtags.forEach(hashtag => {
        hashtag.addEventListener('click', (e) => {
          e.stopPropagation();
          this.filterByHashtag(hashtag.textContent);
        });
        
        hashtag.addEventListener('mouseenter', () => {
          this.highlightRelatedHashtags(hashtag.textContent);
        });
        
        hashtag.addEventListener('mouseleave', () => {
          this.clearHashtagHighlights();
        });
      });
    });
    
    // Control buttons
    const prevBtn = this.container.querySelector('.timeline-prev');
    const nextBtn = this.container.querySelector('.timeline-next');
    const playBtn = this.container.querySelector('.timeline-play');
    
    prevBtn?.addEventListener('click', () => this.previousItem());
    nextBtn?.addEventListener('click', () => this.nextItem());
    playBtn?.addEventListener('click', () => this.toggleAutoPlay());
    
    // Window resize
    window.addEventListener('resize', () => {
      this.updateTimelineLayout();
    });
  }
  
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = Array.from(this.items).indexOf(entry.target);
        
        if (entry.isIntersecting) {
          this.activateItem(index);
          this.updateProgress(index);
        }
      });
    }, observerOptions);
    
    this.items.forEach(item => {
      this.observer.observe(item);
    });
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.container.contains(document.activeElement)) return;
      
      switch(e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          this.previousItem();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          this.nextItem();
          break;
        case ' ':
          e.preventDefault();
          this.toggleAutoPlay();
          break;
        case 'Home':
          e.preventDefault();
          this.goToItem(0);
          break;
        case 'End':
          e.preventDefault();
          this.goToItem(this.items.length - 1);
          break;
      }
    });
  }
  
  setupAutoPlay() {
    const autoPlayToggle = this.container.querySelector('.timeline-autoplay');
    
    if (autoPlayToggle) {
      autoPlayToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.startAutoPlay();
        } else {
          this.pauseAutoPlay();
        }
      });
    }
  }
  
  setupParticleEffects() {
    this.particleContainer = document.createElement('div');
    this.particleContainer.className = 'timeline-particles';
    this.container.appendChild(this.particleContainer);
    
    // Create particle pool
    this.particlePool = [];
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'timeline-particle';
      this.particleContainer.appendChild(particle);
      this.particlePool.push(particle);
    }
  }
  
  setupHashtagAnimations() {
    const hashtags = this.container.querySelectorAll('.timeline-hashtag');
    
    hashtags.forEach(hashtag => {
      // Add glitch effect on hover
      hashtag.addEventListener('mouseenter', () => {
        hashtag.classList.add('hashtag-glitch');
        setTimeout(() => {
          hashtag.classList.remove('hashtag-glitch');
        }, 500);
      });
      
      // Add neon glow effect
      hashtag.style.setProperty('--hashtag-color', this.getRandomNeonColor());
    });
  }
  
  initializeTimeline() {
    // Set initial state
    this.activateItem(0);
    this.updateProgress(0);
    
    // Add cosmic background effects
    this.addCosmicBackground();
    
    // Initialize timeline line animation
    this.animateTimelineLine();
    
    // Setup scroll sync
    this.setupScrollSync();
  }
  
  goToItem(index) {
    if (index < 0 || index >= this.items.length) return;
    
    this.currentIndex = index;
    this.activateItem(index);
    this.scrollToItem(index);
    this.updateProgress(index);
    this.triggerItemAnimation(index);
  }
  
  nextItem() {
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    this.goToItem(nextIndex);
  }
  
  previousItem() {
    const prevIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.goToItem(prevIndex);
  }
  
  activateItem(index) {
    // Remove active class from all items
    this.items.forEach(item => item.classList.remove('active'));
    this.markers.forEach(marker => marker.classList.remove('active'));
    
    // Add active class to current item
    if (this.items[index]) {
      this.items[index].classList.add('active');
      this.markers[index]?.classList.add('active');
      
      // Trigger cosmic effects
      this.triggerCosmicEffects(index);
    }
  }
  
  scrollToItem(index) {
    const item = this.items[index];
    if (!item) return;
    
    const containerRect = this.container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const offset = itemRect.top - containerRect.top - (containerRect.height / 2) + (itemRect.height / 2);
    
    this.container.scrollTo({
      top: this.container.scrollTop + offset,
      behavior: 'smooth'
    });
  }
  
  updateProgress(index) {
    const progress = ((index + 1) / this.items.length) * 100;
    const progressBar = this.container.querySelector('.timeline-progress');
    
    if (progressBar) {
      progressBar.style.setProperty('--progress', `${progress}%`);
    }
    
    // Update line fill
    if (this.line) {
      const fillHeight = (index / (this.items.length - 1)) * 100;
      this.line.style.setProperty('--fill-height', `${fillHeight}%`);
    }
  }
  
  expandItem(index) {
    const item = this.items[index];
    const content = item.querySelector('.timeline-content');
    const expandedContent = item.querySelector('.timeline-expanded');
    
    if (expandedContent) {
      expandedContent.classList.toggle('visible');
      content.classList.toggle('expanded');
      
      // Trigger expand animation
      this.triggerExpandAnimation(item);
    }
  }
  
  showPreview(index) {
    const item = this.items[index];
    const preview = item.querySelector('.timeline-preview');
    
    if (preview) {
      preview.classList.add('visible');
      
      // Add preview animation
      preview.style.animation = 'preview-fade-in 0.3s ease-out';
    }
  }
  
  hidePreview() {
    const previews = this.container.querySelectorAll('.timeline-preview');
    previews.forEach(preview => {
      preview.classList.remove('visible');
    });
  }
  
  triggerParticleBurst(marker) {
    const rect = marker.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    
    // Create particle burst
    for (let i = 0; i < 8; i++) {
      const particle = this.getAvailableParticle();
      if (particle) {
        this.animateParticle(particle, x, y, i);
      }
    }
  }
  
  getAvailableParticle() {
    return this.particlePool.find(particle => !particle.classList.contains('active'));
  }
  
  animateParticle(particle, x, y, index) {
    particle.classList.add('active');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    const angle = (index / 8) * Math.PI * 2;
    const distance = 50 + Math.random() * 30;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    particle.style.setProperty('--end-x', `${endX}px`);
    particle.style.setProperty('--end-y', `${endY}px`);
    
    particle.style.animation = 'particle-burst 0.8s ease-out forwards';
    
    setTimeout(() => {
      particle.classList.remove('active');
      particle.style.animation = '';
    }, 800);
  }
  
  filterByHashtag(hashtag) {
    const filteredItems = Array.from(this.items).filter(item => {
      const itemHashtags = item.querySelectorAll('.timeline-hashtag');
      return Array.from(itemHashtags).some(tag => tag.textContent === hashtag);
    });
    
    // Hide non-matching items
    this.items.forEach(item => {
      if (filteredItems.includes(item)) {
        item.style.display = 'flex';
        item.classList.add('filtered-match');
      } else {
        item.style.display = 'none';
        item.classList.remove('filtered-match');
      }
    });
    
    // Update filter indicator
    this.updateFilterIndicator(hashtag);
    
    // Add clear filter button
    this.addClearFilterButton();
  }
  
  clearFilter() {
    this.items.forEach(item => {
      item.style.display = 'flex';
      item.classList.remove('filtered-match');
    });
    
    this.removeFilterIndicator();
    this.removeClearFilterButton();
  }
  
  highlightRelatedHashtags(hashtag) {
    const allHashtags = this.container.querySelectorAll('.timeline-hashtag');
    
    allHashtags.forEach(tag => {
      if (tag.textContent === hashtag) {
        tag.classList.add('hashtag-highlighted');
      } else {
        tag.classList.add('hashtag-dimmed');
      }
    });
  }
  
  clearHashtagHighlights() {
    const allHashtags = this.container.querySelectorAll('.timeline-hashtag');
    allHashtags.forEach(tag => {
      tag.classList.remove('hashtag-highlighted', 'hashtag-dimmed');
    });
  }
  
  startAutoPlay() {
    this.isAutoPlaying = true;
    this.autoPlayInterval = setInterval(() => {
      this.nextItem();
    }, 5000);
    
    const playBtn = this.container.querySelector('.timeline-play');
    if (playBtn) {
      playBtn.classList.add('playing');
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  }
  
  pauseAutoPlay() {
    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    
    const playBtn = this.container.querySelector('.timeline-play');
    if (playBtn) {
      playBtn.classList.remove('playing');
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
  
  toggleAutoPlay() {
    if (this.isAutoPlaying) {
      this.pauseAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }
  
  triggerCosmicEffects(index) {
    const item = this.items[index];
    const marker = this.markers[index];
    
    // Add cosmic glow to marker
    if (marker) {
      marker.style.animation = 'cosmic-pulse 1s ease-out';
      setTimeout(() => {
        marker.style.animation = '';
      }, 1000);
    }
    
    // Add content reveal animation
    const content = item.querySelector('.timeline-content');
    if (content) {
      content.style.animation = 'content-reveal 0.6s ease-out';
      setTimeout(() => {
        content.style.animation = '';
      }, 600);
    }
    
    // Trigger hashtag animations
    const hashtags = item.querySelectorAll('.timeline-hashtag');
    hashtags.forEach((hashtag, i) => {
      setTimeout(() => {
        hashtag.style.animation = 'hashtag-pop 0.4s ease-out';
        setTimeout(() => {
          hashtag.style.animation = '';
        }, 400);
      }, i * 100);
    });
  }
  
  triggerItemAnimation(index) {
    const item = this.items[index];
    
    // Add entrance animation
    item.style.animation = 'item-activate 0.8s ease-out';
    
    setTimeout(() => {
      item.style.animation = '';
    }, 800);
  }
  
  triggerExpandAnimation(item) {
    // Add expand effect
    item.style.animation = 'item-expand 0.5s ease-out';
    
    setTimeout(() => {
      item.style.animation = '';
    }, 500);
  }
  
  addCosmicBackground() {
    const cosmicBg = document.createElement('div');
    cosmicBg.className = 'timeline-cosmic-bg';
    this.container.appendChild(cosmicBg);
    
    // Add floating cosmic elements
    for (let i = 0; i < 5; i++) {
      const element = document.createElement('div');
      element.className = 'cosmic-element';
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.animationDelay = `${Math.random() * 5}s`;
      cosmicBg.appendChild(element);
    }
  }
  
  animateTimelineLine() {
    if (!this.line) return;
    
    // Add drawing animation
    this.line.style.animation = 'line-draw 2s ease-out';
    
    // Add pulsing effect
    setTimeout(() => {
      this.line.style.animation = 'line-pulse 3s ease-in-out infinite';
    }, 2000);
  }
  
  setupScrollSync() {
    let ticking = false;
    
    this.container.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  updateScrollProgress() {
    const scrollTop = this.container.scrollTop;
    const scrollHeight = this.container.scrollHeight - this.container.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    // Update scroll indicator
    const scrollIndicator = this.container.querySelector('.timeline-scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.setProperty('--scroll-progress', `${progress}%`);
    }
  }
  
  updateTimelineLayout() {
    // Recalculate positions and animations on resize
    this.updateProgress(this.currentIndex);
    
    // Reset particle positions
    this.particlePool.forEach(particle => {
      particle.classList.remove('active');
      particle.style.animation = '';
    });
  }
  
  updateFilterIndicator(hashtag) {
    let indicator = this.container.querySelector('.filter-indicator');
    
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'filter-indicator';
      this.container.appendChild(indicator);
    }
    
    indicator.innerHTML = `
      <span class="filter-text">Filtered by: ${hashtag}</span>
      <button class="filter-clear" onclick="this.closest('.stellar-timeline').stellarTimeline.clearFilter()">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    indicator.style.display = 'flex';
  }
  
  removeFilterIndicator() {
    const indicator = this.container.querySelector('.filter-indicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }
  
  addClearFilterButton() {
    if (this.container.querySelector('.clear-filter-btn')) return;
    
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-filter-btn';
    clearBtn.innerHTML = '<i class="fas fa-filter"></i> Clear Filter';
    clearBtn.addEventListener('click', () => this.clearFilter());
    
    this.container.appendChild(clearBtn);
  }
  
  removeClearFilterButton() {
    const clearBtn = this.container.querySelector('.clear-filter-btn');
    if (clearBtn) {
      clearBtn.remove();
    }
  }
  
  getRandomNeonColor() {
    const colors = [
      '#E13CFA', // Neon Magenta
      '#28A8D6', // Cyan Blue
      '#F4FF30', // Electric Yellow
      '#00F0AC', // Radioactive Green
      '#6C24B3'  // Cosmic Purple
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  destroy() {
    // Clean up event listeners and intervals
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Remove added elements
    const cosmicBg = this.container.querySelector('.timeline-cosmic-bg');
    if (cosmicBg) cosmicBg.remove();
    
    const particleContainer = this.container.querySelector('.timeline-particles');
    if (particleContainer) particleContainer.remove();
  }
}

// Auto-initialize timelines
document.addEventListener('DOMContentLoaded', function() {
  const timelineContainers = document.querySelectorAll('.stellar-timeline-container');
  
  timelineContainers.forEach(container => {
    container.stellarTimeline = new StellarTimeline(container);
  });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StellarTimeline;
}

// Add required CSS animations
const timelineStyles = `
  @keyframes cosmic-pulse {
    0% { transform: scale(1); box-shadow: 0 0 10px var(--neon-magenta); }
    50% { transform: scale(1.3); box-shadow: 0 0 30px var(--neon-magenta); }
    100% { transform: scale(1); box-shadow: 0 0 10px var(--neon-magenta); }
  }
  
  @keyframes content-reveal {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes hashtag-pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes item-activate {
    0% { opacity: 0; transform: translateX(-30px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes item-expand {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  @keyframes particle-burst {
    0% { 
      opacity: 1; 
      transform: translate(0, 0) scale(1); 
    }
    100% { 
      opacity: 0; 
      transform: translate(var(--end-x), var(--end-y)) scale(0); 
    }
  }
  
  @keyframes line-draw {
    0% { height: 0; }
    100% { height: 100%; }
  }
  
  @keyframes line-pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes preview-fade-in {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .hashtag-glitch {
    animation: glitch-effect 0.5s ease-out !important;
  }
  
  @keyframes glitch-effect {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-1px, 1px); }
    40% { transform: translate(-1px, -1px); }
    60% { transform: translate(1px, 1px); }
    80% { transform: translate(1px, -1px); }
  }
  
  .hashtag-highlighted {
    color: var(--hashtag-color) !important;
    text-shadow: 0 0 10px var(--hashtag-color) !important;
    transform: scale(1.1);
  }
  
  .hashtag-dimmed {
    opacity: 0.3;
  }
  
  .timeline-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--electric-yellow);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10;
  }
  
  .cosmic-element {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--cyan-blue);
    border-radius: 50%;
    animation: cosmic-float 8s ease-in-out infinite;
  }
  
  @keyframes cosmic-float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  .filter-indicator {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(225, 60, 250, 0.1);
    border: 2px solid var(--neon-magenta);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 100;
    font-family: 'Orbitron', monospace;
    color: var(--neon-magenta);
  }
  
  .filter-clear {
    background: none;
    border: none;
    color: var(--neon-magenta);
    cursor: pointer;
    padding: 0.2rem;
  }
  
  .clear-filter-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--cyan-blue);
    color: var(--void-black);
    border: none;
    border-radius: 0.5rem;
    padding: 0.8rem 1.2rem;
    font-family: 'Orbitron', monospace;
    font-weight: 600;
    cursor: pointer;
    z-index: 100;
    transition: all 0.3s ease;
  }
  
  .clear-filter-btn:hover {
    background: var(--neon-magenta);
    transform: translateY(-2px);
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = timelineStyles;
document.head.appendChild(styleSheet);
