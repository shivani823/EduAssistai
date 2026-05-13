from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="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"
)

@app.route('/ask', methods=['POST'])
def ask_ai():

    data = request.get_json()

    question = data.get("question")

    try:

        completion = client.chat.completions.create(
            model="z-ai/glm-4.5-air:free",
            messages=[
                {
                    "role": "system",
                    "content": "You are EduAssist AI, a smart educational assistant that explains concepts simply for students."
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        answer = completion.choices[0].message.content

        return jsonify({
            "answer": answer
        })

    except Exception as e:

        return jsonify({
            "answer": f"Error: {str(e)}"
        })

if __name__ == '__main__':
    app.run(debug=True)