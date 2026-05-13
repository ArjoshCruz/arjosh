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