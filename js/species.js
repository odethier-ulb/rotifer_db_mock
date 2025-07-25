let currentZoom = 1;
let minZoom = 0.1;
let maxZoom = 5;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let svgElement = null;

function loadPhylogeneticTree() {
    const svgPath = 'images/species/rotifer_db_mock_tree.svg';
    
    fetch(svgPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('SVG file not found');
            }
            return response.text();
        })
        .then(svgContent => {
            document.getElementById('loadingMessage').style.display = 'none';
            const container = document.getElementById('treeSvgContainer');
            container.innerHTML = svgContent;
            
            svgElement = container.querySelector('svg');
            if (svgElement) {
                svgElement.classList.add('tree-svg');
                setupInteractivity();
            }
        })
        .catch(error => {
            console.error('Error loading SVG:', error);
            document.getElementById('loadingMessage').innerHTML = 
                'Failed to load phylogenetic tree. Please check that the SVG file exists at: ' + svgPath;
        });
}

function setupInteractivity() {
    // Make species tips clickable
    const textElements = svgElement.querySelectorAll('text');
    textElements.forEach(text => {
        const textContent = text.textContent.trim();
        // Check if this text element might be a species name
        if (textContent && textContent.length > 2 && !textContent.includes('node')) {
            const speciesKey = textContent.replace(/\s+/g, '_');
            
            // Create a clickable group
            const parent = text.parentNode;
            parent.classList.add('species-tip');
            parent.setAttribute('data-species', speciesKey);
            
            // Add click handler
            parent.addEventListener('click', () => openSpeciesPage(speciesKey, textContent));
        }
    });

    // Setup pan functionality
    const viewer = document.getElementById('treeViewer');
    viewer.addEventListener('mousedown', startDragging);
    viewer.addEventListener('mousemove', drag);
    viewer.addEventListener('mouseup', stopDragging);
    viewer.addEventListener('mouseleave', stopDragging);

    // Setup zoom with mouse wheel
    viewer.addEventListener('wheel', handleWheel);
}

function openSpeciesPage(speciesKey, speciesName) {
    window.location.href = `species_details.html?species=${speciesKey}`;  
}

function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom *= 1.2;
        applyZoom();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom /= 1.2;
        applyZoom();
    }
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
    // Reset pan position
    const viewer = document.getElementById('treeViewer');
    viewer.scrollLeft = 0;
    viewer.scrollTop = 0;
}

function applyZoom() {
    if (svgElement) {
        svgElement.style.transform = `scale(${currentZoom})`;
        document.getElementById('zoomInfo').textContent = `Zoom: ${Math.round(currentZoom * 100)}%`;
    }
}

function handleWheel(event) {
    event.preventDefault();
    if (event.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}

function startDragging(event) {
    if (event.target.closest('.species-tip')) return; // Don't drag when clicking species
    
    isDragging = true;
    const viewer = document.getElementById('treeViewer');
    startX = event.pageX - viewer.offsetLeft;
    startY = event.pageY - viewer.offsetTop;
    scrollLeft = viewer.scrollLeft;
    scrollTop = viewer.scrollTop;
    viewer.style.cursor = 'grabbing';
}

function drag(event) {
    if (!isDragging) return;
    event.preventDefault();
    
    const viewer = document.getElementById('treeViewer');
    const x = event.pageX - viewer.offsetLeft;
    const y = event.pageY - viewer.offsetTop;
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;
    viewer.scrollLeft = scrollLeft - walkX;
    viewer.scrollTop = scrollTop - walkY;
}

function stopDragging() {
    isDragging = false;
    document.getElementById('treeViewer').style.cursor = 'grab';
}

function toggleFullscreen() {
    const viewer = document.getElementById('treeViewer');
    if (!document.fullscreenElement) {
        viewer.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPhylogeneticTree();
});

// Handle fullscreen changes
document.addEventListener('fullscreenchange', function() {
    const viewer = document.getElementById('treeViewer');
    if (document.fullscreenElement) {
        viewer.style.height = '100vh';
    } else {
        viewer.style.height = '600px';
    }
});