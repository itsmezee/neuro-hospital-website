// Advanced Animations for Neuro Hospital Website

document.addEventListener('DOMContentLoaded', function() {
    // Brain wave animation for neuro theme
    createBrainWaveAnimation();
    
    // Interactive neuron connection animation
    initNeuronAnimation();
    
    // Parallax scrolling effect
    initParallaxEffect();
    
    // Typing effect for hero text
    initTypingEffect();
    
    // Interactive service cards
    initServiceCardAnimations();
    
    // Doctor consultation animation
    initDoctorConsultation();
    
    // Floating medical icons
    setTimeout(createFloatingMedicalIcons, 2000);
    
    // WhatsApp Popup Functionality
    initWhatsAppPopup();
});

// Brain Wave Animation
function createBrainWaveAnimation() {
    const brainWaveContainer = document.createElement('div');
    brainWaveContainer.className = 'brain-waves';
    brainWaveContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    // Create multiple wave layers
    for (let i = 0; i < 5; i++) {
        const wave = document.createElement('div');
        wave.className = 'brain-wave';
        wave.style.cssText = `
            position: absolute;
            width: 200%;
            height: ${100 + i * 20}px;
            background: radial-gradient(circle, rgba(26, 188, 156, ${0.05 - i * 0.01}) 0%, transparent 70%);
            border-radius: 50%;
            top: ${50 + i * 10}%;
            left: -50%;
            animation: brainWaveMove ${15 + i * 5}s linear infinite;
            opacity: ${0.3 - i * 0.05};
        `;
        
        // Create keyframes for animation
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes brainWaveMove {
                0% { transform: translateX(0) rotate(0deg); }
                100% { transform: translateX(100%) rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        
        brainWaveContainer.appendChild(wave);
    }
    
    document.body.appendChild(brainWaveContainer);
}

// Neuron Connection Animation - SIMPLIFIED VERSION (No popping icons)
function initNeuronAnimation() {
    const cards = document.querySelectorAll('.service-card, .stat-card');
    
    cards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(26, 188, 156, 0.3)';
            this.style.transition = 'all 0.3s ease';
            
            // Add glow effect to icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.color = '#1abc9c';
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
                icon.style.filter = 'drop-shadow(0 2px 4px rgba(26, 188, 156, 0.5))';
            }
            
            // Add subtle pulse animation to number
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.animation = 'pulse 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            // Reset icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.color = '';
                icon.style.transform = '';
                icon.style.filter = '';
            }
            
            // Reset number animation
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.animation = '';
            }
        });
    });
}

// Parallax Scrolling Effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing Effect for Hero Text
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const textToType = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
        if (i < textToType.length) {
            heroTitle.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            heroTitle.innerHTML = originalText;
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.unobserve(heroTitle);
        }
    }, { threshold: 0.5 });
    
    observer.observe(heroTitle);
}

// Service Card Animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'rotateY(360deg)';
                icon.style.transition = 'transform 0.8s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'rotateY(0deg)';
            }
        });
    });
}

// Doctor Consultation Animation
function initDoctorConsultation() {
    const doctorAvatar = document.querySelector('.doctor-avatar');
    if (!doctorAvatar) return;
    
    let speechBubble = document.querySelector('.speech-bubble');
    if (!speechBubble) {
        speechBubble = document.createElement('div');
        speechBubble.className = 'speech-bubble';
        speechBubble.style.cssText = `
            position: absolute;
            left: 120px;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            max-width: 300px;
            min-width: 250px;
            z-index: 10;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid white;
        `;
        
        const bubbleText = document.createElement('p');
        bubbleText.style.cssText = `
            margin: 0;
            color: #333;
            font-size: 16px;
            line-height: 1.4;
            font-weight: 500;
        `;
        
        speechBubble.appendChild(arrow);
        speechBubble.appendChild(bubbleText);
        
        doctorAvatar.style.position = 'relative';
        doctorAvatar.parentElement.style.position = 'relative';
        doctorAvatar.parentElement.appendChild(speechBubble);
    }
    
    doctorAvatar.addEventListener('click', function() {
        startConsultationAnimation();
    });
    
    doctorAvatar.addEventListener('mouseenter', function() {
        speechBubble.style.opacity = '1';
    });
    
    doctorAvatar.addEventListener('mouseleave', function() {
        if (!speechBubble.classList.contains('active')) {
            speechBubble.style.opacity = '0';
        }
    });
    
    setTimeout(startConsultationAnimation, 10000);
}

function startConsultationAnimation() {
    const speechBubble = document.querySelector('.speech-bubble');
    const speechText = speechBubble.querySelector('p');
    const doctorAvatar = document.querySelector('.doctor-avatar');
    
    if (!speechText || !doctorAvatar) return;
    
    const questions = [
        "Hello! I'm Dr. GVKR. How can I help you today?",
        "Are you experiencing headaches or migraines?",
        "Do you have any concerns about memory or concentration?",
        "Any issues with numbness or tingling sensations?",
        "Having trouble with balance or coordination?",
        "Experiencing seizures or unexplained episodes?"
    ];
    
    let currentQuestion = 0;
    speechBubble.classList.add('active');
    speechBubble.style.opacity = '1';
    
    function askQuestion() {
        speechText.textContent = questions[currentQuestion];
        doctorAvatar.style.animation = 'doctorTalk 1s ease';
        speechBubble.style.animation = 'bubblePulse 1s ease';
        
        setTimeout(() => {
            doctorAvatar.style.animation = '';
            speechBubble.style.animation = '';
        }, 1000);
        
        currentQuestion = (currentQuestion + 1) % questions.length;
        setTimeout(askQuestion, 8000);
    }
    
    askQuestion();
    
    const styleSheet = document.createElement('style');
    if (!document.querySelector('#doctor-animations')) {
        styleSheet.id = 'doctor-animations';
        styleSheet.textContent = `
            @keyframes doctorTalk {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes bubblePulse {
                0%, 100% { transform: translateY(-50%) scale(1); }
                50% { transform: translateY(-50%) scale(1.05); }
            }
            .speech-bubble::before {
                content: '';
                position: absolute;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 10px solid white;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Floating Medical Icons in Background
function createFloatingMedicalIcons() {
    const medicalContainer = document.createElement('div');
    medicalContainer.className = 'floating-medical-icons';
    medicalContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    const medicalIcons = [
        'fa-user-md', 'fa-stethoscope', 'fa-heartbeat', 'fa-brain', 'fa-hospital',
        'fa-clinic-medical', 'fa-ambulance', 'fa-prescription', 'fa-pills', 'fa-syringe',
        'fa-medkit', 'fa-procedures', 'fa-microscope', 'fa-dna', 'fa-wheelchair'
    ];
    
    for (let i = 0; i < 15; i++) {
        const medicalIcon = document.createElement('div');
        medicalIcon.className = 'floating-medical-icon';
        const randomIcon = medicalIcons[Math.floor(Math.random() * medicalIcons.length)];
        
        medicalIcon.innerHTML = `<i class="fas ${randomIcon}"></i>`;
        medicalIcon.style.cssText = `
            position: absolute;
            font-size: ${15 + Math.random() * 25}px;
            color: rgba(26, 188, 156, ${0.2 + Math.random() * 0.4});
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation: floatMedicalIcon ${20 + Math.random() * 20}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.3 + Math.random() * 0.5};
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        `;
        
        medicalContainer.appendChild(medicalIcon);
    }
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes floatMedicalIcon {
            0% { transform: translateY(100vh) rotate(0deg) scale(0.8); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-100vh) rotate(360deg) scale(1.2); opacity: 0; }
        }
        .floating-medical-icon:hover i {
            color: #3498db !important;
            transform: scale(1.3);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);
    document.body.appendChild(medicalContainer);
}

// WhatsApp Popup Functionality
function initWhatsAppPopup() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (!whatsappFloat) return;
    
    let modal = document.querySelector('.whatsapp-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'whatsapp-modal';
        modal.innerHTML = `
            <div class="modal-header">
                <h4><i class="fab fa-whatsapp"></i> Connect with Dr. GVKR</h4>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <a href="tel:9494067108" class="modal-option">
                    <i class="fas fa-phone-alt"></i>
                    <div>
                        <strong>Call Now</strong>
                        <small>Emergency / Appointment</small>
                    </div>
                </a>
                <a href="https://wa.me/919494067108?text=Hello%20Dr.%20GVKR's%20Neuro%20Care,%20I%20would%20like%20to%20book%20an%20appointment%20for%20neurological%20consultation." target="_blank" class="modal-option">
                    <i class="fab fa-whatsapp"></i>
                    <div>
                        <strong>Message on WhatsApp</strong>
                        <small>Book Appointment / Query</small>
                    </div>
                </a>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    whatsappFloat.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.toggle('active');
    });
    
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!modal.contains(e.target) && !whatsappFloat.contains(e.target)) {
            modal.classList.remove('active');
        }
    });
}

// Add CSS for doctor section positioning
const doctorStyles = document.createElement('style');
doctorStyles.textContent = `
    .doctor-section {
        position: relative;
        min-height: 300px;
        display: flex;
        align-items: center;
    }
    .doctor-avatar {
        position: relative;
        cursor: pointer;
        transition: transform 0.3s ease;
        z-index: 2;
    }
    .doctor-avatar:hover {
        transform: scale(1.05);
    }
    .speech-bubble {
        position: absolute;
        left: 120px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(26, 188, 156, 0.2);
        max-width: 300px;
        min-width: 250px;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(26, 188, 156, 0.1);
    }
    .speech-bubble.active {
        opacity: 1 !important;
    }
    .speech-bubble p {
        margin: 0;
        color: #2c3e50;
        font-size: 16px;
        line-height: 1.5;
        font-weight: 500;
        font-family: 'Arial', sans-serif;
    }
    .speech-bubble::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid white;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-50%) translateX(-10px); }
        to { opacity: 1; transform: translateY(-50%) translateX(0); }
    }
    .speech-bubble.active {
        animation: fadeIn 0.5s ease forwards;
    }
`;
document.head.appendChild(doctorStyles);
