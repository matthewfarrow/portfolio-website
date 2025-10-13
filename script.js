// Gothic Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll with offset for sticky nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.gothic-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.cathedral-header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = 1 - (scrolled / 600);
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in to sections
    document.querySelectorAll('.glass-panel, .manuscript-item, .pillar').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('.gothic-section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.gothic-nav').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add shimmer effect to glass panels on hover
    const glassPanels = document.querySelectorAll('.glass-panel');
    glassPanels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const shimmer = panel.querySelector('::before');
            panel.style.setProperty('--mouse-x', `${x}%`);
            panel.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Pillar hover sound effect simulation (visual feedback)
    const pillars = document.querySelectorAll('.pillar');
    pillars.forEach(pillar => {
        pillar.addEventListener('mouseenter', () => {
            pillar.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        pillar.addEventListener('mouseleave', () => {
            pillar.style.transition = 'all 0.3s ease';
        });
    });

    // Add typing effect to title (optional enhancement)
    const title = document.querySelector('.gothic-title');
    if (title) {
        const originalText = title.textContent;
        let isVisible = false;

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                    isVisible = true;
                    animateTitle(title, originalText);
                }
            });
        }, { threshold: 0.5 });

        titleObserver.observe(title);
    }

    function animateTitle(element, text) {
        element.textContent = '';
        let index = 0;
        
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    // Add glow effect to buttons
    const buttons = document.querySelectorAll('.gothic-button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // Console Easter Egg
    console.log('%c🏰 Welcome to the Cathedral of Code 🏰', 
        'font-size: 20px; font-weight: bold; color: #d4af37; text-shadow: 2px 2px 4px #000;');
    console.log('%cBuilt with reverence for the craft of web development.', 
        'font-size: 14px; color: #f5e6d3; font-style: italic;');
});
