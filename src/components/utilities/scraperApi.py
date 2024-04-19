from flask import Flask, request, jsonify
from msrpScraper import get_car_data
from flask_cors import CORS
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
CORS(app)

@app.route('/api/car-data', methods=['GET'])
def get_car_data_api():
    make = request.args.get('make')
    model = request.args.get('model')
    if not make or not model:
        return jsonify({"error": "Missing make or model parameters"}), 400

    try:
        result = get_car_data(make, model)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)