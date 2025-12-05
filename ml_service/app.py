from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

SAMPLE_ABSTRACTS = [
    "A web based system for managing university projects and collaborations.",
    "An IoT platform for smart campus automation.",
    "Machine learning based recommendation engine for student projects."
]

vectorizer = TfidfVectorizer().fit(SAMPLE_ABSTRACTS)
sample_vectors = vectorizer.transform(SAMPLE_ABSTRACTS)

@app.route("/api/plagiarism/check", methods=["POST"])
def check_plagiarism():
    data = request.get_json(force=True)
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"score": 0.0})

    v = vectorizer.transform([text])
    sims = cosine_similarity(v, sample_vectors)[0]
    score = float(sims.max())
    return jsonify({"score": score})

@app.route("/")
def health():
    return jsonify({"message": "ML plagiarism service running"})

if __name__ == "__main__":
    app.run(port=7000, debug=True)
