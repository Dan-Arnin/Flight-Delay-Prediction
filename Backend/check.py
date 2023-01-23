import requests
import json

URL = "http://127.0.0.1:8000/flightdelayprediction"

# PARAMS = {"type_of_summarization": "website",
#   "summary_url": "https://www.youtube.com/watch?v=-QXvc2PN1H8",
#   "n_words": 120}
params = {
    'mon':10, 'dom': 10, 'dow': 1, 'carrier': "OO", 'org':"ORD", "mile":157, "depart": 8.18, "duration": 150
  }


r = requests.post(url = URL, json=params)

print(type(r))
print(r.text)
