from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

#connect to my mongo db database3
client = MongoClient('localhost', 27017)
db = client['nyc_hotspots']
collection = db['hotspots']


#http://127.0.0.1:5000/api/hotspots to see list of hotspots#
@app.route('/api/hotspots', methods = ['GET'])
def get_hotspots():
    hotspots = list(collection.find({}, {'_id': 0}))
    return jsonify(hotspots)


if __name__ == '__main__':
    app.run(debug=True)