# Web Services and Applications Project - BookVault
Author Quyen Phan


BookVault is a hosted web application that allows users to manage a personal library using full CRUD functionality (Create, Read, Update, Delete).

Users can:
- Add books
- View books
- Edit book information
- Delete books
- Search/filter books


## Live Application

PythonAnywhere Deployment:

https://quyenphanlyons.pythonanywhere.com



## Technologies Used

#### Backend
- Python
- Flask
- Flask-CORS
- SQLite

#### Frontend
- HTML
- CSS
- JavaScript
- Bootstrap

#### Hosting
- PythonAnywhere

#### Version Control
- GitHub


## Features

#### CRUD Operations

- Create: Users can add new books to the database.
- Read: All books stored in the database are displayed in the application.
- Update: Users can edit existing book information.
- Delete: Users can remove books from the database with a confirmation popup.
- Search / Filter: Users can search books by title or author.

#### Dynamic Frontend
The frontend communicates with the Flask REST API using JavaScript fetch/AJAX requests without reloading the page.

## Project Structure

| File / Folder | Description |
|---|---|
| app.py | Main Flask application |
| books.db | SQLite database |
| dao/bookDAO.py | Database access functions |
| templates/index.html | Main HTML page |
| static/script.js | Frontend JavaScript logic |
| static/style.css | CSS styling |
| README.md | Project documentation |
| requirements.txt | Python dependencies |
