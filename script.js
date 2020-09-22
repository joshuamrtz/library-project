let addModal = document.getElementById('add-modal'); 
let addBtn = document.getElementById('add-book');
let submitBtn = document.getElementById('submit-button');
let closeModal = document.getElementsByClassName('close')[0];


addBtn.onclick = function() {
    addModal.style.display = 'block';
}

closeModal.onclick = function() {
    addModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = 'none';
    }
} 

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function checkLocalStorage() {
    if (localStorage.length == 0 || localStorage.length == undefined) {
        let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien',
        '295 pages', true);
        myLibrary.push(theHobbit);

        let toKillAMockingBird = new Book('To Kill a Mockingbird',
        'Harper Lee', '281 pages', true);
        myLibrary.push(toKillAMockingBird);

        let outliers = new Book('Outliers', 'Malcolm Gladwell',
        '304 pages', true);
        myLibrary.push(outliers);

        let harryPotterAndTheSorcerersStone = new Book 
        ('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling',
        '293 pages', false);
        myLibrary.push(harryPotterAndTheSorcerersStone);

        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

        createBookCard(theHobbit);
        createBookCard(toKillAMockingBird);
        createBookCard(outliers);
        createBookCard(harryPotterAndTheSorcerersStone);
        return;
    } else {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        myLibrary.forEach(e => {
            createBookCard(e);
        })
    }
    return myLibrary
}

checkLocalStorage();

function createBookCard(book) {
    let display = document.getElementById('book-display');
    display.innerHtml = '';
    
    let bookCard = document.createElement('div');
    bookCard.classList.add('books');

    let title = document.createElement('h3');
    title.innerHTML = book.title;
    bookCard.appendChild(title);

    let line = document.createElement('hr');
    title.appendChild(line);

    let author = document.createElement('p');
    author.innerHTML = book.author;
    bookCard.appendChild(author);

    let pages = document.createElement('p');
    pages.innerHTML = book.pages;
    bookCard.appendChild(pages);

    let readBtn = document.createElement('button');
    if (book.read == true) {
        readBtn.innerHTML = 'Read';
        readBtn.classList.add('true-read-button');
    } else {
        readBtn.innerHTML = 'Not Read';
        readBtn.classList.add('false-read-button');
    }
    toggleReadStatus(readBtn, book);
    bookCard.appendChild(readBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.classList.add('delete-button');
    deleteBook(deleteBtn);
    bookCard.appendChild(deleteBtn);

    display.appendChild(bookCard);
}

function toggleReadStatus(button) {
    button.onclick = function () {
        function updateReadStatus() {
            myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
            let author = button.previousSibling.previousSibling.innerHTML;

            myLibrary.forEach(e => {
                if (e.author === author) {
                    if(e.read == true) {
                        e.read = false;
                        return;
                    } else {
                        e.read = true;
                        return;
                    }
                } else {
                    return;
                }
            })
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        }
        if (button.innerHTML == 'Read') {
            button.innerHTML = 'Not Read';
            button.classList.remove('true-read-button');
            button.classList.add('false-read-button');
            updateReadStatus();
            return;
        } else {
            button.innerText = 'Read';
            button.classList.remove('false-read-button');
            button.classList.add('true-read-button');
            updateReadStatus();
            return;
        }
    }
}

function deleteBook(button) {
    button.onclick = function () {
        button.parentNode.remove();
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        let author = button.previousSibling.previousSibling.previousSibling.innerHTML;

        myLibrary = myLibrary.filter(element => element.author !==author);
        console.log(myLibrary);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    createBookCard(book);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

submitBtn.onclick = function() {
    let titleInput = document.getElementById('title-input').value;
    let authorInput = document.getElementById('author-input').value;
    let pagesInput = document.getElementById('pages-input').value;
    let readInput = document.getElementById('read-input').checked;
    let bookBeingAdded = new Book(titleInput, authorInput, pagesInput, readInput);
    addBookToLibrary(bookBeingAdded);
}

