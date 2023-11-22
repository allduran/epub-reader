const fileInput = document.getElementById('fileInput');
const viewer = document.getElementById('viewer');
const loadButton = document.getElementById('loadButton'); // New button reference
let currentBook;

loadButton.addEventListener('click', handleFile); // Listen for button click

function handleFile() {
    const file = fileInput.files[0];

    if (file && file.name.endsWith('.epub')) {
        loadEPUB(file);
    } else {
        alert('Please select a valid EPUB file.');
    }
}

function loadEPUB(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        renderEPUB(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
}

function renderEPUB(arrayBuffer) {
    ePub(arrayBuffer).then(book => {
        currentBook = book;

        const rendition = book.renderTo(viewer, { width: '100%', height: '100%' });
        rendition.display();
    }).catch(error => {
        console.error('Error loading EPUB:', error);
    });
}
