from flask import Flask, request, jsonify
import requests
from generate_city_mood import generate_mood_itinerary  # Assuming this function exists in generate_city_mood.py
import os
from dotenv import load_dotenv
from flask_cors import CORS

# Load the .env file
load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow all origins for /api/* routes

@app.route('/api/generate-mood', methods=['POST'])
def generate_mood():
    data = request.get_json()
    mood = data.get('mood')

    if not mood:
        return jsonify({'error': 'Mood is required'}), 400

    try:
        itinerary = generate_mood_itinerary(mood)  # Call the function from generate_city_mood.py
        return itinerary
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/youtube-search', methods=['GET'])
def youtube_search():
    query = request.args.get('query')

    

    if not query:
        return jsonify({'error': 'Query is required'}), 400
    
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "maxResults": 1,
        "key": YOUTUBE_API_KEY,
    }

    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        items =  data.get('items', [])
        if not items:
            return jsonify({'error': 'No videos found'}), 404

        video_id = items[0]['id']['videoId']
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        return jsonify({'video_url': video_url})
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)