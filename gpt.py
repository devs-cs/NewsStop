import os
import openai
from dotenv import load_dotenv

def get_sum(text):
    # Key 
    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # Setup
    model = "text-davinci-003"
    prompt = f"Write a brief summary about the following article enclosed in xml tags. Make sure to enclose the summary in <summary> tags. <article> {text} <\\article>"
    temp = 0.8
    max_tokens = 300
    
    # Obtain response 
    response = openai.Completion.create(model=model, prompt=prompt, temperature=temp, max_tokens=max_tokens)
    return response["choices"][0]["text"]
