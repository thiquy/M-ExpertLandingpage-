/* ============================================================
   M-Expert — Main Script
   Features: navbar scroll, smooth scroll, reveal animations,
             EN/VI language toggle
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Navbar scroll shadow ── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* ── Smooth scroll for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = navbar.offsetHeight + 8;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
        });
    });

    /* ── Scroll-reveal animations ── */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.filter(e => e.isIntersecting).forEach((entry, i) => {
            setTimeout(() => entry.target.classList.add('visible'), i * 90);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ── EN / VI Language Toggle ── */
    let currentLang = localStorage.getItem('mx-lang') || 'en';

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem('mx-lang', lang);

        document.documentElement.setAttribute('data-lang', lang);
        document.getElementById('lang-label').textContent = lang === 'en' ? 'EN / VI' : 'VI / EN';

        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (!text) return;
            // Use innerHTML so <br> and <strong> tags in data attributes are rendered
            if (text.includes('<')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        });
    }

    document.getElementById('lang-btn').addEventListener('click', () => {
        applyLang(currentLang === 'en' ? 'vi' : 'en');
    });

    // Apply stored language on load
    applyLang(currentLang);

});
