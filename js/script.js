// Simple interactive functionality for the mock website

function showMessage() {
    const messageDiv = document.getElementById('message');
    const messages = [
        "😕 Oops, it does nothing for now",
        "😾 Told you it was a mock website!",
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    messageDiv.innerHTML = `<strong>${randomMessage}</strong>`;
    messageDiv.classList.remove('hidden');
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 3000);
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
});

// Add current year to footer
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace('2024', new Date().getFullYear());
    }
});

function setTimeBasedGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = "Bom dia";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Boa tarde";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Boa noite";
    } else {
        greeting = "Boa noite";
    }

    document.getElementById('greeting').textContent = greeting;
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', setTimeBasedGreeting);