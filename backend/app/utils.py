import numpy as np
import cv2
import torch
import json

def calculate_paint_cost(masks, classes, class_names, front_door_area, torch_width, torch_extrusion,
                         paint_cost_per_liter, img):
    elements = []
    for i in range(masks.shape[0]):
        mask = masks[i].cpu()
        class_index = int(classes[i])
        class_name = class_names[class_index]
        mask_resized = cv2.resize(np.array(mask), (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)
        area_pixels = torch.sum(mask).item()
        scale_factor = front_door_area / torch.sum(masks[0]).item()
        area_m2 = area_pixels * scale_factor
        contours, _ = cv2.findContours(mask_resized.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        perimeter = cv2.arcLength(contours[0], True)
        processing_area = area_m2 * (1 + torch_width) * (1 + torch_extrusion)
        paint_required = processing_area / 10
        paint_cost = paint_required * paint_cost_per_liter * 50
        elements.append({
            "element": class_name,
            "physical_area_m2": round(area_m2, 2),
            "processing_area_m2": round(processing_area, 2),
            "paint_cost": round(paint_cost, 2)
        })
    return json.dumps(elements, indent=4, ensure_ascii=False)

def get_labeled_image(class_names, classes, masks, labeled_image, img):
    for i in range(masks.shape[0]):
        color = tuple(np.random.randint(0, 256, 3).tolist())
        mask_resized = cv2.resize(np.array(masks[i].cpu()), (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)
        contours, _ = cv2.findContours(mask_resized.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cv2.drawContours(labeled_image, contours, -1, color, 5)
        class_index = int(classes[i])
        class_name = class_names[class_index]
        cv2.putText(labeled_image, class_name, (int(contours[0][:, 0, 0].mean()), int(contours[0][:, 0, 1].mean())),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
    return labeled_image
