const apiUrl = "/books";

const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

const submitButton = document.getElementById("submitButton");

// Reference to the form title so it can switch
// between "Add Book" and "Edit Book"
const formTitle = document.getElementById("formTitle");

// Search input field
const searchInput = document.getElementById("searchInput");

let editMode = false;
let currentBookId = null;

// Store all books for filtering
let allBooks = [];

// Load books when page opens
window.onload = getBooks;

// Filter books while typing in the search box
searchInput.addEventListener("keyup", filterBooks);


// ========================
// GET ALL BOOKS
// ========================

function getBooks() {

    fetch(apiUrl)
        .then(response => response.json())
        // Store the books for searching/filtering
        .then(data => {
            allBooks = data;
            displayBooks(allBooks);
        })
        .catch(error => console.log(error));
}

// ADD SEARCH FUNCTION
// Filter books by title or author
function filterBooks() {

    const searchText = searchInput.value.toLowerCase();

    const filteredBooks = allBooks.filter(book =>

        book.title.toLowerCase().includes(searchText) ||

        book.author.toLowerCase().includes(searchText)
    );

    displayBooks(filteredBooks);
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

// Reset the form and return the page to normal "Add Book" mode
function clearForm() {

    bookForm.reset();

    // Exit edit mode
    editMode = false;
    currentBookId = null;

    // Restore default labels
    submitButton.textContent = "Add Book";
    formTitle.textContent = "Add Book";
}

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

            clearForm();

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

            clearForm();
        })
        .catch(error => console.log(error));
    }
});


// ========================
// DELETE BOOK
// ========================

function deleteBook(id) {

    // Ask user to confirm deletion
    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );

    // Stop if user clicks Cancel
    if (!confirmDelete) {
        return;
    }

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

            // Update form labels for edit mode
            submitButton.textContent = "Update Book";
            formTitle.textContent = "Edit Book";
        })
        .catch(error => console.log(error));
}