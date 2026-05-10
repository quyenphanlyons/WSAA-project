from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from dao.bookDAO import bookDAO

# Create an instance of the Flask application
app = Flask(__name__)

# Enable CORS for the app so that requests from different origins are allowed
# (useful when frontend and backend run on different ports during development)
CORS(app)

# Ensure the database table is created when the application starts
bookDAO.createTable()

# Define route for the home page
@app.route('/')
def home():
    return render_template('index.html')


# REST API ROUTES

# CREATE book
@app.route('/books', methods=['POST'])
def createBook():
    if not request.json:
        return jsonify({'message': 'Invalid request'}), 400

    book = {
        'title': request.json['title'],
        'author': request.json['author'],
        'genre': request.json.get('genre', ''),
        'rating': request.json.get('rating', None),
        'status': request.json.get('status', 'Unread'),
        'notes': request.json.get('notes', '')
    }

    createdBook = bookDAO.create(book)

    return jsonify(createdBook), 201

# GET all books
@app.route('/books', methods=['GET'])
def getAllBooks():
    books = bookDAO.getAll()
    return jsonify(books)


# GET one book
@app.route('/books/<int:id>', methods=['GET'])
def findBookById(id):
    book = bookDAO.findById(id)

    if book is None:
        return jsonify({'message': 'Book not found'}), 404

    return jsonify(book)

# UPDATE book
@app.route('/books/<int:id>', methods=['PUT'])
def updateBook(id):

    foundBook = bookDAO.findById(id)

    if foundBook is None:
        return jsonify({'message': 'Book not found'}), 404

    if not request.json:
        return jsonify({'message': 'Invalid request'}), 400

    updatedBook = {
        'title': request.json['title'],
        'author': request.json['author'],
        'genre': request.json.get('genre', ''),
        'rating': request.json.get('rating', None),
        'status': request.json.get('status', 'Unread'),
        'notes': request.json.get('notes', '')
    }

    bookDAO.update(id, updatedBook)

    return jsonify(updatedBook)

# DELETE book
@app.route('/books/<int:id>', methods=['DELETE'])
def deleteBook(id):

    foundBook = bookDAO.findById(id)

    if foundBook is None:
        return jsonify({'message': 'Book not found'}), 404

    bookDAO.delete(id)

    return jsonify({'message': 'Book deleted successfully'})


if __name__ == '__main__':
    # Run the Flask development server with debug mode enabled
    app.run(debug=True)