document.addEventListener('DOMContentLoaded', () => {

    // Preloader Animation
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Add class to body to trigger CSS transitions if needed
            document.body.classList.add('loaded');

            // Fade out
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';

                // Optional: Remove from DOM after transition completes
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500); // 0.5s delay before starting fade out
        }
    });

    // Carousel Logic for Industry Section
    const carousel = document.getElementById('industryCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -320, // Approx width of one card + gap
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: 320, // Approx width of one card + gap
                behavior: 'smooth'
            });
        });
    }

});
