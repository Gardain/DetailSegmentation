import numpy as np
import cv2
import torch
from PIL import Image
from io import BytesIO
import json
import base64
from ultralytics import YOLO
from .utils import get_labeled_image, calculate_paint_cost

model = YOLO("../models/segment/car_segmentation2/weights/best.pt")

def process_estimation(file, torch_width, torch_extrusion, paint_cost_per_liter):

    front_door_area = 1

    img_np = np.array(Image.open(BytesIO(file.read())).convert("RGB"))
    img = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)

    results = model(img, imgsz=640, iou=0.4, conf=0.8)
    masks = results[0].masks.data
    classes = results[0].boxes.cls.cpu().numpy()
    class_names = results[0].names

    labeled_image = get_labeled_image(class_names, classes, masks, img.copy(), img)
    _, buffer = cv2.imencode('.jpg', labeled_image)
    labeled_base64 = base64.b64encode(buffer).decode('utf-8')

    json_data = calculate_paint_cost(
        masks, classes, class_names, front_door_area,
        torch_width, torch_extrusion, paint_cost_per_liter, img
    )

    return {
        "json_file": json.loads(json_data),
        "labeled_image": labeled_base64
    }
