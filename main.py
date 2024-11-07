from flask import Flask, request, jsonify, Response
from flask_cors import CORS

import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi
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
        your response must contain three main sections : 
        1. Definition : A clear, concise definition of the term.
        2. Related Terms : A list of related terms (minimum 10) that the user might find useful. (in a numeric list)
        3. Examples : Examples of how the term is used in a medical context.
        4. References : A list of references / links that the user can consult for more information.
        enclose the links in special formatting to make them stand out.""",
    )

    chat_session = model.start_chat(history=history)

    response = chat_session.send_message(query, stream=True)
    for chunk in response:
        print(chunk.text)
        yield chunk.text


@app.route("/save", methods=["POST"])
def save():
    data = request.get_json()

    uri = os.environ["MONGODB_URI"]

    client = MongoClient(uri, server_api=ServerApi("1"))

    try:
        db = client["orbdoc"]
        collection = db["saved_data"]
        collection.insert_one(data)
        print("Data saved")

    except Exception as e:
        print(e)

    return jsonify({"status": "success"})


@app.route("/load_saved", methods=["GET"])
def load():
    client = MongoClient(os.environ["MONGODB_URI"])
    db = client["orbdoc"]
    collection = db["saved_data"]

    data = collection.find()
    response = []
    for item in data:
        response.append(item)
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
