// ===== CURRENT USER STATE =====
let currentUser = null;
let isNavigating = false;   // guard so rapid clicks don't stack preloaders

// ===== PRELOADER HELPERS =====
function showPreloader() {
    const el = document.getElementById('preloader');
    if (el) el.classList.remove('hidden');
    startProgressBar();
}

function hidePreloader() {
    const el = document.getElementById('preloader');
    if (el) el.classList.add('hidden');
    resetProgressBar();
}

function startProgressBar() {
    const bar = document.getElementById('preloaderBar');
    if (!bar) return;
    bar.style.width = '0%';
    let pct = 0;
    const id = setInterval(() => {
        pct += Math.random() * 18 + 8;   // random-speed fill
        if (pct >= 95) { bar.style.width = '95%'; clearInterval(id); return; }
        bar.style.width = pct + '%';
    }, 80);
    bar._intervalId = id;
}

function resetProgressBar() {
    const bar = document.getElementById('preloaderBar');
    if (!bar) return;
    if (bar._intervalId) clearInterval(bar._intervalId);
    bar.style.width = '100%';
    setTimeout(() => { bar.style.width = '0%'; }, 500);
}

function spawnParticles() {
    const container = document.getElementById('preloaderParticles');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#FF6B35', '#00D4FF', '#FF9500', '#fff'];
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const left = Math.random() * 100;
        const dur  = (2.5 + Math.random() * 2.5).toFixed(2);
        const delay= (Math.random() * 2).toFixed(2);
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `left:${left}%;bottom:0;--dur:${dur}s;--delay:${delay}s;background:${color};width:${2+Math.random()*3}px;height:${2+Math.random()*3}px;`;
        container.appendChild(p);
    }
}

// ===== AUTHENTICATION TABS =====
function switchAuthTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const tab = document.getElementById(tabName);
    if (tab) tab.classList.add('active');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (tabName === 'signin-tab' && btn.textContent.trim() === 'Sign In') btn.classList.add('active');
        if (tabName === 'signup-tab' && btn.textContent.trim() === 'Create Account') btn.classList.add('active');
    });
}

// ===== OPEN REGISTER =====
function openRegister() {
    navigateTo('signin', () => switchAuthTab('signup-tab'));
}

// ===== CORE PAGE NAVIGATION WITH PRELOADER =====
// PRELOADER_DURATION controls how long the preloader stays visible (ms)
const PRELOADER_DURATION = 1400;

function navigateTo(pageName, afterCallback) {
    if (isNavigating) return;
    isNavigating = true;

    // Close mobile menu immediately
    const navMenu   = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu)   navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');

    // Show preloader
    spawnParticles();
    showPreloader();

    setTimeout(() => {
        // Switch page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(pageName);
        if (target) target.classList.add('active');
        updateActiveNavLink(pageName);
        window.scrollTo(0, 0);

        // Hide preloader
        hidePreloader();
        isNavigating = false;

        if (typeof afterCallback === 'function') afterCallback();
    }, PRELOADER_DURATION);
}

function showPage(pageName) {
    // Register is an alias — open signin with signup tab
    if (pageName === 'register') { openRegister(); return; }
    navigateTo(pageName);
}

function updateActiveNavLink(pageName) {
    document.querySelectorAll('.nav-link').forEach(link => link.style.color = '');
    const active = document.querySelector(`[onclick="showPage('${pageName}')"]`);
    if (active) active.style.color = '#FF6B35';
}

// ===== MAP FUNCTIONS =====
function openAddressMap() {
    window.open('https://www.google.com/maps/search/123+Gaming+Street,+Los+Angeles,+CA+90210', '_blank');
    showNotification('Opening map in a new tab...', 'info');
}
function openMap() { openAddressMap(); }

// ===== USER AUTH STATE =====
function loginUser(displayName) {
    currentUser = { name: displayName };
    localStorage.setItem('stackly_user', JSON.stringify(currentUser));
    updateNavForUser();
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('stackly_user');
    updateNavForUser();
    showPage('home');
    showNotification('You have been signed out.', 'info');
}

function updateNavForUser() {
    const signinItem    = document.getElementById('nav-signin-item');
    const registerItem  = document.getElementById('nav-register-item');
    const userItem      = document.getElementById('nav-user-item');
    const usernameLabel = document.getElementById('nav-username-label');

    if (currentUser) {
        if (signinItem)    signinItem.style.display    = 'none';
        if (registerItem)  registerItem.style.display  = 'none';
        if (userItem)      userItem.style.display      = 'flex';
        if (usernameLabel) usernameLabel.textContent   = '👤 ' + currentUser.name;
    } else {
        if (signinItem)    signinItem.style.display    = '';
        if (registerItem)  registerItem.style.display  = '';
        if (userItem)      userItem.style.display      = 'none';
    }
}

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Restore session
    try {
        const saved = localStorage.getItem('stackly_user');
        if (saved) currentUser = JSON.parse(saved);
    } catch (e) { currentUser = null; }
    updateNavForUser();

    // Show initial preloader then land on home
    spawnParticles();
    showPreloader();
    handleFormSubmissions();
    addScrollEffects();

    setTimeout(() => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const home = document.getElementById('home');
        if (home) home.classList.add('active');
        hidePreloader();
    }, PRELOADER_DURATION);
});

// ===== FORM HANDLING =====
function handleFormSubmissions() {
    // Sign In
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value.trim();
            const displayName = email.includes('@') ? email.split('@')[0] : email;
            loginUser(displayName);
            showNotification(`Welcome back, ${displayName}! 🎮`, 'success');
            setTimeout(() => showPage('home'), 1200);
            signinForm.reset();
        });
    }

    // Create Account
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fname    = document.getElementById('register-fname').value.trim();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value;
            const confirm  = document.getElementById('register-confirm').value;
            const terms    = registerForm.querySelector('[name="terms"]').checked;

            if (password !== confirm) {
                showNotification('Passwords do not match. Please try again.', 'error');
                document.getElementById('register-confirm').focus();
                return;
            }
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters.', 'error');
                return;
            }
            if (!terms) {
                showNotification('Please agree to the Terms of Service.', 'error');
                return;
            }

            const displayName = fname || username;
            loginUser(displayName);
            showNotification(`Welcome to Stackly, ${displayName}! 🎮 Account created!`, 'success');
            setTimeout(() => showPage('home'), 1200);
            registerForm.reset();
        });
    }

    // Contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            showNotification(`Thank you ${name}! We'll get back to you soon.`, 'success');
            contactForm.reset();
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    document.querySelectorAll('.stackly-notification').forEach(n => n.remove());

    const colors = { success: '#4CAF50', error: '#f44336', info: '#00D4FF' };
    const n = document.createElement('div');
    n.className = 'stackly-notification';
    n.style.cssText = `
        position:fixed; top:100px; right:20px;
        background:${colors[type] || colors.info};
        color:white; padding:1rem 1.5rem; border-radius:8px;
        z-index:100000; box-shadow:0 5px 20px rgba(0,0,0,.4);
        max-width:320px; font-weight:500; font-size:.95rem; line-height:1.4;
        animation: slideInNotif .4s ease-out;
    `;
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => { n.style.opacity='0'; n.style.transition='opacity .4s'; setTimeout(() => n.remove(), 400); }, 3000);
}

// ===== SCROLL EFFECTS =====
function addScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const st = window.scrollY;
        navbar.style.background = st > 50 ? 'rgba(10,14,39,.98)' : 'rgba(10,14,39,.95)';
        navbar.style.boxShadow  = st > 50 ? '0 2px 10px rgba(255,107,53,.1)' : 'none';
        navbar.style.transform  = (st > lastScrollTop && st > 300) ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollTop = st <= 0 ? 0 : st;
    });
}

// ===== INTERSECTION OBSERVER for card animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.game-card,.stat-card,.category-card,.tournament-card,.blog-card,.team-member,.value-card,.info-card,.news-card,.team-ranking,.game-ranking-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .6s ease, transform .6s ease';
        observer.observe(el);
    });
});

// ===== INJECTED GLOBAL ANIMATION CSS =====
const styleTag = document.createElement('style');
styleTag.textContent = `
    @keyframes slideInNotif {
        from { transform: translateX(350px); opacity: 0; }
        to   { transform: translateX(0);     opacity: 1; }
    }
    .navbar { transition: all .3s ease; }
`;
document.head.appendChild(styleTag);

// ===== DYNAMIC YEAR =====
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p').forEach(el => {
        el.textContent = el.textContent.replace(/\d{4}/, year);
    });
});

console.log('%c🎮 Stackly Esports', 'color:#FF6B35;font-size:20px;font-weight:bold;');
console.log('%cJoin us and become a legend!', 'color:#00D4FF;font-size:14px;');
