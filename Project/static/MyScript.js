const containers = document.querySelectorAll('.container');
const progress = document.getElementById('progress');
const eraImage = document.getElementById('eraImage');

// Array of image paths corresponding to each era
const images = [
    './img1.jpg', './img9.jpg', './img3.jpg',
    './img11.jpg', './img5.jpg', './img70.jpg', 
    './img72.jpg', './img8.jpg', './img9.png', './img10.jpg'
];

function updateProgress() {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progressPercent = Math.min(100, (scrollPosition / totalHeight) * 100);
    progress.style.height = progressPercent + '%';

    // Update CSS variables for each container
    containers.forEach((container, index) => {
        container.style.setProperty('--progress', index * (100 / (containers.length - 1)) / 100);
        
        // Check if the container is in view
        const rect = container.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            // Change the image based on the active container
            changeImage(index);
        }
    });
}

// Function to change the image with fade effect
function changeImage(index) {
    eraImage.style.opacity = 0; // Fade out

    setTimeout(() => {
        eraImage.src = images[index]; // Change the image
        eraImage.onload = () => {
            eraImage.style.opacity = 1; // Fade in
        };
    }, 1000); // Delay to match the fade-out duration
}

// Event listener for scroll
window.addEventListener('scroll', updateProgress);

