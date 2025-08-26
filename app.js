// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Add smooth transition class
        document.body.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const fullText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.currentText = fullText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        this.element.textContent = this.currentText;

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === fullText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before starting new text
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scrolling Navigation
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.updateActiveLink();
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.navMenu.classList.remove('active');
                    this.mobileToggle.classList.remove('active');
                }
            });
        });
    }

    setupMobileMenu() {
        this.mobileToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.mobileToggle.classList.remove('active');
            }
        });
    }

    setupScrollEffects() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for navbar styling
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
            this.updateActiveLink();
        });
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Image Loading Handler
class ImageHandler {
    constructor() {
        this.init();
    }

    init() {
        this.handleSkillLogos();
        this.handleProfileImage();
        this.handleEducationLogo();
        this.handleExperienceLogo();
    }

    handleSkillLogos() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const img = card.querySelector('.skill-logo img');
            const fallbackIcon = card.querySelector('.skill-icon');
            
            if (img && fallbackIcon) {
                img.addEventListener('error', () => {
                    img.style.display = 'none';
                    fallbackIcon.style.display = 'block';
                });
                
                img.addEventListener('load', () => {
                    img.style.display = 'block';
                    fallbackIcon.style.display = 'none';
                });
            }
        });
    }

    handleProfileImage() {
        const profileImg = document.querySelector('.profile-photo');
        const placeholder = document.querySelector('.profile-placeholder');
        
        if (profileImg && placeholder) {
            profileImg.addEventListener('error', () => {
                profileImg.style.display = 'none';
                placeholder.style.display = 'flex';
            });
            
            profileImg.addEventListener('load', () => {
                profileImg.style.display = 'block';
                placeholder.style.display = 'none';
            });
        }
    }

    handleEducationLogo() {
        const educationImg = document.querySelector('.university-logo');
        const placeholder = document.querySelector('.education-logo .logo-placeholder');
        
        if (educationImg && placeholder) {
            educationImg.addEventListener('error', () => {
                educationImg.style.display = 'none';
                placeholder.style.display = 'flex';
            });
            
            educationImg.addEventListener('load', () => {
                educationImg.style.display = 'block';
                placeholder.style.display = 'none';
            });
        }
    }

    handleExperienceLogo() {
        const experienceImg = document.querySelector('.company-logo');
        const placeholder = document.querySelector('.experience-logo .logo-placeholder');
        
        if (experienceImg && placeholder) {
            experienceImg.addEventListener('error', () => {
                experienceImg.style.display = 'none';
                placeholder.style.display = 'flex';
            });
            
            experienceImg.addEventListener('load', () => {
                experienceImg.style.display = 'block';
                placeholder.style.display = 'none';
            });
        }
    }
}

// Scroll Animations using Intersection Observer
class ScrollAnimations {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupFadeInAnimations();
        this.setupSkillsAnimations();
        this.setupProgressBars();
        this.setupEducationAnimation();
        this.setupExperienceAnimation();
    }

    setupFadeInAnimations() {
        const animatedElements = document.querySelectorAll('.skill-category, .project-card, .achievement-card');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }

    setupEducationAnimation() {
        const educationCard = document.querySelector('.education-card');
        
        if (educationCard) {
            const educationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        educationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3
            });

            educationObserver.observe(educationCard);
        }
    }

    setupExperienceAnimation() {
        const experienceCard = document.querySelector('.experience-card');
        
        if (experienceCard) {
            const experienceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        experienceObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3
            });

            experienceObserver.observe(experienceCard);
        }
    }

    setupSkillsAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    this.animateProgressBar(entry.target);
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        skillCards.forEach(card => {
            skillsObserver.observe(card);
        });
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.setProperty('--progress-width', `${progress}%`);
        });
    }

    animateProgressBar(skillCard) {
        const progressBar = skillCard.querySelector('.progress-bar');
        if (progressBar) {
            const progress = progressBar.getAttribute('data-progress');
            
            setTimeout(() => {
                progressBar.style.width = `${progress}%`;
            }, 200);
        }
    }
}

// Floating Elements Animation
class FloatingElements {
    constructor() {
        this.elements = document.querySelectorAll('.floating-element');
        this.init();
    }

    init() {
        this.elements.forEach((element, index) => {
            this.animateElement(element, index);
        });
    }

    animateElement(element, index) {
        const baseDelay = index * 1000;
        const randomDelay = Math.random() * 2000;
        const totalDelay = baseDelay + randomDelay;

        element.style.animationDelay = `${totalDelay}ms`;
        
        // Add random horizontal movement
        setInterval(() => {
            const currentLeft = parseFloat(getComputedStyle(element).left) || 0;
            const randomMovement = (Math.random() - 0.5) * 20;
            element.style.transform = `translateX(${randomMovement}px)`;
        }, 3000 + index * 500);
    }
}

// Particle System for Background
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = 30; // Reduced for better performance
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.handleResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.05';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        this.ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Send using EmailJS
        emailjs.sendForm(
            "Sachin311912",   // replace with your EmailJS Service ID
            "template_95syeru",  // replace with your EmailJS Template ID
            this.form,
            "zSVa5d1HwjhULiEcm"    // replace with your EmailJS Public Key
        )
        .then(() => {
            this.showNotification("✅ Message sent successfully! I'll get back to you soon.", "success");
            this.form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, (error) => {
            this.showNotification("❌ Failed to send message: " + error.text, "error");
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = type === 'success' ? '#10b981' : '#ef4444';
        notification.style.color = 'white';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '10px';
        notification.style.zIndex = '10000';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'transform 0.3s ease';
        notification.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the form
new ContactForm();

// Project Interactions
class ProjectInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectHovers();
        this.setupGitHubLinkTracking();
        this.setupProjectFiltering();
    }

    setupProjectHovers() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add subtle animation on hover
                const icon = card.querySelector('.project-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.project-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    setupGitHubLinkTracking() {
        const githubLinks = document.querySelectorAll('.project-link');
        
        githubLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const projectTitle = link.closest('.project-card').querySelector('.project-title').textContent;
                console.log(`GitHub link clicked for: ${projectTitle}`);
                
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    setupProjectFiltering() {
        // Add category-based filtering if needed in the future
        const categories = ['game', 'web', 'enterprise', 'frontend', 'oop', 'algorithms', 'data-structures'];
        console.log('Available project categories:', categories);
    }
}

// Skills Enhancement
class SkillsEnhancement {
    constructor() {
        this.init();
    }

    init() {
        this.setupSkillHovers();
        this.setupProgressAnimations();
    }

    setupSkillHovers() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const skillName = card.querySelector('h4').textContent;
            const skillLevel = card.querySelector('.skill-level').textContent;
            
            card.addEventListener('mouseenter', () => {
                // Create tooltip effect
                this.showSkillTooltip(card, `${skillName}: ${skillLevel} proficiency`);
            });

            card.addEventListener('mouseleave', () => {
                this.hideSkillTooltip(card);
            });
        });
    }

    showSkillTooltip(element, text) {
        let tooltip = element.querySelector('.skill-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.top = '-40px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '1000';
            
            element.style.position = 'relative';
            element.appendChild(tooltip);
        }
        
        tooltip.textContent = text;
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 100);
    }

    hideSkillTooltip(element) {
        const tooltip = element.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (element.contains(tooltip)) {
                    element.removeChild(tooltip);
                }
            }, 300);
        }
    }

    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            bar.addEventListener('animationend', () => {
                // Add a glow effect when animation completes
                bar.style.boxShadow = '0 0 10px rgba(236, 72, 153, 0.5)';
                setTimeout(() => {
                    bar.style.boxShadow = 'none';
                }, 1000);
            });
        });
    }
}

// Performance Optimizer
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.debounceScrollEvents();
        this.preloadCriticalImages();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalImages() {
        const criticalImages = [
            './assets/portfolio.png',
            './assets/cmr-university.jpeg',
            './assets/images/logo/winman.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    debounceScrollEvents() {
        let scrollTimeout;
        let lastScrollTop = 0;
        
        const scrollHandler = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only update if scroll difference is significant
            if (Math.abs(scrollTop - lastScrollTop) > 5) {
                lastScrollTop = scrollTop;
                
                // Trigger scroll-dependent functions
                this.updateNavbarState(scrollTop);
            }
        };

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(scrollHandler, 16); // ~60fps
        }, { passive: true });
    }

    updateNavbarState(scrollTop) {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
}

// Easter Eggs
class EasterEggs {
    constructor() {
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.userInput = [];
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.setupClickEasterEgg();
        this.setupSecretMessages();
    }

    handleKeyPress(e) {
        this.userInput.push(e.keyCode);
        
        if (this.userInput.length > this.konamiCode.length) {
            this.userInput.shift();
        }
        
        if (this.arraysEqual(this.userInput, this.konamiCode)) {
            this.activateRainbowMode();
        }
    }

    setupClickEasterEgg() {
        const logoText = document.querySelector('.logo-text');
        let clickCount = 0;
        
        logoText?.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 7) {
                this.activatePartyMode();
                clickCount = 0;
            }
        });
    }

    setupSecretMessages() {
        // Console message for curious developers
        console.log(`
    🚀 Welcome to Sachin's Portfolio!
    
    ⭐ Easter Eggs Available:
    - Try the Konami Code: ↑↑↓↓←→←→BA
    - Click my name 7 times for a surprise
    - Check the network tab for hidden messages
    
    💻 Tech Stack Used:
    - Vanilla JavaScript (no frameworks!)
    - CSS Grid & Flexbox
    - Intersection Observer API
    - Canvas API for particles
    
    📫 Contact: sachinkundapura31@gmail.com
        `);
    }

    activateRainbowMode() {
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            const existingStyle = document.getElementById('rainbow-style');
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        }, 6000);
        
        console.log('🌈 Rainbow mode activated! Konami code detected!');
    }

    activatePartyMode() {
        const emojis = ['🎉', '🎊', '🎈', '🎆', '✨', '🌟', '⭐', '💫', '🚀', '💻'];
        
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                this.createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
            }, i * 100);
        }
        
        console.log('🎉 Party mode activated! Thanks for exploring!');
    }

    createFloatingEmoji(emoji) {
        const element = document.createElement('div');
        element.textContent = emoji;
        element.style.position = 'fixed';
        element.style.fontSize = '2rem';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '10000';
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = window.innerHeight + 'px';
        element.style.animation = 'floatUp 4s linear forwards';
        
        const styleId = 'floating-emoji-style';
        let style = document.getElementById(styleId);
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes floatUp {
                    to {
                        transform: translateY(-${window.innerHeight + 200}px) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            if (document.body.contains(element)) {
                document.body.removeChild(element);
            }
        }, 4000);
    }

    arraysEqual(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx]);
    }
}

// App Initialization
class PortfolioApp {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Core functionality
            this.components.themeManager = new ThemeManager();
            this.components.navigation = new Navigation();
            this.components.imageHandler = new ImageHandler();
            this.components.scrollAnimations = new ScrollAnimations();
            
            // Enhanced features
            this.components.typingAnimation = new TypingAnimation(
                document.getElementById('typed-text'),
                ['Hi, I\'m Sachin', 'Full Stack Developer', 'Java Enthusiast', 'Problem Solver', 'React.js Developer']
            );
            
            this.components.floatingElements = new FloatingElements();
            this.components.particleSystem = new ParticleSystem();
            this.components.contactForm = new ContactForm();
            this.components.projectInteractions = new ProjectInteractions();
            this.components.skillsEnhancement = new SkillsEnhancement();
            
            // Performance and extras
            this.components.performanceOptimizer = new PerformanceOptimizer();
            this.components.easterEggs = new EasterEggs();
            
            // Additional setup
            this.setupButtonAnimations();
            this.setupSocialLinks();
            this.displayWelcomeMessage();
            
            console.log('✅ Portfolio app initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing portfolio app:', error);
        }
    }

    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn--primary, .btn--secondary, .download-btn, .submit-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                
                const rippleStyle = document.createElement('style');
                rippleStyle.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(rippleStyle);
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    if (button.contains(ripple)) {
                        button.removeChild(ripple);
                    }
                    if (document.head.contains(rippleStyle)) {
                        document.head.removeChild(rippleStyle);
                    }
                }, 600);
            });
        });
    }

    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        const tooltips = {
            'github': 'View my GitHub repositories',
            'linkedin': 'Connect on LinkedIn',
            'code': 'Check my LeetCode profile',
            'envelope': 'Send me an email'
        };
        
        socialLinks.forEach(link => {
            const iconClass = link.querySelector('i').className;
            let tooltipText = 'Social Profile';
            
            Object.keys(tooltips).forEach(key => {
                if (iconClass.includes(key)) {
                    tooltipText = tooltips[key];
                }
            });
            
            link.setAttribute('title', tooltipText);
            
            // Add click tracking
            link.addEventListener('click', () => {
                console.log(`Social link clicked: ${tooltipText}`);
            });
        });
    }

    displayWelcomeMessage() {
        // Show a subtle welcome notification
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(45deg, #ec4899, #3b82f6);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                font-size: 0.9rem;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.5s ease;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                max-width: 300px;
            `;
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span>👋</span>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 0.2rem;">Welcome to my portfolio!</div>
                        <div style="font-size: 0.8rem; opacity: 0.9;">Explore my projects and skills</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }, 5000);
        }, 2000);
    }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Export for potential external use
window.PortfolioApp = PortfolioApp;

