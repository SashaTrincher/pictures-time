document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('#imageGallery img');
    let currentIndex = 0;

    function updateGallery(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if(i === index) {
                img.classList.add('active');
            }
        });
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery(currentIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery(currentIndex);
    });

    updateGallery(0);
});
