// ============================================
// AI Lab 2026 - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Navigation Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Counter Animation
    // ============================================
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all stat values
    document.querySelectorAll('.stat-value[data-target], .stat-number[data-target]').forEach(el => {
        counterObserver.observe(el);
    });
    
    // ============================================
    // Scroll Reveal Animation
    // ============================================
    const revealElements = document.querySelectorAll(
        '.method-card, .blog-card, .stat-card'
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // ============================================
    // Newsletter Form Submission
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>처리 중...</span>';
            button.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success state
                button.innerHTML = '<i class="fas fa-check-circle"></i> <span>구독 완료!</span>';
                button.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)';
                
                // Show success message
                showNotification('성공적으로 구독되었습니다! 가이드를 이메일로 보내드렸습니다.', 'success');
                
                // Reset form
                setTimeout(() => {
                    newsletterForm.reset();
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
    
    // ============================================
    // Notification System
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px 30px;
            background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(0, 217, 255, 0.9)'};
            color: #0a0a0f;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // Parallax Effect for Hero Background
    // ============================================
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // ============================================
    // Card Tilt Effect (3D hover)
    // ============================================
    const cards = document.querySelectorAll('.method-card, .blog-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // ============================================
    // Dynamic Neon Lines
    // ============================================
    function createNeonLine() {
        const neonLines = document.querySelector('.neon-lines');
        if (!neonLines) return;
        
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, transparent, var(--neon-blue), transparent);
            opacity: 0.3;
            top: 0;
            left: ${Math.random() * 100}%;
            animation: lineVertical ${5 + Math.random() * 5}s linear infinite;
        `;
        
        neonLines.appendChild(line);
        
        setTimeout(() => {
            line.remove();
        }, 10000);
    }
    
    // Create neon lines periodically
    setInterval(createNeonLine, 3000);
    
    // Add vertical line animation
    const verticalLineStyle = document.createElement('style');
    verticalLineStyle.textContent = `
        @keyframes lineVertical {
            0% {
                transform: translateY(-100%);
            }
            100% {
                transform: translateY(100%);
            }
        }
    `;
    document.head.appendChild(verticalLineStyle);
    
    // ============================================
    // Active Navigation Link
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add active link style
    const activeLinkStyle = document.createElement('style');
    activeLinkStyle.textContent = `
        .nav-link.active {
            color: var(--neon-blue);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeLinkStyle);
    
    // ============================================
    // Loading State
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements sequentially
        const heroElements = document.querySelectorAll(
            '.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats'
        );
        
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // ============================================
    // Copy Email on Click (if needed)
    // ============================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                showNotification('이메일 주소가 복사되었습니다!', 'success');
            });
        });
    });
    
    // ============================================
    // Performance Optimization
    // ============================================
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ============================================
    // Keyboard Navigation
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // Ctrl/Cmd + K for search (future feature)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showNotification('검색 기능은 곧 제공될 예정입니다!', 'info');
        }
    });
    
    // ============================================
    // Track Scroll Depth (Analytics)
    // ============================================
    let scrollDepth = {
        25: false,
        50: false,
        75: false,
        100: false
    };
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        Object.keys(scrollDepth).forEach(depth => {
            if (scrollPercent >= parseInt(depth) && !scrollDepth[depth]) {
                scrollDepth[depth] = true;
                // Track with analytics (e.g., Google Analytics)
                console.log(`Scroll depth: ${depth}%`);
                // gtag('event', 'scroll_depth', { depth: depth });
            }
        });
    });
    
    // ============================================
    // Console Easter Egg
    // ============================================
    console.log('%c🚀 AI Lab 2026', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00d9ff 0%, #b537f2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%c24시간 자동 수익 시스템에 오신 것을 환영합니다!', 'font-size: 14px; color: #00d9ff;');
    console.log('%c개발자이신가요? 우리 팀과 함께하고 싶다면 연락주세요!', 'font-size: 12px; color: #b537f2;');
    
    // ============================================
    // Initialize
    // ============================================
    console.log('✅ AI Lab 2026 initialized successfully');
    
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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
    };
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
