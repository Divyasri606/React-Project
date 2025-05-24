from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data_storage = []

# Helper validation for user
def valid_user(data, is_update=False):
    try:
        user_id = data.get('user_id')
        # ID must be integer and unique (for create)
        if not isinstance(user_id, int):
            return False, "user_id must be an integer."
        if not is_update and user_id in [u['user_id'] for u in data_storage]:
            return False, "user_id must be unique."
        # Name length <= 10
        name = data.get('name', '')
        if not isinstance(name, str) or len(name) > 10:
            return False, "name must be string of max 10 characters."
        # Age must be integer < 50
        age = data.get('age')
        if not isinstance(age, int) or age >= 50:
            return False, "age must be integer below 50."
        # City required
        if 'city' not in data or not isinstance(data['city'], str):
            return False, "city is required."
        return True, None
    except Exception as e:
        return False, str(e)

@app.route('/api/save_data', methods=['POST'])
def save_data():
    data = request.get_json()
    ok, msg = valid_user(data)
    if not ok:
        return jsonify({"error": msg}), 400
    data_storage.append(data)
    return jsonify({"message": "Data saved successfully."}), 201

@app.route('/api/get_data', methods=['GET'])
def get_data():
    return jsonify(data_storage)

@app.route('/api/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in data_storage if u['user_id'] == user_id), None)
    return jsonify(user) if user else (jsonify({"error": "User not found."}), 404)

@app.route('/api/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global data_storage
    before = len(data_storage)
    data_storage = [u for u in data_storage if u['user_id'] != user_id]
    if len(data_storage) < before:
        return jsonify({"message": f"Deleted user {user_id}"})
    return jsonify({"error": "User not found."}), 404

@app.route('/api/modify_user/<int:user_id>', methods=['PUT'])
def modify_user(user_id):
    data = request.get_json()
    user = next((u for u in data_storage if u['user_id'] == user_id), None)
    if not user:
        return jsonify({"error": "User not found."}), 404
    # Merge ID for validation
    merged = {**user, **data, 'user_id': user_id}
    ok, msg = valid_user(merged, is_update=True)
    if not ok:
        return jsonify({"error": msg}), 400
    user.update(data)
    return jsonify({"message": f"User {user_id} updated."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)