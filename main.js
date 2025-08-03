let slideIndex = 1;
let slideTimer;
const effects = ["fade-effect", "slide-effect", "zoom-effect", "rotate-effect"];

// Video Intro Functionality
function initVideoIntro() {
    const videoIntro = document.getElementById('videoIntro');
    const mainContent = document.getElementById('mainContent');
    const introVideo = document.getElementById('introVideo');
    
    // Show main content after 7 seconds
    setTimeout(() => {
        videoIntro.classList.add('fade-out');
        mainContent.classList.add('show');
        
        // Scroll to top after video intro completes
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Initialize hero transition immediately after main content becomes visible
        setTimeout(() => {
            initHeroTransition();
        }, 7000); // Wait for fade-in transition
        
        // Remove video intro from DOM after fade out
        setTimeout(() => {
            videoIntro.style.display = 'none';
        }, 1000);
    }, 7000);
    
    // Handle video end event as backup
    introVideo.addEventListener('ended', () => {
        videoIntro.classList.add('fade-out');
        mainContent.classList.add('show');
        
        // Scroll to top when video ends
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Initialize hero transition immediately
        setTimeout(() => {
            initHeroTransition();
        }, 100);
        
        setTimeout(() => {
            videoIntro.style.display = 'none';
        }, 1000);
    });
}

// Hero Video to Photo Transition
function initHeroTransition() {
    const heroVideo = document.getElementById('heroVideo');
    const heroPhoto = document.getElementById('heroPhoto');
    
    console.log('Initializing hero transition');
    console.log('Hero video element:', heroVideo);
    console.log('Hero photo element:', heroPhoto);
    
    if (!heroVideo || !heroPhoto) {
        console.error('Hero video or photo elements not found');
        return;
    }
    
    // Ensure video is ready to play
    heroVideo.load();
    
    // Wait for video to be loaded
    heroVideo.addEventListener('loadeddata', () => {
        console.log('Hero video loaded, attempting to play');
        
        // Try to play the video
        const playPromise = heroVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Hero video started playing successfully');
            }).catch(error => {
                console.log('Hero video autoplay failed:', error);
                // If autoplay fails, show photo immediately
                heroVideo.style.opacity = '0';
                heroPhoto.classList.add('show');
            });
        }
    });
    
    // When hero video ends, transition to photo
    heroVideo.addEventListener('ended', () => {
        console.log('Hero video ended, transitioning to photo');
        heroVideo.style.opacity = '0';
        heroPhoto.classList.add('show');
    });
    
    // Fallback: if video doesn't play or ends early, show photo after 5 seconds
    setTimeout(() => {
        if (heroVideo.currentTime < heroVideo.duration - 1) {
            console.log('Hero video fallback triggered');
            heroVideo.style.opacity = '0';
            heroPhoto.classList.add('show');
        }
    }, 5000);
}



window.onload = () => {
    console.log('Page loaded, initializing video intro');
    // Initialize video intro
    initVideoIntro();
    
    // Initialize Instagram cycling after video intro
    setTimeout(() => {
        initInstagramCycling();
    }, 8000); // Wait for video intro to complete
}; 