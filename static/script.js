const apiUrl = "/books";

const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

const submitButton = document.getElementById("submitButton");

let editMode = false;
let currentBookId = null;

// Load books when page opens
window.onload = getBooks;


// ========================
// GET ALL BOOKS
// ========================

function getBooks() {

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayBooks(data))
        .catch(error => console.log(error));
}


// ========================
// DISPLAY BOOKS
// ========================

function displayBooks(books) {

    bookTableBody.innerHTML = "";

    books.forEach(book => {

        const row = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.rating}</td>
                <td>${book.status}</td>

                <td>

                    <button class="btn btn-warning btn-sm me-2"
                        onclick="editBook(${book.id})">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteBook(${book.id})">
                        Delete
                    </button>

                </td>
            </tr>
        `;

        bookTableBody.innerHTML += row;
    });
}


// ========================
// ADD BOOK
// ========================

bookForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const book = {

        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        rating: document.getElementById("rating").value || null,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value
    };

    // UPDATE MODE
    if (editMode) {

        fetch(`${apiUrl}/${currentBookId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(book)

        })
        .then(response => response.json())
        .then(data => {

            getBooks();

            bookForm.reset();

            editMode = false;
            currentBookId = null;

            submitButton.textContent = "Add Book";
        })
        .catch(error => console.log(error));
    }

    // CREATE MODE
    else {

        fetch(apiUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(book)

        })
        .then(response => response.json())
        .then(data => {

            getBooks();

            bookForm.reset();
        })
        .catch(error => console.log(error));
    }
});


// ========================
// DELETE BOOK
// ========================

function deleteBook(id) {

    fetch(`${apiUrl}/${id}`, {

        method: "DELETE"
    })
    .then(() => getBooks())
    .catch(error => console.log(error));
}


// ========================
// EDIT BOOK
// ========================

function editBook(id) {

    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(book => {

            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("genre").value = book.genre;
            document.getElementById("rating").value = book.rating || "";
            document.getElementById("status").value = book.status;
            document.getElementById("notes").value = book.notes;

            editMode = true;
            currentBookId = id;

            submitButton.textContent = "Update Book";
        })
        .catch(error => console.log(error));
}