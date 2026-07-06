// Smooth scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animate bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            barObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe probability section
document.addEventListener('DOMContentLoaded', () => {
    const probSection = document.querySelector('.probabilities');
    if (probSection) {
        barObserver.observe(probSection);
    }
    
    // Add hover effects
    const cards = document.querySelectorAll('.team-card, .stat-card, .feature, .group-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const football = document.querySelector('.football-deco');
    
    if (hero && football) {
        football.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const target = parseInt(num.textContent);
                if (!isNaN(target)) {
                    animateCounter(num, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        statsObserver.observe(statsBar);
    }
});