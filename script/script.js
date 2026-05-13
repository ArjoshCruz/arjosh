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