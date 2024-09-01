import firebase_admin
from flask import Flask, request, jsonify, send_file
from firebase_admin import credentials, firestore
from flask_cors import CORS
from detect_eggs import egg_counter
from ultralytics import YOLO
import numpy as np
import cv2

import io

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("./config/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load YOLO model (replace with model's actual path)
model = YOLO("./yolo/egg_counting_model.pt")

@app.route('/count_eggs', methods=['POST'])
def count_eggs():
    try:
        print("\n=================  COUNTING EGGS ===================\n")
        # image_path = './assets/egg_01.jpg'
        image_file = request.files['image']
        image_path = 'temp_image.jpg'
        image_file.save(image_path)
        count = egg_counter(image_path)
        print(count)
        return jsonify({"count": count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/')
def index():
    return "Welcome to the Egg Counting API"

if __name__ == '__main__':
    app.run(debug=True, port=1110)
