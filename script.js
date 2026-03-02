// Konfiguracja
const WEB3FORMS_KEY = 'e7309547-0861-45dd-98a7-508f8b1820b7';

// Dane usług
const SERVICES = [
    {
        cat: "Masaże i zabiegi relaksacyjne", 
        icon: 'fas fa-spa', // zdjecie
        items: [
            { name: "Masaż Access Bars", price: 100, duration: "60 min" },
            { name: "Access Facelift", price: 100, duration: "45 min" },
            { name: "Access Body - MTVSS", price: 120, duration: "60 min" },
            { name: "Zerowa Suma Traum", price: 90, duration: "45 min" },
            { name: "Energetyczna Korekta Widzenia", price: 150, duration: "90 min" },
            { name: "Odnowa Priopercepcji i inne", price: 200, duration: "90 min" }
        ]
    },
];

// Stan aplikacji
let appState = {
    form: {
        name: '',
        phone: '',
        service: '',
        date: '',
        time: ''
    },
    loading: false,
    popup: null,
    isSelectOpen: false,
    isTimeOpen: false,
    isMobileMenuOpen: false
};

// Płaska lista wszystkich usług
const allServices = SERVICES.flatMap(s => 
    s.items.map(i => ({
        ...i,
        category: s.cat,
        icon: s.icon
    }))
);


// Globalna funkcja do zamykania menu mobilnego
function closeMobileMenu() {
    if (appState.isMobileMenuOpen) {
        appState.isMobileMenuOpen = false;
        renderApp();
    }
}

// Dodaj też wersję z eventem
window.closeMobileMenu = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (appState.isMobileMenuOpen) {
        appState.isMobileMenuOpen = false;
        renderApp();
    }
};

// Funkcja pomocnicza do znalezienia usługi po nazwie
function findServiceByName(name) {
    return allServices.find(s => s.name === name);
}

function renderSocialFloating() {   // do zmienienia sa te profile itd.
    return `
        <div class="social-floating">
            <a href="https://facebook.com/twojprofil" target="_blank" class="social-icon facebook" title="Facebook">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/twojprofil" target="_blank" class="social-icon instagram" title="Instagram">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="mailto:twoj@email.com" class="social-icon email" title="Email">
                <i class="fas fa-envelope"></i>
            </a>
            <a href="https://wa.me/48601064332" target="_blank" class="social-icon whatsapp" title="WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="tel:+48601064332" class="social-icon phone" title="Zadzwoń">
                <i class="fas fa-phone-alt"></i>
            </a>
        </div>
    `;
}

// Renderowanie całej aplikacji
function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="min-h-screen" style="background-color: var(--light);">
            ${renderTopBar()}
            ${renderNavigation()}
            ${renderHero()}
            ${renderServices()}
            ${renderBooking()}
            ${renderInfoSection()}
            ${renderFooter()}
            ${renderPopup()}
            ${renderSocialFloating()}
        </div>
    `;

    // Inicjalizacja event listenerów
    initEventListeners();
}



// Renderowanie top bara
function renderTopBar() {
    return `
        <div class="top-bar">
            <p>Zadzwoń i umów się: <strong><a href="tel:+48601064332">601 064 332</a></strong> | <a href="https://maps.app.goo.gl/jPF9UhY2uBkEjwQ38">Wadowice, ul. Lwowska 16</a></p>
        </div>
    `;
}

// Renderowanie nawigacji
// Renderowanie nawigacji
function renderNavigation() {
    const isOpen = appState.isMobileMenuOpen ? 'mobile-open' : '';
    
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo">
                    <div class="logo-icon">
                        <img src="./pictures/footsteps.png" alt="Poczuj więcej Logo">
                    </div>
                    <div class="logo-text">
                        <h1>Poczuj więcej</h1>
                        <p>Access Bars Therapy</p>
                    </div>
                </div>
                
                <!-- Hamburger button -->
                <div class="hamburger ${isOpen}" id="hamburgerBtn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <!-- Menu nawigacyjne -->
                <div class="nav-links ${isOpen}" id="navLinks">
                    <a href="access.html">O Access Bars</a>
                    <a href="#uslugi">Oferta</a>
                    <a href="#godziny">Godziny</a>
                    <a href="#zapisy">Zapisy Online</a>
                </div>
            </div>
        </nav>
        
        ${appState.isMobileMenuOpen ? '<div class="mobile-overlay" id="mobileOverlay"></div>' : ''}
    `;
}

// Renderowanie hero section
function renderHero() {
    return `
        <header class="hero">
            <div class="hero-pattern"></div>
            
            <div class="hero-container">
                <div>
                    
                    <h2>Reset głowy <br><span>Redukcja stresu i napięć</span></h2>
                    
                    <p>Otwórz się na subtelne zmiany,
                    głęboki relaks i lekkość, <br>
                    która zostaje na dłużej!</p>
                    
                    <div class="hero-buttons">
                        <a href="#zapisy" class="btn-outline">Sprawdź dostępność terminu</a>
                        <a href="#uslugi" class="btn-outline">Zobacz usługi</a>
                    </div>
                </div>
                
                <div class="hero-image">
                    <!-- <div class="hero-image-placeholder"> -->
                        <div class="hero-image-content">
                            <img src="./pictures/martaspatient.png" id="hero-image" alt="Redukcja stresu i napięć">
                            <!-- <p style="color: var(--dark);">Redukcja stresu i napięć</p> -->
                        </div>
                   <!-- </div> -->
                </div>
            </div>
        </header>
    `;
}

// Renderowanie usług
function renderServices() {
    return `
        <section id="uslugi" class="services">
            <div class="container">
                <div class="section-title">
                    <h3>Nasze Usługi</h3>
                    <p>Kompleksowa oferta zabiegów podologicznych i kosmetycznych</p>
                </div>
                
                <div class="services-grid">
                    ${SERVICES.map(group => renderServiceGroup(group)).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderServiceGroup(group) {
    return `
        <div class="service-card centered-card">
            <div class="service-header">
                <div class="service-header-icon">
                    <i class="${group.icon}"></i>
                </div>
                <div>
                    <h4>${group.cat}</h4>
                    <p>Specjalistyczne zabiegi i masaże</p>
                </div>
            </div>
            
            <div class="service-items">
                ${group.items.map(item => renderServiceItem(item)).join('')}
            </div>
        </div>
    `;
}

function renderServiceItem(item) {
    return `
        <li class="service-item">
            <div class="service-item-content">
                <div class="service-item-info">
                    <h5>${item.name}</h5>
                    <div class="service-meta">
                        <span>
                            <i class="far fa-clock"></i>
                            ${item.duration}
                        </span>
                    </div>
                </div>
                <div class="service-price">
                    <div class="price">od ${item.price} PLN</div>
                    <button 
                        class="btn-select"
                        data-service="${item.name}"
                    >
                        Wybierz
                    </button>
                </div>
            </div>
        </li>
    `;
}

// Renderowanie formularza rezerwacji
function renderBooking() {
    const selectedService = findServiceByName(appState.form.service); // POPRAWIONE: .time na .service
    const availableTimes = getAvailableTimes();
    
    return `
        <section id="zapisy" class="booking">
            <div class="booking-container">
                <div class="section-title">
                    <h3>Umów wizytę</h3>
                    <p>Wybierz dogodny termin, a my skontaktujemy się z Tobą</p>
                </div>

                <div class="booking-card">
                    <div class="booking-header">
                        <div class="booking-header-content">
                            <div class="booking-header-icon">
                                <i class="far fa-calendar" style="font-size: 24px;"></i>
                            </div>
                            <div class="booking-header-text">
                                <h4>Rezerwacja online</h4>
                                <p>Wypełnij formularz, a my zadzwonimy z potwierdzeniem</p>
                            </div>
                        </div>
                    </div>

                    <form id="bookingForm" class="booking-form">
                        <div class="form-grid">
                            <!-- Imię i nazwisko -->
                            <div class="form-group">
                                <label>
                                    <i class="far fa-user"></i>
                                    Imię i Nazwisko *
                                </label>
                                <input
                                    type="text"
                                    id="nameInput"
                                    placeholder="Wprowadź swoje imię i nazwisko"
                                    required
                                    value="${appState.form.name}"
                                />
                            </div>

                            <!-- Telefon -->
                            <div class="form-group">
                                <label>
                                    <i class="fas fa-phone-alt"></i>
                                    Numer telefonu *
                                </label>
                                <input
                                    type="tel"
                                    id="phoneInput"
                                    placeholder="Podaj numer kontaktowy"
                                    pattern="[0-9]{9}"
                                    required
                                    value="${appState.form.phone}"
                                />
                            </div>

                            <!-- Zabieg - custom select -->
                            <div class="form-group full-width" style="position: relative; z-index: 1000;">
                                <label>
                                    <i class="fas fa-cut"></i>
                                    Wybierz zabieg *
                                </label>
                                ${renderCustomSelect(selectedService)}
                            </div>

                            <!-- Data -->
                            <div class="form-group">
                                <label>
                                    <i class="far fa-calendar"></i>
                                    Data wizyty *
                                </label>
                                <input
                                    type="date"
                                    id="dateInput"
                                    required
                                    min="${new Date().toISOString().split('T')[0]}"
                                    value="${appState.form.date}"
                                />
                            </div>

                            <!-- Godzina - custom select -->
                            <div class="form-group" style="position: relative; z-index: 999;">
                                <label>
                                    <i class="far fa-clock"></i>
                                    Preferowana godzina *
                                </label>
                                ${renderTimeSelect()}
                            </div>
                        </div> <!-- ← ZAMKNIĘCIE form-grid -->

                        <!-- Przycisk wysyłania (POZA form-grid) -->
                        <div class="submit-container">
                            <button
                                type="submit"
                                id="submitBtn"
                                class="btn-submit"
                                ${appState.loading ? 'disabled' : ''}
                            >
                                <span>
                                    ${appState.loading ? 
                                        '<span class="loader"></span> Wysyłanie...' : 
                                        'Potwierdź rezerwację'
                                    }
                                </span>
                                <div class="btn-hover-effect"></div>
                            </button>
                            
                            <p class="form-footer">
                                Klikając przycisk, wyrażasz zgodę na przetwarzanie danych w celu realizacji rezerwacji
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;
}

// Funkcja generująca dostępne godziny co 15 minut od 9:00 do 18:00
function getAvailableTimes() {
    const times = [];
    const startHour = 9; // 9:00
    const endHour = 18; // 18:00
    
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            // Formatuj godzinę z wiodącym zerem
            const hourStr = hour.toString().padStart(2, '0');
            const minuteStr = minute.toString().padStart(2, '0');
            
            // Nie dodawaj godziny 18:15, 18:30, 18:45
            if (hour === endHour && minute > 0) {
                continue;
            }
            
            times.push(`${hourStr}:${minuteStr}`);
        }
    }
    
    return times;
}

// Renderowanie custom selecta dla godzin
function renderTimeSelect() {
    const availableTimes = getAvailableTimes();
    
    const morningTimes = availableTimes.filter(t => {
        const hour = parseInt(t.split(':')[0]);
        return hour >= 9 && hour < 12;
    });
    
    const afternoonTimes = availableTimes.filter(t => {
        const hour = parseInt(t.split(':')[0]);
        return hour >= 12 && hour < 15;
    });
    
    const lateTimes = availableTimes.filter(t => {
        const hour = parseInt(t.split(':')[0]);
        return hour >= 15 && hour <= 18;
    });

    return `
        <div class="custom-select" id="timeSelect">
            <div class="select-trigger" id="timeSelectTrigger">
                <div class="select-trigger-content">
                    ${appState.form.time ? `
                        <i class="far fa-clock" style="color: var(--primary); font-size: 18px;"></i>
                        <div>
                            <div style="font-weight: 500; color: var(--dark);">${appState.form.time}</div>
                        </div>
                    ` : `
                        <span class="select-placeholder">Wybierz godzinę...</span>
                    `}
                </div>
                <i class="fas fa-chevron-down chevron ${appState.isTimeOpen ? 'rotated' : ''}"></i>
            </div>

            ${appState.isTimeOpen ? `
                <div class="select-dropdown" style="display: block;">
                    <!-- Grupa poranna -->
                    <div class="select-group">
                        <div class="select-group-header">
                            <i class="far fa-sun"></i>
                            Poranek
                        </div>
                        <div class="time-grid">
                            ${morningTimes.map(time => `
                                <div 
                                    class="time-option ${appState.form.time === time ? 'selected' : ''}"
                                    data-time="${time}"
                                >
                                    ${time}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Grupa popołudniowa -->
                    <div class="select-group">
                        <div class="select-group-header">
                            <i class="fas fa-cloud-sun"></i>
                            Popołudnie
                        </div>
                        <div class="time-grid">
                            ${afternoonTimes.map(time => `
                                <div 
                                    class="time-option ${appState.form.time === time ? 'selected' : ''}"
                                    data-time="${time}"
                                >
                                    ${time}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Grupa późna -->
                    <div class="select-group">
                        <div class="select-group-header">
                            <i class="fas fa-moon"></i>
                            Wieczór
                        </div>
                        <div class="time-grid">
                            ${lateTimes.map(time => `
                                <div 
                                    class="time-option ${appState.form.time === time ? 'selected' : ''}"
                                    data-time="${time}"
                                >
                                    ${time}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Renderowanie custom selecta
function renderCustomSelect(selectedService) {
    return `
        <div class="custom-select" id="customSelect">
            <div class="select-trigger" id="selectTrigger">
                <div class="select-trigger-content">
                    ${selectedService ? `
                        <div class="service-header-icon">
                            <i class="${selectedService.icon}"></i>
                        </div>
                        <div>
                            <div style="font-weight: 500; color: var(--dark);">${selectedService.name}</div>
                            <div style="font-size: 14px; color: #6b7280;">${selectedService.category} • ${selectedService.duration}</div>
                        </div>
                    ` : `
                        <span class="select-placeholder">Wybierz zabieg...</span>
                    `}
                </div>
                <i class="fas fa-chevron-down chevron ${appState.isSelectOpen ? 'rotated' : ''}"></i>
            </div>

            ${appState.isSelectOpen ? `
                <div class="select-dropdown" style="display: block;">
                    ${SERVICES.map(group => renderSelectGroup(group)).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function renderSelectGroup(group) {
    return `
        <div class="select-group">
            <div class="select-group-header">
                <div class="service-header-icon" style="width: 32px; height: 32px;">
                    <i class="${group.icon}" style="font-size: 16px;"></i>
                </div>
                ${group.cat}
            </div>
            ${group.items.map(item => renderSelectOption(item, group)).join('')}
        </div>
    `;
}

function renderSelectOption(item, group) {
    const isSelected = appState.form.service === item.name;
    return `
        <div 
            class="select-option ${isSelected ? 'selected' : ''}"
            data-service="${item.name}"
        >
            <div class="option-content">
                <div>
                    <h6>${item.name}</h6>
                    <div class="option-duration">${item.duration}</div>
                </div>
                <div class="option-price">od ${item.price} PLN</div>
            </div>
        </div>
    `;
}

// Renderowanie sekcji informacyjnej
function renderInfoSection() {
    const infoItems = [
        {
            icon: 'fas fa-map-marker-alt',
            title: "Lokalizacja",
            content: "ul. Lwowska 16\n34-100 Wadowice"
        },
        {
            icon: 'far fa-clock',
            title: "Godziny otwarcia",
            content: "Poniedziałek - Piątek: 09:00 - 18:00"
        },
        {
            icon: 'fas fa-phone-alt',
            title: "Kontakt",
            content: "601 064 332"
        }
    ];

    return `
        <section id="godziny" class="info-section">
            <div class="container">
                <div class="info-grid">
                    ${infoItems.map(item => `
                        <div class="info-card">
                            <div class="info-icon">
                                <i class="${item.icon}"></i>
                            </div>
                            <h5>${item.title}</h5>
                            <p>${item.content}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

// Renderowanie footera
// Renderowanie footera
function renderFooter() {
    return `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-logo">
                    <div class="footer-logo-icon">
                        <img src="./pictures/footsteps.png" alt="Poczuj więcej Logo">
                    </div>
                    <div class="footer-logo-text">
                        <h2>POCZUJ WIĘCEJ</h2>
                        <p>Access Bars Therapy</p>
                    </div>
                </div>
                
                <p class="footer-description">
                    Profesjonalne sesje Access Bars i terapie energetyczne. 
                    Doświadcz głębokiego relaksu i uwolnienia od codziennego stresu.
                </p>
                
                <div class="footer-border">
                    <p class="footer-copyright">
                        © ${new Date().getFullYear()} Poczuj więcej - Access Bars Therapy. Wszystkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </footer>
    `;
}

// Renderowanie popupa
function renderPopup() {
    if (!appState.popup) return '';

    const isSuccess = appState.popup.includes('Dziękujemy');
    const icon = isSuccess ? './pictures/check.png' : './pictures/no.png';

    return `
        <div class="popup">
            <div class="popup-content ${isSuccess ? 'success' : 'error'}">
                <img src="${icon}" alt="${isSuccess ? 'Sukces' : 'Błąd'}">
                <div>${appState.popup}</div>
            </div>
        </div>
    `;
}

// Inicjalizacja event listenerów
// Inicjalizacja event listenerów
function initEventListeners() {
    // Formularz
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleSubmit);
    }

    // Inputy formularza
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const dateInput = document.getElementById('dateInput');

    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            appState.form.name = e.target.value;
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            appState.form.phone = e.target.value;
        });
    }

    if (dateInput) {
        dateInput.addEventListener('input', (e) => {
            appState.form.date = e.target.value;
        });
    }

    // Custom select dla zabiegów
    const selectTrigger = document.getElementById('selectTrigger');
    if (selectTrigger) {
        selectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            appState.isSelectOpen = !appState.isSelectOpen;
            if (appState.isSelectOpen) {
                appState.isTimeOpen = false;
            }
            renderApp();
        });
    }

    // Time select trigger
    const timeSelectTrigger = document.getElementById('timeSelectTrigger');
    if (timeSelectTrigger) {
        timeSelectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            appState.isTimeOpen = !appState.isTimeOpen;
            if (appState.isTimeOpen) {
                appState.isSelectOpen = false;
            }
            renderApp();
        });
    }

    // Opcje selecta
    document.querySelectorAll('.select-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const service = e.currentTarget.dataset.service;
            appState.form.service = service;
            appState.isSelectOpen = false;
            renderApp();
        });
    });

    // Opcje godzin
    document.querySelectorAll('.time-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const time = e.currentTarget.dataset.time;
            appState.form.time = time;
            appState.isTimeOpen = false;
            renderApp();
        });
    });

    // Przyciski "Wybierz" w usługach
    document.querySelectorAll('.btn-select').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const service = e.currentTarget.dataset.service;
            appState.form.service = service;
            document.getElementById('zapisy').scrollIntoView({ behavior: 'smooth' });
            renderApp();
        });
    });

    // Smooth scroll dla linków nawigacyjnych
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Zamknij menu jeśli otwarte
            if (appState.isMobileMenuOpen) {
                appState.isMobileMenuOpen = false;
                renderApp();
            }
        });
    });

    // ===== HAMBURGER MENU =====
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburgerBtn) {
        const toggleMenu = function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            appState.isMobileMenuOpen = !appState.isMobileMenuOpen;
            renderApp();
        };
        
        hamburgerBtn.addEventListener('click', toggleMenu);
        hamburgerBtn.addEventListener('touchstart', toggleMenu, { passive: false });
    }

    // Linki w menu
    navLinks.forEach(link => {
        const handleLink = function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.location.href = href;
            }
            
            appState.isMobileMenuOpen = false;
            renderApp();
        };
        
        link.addEventListener('click', handleLink);
        link.addEventListener('touchstart', handleLink, { passive: false });
    });

    // Zamykanie menu po kliknięciu poza
    document.addEventListener('click', function(event) {
        if (!appState.isMobileMenuOpen) return;
        
        const isClickOnHamburger = event.target.closest('#hamburgerBtn');
        const isClickOnMenu = event.target.closest('#navLinks');
        
        if (!isClickOnHamburger && !isClickOnMenu) {
            appState.isMobileMenuOpen = false;
            renderApp();
        }
    });

    document.addEventListener('touchstart', function(event) {
        if (!appState.isMobileMenuOpen) return;
        
        const isClickOnHamburger = event.target.closest('#hamburgerBtn');
        const isClickOnMenu = event.target.closest('#navLinks');
        
        if (!isClickOnHamburger && !isClickOnMenu) {
            appState.isMobileMenuOpen = false;
            renderApp();
        }
    }, { passive: false });
}

// Globalny click do zamykania dropdownów
document.addEventListener('click', function(e) {
    if (!e.target.closest('#customSelect') && appState.isSelectOpen) {
        appState.isSelectOpen = false;
        renderApp();
    }
    if (!e.target.closest('#timeSelect') && appState.isTimeOpen) {
        appState.isTimeOpen = false;
        renderApp();
    }
});

// Obsługa submit formularza
async function handleSubmit(e) {
    e.preventDefault();

    // Walidacja
    if (!appState.form.name || !appState.form.phone || !appState.form.service || !appState.form.date || !appState.form.time) {
        showPopup("Uzupełnij wszystkie pola formularza.");
        return;
    }

    appState.loading = true;
    renderApp();

    const data = {
        access_key: WEB3FORMS_KEY,
        name: appState.form.name,
        phone: appState.form.phone,
        service: appState.form.service,
        date: appState.form.date,
        time: appState.form.time,
        subject: `Nowa rezerwacja - ${appState.form.service}!`,
    };

    try {
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (json.success) {
            showPopup("Dziękujemy! Twoja rezerwacja została zapisana. Oczekuj telefonu z potwierdzeniem w ciągu 24 godzin.");
            appState.form = { name: '', phone: '', service: '', date: '', time: '' };
        } else {
            showPopup("Coś poszło nie tak, spróbuj ponownie.");
        }
    } catch (error) {
        showPopup("Błąd połączenia z serwerem.");
    }

    appState.loading = false;
    renderApp();
}

// Pokazanie popupa
function showPopup(message) {
    appState.popup = message;
    renderApp();
    setTimeout(() => {
        appState.popup = null;
        renderApp();
    }, message.includes('Dziękujemy') ? 5000 : 3000);
}



// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});