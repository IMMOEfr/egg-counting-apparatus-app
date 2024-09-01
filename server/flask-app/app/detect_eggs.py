from ultralytics import YOLO
import numpy as np
import cv2
from PIL import Image

def egg_counter(img_path):
    # Load YOLO model (replace with model's actual path)
    model = YOLO("./yolo/egg_counting_model.pt")
    #Open image  using PIL
    with Image.open(img_path) as img:
        img = img.resize((640,640))

    #perform prediction on image
    results = model(img)
    egg_count = 0  # Initialize the egg counter
    for result in results:
        for box in result.boxes:
            egg_count += 1  # Increment the egg counter for each detected box
    return egg_count

