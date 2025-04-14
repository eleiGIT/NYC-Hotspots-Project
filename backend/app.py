import os
from flask import Flask, jsonify, request
from pymongo import MongoClient
import certifi   
from dotenv import load_dotenv
from math import radians, sin, cos, sqrt, atan2


load_dotenv()
mongo_uri = os.getenv('MONGO_URI')

app = Flask(__name__)


#landing page
@app.route('/')
def landing_page():
    return '''
        <html>
            <body>
                <h1>Landing page for NYC Hotspots.</h1>
                <p>Click <a href="http://localhost:5000/api/hotspots">here</a> to see all hotspots.</p>
            <body>
        <html>
'''

#connect to my mongo db database3
try:
    client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
    db = client['hotspots']
    collection = db['Filtered_Hotspot_data']

    collection.create_index([("location", "2dsphere")]) #maybe

    print("Connected to MongoDB")
except Exception as e: 
    print(f"Failed to connect to Mongo DB: {e}")


#fetches all hotspots on database. WHen user first enters the site. Now supports filters
#http://127.0.0.1:5000/api/hotspots to see list of hotspots#
#http://localhost:5000/api/hotspots?provider=SPECTRUM&type=Limited%20Free
#http://127.0.0.1:5000/api/hotspots?type=Partner%20Site
#http://127.0.0.1:5000/api/hotspots?provider=Transit%20Wireless,SPECTRUM,Partner

@app.route('/api/hotspots', methods = ['GET'])
def get_hotspots():
    try:
        provider = request.args.get('provider', '').split(',')
        type = request.args.get('type', '').split(',')
        query = {}
        if provider and provider[0]:
            query["Provider"] = {"$in": provider}
        if type and type[0]:
            query["Type"] = {"$in": type}

        hotspots = list(collection.find(query, {'_id' : 0}))

        if not hotspots:
            return jsonify({"error": f"No hotspots with these filters"}), 404
        
        return jsonify(hotspots)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#updated zip code method that includes optional parameters
#to test:
#http://127.0.0.1:5000/api/hotspots/zip/10001
#http://127.0.0.1:5000/api/hotspots/zip/11377?type=Free&provider=Transit%20Wireless
#http://127.0.0.1:5000/api/hotspots/zip/11235?type=Free
#http://127.0.0.1:5000/api/hotspots/zip/10018?type=Partner%20Site
#http://127.0.0.1:5000/api/hotspots/zip/11377?provider=Transit%20Wireless,SPECTRUM&type=Free,Limited%20Free
#http://127.0.0.1:5000/api/hotspots/zip/11377?type=Free,Limited%20Free&provider=Transit%20Wireless,SPECTRUM,QPL
@app.route('/api/hotspots/zip/<int:zip_code>', methods=['GET'])
def get_hotspots_by_zip(zip_code):
    try: 
        provider = request.args.get('provider', '').split(',')
        type = request.args.get('type', '').split(',')

        query = {"Postcode": zip_code}
        if provider and provider[0]:
            query["Provider"] = {"$in": provider}
        if type and type[0]:
            query["Type"] = {"$in": type}

        hotspots = list(collection.find(query, {'_id' : 0}))

        if not hotspots:
            return jsonify({"error": f"No hotspots with these filters found in {zip_code}"}), 404
        
        return jsonify(hotspots)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# Helper function for get_nearby_hotspots. Used to calculate the distance between two coordinates
def haversine(lat1, lon1, lat2, lon2):
    R = 6378
    dLat = radians(lat2 - lat1)
    dLon = radians(lon2 - lon1)
    a = sin(dLat/2) * sin(dLat/2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dLon/2) * sin(dLon/2)
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    distance = R * c * 0.621371
    return distance

# method for finding nearby hotspots
# can input within specific # of miles. We plan to have 1,3, and 5 miles be the filter options. Defaults to 1 if not specified. Works with filters
# to test:
# http://127.0.0.1:5000/api/hotspots/nearby?lat=40.74460494493078&long=-73.91146732863996&distance=1
# http://127.0.0.1:5000/api/hotspots/nearby?lat=40.74460494493078&long=-73.91146732863996&distance=3&type=Free&provider=Transit%20Wireless
@app.route('/api/hotspots/nearby', methods=['GET'])
def get_nearby_hotspots():

        # filters the list of all hotspots based on provider and type
    try:
        provider = request.args.get('provider', '').split(',')
        type = request.args.get('type', '').split(',')
        query = {}
        if provider and provider[0]:
            query["Provider"] = {"$in": provider}
        if type and type[0]:
            query["Type"] = {"$in": type}

        all_hotspots = list(collection.find(query, {'_id' : 0}))

        # creates array for the qualifying hotspots
        hotspots_within_distance = []

        lat = float(request.args.get('lat'))
        long = float(request.args.get('long'))
        distance = float(request.args.get('distance', 1))

        # goes through all_hotspots, only adding hotspots within the set range to hotspots_within_distance
        for hotspot in all_hotspots:
            hotspot_lat = hotspot['Latitude']
            hotspot_long = hotspot['Longitude']
            dist = haversine(lat, long, hotspot_lat, hotspot_long)
            if dist <= distance:
                hotspot['distance'] = dist  
                hotspots_within_distance.append(hotspot)
        
        # Sorts by distance
            hotspots_within_distance.sort(key=lambda x: x['distance'])
        
        if not hotspots_within_distance:
            return jsonify({"error": f"No hotspots found within {distance} mile(s) of your location"}), 404
        
        return jsonify(hotspots_within_distance)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

    
if __name__ == '__main__':
    app.run(debug=True)