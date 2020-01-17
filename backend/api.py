from flask import Flask, request
from flask_cors import CORS
from nlp import get_answer

# App
app = Flask('Findit API')
CORS(app)

# Routes
@app.route('/api/nlp', methods=['POST'])
def post_nlp():
    try:
        question, context = get_params(request)
        answer = get_answer(question, context)
        return {
            'data': {
                'answer': answer,
            }
        }
    except BaseException as err:
        print(f'###### {err.args[0]}')
        return {
            'error': {
                'message': err.args[0],
            }
        }, 400

# Utils

def get_params(request):
    request_json = request.get_json()

    if request_json is None:
        raise ('You must provide to your POST request a JSON data object {question: \'...\', context: \'...\'}')

    if 'question' not in request_json:
        raise BaseException('You must provide a question')

    if 'context' not in request_json:
        raise BaseException('You must provide a context')

    question = request_json['question']
    context = request_json['context']

    if question == '':
        raise BaseException('The question must not be empty')

    if context == '':
        raise BaseException('The context must not be empty')

    return question, context
