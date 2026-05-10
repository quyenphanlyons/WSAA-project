const apiUrl = "/books";

const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");


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
        rating: document.getElementById("rating").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value
    };

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