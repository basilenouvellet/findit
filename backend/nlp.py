from transformers import pipeline

# OPTIONAL: if you want to have more information on what's happening under the hood, activate the logger as follows
# import logging
# logging.basicConfig(level=logging.INFO)

nlp = pipeline('question-answering')

def get_answer(question, context):
    return nlp({
        'question': question,
        'context': context
    })

if __name__ == "__main__":
    # right answer
    qa_result = nlp({
        'question': 'What is the name of the repository ?',
        'context': 'Pipeline have been included in the huggingface/transformers repository'
    })
    print('QA:', qa_result)

    # wrong answer
    qa_result = nlp({
        'question': 'What do my mum like to eat ?',
        'context': 'I have 2 sisters and 4 brothers. My mum prefers apples than pears. My mum like her dress'
    })
    print('QA:', qa_result)
