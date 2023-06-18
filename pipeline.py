import requests
import config
import scrapers
import json 
from gpt import get_sum

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db 

from datetime import date

# Get day for branching in Firebase
day_one = date(2023, 6, 14)
current_date = date.today()
date_diff = current_date - day_one
diff_in_days = date_diff.days
dbLink = f"day{diff_in_days}"

# Link to Firebase 
cred_obj = credentials.Certificate('news-ec2b9-firebase-adminsdk-k9etc-78b30fb4a7.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':"https://news-ec2b9-default-rtdb.firebaseio.com/"
})
ref = db.reference(f"/{dbLink}")


# API call to newsapi.org to get top headlines 
AK = config.api_key
url = f"https://newsapi.org/v2/top-headlines"
sources = "cnn,bbc-news,nbc-news,fox-news,npr"
params = {
    "sources": sources,
    "apiKey": AK
}
response_API = requests.get(url, params=params).json()
with open("top.json", "w") as f:
     f.write(json.dumps(response_API))

# Access the data from json file from API request 
# with open("top.json") as f:
#     response_API = json.load(f)

# Use scrapper to get the text from the article
text_data = []
for item in response_API['articles']:
    if item["source"]["id"] == "cnn":
        news = scrapers.extract_CNN(item["url"])
    elif item["source"]["id"] == "nbc-news":
        news = scrapers.extract_NBC(item["url"])
    elif item["source"]["id"] == "fox-news":
        news = scrapers.extract_FOX(item["url"])
    elif item["source"]["id"] == "npr":
        news = scrapers.extract_NPR(item["url"])
    elif item["source"]["id"] == "bbc-news":
        news = scrapers.extract_BBC(item["url"])
    
    # Get the summary from GPT API
    text  = get_sum(news)

    # Filter the text to get the summary
    start = text.find("<summary>")
    end =  text.find("<\\summary>")
    data = {'source': item["source"]["id"], 
            'url': item["url"],
            'title':  item['title'],
            'author': item['author'],
            'text': text[start + 9:end-9],
            'imageUrl': item['urlToImage'],
            }

    # Push data into Firebase database
    ref.push().set(json.dumps(data))
