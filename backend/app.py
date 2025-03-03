from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

#connect to my mongo db database3
#-------DONT FORGET TO REMOVE PASSWORD WHEN PUSHING!!!#-------
#mongodb+srv://edmondlei48:<PASSWORD>@cluster0.8rrzt.mongodb.net/
client = MongoClient('mongodb+srv://edmondlei48:<PASSWORD>@cluster0.8rrzt.mongodb.net/')
db = client['hotspots']
collection = db['Filtered_Hotspot_data']

#http://127.0.0.1:5000/api/hotspots to see list of hotspots#
@app.route('/api/hotspots', methods = ['GET'])
def get_hotspots():
    hotspots = list(collection.find({}, {'_id': 0}))
    return jsonify(hotspots)

if __name__ == '__main__':
    app.run(debug=True)