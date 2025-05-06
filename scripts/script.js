/* Library script */

/* Book definition */
class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

/* Books array */
const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function removeBookFromLibrary(bookId) {
    // Find book in list and remove it
    const libraryIndex = myLibrary.findIndex(myBook => myBook.id === bookId);
    if (libraryIndex !== -1) {
        myLibrary.splice(libraryIndex, 1);
    }
}

function updateReadFromLibrary(bookId) {
    // Find book in list and update it
    const libraryIndex = myLibrary.findIndex(myBook => myBook.id === bookId);
    if (libraryIndex !== -1) {
        myLibrary[libraryIndex].toggleRead();
    }
}

/* Page interaction */
const booksContainer = document.querySelector('#books-container');

const formAddBook = document.querySelector('#form-add-book');
const buttonShowDialogAddBook = document.querySelector('#button-show-dialog-add-book');
const dialogAddBook = document.querySelector('#dialog-add-book');
const buttonCancelAddBook = document.querySelector('#button-cancel-add-book');
const buttonConfirmAddBook = document.querySelector('#button-confirm-add-book');

const inputBookTitle = document.querySelector('#book-title');
const inputBookAuthor = document.querySelector('#book-author');
const inputBookPages = document.querySelector('#book-pages');
const inputBookRead = document.querySelector('#book-read');

function displayBook(book) {
    const bookCard = document.createElement('div');
    bookCard.setAttribute('data-id', book.id.toString());
    bookCard.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    bookCard.appendChild(cardInner);

    const infoTitle = document.createElement('div');
    infoTitle.textContent = book.title;
    cardInner.appendChild(infoTitle);
    const infoAuthor = document.createElement('div');
    infoAuthor.textContent = book.author;
    cardInner.appendChild(infoAuthor);
    const infoPages = document.createElement('div');
    infoPages.textContent = `${book.pages} pages`;
    cardInner.appendChild(infoPages);
    const infoRead = document.createElement('div');
    infoRead.textContent = book.read ? "Already read" : "Not read yet";
    cardInner.appendChild(infoRead);


    const bookButtons = document.createElement('div');
    bookButtons.classList.add('card-button-container');
    cardInner.appendChild(bookButtons);

    const toggleReadButton = document.createElement('button');
    toggleReadButton.setAttribute('type', 'button');
    toggleReadButton.textContent = book.read ? "Set not read yet" : "Set already read";
    bookButtons.appendChild(toggleReadButton);
    toggleReadButton.addEventListener('click', (event) => {
        const bookId = bookCard.getAttribute('data-id');
        updateReadFromLibrary(bookId);
        // Update book card
        infoRead.textContent = book.read ? "Already read" : "Not read yet";
        toggleReadButton.textContent = book.read ? "Set not read yet" : "Set already read";
    });

    const removeBookButton = document.createElement('button');
    removeBookButton.setAttribute('type', 'button');
    removeBookButton.textContent = "Remove";
    bookButtons.appendChild(removeBookButton);
    removeBookButton.addEventListener('click', (event) => {
        const bookId = bookCard.getAttribute('data-id');
        removeBookFromLibrary(bookId);
        // Remove book card from page
        booksContainer.removeChild(bookCard);
    });
    booksContainer.appendChild(bookCard);
}

function displayBooks() {
    for (let i=0; i<myLibrary.length; i++) {
        const book = myLibrary[i];
        displayBook(book);
    }
}

function closeDialogAddBook() {
    formAddBook.reset();
    dialogAddBook.close();
}

function pageAddBook(title, author, pages, read) {
    addBookToLibrary(title, author, pages, read);
    displayBook(myLibrary[myLibrary.length - 1]);
}

buttonShowDialogAddBook.addEventListener('click', (event) => {
    dialogAddBook.showModal();
});

buttonCancelAddBook.addEventListener('click', (event) => {
    closeDialogAddBook();
});

buttonConfirmAddBook.addEventListener('click', (event) => {
    if (!formAddBook.checkValidity()) {
        return;
    }
    event.preventDefault()
    pageAddBook(
        inputBookTitle.value.toString(),
        inputBookAuthor.value.toString(),
        parseInt(inputBookPages.value),
        inputBookRead.checked
    );
    closeDialogAddBook();
});

/* Initial library */
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
addBookToLibrary("Alice in Wonderland", "Lewis Carroll", 128, true);
addBookToLibrary("The Metamorphosis", "Franz Kafka", 112, true);
/* Display initial books */
displayBooks();