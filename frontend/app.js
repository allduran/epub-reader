// Import necessary modules
const Book = require("./book");
const Rendition = require("./rendition");
const CFI = require("./epubcfi");
const utils = require("./utils/core");

/**
 * Read and render an EPUB file
 * @param {File} file - EPUB file to be rendered
 */
function readEPUB(file) {
    // Get the viewer element
    const viewer = document.getElementById('viewer');

    // Create a new Book instance with the uploaded EPUB file
    const book = new Book(file);

    // Set up a rendition to render the book to the viewer element
    const rendition = new Rendition(book, {
        flow: "auto", // You can adjust the flow as needed
        width: "100%", // Set the width of the viewer
        height: "100%" // Set the height of the viewer
    });

    // Display the book
    rendition.display();

    // Event listener for page changes
    rendition.on('relocated', function (location) {
        // Save the current page to localStorage or perform other actions
        localStorage.setItem('currentPage', location.start.cfi);
    });

    // Load the last read page if available
    const lastPage = localStorage.getItem('currentPage');
    if (lastPage) {
        rendition.display(lastPage);
    }
}

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', function () {
    readEPUB(this.files[0]);
});

// Your existing functions and code can go below this point
// ...

// Example: Handle PDF files (you can adapt this for other file types)
function readPDF(file) {
    // Handle PDF file reading logic here
    console.log('Reading PDF:', file.name);
}

// Example: Attach event listener for PDF files
document.getElementById('fileInput').addEventListener('change', function () {
    const file = this.files[0];
    const fileType = getFileType(file.name);

    if (fileType === 'epub') {
        readEPUB(file);
    } else if (fileType === 'pdf') {
        readPDF(file);
    } else {
        console.error('Unsupported file type.');
    }
});

// Helper function to get file type based on file extension
function getFileType(fileName) {
    return fileName.split('.').pop().toLowerCase();
}
