from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import torch
import cv2
import numpy as np

# Initialize Flask
app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("path/to/your/firebase/credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load your YOLOv10 model (replace with your model's actual path)
model = torch.hub.load('ultralytics/yolov10', 'yolov10', pretrained=True)

@app.route('/count_eggs', methods=['POST'])
def count_eggs():
    image_file = request.files['image']
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Process image with YOLO model
    results = model(image)
    egg_count = len(results.xyxy[0])  # Assuming this returns the bounding boxes

    return jsonify({"egg_count": egg_count})

@app.route('/classify_eggs', methods=['POST'])
def classify_eggs():
    image_file = request.files['image']
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Process image with YOLO model for classification
    results = model(image)
    classifications = results.pandas().xyxy[0].to_dict(orient="records")

    return jsonify({"classifications": classifications})

if __name__ == '__main__':
    app.run(debug=True)
