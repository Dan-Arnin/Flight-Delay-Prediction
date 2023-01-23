from fastapi import FastAPI,Request,Response
import json
from fastapi.middleware.cors import CORSMiddleware
from flightdelaypredict import delay_predict

from csv import writer

import pandas as pd

application = FastAPI()

origins = ["*"]

application.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@application.get("/")                                   #Returns the status of the server
async def root():
    return {"message": "Server Active"}

@application.post("/flightdelayprediction")
async def sentiment_analyser(flight_data: Request):
    flight_dict = await flight_data.json()

    flight_data_lst = list(flight_dict.values())

    #df = pd.DataFrame(flight_data_lst, columns=['mon','dom','dow','carrier', 'org','mile','depart','duration'])


    with open('temp.csv', 'a') as f_object:
 

        writer_object = writer(f_object)

        writer_object.writerow(flight_data_lst)

        f_object.close()

    finalval = delay_predict()

    finalresult = {"result" : finalval}
    
    json_object = json.dumps(finalresult)

    return Response(content=json_object, media_type="application/json")


    









