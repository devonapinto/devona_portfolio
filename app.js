// Portfolio JavaScript Functionality for Devona Thelma Pinto
// CUSTOMIZE: You can modify animations, timings, and effects throughout this file

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTypingAnimation();
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillBars();
    initNavbarScroll();
    initIntersectionObserver();
});

// CUSTOMIZE: Typing Animation for Hero Section - Change the name here
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    // CUSTOMIZE: Change this text to your full name
    const text = 'DEVONA THELMA PINTO';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            // CUSTOMIZE: Change typing speed (lower = faster, higher = slower)
            setTimeout(typeText, 150);
        }
    }
    
    // CUSTOMIZE: Change initial delay before typing starts
    setTimeout(typeText, 500);
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // CUSTOMIZE: Adjust offset for fixed navbar height
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Section Function (used by CTA button)
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        // CUSTOMIZE: Adjust offset for fixed navbar height
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        // CUSTOMIZE: Change scroll threshold for navbar effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Intersection Observer for Navigation Active States
function initIntersectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        // CUSTOMIZE: Adjust margins to fine-tune when sections become active
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        root: null,
        // CUSTOMIZE: Adjust when animations trigger
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                    animateElement(element, animationType);
                }, delay);
                
                // Only animate once
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Animate Element Function
function animateElement(element, animationType) {
    switch (animationType) {
        case 'fade-up':
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            // CUSTOMIZE: Change animation duration and easing
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
            break;
            
        case 'fade-right':
            element.style.opacity = '0';
            element.style.transform = 'translateX(-30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            });
            break;
            
        case 'fade-left':
            element.style.opacity = '0';
            element.style.transform = 'translateX(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            });
            break;
    }
}

// Enhanced Skill Bar Animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserverOptions = {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.1
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                // Add animate class for shimmer effect
                skillBar.classList.add('animate');
                
                // CUSTOMIZE: Adjust delay for skill bar animation
                setTimeout(() => {
                    skillBar.style.width = targetWidth;
                }, 300);
                
                // Add completion effect
                setTimeout(() => {
                    skillBar.style.boxShadow = '0 2px 10px rgba(49, 130, 206, 0.3)';
                }, 2500);
                
                // Only animate once
                skillObserver.unobserve(skillBar);
            }
        });
    }, skillObserverOptions);
    
    skillBars.forEach((bar, index) => {
        // Add staggered animation delay
        bar.style.animationDelay = `${index * 0.1}s`;
        skillObserver.observe(bar);
    });
}

// Add loading animation to page elements
function addLoadingAnimations() {
    const elements = document.querySelectorAll('.hero-content, .profile-image');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // CUSTOMIZE: Adjust loading animation timing
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Initialize loading animations
document.addEventListener('DOMContentLoaded', addLoadingAnimations);

// Smooth scroll for browsers that don't support CSS scroll-behavior
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Fallback for older browsers
        console.log('Adding smooth scroll polyfill for older browsers');
    }
}

// Initialize smooth scroll polyfill
smoothScrollPolyfill();

// Add scroll progress indicator
function addScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3182ce, #f6ad55);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add particle effect to hero section
function addParticleEffect() {
    const hero = document.querySelector('.hero');
    // CUSTOMIZE: Change particle count for performance/visual preference
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(49, 130, 206, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
            50% { transform: translateY(-40px) translateX(-10px); opacity: 1; }
            75% { transform: translateY(-20px) translateX(5px); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
}

// CUSTOMIZE: Adjust particle effect initialization delay
setTimeout(addParticleEffect, 1000);

// Enhanced ripple effect for buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .btn, .social-link, .tech-skill');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.3);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 1;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            // CUSTOMIZE: Adjust ripple duration
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize ripple effect
addRippleEffect();

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll events for better performance
const throttledScrollHandler = throttle(function() {
    // Any additional scroll-based functionality can go here
}, 16); // 60fps

window.addEventListener('scroll', throttledScrollHandler);

// Enhanced project card interactions
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(49, 130, 206, 0.25)';
            
            // Animate tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.background = 'rgba(49, 130, 206, 0.2)';
                }, index * 50);
            });
            
            // Animate project icon
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 15px 30px rgba(49, 130, 206, 0.4)';
            }
            
            // Change title color
            const title = this.querySelector('.project-title');
            if (title) {
                title.style.color = '#3182ce';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            
            // Reset tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.background = 'rgba(49, 130, 206, 0.1)';
            });
            
            // Reset project icon
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '';
            }
            
            // Reset title color
            const title = this.querySelector('.project-title');
            if (title) {
                title.style.color = '';
            }
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-12px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
        });
    });
}

// Initialize project card enhancements
enhanceProjectCards();

// Add certificate carousel pause on hover
function enhanceCertificateCarousel() {
    const track = document.querySelector('.certificate-track');
    
    if (track) {
        track.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Add individual certificate card hover effects
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                this.style.boxShadow = '0 15px 30px rgba(246, 173, 85, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
}

// Initialize certificate carousel enhancements
enhanceCertificateCarousel();

// Add typing effect to specialty text
function addSpecialtyTyping() {
    const specialtyElement = document.querySelector('.hero-specialty');
    // CUSTOMIZE: Change your specialty text here
    const originalText = specialtyElement.textContent;
    
    // CUSTOMIZE: Adjust timing after name typing completes
    setTimeout(() => {
        specialtyElement.textContent = '';
        let index = 0;
        
        function typeSpecialty() {
            if (index < originalText.length) {
                specialtyElement.textContent += originalText.charAt(index);
                index++;
                // CUSTOMIZE: Adjust specialty typing speed
                setTimeout(typeSpecialty, 50);
            }
        }
        
        typeSpecialty();
    }, 3000); // Start after name typing is complete
}

// Initialize specialty typing
addSpecialtyTyping();

// Enhanced skill hover effects
function enhanceSkillInteractions() {
    const techSkills = document.querySelectorAll('.tech-skill');
    
    techSkills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(49, 130, 206, 0.4)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add progress bar hover effects
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const progress = this.querySelector('.skill-progress');
            if (progress) {
                progress.style.boxShadow = '0 2px 15px rgba(49, 130, 206, 0.5)';
                progress.style.filter = 'brightness(1.1)';
            }
        });
        
        bar.addEventListener('mouseleave', function() {
            const progress = this.querySelector('.skill-progress');
            if (progress) {
                progress.style.boxShadow = '0 2px 10px rgba(49, 130, 206, 0.3)';
                progress.style.filter = 'brightness(1)';
            }
        });
    });
}

// Initialize skill interactions
enhanceSkillInteractions();

// CUSTOMIZE: Easter egg - Konami code (optional fun feature)
function addKonamiCode() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 3000);
                konamiIndex = 0;
                
                // Show celebration message
                const celebration = document.createElement('div');
                // CUSTOMIZE: Change easter egg message
                celebration.innerHTML = '🎉 Easter Egg Activated! 🎉<br>Welcome to Devona\'s Portfolio!';
                celebration.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #3182ce, #f6ad55);
                    color: white;
                    padding: 20px 40px;
                    border-radius: 10px;
                    font-size: 18px;
                    font-weight: bold;
                    z-index: 10000;
                    animation: celebration 3s ease-out forwards;
                    text-align: center;
                `;
                document.body.appendChild(celebration);
                
                setTimeout(() => {
                    celebration.remove();
                }, 3000);
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Add celebration animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebration {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Konami code (optional fun feature)
addKonamiCode();

// CUSTOMIZE: Console log for developers (you can change or remove this)
console.log(`
🚀 Welcome to Devona Thelma Pinto's Portfolio!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built with love using:
• Vanilla JavaScript
• CSS3 Animations  
• Responsive Design
• Modern Web APIs
• Interactive Elements
• Smooth Animations

Portfolio Features:
• Typing animation for name
• Interactive project cards
• Skill bar animations
• Certificate carousel
• Mobile-responsive design
• Smooth scrolling navigation

CUSTOMIZATION NOTES:
• Update personal information in HTML
• Replace profile image (instructions in HTML comments)
• Add certificate images (instructions in HTML comments)
• Modify colors in CSS custom properties
• Adjust animation timings in this JS file

Feel free to explore the code!
Try the Konami Code: ↑↑↓↓←→←→BA

Contact: devonapinto@gmail.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Performance monitoring
function logPerformance() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            try {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
                }
                
                // Log successful initialization
                console.log('🎨 Animations initialized successfully');
                console.log('📱 Responsive design active');
                console.log('⭐ All interactive elements ready');
                console.log('🎯 Portfolio ready for Devona Thelma Pinto');
            } catch (error) {
                console.log('📊 Performance monitoring unavailable in this environment');
            }
        }, 0);
    });
}

// Initialize performance monitoring
logPerformance();

// CUSTOMIZE: Add custom event listeners or functionality here
// Example: Track button clicks, form submissions, etc.
function initCustomTracking() {
    // Track CTA button clicks
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            console.log('🎯 CTA button clicked - exploring work section');
        });
    }
    
    // Track social media link clicks
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('i').classList.contains('fa-linkedin-in') ? 'LinkedIn' : 'GitHub';
            console.log(`🔗 ${platform} profile link clicked`);
        });
    });
    
    // Track project link clicks
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🚀 Project demo link clicked');
        });
    });
}

// Initialize custom tracking
initCustomTracking();

// CUSTOMIZE: Add any additional JavaScript functionality below this line
// Examples:
// - Contact form validation
// - Dynamic content loading
// - Advanced animations
// - Third-party integrations
// - Analytics tracking

/*
CUSTOMIZATION GUIDE:
━━━━━━━━━━━━━━━━━━━━━

1. PERSONAL INFORMATION:
   - Update the typing text in initTypingAnimation()
   - Modify contact details in HTML
   - Update social media links in HTML

2. VISUAL CUSTOMIZATION:
   - Change colors in CSS custom properties (:root)
   - Modify animation durations throughout this file
   - Adjust particle count in addParticleEffect()

3. CONTENT UPDATES:
   - Update project information in HTML
   - Modify skill percentages in HTML data-width attributes
   - Add/remove certificates in HTML

4. IMAGES:
   - Replace avatar with profile picture (see HTML comments)
   - Add certificate images (see HTML comments)
   - Optimize images for web performance

5. PERFORMANCE:
   - Adjust throttling delay for scroll events
   - Modify particle count for performance
   - Add lazy loading for images if needed

For more customization options, check the HTML comments
and CSS custom properties throughout the codebase.
*/