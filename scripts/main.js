// Load header and call setActiveNavItem after it's loaded
function loadHeader() {
    fetch('../includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('afterbegin', data);
            setActiveNavItem();       // Highlight active nav item
            enablePageTransitions();  // Apply fade-out on link click
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
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.navigation-item');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        if (path.endsWith(href)) {
            link.classList.add('active');
        }
    });
}

// Smooth page transitions (fade out before navigation)
function enablePageTransitions() {
    document.querySelectorAll('a.navigation-item').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || link.hasAttribute('target')) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = link.href;
            }, 300); // Match the CSS transition duration
        });
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
