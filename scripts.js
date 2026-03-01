
    // Lightbox funkcje
    function openLightbox(src) {
        document.getElementById('lightbox').classList.add('active');
        document.getElementById('lightbox-img').src = src;
        document.body.style.overflow = 'hidden'; // Blokada scrollowania
    }

    function closeLightbox(event) {
        if (event) {
            event.stopPropagation(); // Zapobiega propagacji zdarzenia
        }
        document.getElementById('lightbox').classList.remove('active');
        document.getElementById('lightbox-img').src = '';
        document.body.style.overflow = ''; // Przywrócenie scrollowania
    }

    // Zamknij lightbox po kliknięciu w ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Funkcja sprawdzająca i poprawiająca rozmiary zdjęć
    function fixGalleryImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                // Jeśli zdjęcie się nie załadowało, pokaż kolorowe tło
                img.onerror = function() {
                    this.style.display = 'none';
                    item.style.backgroundColor = 'var(--secondary)';
                    
                    // Dodaj tekst informacyjny
                    const overlay = item.querySelector('.gallery-overlay');
                    if (overlay) {
                        overlay.style.transform = 'translateY(0)';
                        overlay.style.background = 'rgba(38, 82, 46, 0.8)';
                    }
                };
            }
        });
    }

    // Uruchom po załadowaniu strony
    window.addEventListener('load', fixGalleryImages);