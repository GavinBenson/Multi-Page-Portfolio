const darkMode = () => {
    const themeToggleBtns = document.querySelectorAll('#theme-toggle');

    const applyTheme = (theme) => {
        document.body.classList.remove('darkMode', 'lightMode');
        if (theme === 'darkMode') {
            document.body.classList.add('darkMode');
        } else {
            document.body.classList.add('lightMode');
        }
    };

    // 1. On page load, use saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'darkMode' : 'lightMode');
    }

    // 2. Click handler to toggle themes
    const handleThemeToggle = () => {
        const isCurrentlyDark = document.body.classList.contains('darkMode');
        const newTheme = isCurrentlyDark ? 'lightMode' : 'darkMode';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // 3. Attach to all theme toggle buttons
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', handleThemeToggle);
    });
};

export default darkMode;
