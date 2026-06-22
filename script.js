// ===== CURRENT USER STATE =====
let currentUser = null;

// ===== AUTHENTICATION TABS =====
function switchAuthTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.classList.add('active');

    // Activate matching button
    tabButtons.forEach(btn => {
        if (tabName === 'signin-tab' && btn.textContent.trim() === 'Sign In') btn.classList.add('active');
        if (tabName === 'signup-tab' && btn.textContent.trim() === 'Create Account') btn.classList.add('active');
    });
}

// ===== OPEN REGISTER (opens signin page then flips to signup tab) =====
function openRegister() {
    showPage('signin');
    setTimeout(() => switchAuthTab('signup-tab'), 80);
}

// ===== PAGE NAVIGATION =====
function showPage(pageName) {
    // If register page is requested, redirect to signin signup tab
    if (pageName === 'register') {
        openRegister();
        return;
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const selectedPage = document.getElementById(pageName);
    if (selectedPage) selectedPage.classList.add('active');

    // Close mobile menu
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');

    window.scrollTo(0, 0);
    updateActiveNavLink(pageName);
}

function updateActiveNavLink(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.style.color = '');

    const currentLink = document.querySelector(`[onclick="showPage('${pageName}')"]`);
    if (currentLink) currentLink.style.color = '#FF6B35';
}

// ===== MAP FUNCTIONS =====
function openAddressMap() {
    const mapUrl = 'https://www.google.com/maps/search/123+Gaming+Street,+Los+Angeles,+CA+90210';
    window.open(mapUrl, '_blank');
    showNotification('Opening map in a new tab...', 'info');
}

// Keep old function for any existing references
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
    const signinItem   = document.getElementById('nav-signin-item');
    const registerItem = document.getElementById('nav-register-item');
    const userItem     = document.getElementById('nav-user-item');
    const usernameLabel = document.getElementById('nav-username-label');

    if (currentUser) {
        if (signinItem)   signinItem.style.display   = 'none';
        if (registerItem) registerItem.style.display = 'none';
        if (userItem)     userItem.style.display     = 'flex';
        if (usernameLabel) usernameLabel.textContent = '👤 ' + currentUser.name;
    } else {
        if (signinItem)   signinItem.style.display   = '';
        if (registerItem) registerItem.style.display = '';
        if (userItem)     userItem.style.display     = 'none';
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

    // Close menu when any nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu)   navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Preloader
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => (preloader.style.display = 'none'), 800);
        }
    }, 2000);

    // Restore saved user session
    const savedUser = localStorage.getItem('stackly_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (e) {
            currentUser = null;
        }
    }
    updateNavForUser();

    showPage('home');
    handleFormSubmissions();
    addScrollEffects();
});

// ===== FORM HANDLING =====
function handleFormSubmissions() {
    // Sign In Form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value.trim();
            // Use part before @ as display name, or fall back to full email
            const displayName = email.includes('@') ? email.split('@')[0] : email;
            loginUser(displayName);
            showNotification(`Welcome back, ${displayName}! 🎮`, 'success');
            setTimeout(() => showPage('home'), 1200);
            signinForm.reset();
        });
    }

    // Register / Create Account Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fname    = document.getElementById('register-fname').value.trim();
            const lname    = document.getElementById('register-lname').value.trim();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value;
            const confirm  = document.getElementById('register-confirm').value;
            const terms    = registerForm.querySelector('[name="terms"]').checked;

            // Validate passwords match
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

    // Contact Form
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
    // Remove any existing notifications
    document.querySelectorAll('.stackly-notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = 'stackly-notification';

    let bgColor = '#00D4FF';
    if (type === 'success') bgColor = '#4CAF50';
    if (type === 'error')   bgColor = '#f44336';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 100000;
        animation: slideIn 0.4s ease-out;
        box-shadow: 0 5px 20px rgba(0,0,0,0.4);
        max-width: 320px;
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.4;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.4s';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ===== SCROLL EFFECTS =====
function addScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;

        if (scrollTop > 50) {
            navbar.style.background    = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow     = '0 2px 10px rgba(255, 107, 53, 0.1)';
        } else {
            navbar.style.background    = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow     = 'none';
        }

        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ===== ANIMATION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(
        '.game-card, .stat-card, .category-card, .tournament-card, .blog-card, .team-member, .value-card, .info-card, .news-card, .team-ranking, .game-ranking-card'
    ).forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== INJECTED CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(350px); opacity: 0; }
        to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    .navbar { transition: all 0.3s ease; }
`;
document.head.appendChild(style);

// ===== DYNAMIC YEAR =====
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p').forEach(el => {
        el.textContent = el.textContent.replace(/\d{4}/, year);
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🎮 Stackly Esports', 'color:#FF6B35;font-size:20px;font-weight:bold;');
console.log('%cJoin us and become a legend!', 'color:#00D4FF;font-size:14px;');
