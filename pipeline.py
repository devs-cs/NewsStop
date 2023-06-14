import requests
import config
import scrapers

AK = config.api_key
# response_API =  requests.get(f"https://newsapi.org/v2/top-headlines?country=us&apiKey={AK}").json()

NBC_url = "https://www.nbcnews.com/politics/donald-trump/updates-trump-arraignment-florida-classified-documents-rcna88871"
CNN_url = "https://www.cnn.com/2023/06/13/politics/karine-jean-pierre-hatch-act/index.html"
FOX_url = "https://www.foxnews.com/politics/trump-slams-sham-federal-indictment-election-inference-most-heinous-abuse-power-in-us-history"
BBC_url = "https://www.bbc.com/news/world-asia-65894721"
NPR_url = "https://www.npr.org/2023/06/14/1182071288/las-vegas-golden-knights-win-stanley-cup"

titles = []
for item in response_API['articles']:
    titles.append(item['title'])



print(scrapers.extract_NPR(NPR_url))
