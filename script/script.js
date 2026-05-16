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

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

// Show button when scrolled down
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
        backToTopBtn.classList.add("opacity-100");
    } else {
        backToTopBtn.classList.add("opacity-0", "pointer-events-none");
        backToTopBtn.classList.remove("opacity-100");
    }
});

// Scroll to top smoothly
backToTopBtn.addEventListener("click", () => {
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
const typing = document.getElementById("typing");

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

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// Particles
const particles = document.querySelector(".particles");

// More particles
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

    particles.appendChild(dot);
}

// Loading Bar
window.addEventListener("load", () => {
    const loader = document.getElementById("top-loader-bar");

    loader.style.animation = "loadBar 1.2s ease forwards";

    setTimeout(() => {
        document.getElementById("top-loader").style.display = "none";
    }, 1300);
});

