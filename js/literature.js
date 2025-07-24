// Literature table functionality

let currentSort = { column: -1, direction: 'asc' };
let allRows = [];
let totalRows = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the table
    initializeTable();
    
    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(performSearch, 300));
    
    console.log('📖 Literature page loaded with interactive table!');
});

function initializeTable() {
    const tableBody = document.getElementById('tableBody');
    allRows = Array.from(tableBody.querySelectorAll('tr'));
    totalRows = allRows.length;
    updateResultsCount(totalRows, totalRows);
}

function sortTable(columnIndex) {
    const table = document.getElementById('literatureTable');
    const tbody = document.getElementById('tableBody');
    const rows = Array.from(tbody.querySelectorAll('tr:not(.hidden)'));
    
    // Determine sort direction
    let direction = 'asc';
    if (currentSort.column === columnIndex && currentSort.direction === 'asc') {
        direction = 'desc';
    }
    
    // Update sort state
    currentSort = { column: columnIndex, direction: direction };
    
    // Update header styling
    updateSortHeaders(columnIndex, direction);
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = getCellValue(a, columnIndex);
        const bValue = getCellValue(b, columnIndex);
        
        // Handle different data types
        let comparison = 0;
        
        if (columnIndex === 3) { // Date column
            comparison = new Date(aValue) - new Date(bValue);
        } else if (columnIndex === 5) { // Year column
            comparison = parseInt(aValue) - parseInt(bValue);
        } else {
            comparison = aValue.localeCompare(bValue, undefined, { numeric: true });
        }
        
        return direction === 'asc' ? comparison : -comparison;
    });
    
    // Clear tbody and re-append sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    console.log(`📊 Table sorted by column ${columnIndex} (${direction})`);
}

function getCellValue(row, columnIndex) {
    const cell = row.cells[columnIndex];
    // For DOI column, get the text content without HTML
    if (columnIndex === 4) {
        return cell.textContent || cell.innerText || '';
    }
    return cell.textContent || cell.innerText || '';
}

function updateSortHeaders(sortedColumn, direction) {
    const headers = document.querySelectorAll('.literature-table th.sortable');
    
    headers.forEach((header, index) => {
        header.classList.remove('sorted-asc', 'sorted-desc');
        if (index === sortedColumn) {
            header.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
        }
    });
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const tbody = document.getElementById('tableBody');
    let visibleCount = 0;
    
    // Show loading state
    const tableContainer = document.querySelector('.table-container');
    tableContainer.classList.add('loading');
    
    setTimeout(() => {
        allRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const isMatch = rowText.includes(searchTerm);
            
            if (isMatch || searchTerm === '') {
                row.classList.remove('hidden');
                // Highlight search terms
                if (searchTerm !== '') {
                    highlightSearchTerms(row, searchTerm);
                } else {
                    removeHighlights(row);
                }
                visibleCount++;
            } else {
                row.classList.add('hidden');
            }
        });
        
        updateResultsCount(visibleCount, totalRows);
        tableContainer.classList.remove('loading');
        
        console.log(`🔍 Search: "${searchTerm}" - ${visibleCount} results found`);
    }, 150);
}

function highlightSearchTerms(row, searchTerm) {
    const cells = row.querySelectorAll('td');
    
    cells.forEach(cell => {
        // Skip DOI links to avoid breaking them
        if (cell.querySelector('.doi-link')) return;
        
        const originalText = cell.textContent;
        const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
        const highlightedText = originalText.replace(regex, '<span class="highlight">$1</span>');
        
        if (highlightedText !== originalText) {
            cell.innerHTML = highlightedText;
        }
    });
}

function removeHighlights(row) {
    const highlightedElements = row.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
        const parent = element.parentNode;
        parent.replaceChild(document.createTextNode(element.textContent), element);
        parent.normalize();
    });
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateResultsCount(visible, total) {
    const resultsCount = document.getElementById('resultsCount');
    resultsCount.textContent = `Showing ${visible} of ${total} publications`;
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    performSearch();
    searchInput.focus();
}

// Debounce function to limit search frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        clearSearch();
    }
});

// Add smooth scrolling to table when searching
function scrollToTable() {
    document.querySelector('.table-container').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}