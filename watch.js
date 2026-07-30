const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.getElementById('video-modal-close');

if (modal && modalVideo && closeModal) {

    document.querySelectorAll('.video-card').forEach((card) => {
        card.addEventListener('click', () => {
            try {
                modalVideo.src =
                    card.dataset.youtube +
                    "?autoplay=1&rel=0&modestbranding=1";
                modal.showModal();
                document.body.classList.add('scroll-locked');
            } catch (err) {
                console.error('Failed to open video modal:', err);
                document.body.classList.remove('scroll-locked');
            }
        });
    });

    closeModal.addEventListener('click', () => modal.close());

    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.close();
    });

    modal.addEventListener('close', () => {
        modalVideo.src = "";
        document.body.classList.remove('scroll-locked');
    });

}