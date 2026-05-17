/* =============================================
   MUHAMMAD ALI — PORTFOLIO  |  script.js
   Interactive Features & Animations
   Built with vanilla JavaScript
   ============================================= */

// ========== LOADER ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderFill = document.querySelector('.loader-fill');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.classList.add('out');
                document.body.style.overflow = 'auto';
            }, 400);
        }
        
        loaderPercent.textContent = Math.floor(progress) + '%';
        loaderFill.style.width = progress + '%';
    }, 80);
});

// ========== PARTICLE CANVAS ==========
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

const particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.15;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ========== CUSTOM CURSOR ==========
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Cursor hover effects
const hoverElements = document.querySelectorAll('.h');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// ========== NAVIGATION ==========
const nav = document.getElementById('nav');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Sticky nav on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========== REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll('.rv');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('on');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ========== HERO ANIMATIONS ==========
setTimeout(() => {
    document.querySelectorAll('.title-line').forEach((line, i) => {
        setTimeout(() => {
            line.style.transform = 'translateY(0)';
            line.style.opacity = '1';
        }, i * 150);
    });
}, 1500);

// ========== TERMINAL TYPING EFFECT ==========
const terminalLine = document.querySelector('.terminal-line');
if (terminalLine) {
    const text = terminalLine.textContent;
    terminalLine.textContent = '';
    
    let i = 0;
    const typeSpeed = 50;
    
    function typeWriter() {
        if (i < text.length) {
            terminalLine.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Add blinking cursor after typing
            terminalLine.innerHTML += '<span class="cursor-blink">_</span>';
        }
    }
    
    // Start typing when terminal becomes visible
    const terminalBlock = document.querySelector('.terminal-block');
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (terminalBlock) {
        terminalObserver.observe(terminalBlock);
    }
}

// ========== STATS ANIMATION ==========
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('on');
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const suffix = stat.dataset.suffix || '';
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 16);
    });
}

// ========== TILT EFFECT FOR PROJECT CARDS ==========
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 40;
        const rotateY = (centerX - x) / 40;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// ========== FLOATING GLYPHS ANIMATION ==========
const glyphs = document.querySelectorAll('.hero-glyph');

glyphs.forEach(glyph => {
    // Random floating animation
    const duration = 3 + Math.random() * 2;
    const delay = Math.random() * 2;
    
    glyph.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
});

// Add keyframe for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    .cursor-blink {
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========== MARQUEE SCROLL ==========
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    
    function animateMarquee() {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= marqueeTrack.scrollWidth / 2) {
            scrollAmount = 0;
        }
        marqueeTrack.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(animateMarquee);
    }
    
    animateMarquee();
}

// ========== CONSOLE EASTER EGG ==========
console.log('%c👨‍💻 Muhammad Ali - Portfolio', 'font-size: 20px; font-weight: bold; color: #3ddc84;');
console.log('%c🚀 MERN Stack Developer', 'font-size: 14px; color: #888;');
console.log('%cBuilt with HTML, CSS & Vanilla JavaScript', 'font-size: 12px; color: #555;');
console.log('%cInterested in the code? Check out the source!', 'font-size: 12px; color: #888;');

// ========== PERFORMANCE OPTIMIZATION ==========
// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        canvas.style.opacity = '0';
    } else {
        canvas.style.opacity = '0.55';
    }
});

// ========== INIT MESSAGE ==========
console.log('%c✅ Portfolio Initialized Successfully', 'font-size: 12px; color: #3ddc84; font-weight: bold;');