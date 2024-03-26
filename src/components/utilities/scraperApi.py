from flask import Flask, request, jsonify
from msrpScraper import findCarMSRP 
import asyncio
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get-msrp', methods=['GET'])
def get_msrp():
    make = request.args.get('make')
    model = request.args.get('model')
    msrp_info = asyncio.run(findCarMSRP(make, model))
    return jsonify(msrp_info)

if __name__ == '__main__':
    app.run(debug=True)
