// Simple interactive functionality for the mock website

function showMessage() {
    const messageDiv = document.getElementById('message');
    const messages = [
        "🎉 Hello from JavaScript!",
        "✨ This site is working perfectly!",
        "🚀 GitHub Pages is awesome!",
        "💡 Ready to build something amazing?",
        "🎯 All systems operational!"
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
    
    // Console log to confirm JavaScript is working
    console.log('🎉 Mock website loaded successfully!');
    console.log('📊 GitHub Pages integration working!');
});

// Add current year to footer
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace('2024', new Date().getFullYear());
    }
});