from flask import Flask
from firebase_admin import credentials, initialize_app
from .routes import main
from .config import Config

def create_app():
    # Initialize the Flask application
    app = Flask(__name__)
    
    # Load configuration from Config class
    app.config.from_object(Config)

    # Initialize Firebase Admin SDK
    cred = credentials.Certificate(app.config['FIREBASE_CREDENTIALS'])
    initialize_app(cred)

    # Register the main Blueprint for routes
    app.register_blueprint(main)

    return app
