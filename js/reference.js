// Odyssey Interactions adapted from reference
document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.profile-card, .vision-text, .section-title');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Sequential Video Player for Discovery
    const discoveryVideo = document.getElementById('discoveryVideo');
    if (discoveryVideo) {
        const videoSources = [
            'videos/discovery_1.mp4',
            'videos/discovery_2.mp4'
        ];
        let currentVideoIndex = 0;

        discoveryVideo.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
            discoveryVideo.src = videoSources[currentVideoIndex];
            discoveryVideo.play();
        });
    }

    console.log("Odyssey: Ready with Reference Design.");
});
