from flask import Blueprint, request, jsonify
from .logic import process_estimation

api_bp = Blueprint('api', __name__)

@api_bp.route('/estimate', methods=['POST'])
def estimate():
    file = request.files.get('file')
    torch_width = float(request.form.get('torch_width'))
    torch_extrusion = float(request.form.get('torch_extrusion'))
    paint_cost_per_liter = float(request.form.get('paint_cost_per_liter'))

    result = process_estimation(file, torch_width, torch_extrusion, paint_cost_per_liter)
    return jsonify(result)