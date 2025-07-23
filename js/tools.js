// Tools page functionality

function openTool(toolName) {
    // For now, show an alert. Later you can redirect to actual tool pages
    const toolInfo = {
        'blast': {
            name: 'BLAST',
            description: 'Basic Local Alignment Search Tool',
            url: '#' // Replace with actual tool URL
        },
        'jbrowse': {
            name: 'JBrowse',
            description: 'Interactive Genome Browser',
            url: '#' // Replace with actual tool URL
        },
        'phylogeny': {
            name: 'Phylogeny Analysis',
            description: 'Phylogenetic Tree Construction',
            url: '#' // Replace with actual tool URL
        },
        'alignment': {
            name: 'Multiple Alignment',
            description: 'Multiple Sequence Alignment Tool',
            url: '#' // Replace with actual tool URL
        },
        'annotation': {
            name: 'Gene Annotation',
            description: 'Gene Prediction and Annotation',
            url: '#' // Replace with actual tool URL
        },
        'expression': {
            name: 'Expression Analysis',
            description: 'Gene Expression Analysis Tool',
            url: '#' // Replace with actual tool URL
        }
    };

    const tool = toolInfo[toolName];
    if (tool) {
        // For demonstration - show alert
        alert(`Opening ${tool.name}...\n\n${tool.description}\n\n(This would redirect to the actual tool interface)`);
        
        // When you have actual tool pages, replace the alert with:
        // window.location.href = tool.url;
        // or for external tools:
        // window.open(tool.url, '_blank');
    }
}

// Add loading animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧬 Tools page loaded successfully!');
    
    // Add hover sound effect (optional)
    const toolTiles = document.querySelectorAll('.tool-tile');
    
    toolTiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            // Add a subtle scale effect
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        tile.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add ripple effect on click
        tile.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - this.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - this.offsetTop) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);