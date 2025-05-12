// ./src/main.js


import './assets/css/modern-normalize.css'
import './assets/css/style.css'
import './assets/css/utils.css'
import './assets/css/components/article.css'
import './assets/css/components/header.css'
import './assets/css/components/hero.css'
import './assets/css/components/about.css'
import './assets/css/components/featured.css'
import './assets/css/components/popup.css'
import './assets/css/components/work.css'
import './assets/css/components/contact.css'
import './assets/css/components/footer.css'
import './assets/css/components/mobile-nav.css'


import mobileNav from './assets/js/mobile-nav.js';
import darkMode from './assets/js/dark-mode.js';
import lazyLoading from './assets/js/lazy-loading.js';


// Initialize utilities
window.addEventListener('DOMContentLoaded', () => {
    mobileNav();
    darkMode();
    lazyLoading();
});