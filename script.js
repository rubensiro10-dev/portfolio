/**
 * Ruben Siro Portfolio — Interactive Enhancements
 * High Performance • Zero Heavy Dependencies • Fully Responsive
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('backToTop');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');
    const toastContainer = document.getElementById('toastContainer');

    // 2. Sticky Header on Scroll
    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (window.scrollY > 450) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active Section ScrollSpy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 3. Mobile Navigation Menu Toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu on clicking any nav item
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu if clicked outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 4. Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Toast Notification System
    function showToast(message, icon = 'fa-solid fa-circle-check') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // 6. Copy Email to Clipboard
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'rubenbrayan557@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email copied to clipboard: ' + email);
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                copyEmailBtn.style.color = '#10b981';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                    copyEmailBtn.style.color = '';
                }, 2500);
            }).catch(() => {
                // Fallback for older browsers
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast('Email copied to clipboard!');
            });
        });
    }

    // 7. Interactive Contact Form with Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            if (!this.checkValidity()) {
                return;
            }

            // Visual feedback on button
            if (submitBtn) {
                const originalHtml = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';
                
                // Allow FormSubmit to submit or handle via AJAX if desired
                // If using default POST action, FormSubmit will take over
            }
        });
    }

    // 8. Subtle Scroll Reveal Animations (IntersectionObserver)
    const observeCards = () => {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.project-card, .service-card, .about-card, .skill-box, .stat-card, .process-step');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(el);
        });
    };

    observeCards();
});
