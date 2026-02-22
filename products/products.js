console.log("EduProva loaded");

document.addEventListener('DOMContentLoaded', () => {
    // === 1. Upcoming Products Swap Logic ===
    const featuredCard = document.getElementById('featured-card');
    const featuredTitle = document.getElementById('featured-title');
    const featuredDesc = document.getElementById('featured-desc');

    const smallCards = document.querySelectorAll('.small-product-card');

    if (featuredCard && smallCards.length > 0) {
        smallCards.forEach(card => {
            card.addEventListener('click', function () {
                // 1. Get current featured card data
                const currentFeaturedBg = featuredCard.style.backgroundImage;
                const currentFeaturedTitle = featuredTitle.innerText;
                const currentFeaturedDesc = featuredDesc.innerText;

                // 2. Get clicked card data
                const clickedCardTitleElement = this.querySelector('h4');
                const clickedCardDescElement = this.querySelector('.card-subtext');

                const clickedBg = this.style.backgroundImage;
                const clickedTitle = clickedCardTitleElement.innerText;
                const clickedDesc = clickedCardDescElement.innerText;

                // 3. Swap Data
                // Update Featured Card
                featuredCard.style.backgroundImage = clickedBg;
                featuredTitle.innerText = clickedTitle;
                featuredDesc.innerText = clickedDesc;

                // Update Clicked Small Card
                this.style.backgroundImage = currentFeaturedBg;
                clickedCardTitleElement.innerText = currentFeaturedTitle;
                clickedCardDescElement.innerText = currentFeaturedDesc;

                // Optional: Add a subtle animation class to featured card to indicate change
                featuredCard.classList.add('fade-in');
                setTimeout(() => {
                    featuredCard.classList.remove('fade-in');
                }, 300);
            });
        });
    }

    // === 2. Stat Cards Active State Logic ===
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        statCards.forEach(card => {
            card.addEventListener('click', function () {
                // Remove 'active' and 'dark' from all cards
                statCards.forEach(c => {
                    c.classList.remove('active');
                    c.classList.remove('dark');
                    // Removing 'dark' ensures hardcoded black cards lose their style too
                });

                // Add 'active' to the clicked card
                this.classList.add('active');
            });
        });
    }
});
