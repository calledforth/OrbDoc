from flask import Flask, request, jsonify, Response
from flask_cors import CORS

import os
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
    )

    chat_session = model.start_chat(history=history)

    response = chat_session.send_message(query, stream=True)
    for chunk in response:
        print(chunk.text)
        yield chunk.text


if __name__ == "__main__":
    app.run(debug=True, port=5000)
