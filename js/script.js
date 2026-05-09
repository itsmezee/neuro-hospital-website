// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const startCounting = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Doctor Animation Interaction
    const doctorAnimation = document.getElementById('doctorAnimation');
    if (doctorAnimation) {
        doctorAnimation.addEventListener('click', function() {
            const speechBubble = this.querySelector('.speech-bubble p');
            const messages = [
                "Hello! How can I help you today?",
                "Need a neurological consultation?",
                "Book your appointment easily!",
                "Expert care for your brain health",
                "We're here to help 24/7"
            ];
            
            const currentMessage = speechBubble.textContent;
            let newMessage;
            do {
                newMessage = messages[Math.floor(Math.random() * messages.length)];
            } while (newMessage === currentMessage && messages.length > 1);
            
            speechBubble.textContent = newMessage;
            
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Reveal Animation
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    scrollRevealElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Add current year to footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Emergency button heartbeat effect
    const emergencyBtn = document.querySelector('.btn-emergency');
    if (emergencyBtn) {
        emergencyBtn.classList.add('heartbeat');
    }
    
    // FAQ Toggle for Contact Page
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // Contact Form Handler - IMPROVED WITH WORKING SUBMISSION
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            const whatsappPreference = document.getElementById('contactWhatsapp').checked;
            
            // Validate form
            if (!name || !email || !phone || !subject || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create email body
            let emailBody = `New Contact Form Message\n\n`;
            emailBody += `Name: ${name}\n`;
            emailBody += `Email: ${email}\n`;
            emailBody += `Phone: ${phone}\n`;
            emailBody += `Subject: ${subject}\n`;
            emailBody += `WhatsApp Contact: ${whatsappPreference ? 'Yes' : 'No'}\n\n`;
            emailBody += `Message:\n${message}\n\n`;
            emailBody += `---\nSent from Dr. GVKR's Neuro Care Website Contact Form`;
            
            // Create WhatsApp message if preferred
            if (whatsappPreference) {
                const whatsappMsg = `Hello Dr. GVKR's Neuro Care,\n\nI am ${name}.\nPhone: ${phone}\n\nQuery: ${message.substring(0, 200)}`;
                setTimeout(() => {
                    window.open(`https://wa.me/919494067108?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
                }, 500);
            }
            
            // Simulate email sending (opens email client)
            setTimeout(() => {
                const mailtoLink = `mailto:neurocarebydrgvkrgoud@gmail.com?subject=Contact Form: ${subject} - ${name}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.backgroundColor = '#2ecc71';
                
                showNotification('Your message has been sent! We will contact you shortly.', 'success');
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1000);
        });
    }
    
    // Helper function to show notifications
    function showNotification(message, type) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            min-width: 280px;
            background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            animation: slideInRight 0.3s ease;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0 5px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Appointment Form Handler
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        const today = new Date().toISOString().split('T')[0];
        const preferredDate = document.getElementById('preferredDate');
        if (preferredDate) preferredDate.min = today;
        
        const whatsappBtn = document.querySelector('.btn-whatsapp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                const name = document.getElementById('fullName')?.value || '';
                const phone = document.getElementById('phone')?.value || '';
                const symptoms = document.getElementById('symptoms')?.value || '';
                
                let message = `Hello Dr. GVKR's Neuro Care, I would like to book an appointment.`;
                if (name) message += ` Name: ${name}`;
                if (phone) message += ` Phone: ${phone}`;
                if (symptoms) message += ` Symptoms: ${symptoms.substring(0, 100)}`;
                
                this.href = `https://wa.me/919494067108?text=${encodeURIComponent(message)}`;
            });
        }
        
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const whatsappChecked = document.getElementById('whatsapp').checked;
            
            if (whatsappChecked) {
                let message = `Appointment Booking Request:\n`;
                message += `Name: ${formData.get('fullName')}\n`;
                message += `Phone: ${formData.get('phone')}\n`;
                message += `Age: ${formData.get('age')}\n`;
                message += `Symptoms: ${formData.get('symptoms')}\n`;
                message += `Preferred Date: ${formData.get('preferredDate')}\n`;
                message += `Preferred Time: ${formData.get('preferredTime')}\n`;
                if (formData.get('doctor')) {
                    message += `Preferred Doctor: ${formData.get('doctor')}\n`;
                }
                
                const whatsappUrl = `https://wa.me/919494067108?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Appointment Booked!';
                submitBtn.style.backgroundColor = '#2ecc71';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    appointmentForm.reset();
                    
                    showNotification(
                        whatsappChecked 
                            ? 'Redirecting to WhatsApp for confirmation!' 
                            : 'Appointment request submitted! We will call you to confirm.',
                        'success'
                    );
                    
                    if (!whatsappChecked) {
                        const emailBody = `Appointment Request:\nName: ${formData.get('fullName')}\nPhone: ${formData.get('phone')}\nAge: ${formData.get('age')}\nSymptoms: ${formData.get('symptoms')}\nPreferred Date: ${formData.get('preferredDate')}\nPreferred Time: ${formData.get('preferredTime')}`;
                        window.location.href = `mailto:neurocarebydrgvkrgoud@gmail.com?subject=Appointment Request - ${formData.get('fullName')}&body=${encodeURIComponent(emailBody)}`;
                    }
                }, 2000);
            }, 1500);
        });
    }
    
    // Add typing effect to form inputs for better UX
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
