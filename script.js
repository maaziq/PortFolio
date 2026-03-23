/* ===========================
   TYPING ANIMATION
=========================== */
const typedRoles = [
    'Java Full-Stack Developer',
    'Spring Boot Enthusiast',
    'React Developer',
    'Problem Solver',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
    const currentRole = typedRoles[roleIndex];

    if (isDeleting) {
        typedEl.textContent = currentRole.slice(0, --charIndex);
    } else {
        typedEl.textContent = currentRole.slice(0, ++charIndex);
    }

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % typedRoles.length;
        delay = 400;
    }

    setTimeout(typeLoop, delay);
}

typeLoop();

/* ===========================
   SCROLL — NAV STYLE
=========================== */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* ===========================
   MOBILE MENU
=========================== */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealTargets = [
    ...document.querySelectorAll('.about-grid'),
    ...document.querySelectorAll('.skills-grid'),
    ...document.querySelectorAll('.skill-category'),
    ...document.querySelectorAll('.projects-grid'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.contact-grid'),
    ...document.querySelectorAll('.about-stats'),
];

revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
            }
        });
    },
    { threshold: 0.1 }
);

revealTargets.forEach(el => observer.observe(el));

/* ===========================
   ACTIVE NAV LINK (scroll spy)
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}`
                        ? 'var(--text)'
                        : '';
                });
            }
        });
    },
    { threshold: 0.5 }
);

sections.forEach(s => spyObserver.observe(s));

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        formSuccess.classList.add('visible');
        setTimeout(() => formSuccess.classList.remove('visible'), 4000);
    }, 1200);
});

/* ===========================
   SMOOTH ANCHOR SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
