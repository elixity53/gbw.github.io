// Gentle Bear Knifeworks - Main JavaScript
// Handles all animations, interactions, and effects

class GentleBearKnifeworks {
    constructor() {
        this.isLoaded = false;
        this.currentFilter = 'all';
        this.knifeData = [];      // legacy variable (kept for compatibility)
        this.galleryData = [];    // canonical gallery data used across methods
        this.processSteps = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeData();     // loads galleryData (from localStorage or defaults)
            this.renderGallery();      // populate the DOM with gallery items before interactions
            this.setupAnimations();
            this.setupInteractions();
            this.setupScrollEffects();
            this.setupParticles();
            this.isLoaded = true;
        });
    }

    initializeData() {
        // Load gallery data from localStorage or default source
        this.loadGalleryData();

        // Process steps for timeline
        this.processSteps = [
            {
                title: "The Forge Ignites",
                description: "Steel heated to 2200°F, transforming raw metal into workable material",
                icon: "🔥"
            },
            {
                title: "Shaping the Steel",
                description: "Hammer and anvil work in harmony, forging the blade's fundamental form",
                icon: "🔨"
            },
            {
                title: "Grinding & Sharpening",
                description: "Precision grinding creates the edge geometry and final blade profile",
                icon: "⚡"
            },
            {
                title: "Handle Crafting",
                description: "Traditional materials shaped and fitted to create the perfect grip",
                icon: "🌳"
            },
            {
                title: "Final Touch",
                description: "Heat treatment, engraving, and finishing create a lasting masterpiece",
                icon: "✨"
            }
        ];
    }

    setupAnimations() {
        // Hero text animations
        this.animateHeroText();
        
        // Portfolio grid animations
        this.animatePortfolioGrid();
        
        // Process timeline animations
        this.animateProcessSteps();
        
        // Button hover effects
        this.setupButtonEffects();
    }

    animateHeroText() {
        if (typeof anime !== 'undefined') {
            // Main heading animation
            anime({
                targets: '.hero-title',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 500
            });

            // Subtitle animation
            anime({
                targets: '.hero-subtitle',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: 800
            });

            // CTA button animation
            anime({
                targets: '.hero-cta',
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 800,
                easing: 'easeOutBack',
                delay: 1200
            });
        }

        // Typewriter effect for tagline
        if (typeof Typed !== 'undefined') {
            new Typed('.typewriter-text', {
                strings: [
                    'Hand-Forged Precision',
                    'Traditional Craftsmanship',
                    'Modern Excellence'
                ],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    animatePortfolioGrid() {
        const knifeCards = document.querySelectorAll('.knife-card');
        
        if (typeof anime !== 'undefined' && knifeCards.length > 0) {
            anime({
                targets: knifeCards,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }
    }

    animateProcessSteps() {
        const steps = document.querySelectorAll('.process-step');
        
        if (typeof anime !== 'undefined' && steps.length > 0) {
            anime({
                targets: steps,
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 1000,
                delay: anime.stagger(200),
                easing: 'easeOutExpo'
            });
        }
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn, .knife-card, .filter-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: e.target,
                        scale: 1.05,
                        duration: 200,
                        easing: 'easeOutQuad'
                    });
                }
                
                // Add glow effect
                e.target.style.boxShadow = '0 0 20px rgba(217, 107, 43, 0.6)';
                e.target.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', (e) => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: e.target,
                        scale: 1,
                        duration: 200,
                        easing: 'easeOutQuad'
                    });
                }
                
                // Remove glow effect
                e.target.style.boxShadow = '';
                e.target.style.transform = 'translateY(0)';
            });
        });
    }

    setupInteractions() {
        // Portfolio filter system
        this.setupPortfolioFilter();
        
        // Lightbox modal (uses delegation so it's safe even if gallery is rendered after)
        this.setupLightbox();
        
        // Form handling
        this.setupFormHandling();
        
        // Navigation
        this.setupNavigation();
        
        // Mobile menu
        this.setupMobileMenu();
    }

    setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const knifeCards = document.querySelectorAll('.knife-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.currentFilter = filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter cards
                this.filterKnifeCards(filter, document.querySelectorAll('.knife-card'));
            });
        });
    }

    filterKnifeCards(filter, cards) {
        cards.forEach(card => {
            const cardType = card.dataset.type;
            const shouldShow = filter === 'all' || cardType === filter;
            
            if (typeof anime !== 'undefined') {
                if (shouldShow) {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 400,
                        easing: 'easeOutBack'
                    });
                    card.style.display = 'block';
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.8],
                        duration: 300,
                        easing: 'easeInBack',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            } else {
                card.style.display = shouldShow ? 'block' : 'none';
            }
        });
    }

    // Use event delegation on the gallery grid so listeners work even if cards are added later
    setupLightbox() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid) {
            galleryGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.knife-card');
                if (!card) return;
                const knifeId = parseInt(card.dataset.id, 10);
                const knife = this.galleryData.find(k => Number(k.id) === Number(knifeId));
                
                if (knife) {
                    this.openLightbox(knife);
                }
            });
        }
        
        // Close lightbox on background click
        document.addEventListener('click', (e) => {
            if (e.target.classList && e.target.classList.contains('lightbox-overlay')) {
                this.closeLightbox();
            }
        });
    }

    openLightbox(knife) {
        // Use available fields and provide fallbacks
        const title = knife.title || knife.name || 'Knife';
        const description = knife.description || '';
        const steel = knife.steel || 'Unknown';
        const handle = knife.handle || 'Unknown';
        const length = knife.length || 'N/A';
        const type = knife.type || 'Custom';
        const imageSrc = knife.image || '';

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
        lightbox.innerHTML = `
            <div class="lightbox-content bg-gray-900 rounded-lg max-w-4xl max-h-full overflow-auto m-4">
                <div class="relative">
                    <button class="lightbox-close absolute top-4 right-4 text-white text-2xl z-10 hover:text-orange-400">×</button>
                    <img src="${imageSrc}" alt="${title}" class="w-full h-auto">
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-white mb-2">${title}</h3>
                        <div class="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
                            <div><strong>Steel:</strong> ${steel}</div>
                            <div><strong>Handle:</strong> ${handle}</div>
                            <div><strong>Length:</strong> ${length}</div>
                            <div><strong>Type:</strong> ${type}</div>
                        </div>
                        <p class="text-gray-300">${description}</p>
                        <button class="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded transition-colors">
                            Commission Similar Knife
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Animate in
        if (typeof anime !== 'undefined') {
            anime({
                targets: lightbox,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            const content = lightbox.querySelector('.lightbox-content');
            if (content) {
                anime({
                    targets: content,
                    scale: [0.8, 1],
                    duration: 400,
                    easing: 'easeOutBack',
                    delay: 100
                });
            }
        }
        
        // Close button
        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeLightbox();
            });
        }
    }

    closeLightbox() {
        const lightbox = document.querySelector('.lightbox-overlay');
        if (lightbox) {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: lightbox,
                    opacity: [1, 0],
                    duration: 200,
                    easing: 'easeInQuad',
                    complete: () => {
                        lightbox.remove();
                    }
                });
            } else {
                lightbox.remove();
            }
        }
    }

    setupFormHandling() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
        
        // Character counter for custom request field
        const customRequest = document.getElementById('custom-request');
        const counter = document.getElementById('char-counter');
        
        if (customRequest && counter) {
            customRequest.addEventListener('input', (e) => {
                const length = e.target.value.length;
                counter.textContent = `${length}/500 characters`;
                
                if (length > 450) {
                    counter.classList.add('text-red-400');
                } else {
                    counter.classList.remove('text-red-400');
                }
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showFormSuccess();
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    showFormSuccess() {
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg z-50';
        successMsg.textContent = 'Message sent successfully! We\'ll be in touch soon.';
        
        document.body.appendChild(successMsg);
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: successMsg,
                translateX: [300, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutBack'
            });
            
            setTimeout(() => {
                anime({
                    targets: successMsg,
                    translateX: [0, 300],
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInBack',
                    complete: () => {
                        successMsg.remove();
                    }
                });
            }, 4000);
        } else {
            setTimeout(() => {
                successMsg.remove();
            }, 4000);
        }
    }

    setupNavigation() {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                if (typeof anime !== 'undefined') {
                    if (!mobileMenu.classList.contains('hidden')) {
                        anime({
                            targets: mobileMenu,
                            opacity: [0, 1],
                            translateY: [-20, 0],
                            duration: 300,
                            easing: 'easeOutQuad'
                        });
                    }
                }
            });
        }
    }

    setupScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        // store observer on instance so it can be reused if needed
        if (!this._observer) {
            this._observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Trigger specific animations based on element type
                        if (entry.target.classList.contains('process-step')) {
                            this.animateProcessStep(entry.target);
                        } else if (entry.target.classList.contains('knife-card')) {
                            this.animateKnifeCard(entry.target);
                        }
                    }
                });
            }, observerOptions);
        }

        // Observe elements
        const animateElements = document.querySelectorAll('.process-step, .knife-card, .fade-in-up');
        animateElements.forEach(el => this._observer.observe(el));
    }

    animateProcessStep(element) {
        if (typeof anime !== 'undefined') {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: 'easeOutExpo'
            });
        }
    }

    animateKnifeCard(element) {
        if (typeof anime !== 'undefined') {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutExpo'
            });
        }
    }

    setupParticles() {
        // Initialize p5.js particle system for forge effects
        if (typeof p5 !== 'undefined') {
            this.initParticleSystem();
        }
    }

    loadGalleryData() {
        // Try to load photos from admin interface
        const storedPhotos = localStorage.getItem('knifePhotos');
        
        if (storedPhotos) {
            try {
                this.galleryData = JSON.parse(storedPhotos);
                console.log(`Loaded ${this.galleryData.length} photos from admin interface`);
            } catch (error) {
                console.error('Error loading stored photos:', error);
                this.galleryData = this.getDefaultGalleryData();
            }
        } else {
            this.galleryData = this.getDefaultGalleryData();
        }

        // keep legacy property in sync
        this.knifeData = this.galleryData;
    }
    
    getDefaultGalleryData() {
        return [
            {
                id: 1,
                title: "Kodiak Skinner",
                description: "1095 High Carbon Steel • Black Ebony Handle • Copper Liners",
                image: "rescources/1000010689.jpg",
                type: "Hunting"
            },
            {
                id: 2,
                title: "Grizzly Design",
                description: "Hand-forged Damascus • Black Ebony Handle • Turqoise accents",
                image: "rescources/1000011909.jpg",
                type: "Custom"
            },
            {
                id: 3,
                title: "Grizzly Cu-Mai",
                description: "1084 Carbon Steel • Black Walnut Handle • 9 inches",
                image: "https://kimi-web-img.moonshot.cn/img/cdn.shopify.com/d1320db6dc02e4f545adb9eec3b1525ed13dffb3.webp",
                type: "hunting"
            },
            {
                id: 4,
                title: "Mountain Survival Blade",
                description: "1095 Steel • Thuya Burl Handle • Copper Liners",
                image: "https://kimi-web-img.moonshot.cn/img/aaknives.eu/66fc661c0de58dd9ab3c9b3e1516f2498f644e04.jpg",
                type: "Custom"
            },
            {
                id: 5,
                title: "Kitchen Master Santoku",
                description: "Hand-forged Damascus • Rosewood Handle • 7 inches",
                image: "https://kimi-web-img.moonshot.cn/img/aaknives.eu/02718d6afdc93f82e78982cc0ededaab7d39f8d1.jpg",
                type: "kitchen"
            },
            {
                id: 6,
                title: "The Trailblazer",
                description: "1095 Carbon Steel • Stag Horn Handle • 8 inches",
                image: "https://kimi-web-img.moonshot.cn/img/tek-speed.com/bb65fca5db971fed21dfe760fc776942763a4a5e.jpg",
                type: "outdoor"
            }
        ];
    }

    // Render gallery into DOM
    renderGallery() {
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.galleryData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-item knife-card fade-in-up';
            card.dataset.id = item.id;
            card.dataset.type = item.type || 'all';

            card.innerHTML = `
                <img src="${item.image}" alt="${(item.title || item.name) }" />
                <div class="p-4">
                    <h3 class="text-lg font-bold text-white mb-1">${item.title || item.name}</h3>
                    <p class="text-sm text-gray-300">${item.description || ''}</p>
                </div>
            `;

            grid.appendChild(card);
        });

        // Re-run animations for new elements
        this.animatePortfolioGrid();

        // Re-observe scroll animations for newly added elements
        if (this._observer) {
            const newElements = document.querySelectorAll('.knife-card, .fade-in-up');
            newElements.forEach(el => this._observer.observe(el));
        }
    }

    initParticleSystem() {
        // Simple particle system for forge sparks
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            new p5((p) => {
                let particles = [];
                
                p.setup = () => {
                    p.createCanvas(window.innerWidth, window.innerHeight);
                    
                    // Create initial particles
                    for (let i = 0; i < 50; i++) {
                        particles.push(new Particle(p));
                    }
                };
                
                p.draw = () => {
                    p.clear();
                    
                    // Update and draw particles
                    particles.forEach(particle => {
                        particle.update();
                        particle.draw();
                    });
                    
                    // Remove dead particles and add new ones
                    particles = particles.filter(p => p.isAlive());
                    while (particles.length < 50) {
                        particles.push(new Particle(p));
                    }
                };
                
                p.windowResized = () => {
                    p.resizeCanvas(window.innerWidth, window.innerHeight);
                };
            }, canvas);
        }
    }
}

// Particle class for forge effects
class Particle {
    constructor(p5) {
        this.p5 = p5;
        this.reset();
    }
    
    reset() {
        this.x = this.p5.random(this.p5.width);
        this.y = this.p5.height + 10;
        this.vx = this.p5.random(-1, 1);
        this.vy = this.p5.random(-3, -1);
        this.life = 255;
        this.decay = this.p5.random(1, 3);
        this.size = this.p5.random(2, 6);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        
        // Add some upward drift
        this.vy += 0.05;
    }
    
    draw() {
        this.p5.push();
        this.p5.noStroke();
        
        // Orange to red gradient
        const alpha = this.p5.map(this.life, 0, 255, 0, 100);
        this.p5.fill(217, 107, 43, alpha);
        
        this.p5.ellipse(this.x, this.y, this.size);
        this.p5.pop();
    }
    
    isAlive() {
        return this.life > 0;
    }
}

// Initialize the application
const gentleBearKnifeworks = new GentleBearKnifeworks();
