// Load header
function loadHeader() {
    fetch('../includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('afterbegin', data);
            setActiveNavItem(); // Highlight active nav item

            const hamburger = document.querySelector('.hamburger');
            const navItems = document.querySelector('.nav-items');

            if (hamburger && navItems) {
                // Click handler
                hamburger.addEventListener('click', () => {
                    navItems.classList.toggle('open');
                });

                // Keyboard handler
                hamburger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                        e.preventDefault(); // Prevent page scroll on space
                        hamburger.click();
                    }
                });
            }
        })
        .catch(err => console.error('Error loading header:', err));
}

// Load footer
function loadFooter() {
    fetch('../includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('beforeend', data);
        })
        .catch(err => console.error('Error loading footer:', err));
}

// Highlight the current page's nav item
function setActiveNavItem() {
    const path = window.location.pathname.replace(/\/index\.html$/, '/');
    const navLinks = document.querySelectorAll('.navigation-item');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        // Normalize both to end with a trailing slash for comparison
        const normalizedHref = href.endsWith('/') ? href : href + '/';
        const normalizedPath = path.endsWith('/') ? path : path + '/';

        if (normalizedPath === normalizedHref) {
            link.classList.add('active');
        }
    });
}

// Intro animation + coming soon logic
function setupIntroAnimation() {
    const introElements = document.querySelectorAll('.hello-text, .name, .title');
    const comingSoon = document.querySelector('.coming-soon-text');

    setTimeout(() => {
        introElements.forEach(el => el.classList.add('fade-out'));

        setTimeout(() => {
            introElements.forEach(el => el.style.display = 'none');
            if (comingSoon) {
                comingSoon.classList.remove('hidden');
                comingSoon.classList.add('fade-in-coming-soon');
            }
        }, 1000);
    }, 6000); // 6 seconds before starting the fade-out
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();

    // Only run the intro animation on the main homepage
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    if (isHomePage) {
        setupIntroAnimation();
    }
});

