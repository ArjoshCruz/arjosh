// AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

const toggle = document.querySelector('input[type="checkbox"]');

// Restore saved preference
if (localStorage.getItem('theme') === 'dark') {
document.body.classList.add('dark');
toggle.checked = true;
}

toggle.addEventListener('change', () => {
if (toggle.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
} else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}
});

// Projects
document.querySelectorAll(".slideshow").forEach((slideshow) => {

    const slides = slideshow.querySelector(".slides");
    const dots = slideshow.querySelectorAll(".dot");
    const nextBtn = slideshow.querySelector(".nextBtn");
    const prevBtn = slideshow.querySelector(".prevBtn");

    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateSlider() {

        slides.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {

            dot.classList.remove("bg-black");
            dot.classList.add("bg-gray-300");

            if (index === currentIndex) {
                dot.classList.remove("bg-gray-300");
                dot.classList.add("bg-black");
            }

        });

    }

    nextBtn.addEventListener("click", () => {

        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();

    });

    prevBtn.addEventListener("click", () => {

        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();

    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentIndex = index;
            updateSlider();

        });

    });

});

// Scroll Progress Circle
const scrollProgress = document.getElementById("scrollProgress");

const progressBar =
    document.querySelector(".progress-bar");

const radius = 30;

const circumference = 2 * Math.PI * radius;

progressBar.style.strokeDasharray = circumference;

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        scrollTop / docHeight;

    const offset =
        circumference - progress * circumference;

    progressBar.style.strokeDashoffset = offset;

    // Show after scrolling
    if (scrollTop > 200) {
        scrollProgress.classList.add("show");
    } else {
        scrollProgress.classList.remove("show");
    }

});

// Scroll To Top
scrollProgress.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const roles = [
    "Front-End Developer",
    "UI Designer",
    "Full Stack Learner"
];

// Typing Effect
const typingElements = document.querySelectorAll(".typing");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typing.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typing.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// Cursor Glow
document.addEventListener("mousemove", (e) => {
    const glow = document.getElementById("cursor-glow");
    const introGlow = document.getElementById("cursor-glow-intro");

    if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    }

    if (introGlow) {
        // Position relative to the viewport as well — the intro glow is absolute inside intro
        introGlow.style.left = e.clientX + "px";
        introGlow.style.top = e.clientY + "px";
    }
});

// Particles: find all particle containers (intro overlay + global) and populate each
const particleContainers = document.querySelectorAll(".particles");

particleContainers.forEach((container) => {
    for (let i = 0; i < 180; i++) {

        const dot = document.createElement("span");

        // Completely scattered positions
        dot.style.left = Math.random() * 100 + "%";
        dot.style.top = Math.random() * 120 + "%";

        // Random sizes
        const size = Math.random() * 5 + 1;

        dot.style.width = size + "px";
        dot.style.height = size + "px";

        // Random blue-ish colors
        const colors = [
            "rgba(96,165,250,0.9)",
            "rgba(129,140,248,0.9)",
            "rgba(167,139,250,0.9)",
            "rgba(255,255,255,0.8)"
        ];

        const color = colors[Math.floor(Math.random() * colors.length)];

        dot.style.background = color;

        // Stronger glow
        dot.style.boxShadow = `
            0 0 ${Math.random() * 12 + 6}px ${color}
        `;

        // Different speeds
        dot.style.animationDuration =
            (Math.random() * 20 + 15) + "s";

        // Random delays
        dot.style.animationDelay =
            -(Math.random() * 20) + "s";

        // Random opacity
        dot.style.opacity = Math.random();

        container.appendChild(dot);
    }
});

// Loading Bar
window.addEventListener("load", () => {

    const introExists =
        document.getElementById("intro-screen");

    // Don't show top loader if intro exists
    if (introExists) {
        document.getElementById("top-loader")?.remove();
        return;
    }

    const loader =
        document.getElementById("top-loader-bar");

    if (!loader) return;

    loader.style.animation =
        "loadBar 1.2s ease forwards";

    setTimeout(() => {
        document.getElementById("top-loader")
            ?.style.setProperty("display", "none");
    }, 1300);

});

// Intro Screen with localStorage to prevent showing on every visit
const INTRO_KEY = "portfolio_intro_seen";
const ONE_HOUR = 60 * 60 * 1000;

window.addEventListener("load", () => {

    const intro = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    // Safety check
    if (!intro || !mainContent) return;

    const lastSeen = localStorage.getItem(INTRO_KEY);

    const shouldShow =
        !lastSeen ||
        Date.now() - Number(lastSeen) > ONE_HOUR;

    // Skip intro if already seen within 1 hour
    if (!shouldShow) {

        intro.remove();

        mainContent.classList.remove("opacity-0");
        mainContent.classList.add("opacity-100");

        return;
    }

    const progress = document.getElementById("intro-progress");

    // Animate progress bar
    setTimeout(() => {

        if (progress) {
            progress.style.width = "100%";
        }

    }, 100);

    // After loading animation completes
    setTimeout(() => {

        // Fade out intro
        intro.style.transition = "opacity 0.8s ease";
        intro.style.opacity = "0";

        // Fade in main content
        mainContent.classList.add(
            "transition-opacity",
            "duration-700",
            "opacity-100"
        );

        mainContent.classList.remove("opacity-0");

        // Save timestamp
        localStorage.setItem(
            INTRO_KEY,
            Date.now()
        );

        // Remove intro from DOM
        setTimeout(() => {

            intro.remove();

            // Re-enable scrolling by removing the intro-active marker
            document.documentElement.classList.remove("intro-active");

        }, 800);

    }, 4000);

});
