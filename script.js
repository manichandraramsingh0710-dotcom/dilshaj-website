

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile & Nav Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuPopover = document.getElementById('mobile-menu-popover');
    const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close-btn');

    function toggleMenu() {
        const isActive = mobileMenuBtn.classList.toggle('active');
        if (mobileMenuPopover) {
            mobileMenuPopover.classList.toggle('active');
            // Toggle Body Scroll
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close button inside the menu
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', () => {
            if (mobileMenuBtn.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Close menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuPopover && mobileMenuPopover.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Mobile Search Functionality
    const mobileSearchBtn = document.querySelector('.mobile-search-box button');
    const mobileSearchInput = document.querySelector('.mobile-search-box input');

    if (mobileSearchBtn && mobileSearchInput) {
        mobileSearchBtn.addEventListener('click', () => {
            const query = mobileSearchInput.value.trim();
            if (query) {
                alert('Search functionality coming soon! You searched for: ' + query);
            }
        });

        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                mobileSearchBtn.click();
            }
        });
    }

    // Mega Menu Sidebar Active State
    const sidebarLinks = document.querySelectorAll('.sidebar-list li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // If it's a dummy link, prevent default and toggle active
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const parentList = this.closest('.sidebar-list');
                parentList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .floating-badge').forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // 3. Parallax Effect for Badges
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) / 40;
            const moveY = (clientY - centerY) / 40;

            document.querySelectorAll('.floating-badge').forEach((badge, index) => {
                const depth = (index + 1) * 0.2;
                badge.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            document.querySelectorAll('.floating-badge').forEach(badge => {
                badge.style.transform = 'translate(0, 0)';
            });
        });
    }

    // 4. Interactive Services Logic Refined
    // 4. Interactive Services Logic Refined
    const serviceItems = document.querySelectorAll('.service-item');
    const focalImage = document.getElementById('service-focal-image');
    const focalTitle = document.getElementById('focal-title');

    if (serviceItems.length > 0 && focalImage && focalTitle) {
        serviceItems.forEach(item => {
            item.addEventListener('click', function () {
                // Remove active class from all items
                serviceItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');

                // Get content from data attributes
                const newImg = this.getAttribute('data-img');
                const newTitle = this.getAttribute('data-title');

                if (newImg) {
                    // Update content immediately
                    focalImage.style.opacity = '0';
                    focalTitle.style.opacity = '0';

                    setTimeout(() => {
                        focalImage.src = newImg;
                        if (newTitle && focalTitle) focalTitle.innerHTML = newTitle;

                        focalImage.style.opacity = '1';
                        if (focalTitle) {
                            focalTitle.style.opacity = '1';
                            focalTitle.style.transform = 'translateY(0)';
                        }
                    }, 200);
                }
            });
        });
    }

    // 5. Products Navigation & Scroll Spy
    const productNavItems = document.querySelectorAll('.product-nav-item');
    const productCards = document.querySelectorAll('.product-detail-card');
    const productDisplay = document.querySelector('.products-display');

    if (productNavItems.length > 0 && productCards.length > 0) {
        // Navigation Click
        productNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const productId = item.getAttribute('data-product');
                const targetCard = document.getElementById(productId);

                if (targetCard) {
                    // Check if we are on mobile/tablet (horizontal layout)
                    if (window.innerWidth <= 1200 && productDisplay) {
                        const targetPosition = targetCard.offsetLeft;
                        productDisplay.scrollTo({
                            left: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Vertical layout for desktop
                        const targetPosition = targetCard.offsetTop - 20;
                        productDisplay.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // High-Precision Auto-Tracking Scroll Spy
        const sidebar = document.querySelector('.products-sidebar');
        const updateProductActiveState = () => {
            let currentActiveId = null;

            if (window.innerWidth <= 1200 && productDisplay) {
                // Horizontal tracking on mobile
                const scrollLeft = productDisplay.scrollLeft;
                const center = scrollLeft + (productDisplay.offsetWidth / 2);

                productCards.forEach(card => {
                    const cardLeft = card.offsetLeft;
                    const cardRight = cardLeft + card.offsetWidth;

                    if (center >= cardLeft && center <= cardRight) {
                        currentActiveId = card.getAttribute('id');
                    }
                });
            } else {
                // Vertical tracking on desktop (Container Scroll)
                const containerScrollTop = productDisplay.scrollTop;
                // Check roughly 100px down from top of container to see what's active
                const checkPoint = containerScrollTop + 100;

                productCards.forEach(card => {
                    const cardTop = card.offsetTop;
                    const cardBottom = cardTop + card.offsetHeight;

                    if (checkPoint >= cardTop && checkPoint <= cardBottom) {
                        currentActiveId = card.getAttribute('id');
                    }
                });
            }

            if (currentActiveId) {
                productNavItems.forEach(nav => {
                    const productData = nav.getAttribute('data-product');
                    if (productData === currentActiveId) {
                        if (!nav.classList.contains('active')) {
                            nav.classList.add('active');
                            // AUTO-SCROLL SIDEBAR: Keep the active item visible and centered
                            nav.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                                inline: 'center'
                            });
                        }
                    } else {
                        nav.classList.remove('active');
                    }
                });
            }
        };

        // Attach scroll listeners (Container Only)
        if (productDisplay) {
            productDisplay.addEventListener('scroll', () => {
                requestAnimationFrame(updateProductActiveState);
            }, { passive: true });
        }

        // Initial check
        updateProductActiveState();
    }

    // 6. Technologies Navigation Logic
    const techNavItems = document.querySelectorAll('.tech-nav-item');
    const techCards = document.querySelectorAll('.tech-detail-card');
    const techDisplay = document.querySelector('.tech-display');

    if (techNavItems.length > 0 && techCards.length > 0 && techDisplay) {
        techNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const techId = item.getAttribute('data-tech');
                const targetCard = document.getElementById(techId);

                if (targetCard) {
                    // Scroll within the tech-display container
                    const targetPosition = targetCard.offsetTop;

                    // Update active state in sidebar immediately
                    techNavItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');

                    // Auto-scroll sidebar chip into view (Mobile)
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });

                    if (window.innerWidth <= 768) {
                        const targetCard = document.getElementById(techId);
                        if (targetCard) {
                            techCards.forEach(card => card.classList.remove('active-tab'));
                            targetCard.classList.add('active-tab');

                            // Reset tech-display viewport scroll
                            techDisplay.scrollTop = 0;
                        }
                    } else {
                        // Desktop Scroll logic
                        techDisplay.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Initial setup for mobile Technologies (Set first card active)
        if (window.innerWidth <= 768 && techCards.length > 0) {
            if (!document.querySelector('.tech-detail-card.active-tab')) {
                techCards[0].classList.add('active-tab');
            }
        }

        // Scroll Spy for internal Technologies scroll
        const updateTechActiveState = () => {
            if (window.innerWidth <= 768) return; // Disable scroll spy for Mobile Tab mode

            const scrollThreshold = techDisplay.scrollTop + 50;
            let currentActiveId = null;

            techCards.forEach(card => {
                const cardTop = card.offsetTop;
                const cardBottom = cardTop + card.offsetHeight + 30; // Include gap

                if (scrollThreshold >= cardTop && scrollThreshold <= cardBottom) {
                    currentActiveId = card.getAttribute('id');
                }
            });

            if (currentActiveId) {
                techNavItems.forEach(nav => {
                    if (nav.getAttribute('data-tech') === currentActiveId) {
                        nav.classList.add('active');
                    } else {
                        nav.classList.remove('active');
                    }
                });
            }
        };

        techDisplay.addEventListener('scroll', () => {
            requestAnimationFrame(updateTechActiveState);
        }, { passive: true });

        // Initial check
        updateTechActiveState();

        // Mobile Tab Initialization
        if (window.innerWidth <= 768 && techCards.length > 0) {
            techNavItems[0].classList.add('active');
            techCards[0].classList.add('active-tab');
        }
    }

    // 7. Career Slider Navigation
    const careerSlider = document.querySelector('.career-slider');
    const careerPrevBtn = document.querySelector('.career-nav-btn.prev');
    const careerNextBtn = document.querySelector('.career-nav-btn.next');

    if (careerSlider && careerPrevBtn && careerNextBtn) {
        const getScrollStep = () => {
            const card = careerSlider.querySelector('.career-card');
            if (!card) return 0;
            const style = window.getComputedStyle(careerSlider);
            const gap = parseInt(style.gap) || 0;
            return card.offsetWidth + gap;
        };

        careerNextBtn.addEventListener('click', () => {
            careerSlider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });

        careerPrevBtn.addEventListener('click', () => {
            careerSlider.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });
    }

    // 8. Testimonials Slider Navigation
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialsPrevBtn = document.querySelector('.testimonials-nav-btn.prev');
    const testimonialsNextBtn = document.querySelector('.testimonials-nav-btn.next');

    if (testimonialsSlider && testimonialsPrevBtn && testimonialsNextBtn) {
        const testimonialCard = testimonialsSlider.querySelector('.testimonial-card');
        if (testimonialCard) {
            const cardWidth = testimonialCard.offsetWidth + 24;
            testimonialsNextBtn.addEventListener('click', () => {
                testimonialsSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
            testimonialsPrevBtn.addEventListener('click', () => {
                testimonialsSlider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        }
    }
});
