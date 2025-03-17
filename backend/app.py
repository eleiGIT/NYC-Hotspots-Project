import os
from flask import Flask, jsonify, request
from pymongo import MongoClient
import certifi   
from dotenv import load_dotenv

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')

app = Flask(__name__)

#connect to my mongo db database3
try:
    client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
    db = client['hotspots']
    collection = db['Filtered_Hotspot_data']
    print("Connected to MongoDB")
except Exception as e: 
    print(f"Failed to connect to Mongo DB: {e}")


#fetches all hotspots on database. WHen user first enters the site
#http://127.0.0.1:5000/api/hotspots to see list of hotspots#
@app.route('/api/hotspots', methods = ['GET'])
def get_hotspots():
    try:
        hotspots = list(collection.find({}, {'_id': 0}))
        return jsonify(hotspots)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#method to get specific zip code hotspots
"""
@app.route('/api/hotspots/zip/<zip_code>', methods=['GET'])
def get_hotspots_by_zip(zip_code):
    try:
        hotspots = list(collection.find({"Postcode": int(zip_code)}, {'_id': 0}))
        if not hotspots:
            return jsonify({"error": f"No hotspots found for zip code {zip_code}"}), 404
        return jsonify(hotspots)
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
"""
#updated zip code method that includes optional parameters
#to test:
#http://127.0.0.1:5000/api/hotspots/zip/10001
#http://127.0.0.1:5000/api/hotspots/zip/11377?type=Free&provider=Transit%20Wireless
#http://127.0.0.1:5000/api/hotspots/zip/11235?type=Free
#http://127.0.0.1:5000/api/hotspots/zip/10018?type=Partner%20Site

@app.route('/api/hotspots/zip/<int:zip_code>', methods=['GET'])
def get_hotspots_by_zip(zip_code):
    try: 
        provider = request.args.get('provider')
        type = request.args.get('type')

        query = {"Postcode": zip_code}
        if provider:
            query["Provider"] = provider
        if type:
            query["Type"] = type

        hotspots = list(collection.find(query, {'_id' : 0}))


        if not hotspots:
            return jsonify({"error": f"No hotspots with these filters found in {zip_code}"}), 404
        
        return jsonify(hotspots)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True)