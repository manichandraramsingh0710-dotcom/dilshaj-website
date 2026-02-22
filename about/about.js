document.addEventListener('DOMContentLoaded', () => {
    // Add logic for scroll animations or interactions if needed
    // Engineering Section Interactivity
    const engItems = document.querySelectorAll('.eng-item');

    engItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            engItems.forEach(i => i.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');
        });
    });

    // 3D Team Carousel Logic REMOVED in favor of CSS-only static layout
    // The previous JS implementation caused conflicts with the requested static curved design.

    /* 
       Legacy Code Reference if needed:
       const track = document.getElementById('teamTrack');
       ...
    */

});
