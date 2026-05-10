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
            rating INTEGER CHECK(rating >= 1 AND rating <= 5),
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

# Create an instance of the BookDAO class
# This allows other parts of the application to use it
bookDAO = BookDAO()