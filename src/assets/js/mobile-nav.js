const mobileNav = () => {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    headerBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        document.body.style.overflowY = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflowY = 'auto';
        });
    });
};

export default mobileNav;
