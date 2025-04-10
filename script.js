document.addEventListener('DOMContentLoaded', function () {
    // === PARTNER CAROUSEL ===
    const partnersContainer = document.querySelector('.partners');
    const partners = Array.from(document.querySelectorAll('.partner'));
    const prevButton = document.querySelector('.partner-nav.prev');
    const nextButton = document.querySelector('.partner-nav.next');

    const rotationSpeed = 2000;
    let currentPosition = 0;
    let interval;

    function setupInfiniteRotation() {
        const originalCount = partners.length;

        for (let i = 0; i < originalCount; i++) {
            const clone = partners[i].cloneNode(true);
            partnersContainer.appendChild(clone);
        }

        const style = document.createElement('style');
        style.textContent = `
            .partners-track {
                display: flex;
                position: relative;
                transition: transform 0.5s ease;
            }
            .partner {
                flex: 0 0 9%;
                margin-right: 20px;
                transition: transform 0.5s ease, opacity 0.5s ease;
                overflow: hidden;
            }
            .partner.highlighted {
                transform: scale(1.2); /* Enlarging effect */
                opacity: 1 !important; /* Ensuring the highlighted partner stays fully visible */
                border: 2px solid #f39c12; /* Optional: add border for visibility */
            }
        `;
        document.head.appendChild(style);

        const track = document.createElement('div');
        track.className = 'partners-track';

        while (partnersContainer.firstChild) {
            track.appendChild(partnersContainer.firstChild);
        }

        partnersContainer.appendChild(track);
        return track;
    }

    function startContinuousRotation(track) {
        const allPartners = track.querySelectorAll('.partner');
        const partnerWidth = allPartners[0].offsetWidth + 20;
        const originalCount = partners.length;

        function moveCarousel() {
            currentPosition -= partnerWidth;
            track.style.transition = 'transform 0.5s ease';
            track.style.transform = `translateX(${currentPosition}px)`;

            if (Math.abs(currentPosition) >= partnerWidth * originalCount) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentPosition = 0;
                    track.style.transform = `translateX(${currentPosition}px)`;
                    // Force reflow to apply transition reset
                    void track.offsetWidth;
                    track.style.transition = 'transform 0.5s ease';
                }, 500); // Wait for the animation to finish
            }

            // Highlight the current first partner
            const partnersArray = Array.from(track.querySelectorAll('.partner'));
            const frontPartner = partnersArray[0]; // First partner in the carousel
            // Remove highlight from any previous highlighted partner
            partnersArray.forEach(partner => partner.classList.remove('highlighted'));
            // Add highlight to the current front partner
            frontPartner.classList.add('highlighted');
        }

        // Clear old interval if any
        if (interval) clearInterval(interval);
        interval = setInterval(moveCarousel, rotationSpeed);

        // Manual buttons
        prevButton.addEventListener('click', () => {
            currentPosition += partnerWidth;
            track.style.transition = 'transform 0.5s ease';
            track.style.transform = `translateX(${currentPosition}px)`;
        });

        nextButton.addEventListener('click', () => {
            moveCarousel();
        });

        partnersContainer.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });

        partnersContainer.addEventListener('mouseleave', () => {
            interval = setInterval(moveCarousel, rotationSpeed);
        });
    }

    const track = setupInfiniteRotation();
    startContinuousRotation(track);


    // === FAQ SECTION ===
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            q.classList.toggle('active');
            answer.classList.toggle('show');
        });
    });
});
