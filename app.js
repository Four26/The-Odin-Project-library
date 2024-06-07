document.addEventListener('DOMContentLoaded', ()=>{
    const dialog = document.querySelector("#dialog");
    const showButton = document.querySelector("#show-dialog");
    const closeButton = document.querySelector("#close-dialog");
    const form = document.querySelector("#book-form");


    // "Show the dialog" button opens the dialog modally
    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    // "Close" button closes the dialog
    closeButton.addEventListener("click", () => {
        dialog.close();
    });


    let  myLibrary = [];

    function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    function addBookToLibrary(title, author, pages, read){
        let book = new Book(title, author, pages, read);
        myLibrary.push(book);
        displayBooks();
    }

    // Form submission event listener
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting normally
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#pages").value;
        const read = document.querySelector("#read").checked;
        addBookToLibrary(title, author, pages, read);
        dialog.close(); // Close the dialog after adding the book
        form.reset(); // Reset the form after adding the book
    });

    function displayBooks(){
        const bookContainer = document.querySelector("#book-container");
        bookContainer.innerHTML = "";
        myLibrary.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.dataset.index = index;
            bookCard.innerHTML = `
                <h2>Title: ${book.title}</h2>
                <h3>Author: ${book.author}</h3>
                <p>Pages: ${book.pages} pages</p>
                <button type="button" class="read-status btn btn-outline-info">${book.read ? "Read" : "Not Read"}</button>
                <button type="button" class="delete-book btn btn-outline-danger">Delete</button>
            `;
            bookContainer.appendChild(bookCard);

            // Add event listener for the read status button
            const readStatusButton = bookCard.querySelector(".read-status");
            readStatusButton.addEventListener("click", () => {
                toggleReadStatus(index);
            });

            // Add event listener for the delete button
            const deleteButton = bookCard.querySelector(".delete-book");
            deleteButton.addEventListener("click", () => {
                deleteBook(index);
            });
        });

        function toggleReadStatus(index) {
            myLibrary[index].read = !myLibrary[index].read;
            displayBooks();
        }

        function deleteBook(index) {
            myLibrary.splice(index, 1);
            displayBooks();
        }
    }

});