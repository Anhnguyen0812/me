/* ==========================================
   NGUYEN PHI ANH - DEVELOPER PORTFOLIO
   JavaScript - Interactions & Animations
   ========================================== */

// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = menuBtn.querySelector('.material-symbols-outlined');
        if (mobileNav.classList.contains('active')) {
            icon.textContent = 'close';
        } else {
            icon.textContent = 'menu';
        }
    });
}

function closeMobileNav() {
    if (mobileNav) {
        mobileNav.classList.remove('active');
        const icon = menuBtn.querySelector('.material-symbols-outlined');
        icon.textContent = 'menu';
    }
}

// ===== Scroll Animations (IntersectionObserver) =====
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation delay for grid items
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach((el, index) => {
    // Auto-assign stagger delay for project cards
    el.dataset.delay = index * 100;
    observer.observe(el);
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = `0 ${currentScroll > lastScroll ? '4px' : '8px'} 0px 0px rgba(0,0,0,1)`;
    } else {
        header.style.boxShadow = `0 8px 0px 0px rgba(0,0,0,1)`;
    }
    
    lastScroll = currentScroll;
});

// ===== Active Bottom Nav Link =====
const sections = document.querySelectorAll('section[id]');
const bottomNavLinks = document.querySelectorAll('.bottom-nav__link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    bottomNavLinks.forEach(link => {
        link.classList.remove('bottom-nav__link--active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('bottom-nav__link--active');
        }
    });
});

// ===== Smooth Keycap Sound Effect (Visual Feedback) =====
const keycaps = document.querySelectorAll('.keycap');

keycaps.forEach(keycap => {
    keycap.addEventListener('mousedown', () => {
        keycap.style.transition = 'none';
        const top = keycap.querySelector('.keycap__top');
        if (top) top.style.transform = 'translateY(12px)';
    });
    
    keycap.addEventListener('mouseup', () => {
        const top = keycap.querySelector('.keycap__top');
        if (top) {
            top.style.transition = 'transform 100ms ease';
            top.style.transform = 'translateY(0)';
        }
    });
    
    keycap.addEventListener('mouseleave', () => {
        const top = keycap.querySelector('.keycap__top');
        if (top) {
            top.style.transition = 'transform 100ms ease';
            top.style.transform = 'translateY(0)';
        }
    });
});

// ===== Typing Effect for Terminal =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect when terminal comes into view
const terminalOutput = document.querySelector('.terminal-output pre');
if (terminalOutput) {
    const terminalText = terminalOutput.textContent;
    
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(terminalOutput, terminalText, 20);
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    terminalObserver.observe(terminalOutput.closest('.contact-terminal'));
}

console.log('%c⌨️ NPA:~$ Portfolio loaded successfully!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
