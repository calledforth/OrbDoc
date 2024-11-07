from flask import Flask, request, jsonify, Response
from flask_cors import CORS

import os
from pymongo import MongoClient
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

history = []


@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    print("Data received: ", data.get("query"))
    return Response(gemini_call(data.get("query")), mimetype="text/event-stream")


def gemini_call(query):
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])

    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro-002",
        generation_config=generation_config,
        system_instruction="""You are a medical assistant who:
        Enables users to search for medical terms
        Provides clear, simple definitions
        Displays related terms
        All responses should be concise and formatted in italics for a polished, professional look.
        Also include links and references in your response""",
    )

    chat_session = model.start_chat(history=history)

    response = chat_session.send_message(query, stream=True)
    for chunk in response:
        print(chunk.text)
        yield chunk.text


@app.route("/save", methods=["POST"])
def save():
    data = request.get_json()
    client = MongoClient(os.environ["MONGODB_URI"])
    db = client["chatbot_db"]
    collection = db["chat_history"]

    result = collection.insert_one(data)
    return jsonify({"status": "success", "inserted_id": str(result.inserted_id)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
