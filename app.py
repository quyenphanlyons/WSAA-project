from flask import Flask, render_template
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

if __name__ == '__main__':
    # Run the Flask development server with debug mode enabled
    app.run(debug=True)