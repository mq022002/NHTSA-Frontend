from flask import Flask, request, jsonify
from msrpScraper import findCarMSRP 
from msrpScraper import scrape_link
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

@app.route('/api/scrape-link', methods=['GET'])
def api_scrape_link_endpoint():
    make = request.args.get('make')
    model = request.args.get('model')
    if not make or not model:
        return jsonify({"error": "Missing parameters"}), 400
    
    try:
        image_url, link_url = asyncio.run(scrape_link(make, model))
        return jsonify({"image_url": image_url, "link_url": link_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
