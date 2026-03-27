document.addEventListener("DOMContentLoaded", () => {
    const toggleBtns = document.querySelectorAll(".light-mode-toggler");
    const socialIcons = document.querySelectorAll(".social-icon");

    toggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Toggle light-mode class on body
            document.body.classList.toggle("light-mode");

            // Update all light/dark mode toggle icons
            toggleBtns.forEach(b => {
                const icon = b.querySelector("img");
                if (document.body.classList.contains("light-mode")) {
                    icon.src = "images/icons/moon.png";
                    icon.alt = "dark mode";
                } else {
                    icon.src = "images/icons/sun.png";
                    icon.alt = "light mode";
                }
            });

            // Update all social/external icons
            socialIcons.forEach(icon => {
                const baseSrc = icon.src.replace("-dark.png", ".png"); // remove -dark if present
                if (document.body.classList.contains("light-mode")) {
                    // switch to dark variant
                    const ext = baseSrc.split(".").pop();
                    const darkSrc = baseSrc.replace(`.${ext}`, `-dark.${ext}`);
                    icon.src = darkSrc;
                } else {
                    // switch back to light variant
                    icon.src = baseSrc;
                }
            });
        });
    });

    const headings = document.querySelectorAll('.section-heading');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
    }, {
        threshold: 0.1
    });

    headings.forEach(heading => observer.observe(heading));
});
