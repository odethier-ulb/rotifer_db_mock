const speciesDatabase = {
    'Adineta_vaga': {
        scientificName: 'Adineta vaga',
        taxId: 'Taxonomy ID: 104782',
        classification: {
            Kingdom: 'Animalia',
            Phylum: 'Rotifera',
            Class: 'Bdelloidea',
            Order: 'Bdelloida',
            Family: 'Adinetidae',
            Genus: 'Adineta'
        },
        images: [
            {
                src: 'images/species/adineta_vaga_1.jpg',
                caption: 'Adult specimen - lateral view',
                fallback: 'Microscopy Image 1'
            },
            {
                src: 'images/species/adineta_vaga_2.jpg',
                caption: 'Adult specimen - lateral view',
                fallback: 'Microscopy Image 2'
            },
        ],
        downloads: [
            {
                title: 'Reference Genome Assembly',
                description: 'GenBank GCA_021613535.1',
                icon: '🧬',
                url: 'https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/021/613/535/GCA_021613535.1_ASM2161353v1/GCA_021613535.1_ASM2161353v1_genomic.fna.gz',
                fileSize: '30 MB'
            },
            {
                title: 'Genome Annotation',
                description: 'GenBank GCA_021613535.1',
                icon: '📋',
                url: 'https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/021/613/535/GCA_021613535.1_ASM2161353v1/GCA_021613535.1_ASM2161353v1_genomic.gff.gz',
                fileSize: '5.1 MB'
            },
            {
                title: 'Protein Sequences',
                description: 'GenBank GCA_021613535.1',
                icon: '🔤',
                url: 'https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/021/613/535/GCA_021613535.1_ASM2161353v1/GCA_021613535.1_ASM2161353v1_protein.faa.gz',
                fileSize: '8.4 MB'
            }
        ],
        literature: [
            {
                title: 'Chromosome-level genome assembly reveals homologous chromosomes and recombination in asexual rotifer Adineta vaga',
                authors: 'Simion, P., et al.',
                journal: 'Science Advances',
                url: 'https://doi.org/10.1126/sciadv.abg4216'
            }
        ]
    },
};

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function formatSpeciesName(speciesParam) {
    if (!speciesParam) return 'Unknown Species';
    return speciesParam.replace(/_/g, ' ');
}

function loadSpeciesData() {
    const speciesParam = getUrlParameter('species');
    const formattedName = formatSpeciesName(speciesParam);
    
    // Update page title and species name
    document.getElementById('pageTitle').textContent = `${formattedName} - Rotifer Database`;
    document.getElementById('speciesName').textContent = formattedName;

    // Get species data
    const speciesData = speciesDatabase[speciesParam];
    
    if (speciesData) {
        // Update common name
        document.getElementById('taxId').textContent = speciesData.taxId;
        
        // Load classification
        loadClassification(speciesData.classification);
        
        // Load images
        loadImages(speciesData.images);
        
        // Load downloads
        loadDownloads(speciesData.downloads);
        
        // Load literature
        loadLiterature(speciesData.literature);
    } else {
        // Handle unknown species
        document.getElementById('commonName').textContent = 'Species data not available';
        loadNoData();
    }
}

function loadClassification(classification) {
    const container = document.getElementById('classificationContent');
    let html = '';
    
    for (const [rank, value] of Object.entries(classification)) {
        html += `
            <div class="classification-item">
                <div class="classification-rank">${rank}:</div>
                <div class="classification-value">${value}</div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function loadImages(images) {
    const container = document.getElementById('imageGallery');
    
    if (!images || images.length === 0) {
        container.innerHTML = '<div class="no-data">No images available for this species</div>';
        return;
    }
    
    let html = '';
    images.forEach((image, index) => {
        html += `
            <div class="image-item">
                <div class="placeholder-image" onclick="openModal('${image.src}', '${image.caption}')">
                    ${image.fallback}
                </div>
                <div class="image-caption">${image.caption}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadDownloads(downloads) {
    const container = document.getElementById('downloadsGrid');
    
    if (!downloads || downloads.length === 0) {
        container.innerHTML = '<div class="no-data">No genomic resources available for this species</div>';
        return;
    }
    
    let html = '';
    downloads.forEach(download => {
        html += `
            <div class="download-item">
                <div class="download-icon">${download.icon}</div>
                <div class="download-title">${download.title}</div>
                <div class="download-description">${download.description}</div>
                <a href="${download.url}" class="download-btn" onclick="handleDownload('${download.url}')">
                    Download (${download.fileSize})
                </a>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadLiterature(literature) {
    const container = document.getElementById('literatureContent');
    
    if (!literature || literature.length === 0) {
        container.innerHTML = '<div class="no-data">No literature available for this species</div>';
        return;
    }
    
    let html = '';
    literature.forEach(paper => {
        html += `
            <div class="literature-item">
                <div class="literature-title" onclick="openLiterature('${paper.url}')">
                    ${paper.title}
                </div>
                <div class="literature-authors">${paper.authors}</div>
                <div class="literature-journal">${paper.journal}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadNoData() {
    document.getElementById('classificationContent').innerHTML = '<div class="no-data">Classification data not available</div>';
    document.getElementById('imageGallery').innerHTML = '<div class="no-data">No images available</div>';
    document.getElementById('downloadsGrid').innerHTML = '<div class="no-data">No genomic resources available</div>';
    document.getElementById('literatureContent').innerHTML = '<div class="no-data">No literature available</div>';
}

function openModal(imageSrc, caption) {
    // For demo purposes, show placeholder
    alert(`Would open image: ${caption}`);
    // Uncomment below for actual image modal:
    // document.getElementById('modalImage').src = imageSrc;
    // document.getElementById('imageModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

function handleDownload(url) {
    // Handle download - for demo, show alert
    alert(`Would download file: ${url}`);
    return false;
}

function openLiterature(url) {
    if (url) {
        window.open(url, '_blank');
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', loadSpeciesData);