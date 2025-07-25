from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permitir llamadas desde tu frontend (React)

# Configura la clave de OpenAI desde variable de entorno
openai.api_key = os.getenv("OPENAI_API_KEY")

print("OPENAI_API_KEY:", os.getenv("OPENAI_API_KEY"))

@app.route("/")
def home():
    return jsonify({
        "status": "ok",
        "message": "GreenRouteOps API is running",
        "endpoints": ["/optimize", "/api/ask-ia"]
    })

@app.route("/optimize", methods=["POST"])
def optimize():
    try:
        data = request.get_json()

        if not data or "locations" not in data:
            return jsonify({"error": "Missing 'locations' in JSON body"}), 400

        locations = data["locations"]

        if not isinstance(locations, list) or len(locations) < 2:
            return jsonify({"error": "'locations' must be a list with at least 2 elements"}), 400

        # Dummy sorting for optimization placeholder
        optimized = sorted(locations)

        return jsonify({
            "optimized_route": optimized,
            "num_locations": len(locations)
        })

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500

@app.route("/api/ask-ia", methods=["POST"])
def ask_ia():
    try:
        data = request.get_json(force=True)
        question = data.get("question", "")
        if not question:
            return jsonify({"error": "Missing 'question' in JSON body"}), 400

        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": question}],
            max_tokens=150,
            temperature=0.7,
        )
        answer = response.choices[0].message.content
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500

if __name__ == "__main__":
    # Nota: en producción esto lo gestionará gunicorn
    app.run(host="0.0.0.0", port=5000)
