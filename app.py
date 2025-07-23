from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route("/optimize", methods=["POST"])
def optimize():
    data = request.get_json()
    locations = data.get("locations", [])
    # Dummy route optimization: return sorted
    optimized = sorted(locations)
    return jsonify({"optimized_route": optimized})

@app.route("/")
def home():
    return "GreenRouteOps API is running."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)