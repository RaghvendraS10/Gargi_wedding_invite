document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Dynamic switch for the burger icon inside navigation
        const icon = navToggle.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.className = "fas fa-times";
        } else {
            icon.className = "fas fa-bars";
        }
    });

    // Close mobile menu gracefully when clicking any smooth scroll option link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navToggle.querySelector("i").className = "fas fa-bars";
        });
    });

    // --- Background Royal Music Management ---
    const audio = document.getElementById("weddingAudio");
    const musicBtn = document.getElementById("musicToggle");

    musicBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                musicBtn.classList.add("playing");
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.log("Playback interaction error blocked by ecosystem settings:", error);
            });
        } else {
            audio.pause();
            musicBtn.classList.remove("playing");
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        }
    });

    // --- Live Countdown Counter Logic ---
    // Targeted wedding baseline milestone: 22 June 2026, 20:00:00 IST (UTC+5:30)
    const weddingDate = new Date("June 22, 2026 20:00:00 GMT+0530").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference <= 0) {
            document.querySelector(".countdown-container").innerHTML = "<h3 style='color: var(--gold); font-size: 1.8rem;'>The Royal Celebration Has Begun!</h3>";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, "0");
        document.getElementById("hours").innerText = String(hours).padStart(2, "0");
        document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
        document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
    };

    updateCountdown(); // Run immediately to prevent placeholder text from flashing
    const timerInterval = setInterval(updateCountdown, 1000);

    // --- Elegant Fade-In Transitions on Scroll via Intersection Observer ---
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Elements reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Responsive Photo Gallery Lightbox Implementation ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightboxClose = document.querySelector(".lightbox-close");

    galleryItems.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = "none";
        lightboxImg.src = "";
    };

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // --- RSVP Form Event Handling ---
    const rsvpForm = document.getElementById("rsvpForm");

    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("guestName").value.trim();
        const phone = document.getElementById("guestPhone").value.trim();
        const count = document.getElementById("guestCount").value;
        const attending = document.getElementById("attendance").value;

        // Process submission alert confirmation
        alert(`Thank you, ${name}! Your RSVP status ("${attending}" for ${count} guest(s)) has been noted successfully.`);
        rsvpForm.reset();
    });

    // --- WhatsApp Forwarding Message Generation ---
    const whatsappBtn = document.getElementById("whatsappShare");

    whatsappBtn.addEventListener("click", () => {
        const customMessage = `You're warmly invited to the wedding of Dr. Gargi & Aadarsh on 22 June 2026 at Raghav Regency, Hapur. \n\nView details here: ${window.location.href}`;
        const encodedText = encodeURIComponent(customMessage);
        const mobileWhatsAppURL = `whatsapp://send?text=${encodedText}`;
        const webWhatsAppURL = `https://api.whatsapp.com/send?text=${encodedText}`;

        // Intent detection architecture to switch properly between systems
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.open(mobileWhatsAppURL, '_blank');
        } else {
            window.open(webWhatsAppURL, '_blank');
        }
    });
});