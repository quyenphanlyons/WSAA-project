import sqlite3  # database interaction

class BookDAO:

    def __init__(self):
        # Name the sqlitedatabase file
        self.db = 'books.db'

    def createTable(self):
        # Create connection to sqlite database
        connection = sqlite3.connect(self.db)
        # Create a cursor object to execute SQL commands
        cursor = connection.cursor()

        # Create the 'books' table that stores book information:
        # id      -> unique identifier (primary key)
        # title   -> book title
        # author  -> book author
        # genre   -> category of the book
        # rating  -> user rating (1-5)
        # status  -> reading status ("read", "reading", "to-read")
        # notes   -> additional comments or notes

        sql = """
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT,
            rating INTEGER CHECK(rating IS NULL OR (rating >= 1 AND rating <= 5)),
            status TEXT,
            notes TEXT
        )
        """

        # Execute the SQL command
        cursor.execute(sql)
        # Save changes
        connection.commit()
        # Close the connection
        connection.close()

# CREATE: add a new book to the database
    def create(self, book):
        connection = sqlite3.connect(self.db)
        cursor = connection.cursor()

        sql = '''
        INSERT INTO books (title, author, genre, rating, status, notes)
        VALUES (?, ?, ?, ?, ?, ?)
        '''

        values = (
            book['title'],
            book['author'],
            book['genre'],
            book['rating'],
            book['status'],
            book['notes']
        )

        cursor.execute(sql, values)

        book_id = cursor.lastrowid

        connection.commit()
        connection.close()

        book['id'] = book_id

        return book

    # READ ALL: listall books from the database
    def getAll(self):
        connection = sqlite3.connect(self.db)
        cursor = connection.cursor()

        sql = 'SELECT * FROM books'

        cursor.execute(sql)

        results = cursor.fetchall()

        connection.close()

        books = []

        for result in results:
            book = {
                'id': result[0],
                'title': result[1],
                'author': result[2],
                'genre': result[3],
                'rating': result[4],
                'status': result[5],
                'notes': result[6]
            }

            books.append(book)

        return books

    # READ ONE: find a specific book by its id
    def findById(self, id):
        connection = sqlite3.connect(self.db)
        cursor = connection.cursor()

        sql = 'SELECT * FROM books WHERE id = ?'

        values = (id,)

        cursor.execute(sql, values)

        result = cursor.fetchone()

        connection.close()

        if result is None:
            return None

        book = {
            'id': result[0],
            'title': result[1],
            'author': result[2],
            'genre': result[3],
            'rating': result[4],
            'status': result[5],
            'notes': result[6]
        }

        return book

    # UPDATE: edit a book
    def update(self, id, book):
        connection = sqlite3.connect(self.db)
        cursor = connection.cursor()

        sql = '''
        UPDATE books
        SET title = ?,
            author = ?,
            genre = ?,
            rating = ?,
            status = ?,
            notes = ?
        WHERE id = ?
        '''

        values = (
            book['title'],
            book['author'],
            book['genre'],
            book['rating'],
            book['status'],
            book['notes'],
            id
        )

        cursor.execute(sql, values)

        connection.commit()
        connection.close()

    # DELETE: remove a book from the database
    def delete(self, id):
        connection = sqlite3.connect(self.db)
        cursor = connection.cursor()

        sql = 'DELETE FROM books WHERE id = ?'

        values = (id,)

        cursor.execute(sql, values)

        connection.commit()
        connection.close()


# Create an instance of the BookDAO class
# This allows other parts of the application to use it
bookDAO = BookDAO()