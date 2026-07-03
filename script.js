document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MOBILE RESPONSIVE SIDEBAR TOGGLE
    // ==========================================
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            
            // Icon badalne ke liye (Bars se Cross icon)
            const icon = menuBtn.querySelector("i");
            if(icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Agar user link par click kare toh menu khud ba khud band ho jaye
        document.querySelectorAll(".nav-menu li a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if(icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // ==========================================
    // 2. AUTOMATIC IMAGE SLIDER (FOR INDEX.HTML)
    // ==========================================
    const images = [
        "./IMAGES/images (2).jpg",
        "./IMAGES/images (3).jpg",
        "./IMAGES/images (4).jpg",
        "./IMAGES/images (5).jpg",
        "./IMAGES/images (6).jpg",
        "./IMAGES/images (7).jpg"
    ];

    const slide = document.getElementById("slide");
    let currentIdx = 0;

    if (slide && images.length > 0) {
        setInterval(() => {
            currentIdx = (currentIdx + 1) % images.length;
            slide.src = images[currentIdx];
        }, 3000);
    }

    // ==========================================
    // 3. FADE IN SECTIONS ANIMATION
    // ==========================================
    const sections = document.querySelectorAll("section");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 0.8s ease-out";
        observer.observe(section);
    });

    // ==========================================
    // 4. BUTTONS SMOOTH TOUCH/HOVER EFFECT
    // ==========================================
    const buttons = document.querySelectorAll("button, .play-btn, .bonus-btn, .download-btn");
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "scale(1.05)";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "scale(1)";
        });
    });

    // ==========================================
    // 5. DEPOSIT SCREENSHOT PREVIEW & WHATSAPP REDIRECT 
    //    (BINA BACKEND SERVER KE DIRECT CHALEGA)
    // ==========================================
    const proofInput = document.getElementById("proof");
    const previewImage = document.getElementById("preview");

    // Screenshot ka live preview dikhane ke liye
    if (proofInput && previewImage) {
        proofInput.addEventListener("change", function () {
            const file = this.files[0]; // Sahi kiya: check single uploaded file
            if (file) {
                previewImage.src = URL.createObjectURL(file);
                previewImage.style.display = "block";
            }
        });
    }

    const depositForm = document.getElementById("depositForm");
    
    if (depositForm) {
        depositForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Page reload hone se rokta hai

            // Inputs se live text data nikalna
            const amount = document.getElementById("amount").value;
            const trxid = document.getElementById("trxid").value;
            
            // Aapka official WhatsApp number
            const whatsappNumber = "923705445882";
            
            // WhatsApp message ka professional template
            const message = `👋 *NEW DEPOSIT REQUEST - MASTI365* \n\n` +
                            `💰 *Amount:* Rs. ${amount}\n` +
                            `🆔 *Transaction ID (TrxID):* ${trxid}\n\n` +
                            `📢 _Sir, I have submitted my deposit. Here are my payment details. Please check and approve my balance. I am attaching the screenshot below._`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://whatsapp.com{whatsappNumber}&text=${encodedMessage}`;

            // WhatsApp ko direct new tab me open karein
            window.open(whatsappUrl, '_blank');
        });
    }
});
    // ==========================================
    // 6. NEWSLETTER SUBSCRIBE SUBMIT HANDLING
    // ==========================================
    const subscribeSection = document.querySelector(".subscribe");
    
    if (subscribeSection) {
        const subInput = subscribeSection.querySelector("input[type='email']");
        const subBtn = subscribeSection.querySelector("button");

        if (subInput && subBtn) {
            subBtn.addEventListener("click", function (e) {
                e.preventDefault(); // Page refresh hone se rokta hai

                const emailValue = subInput.value.trim();

                // Email check validation
                if (emailValue === "") {
                    alert("Please enter a valid email address!");
                    return;
                }

                // Backend ko email bheinain
                fetch('http://localhost:3000/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: emailValue })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message); // Successful subscription popup
                        subInput.value = ""; // Input box empty kar dein
                    } else {
                        alert(data.message); // Already subscribed handling popup
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Server connect nahi ho saka! Apni backend hosting check karein.");
                });
            });
        }
    }
