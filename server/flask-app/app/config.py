import os

class Config:
    # A secret key for securing sessions and other Flask-related security features
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-default-secret-key'
    
    # Path to your Firebase credentials JSON file
    FIREBASE_CREDENTIALS = os.environ.get('FIREBASE_CREDENTIALS') or 'path/to/your/firebase/credentials.json'

    # Any other configuration settings you might need
    DEBUG = os.environ.get('DEBUG') or True
