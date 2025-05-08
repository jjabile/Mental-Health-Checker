from flask import Flask, request, jsonify
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

app = Flask(__name__)
sia = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    sentiment_score = sia.polarity_scores(text)
    compound = sentiment_score['compound']

    # Simple logic for mood-based advice
    if compound >= 0.05:
        advice = "You're feeling positive! Keep it up!"
    elif compound <= -0.05:
        advice = "You're feeling down. Try taking a walk or talking to a friend."
    else:
        advice = "You're feeling neutral. Maybe try a new hobby?"

    return jsonify({
        "sentiment": sentiment_score,
        "advice": advice
    })

if __name__ == '__main__':
    app.run(debug=True)
