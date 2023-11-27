import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import sys
import re

def preprocess_timestamp(timestamp_str):
    # Extract UTC offset from the timestamp string
    offset_match = re.search(r'([+-]\d{4})', timestamp_str)
    if offset_match:
        offset = offset_match.group(0)
        # Remove the UTC offset and add it at the end
        timestamp_str = timestamp_str.replace(f" {offset}", '')
        return f"{timestamp_str} {offset}"
    return timestamp_str
def train_model():
    # jsondata=json.loads(sys.argv[1])
    jsondata=[
  {
    'dataValue': '35.09911602129817',
    'timeStamp': 'Wed Nov 08 2023 14:23:05 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '35.09911602129817',
    'timeStamp': 'Wed Nov 08 2023 14:23:06 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '35.09911602129817',
    'timeStamp': 'Wed Nov 08 2023 14:23:06 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '35.09911602129817',
    'timeStamp': 'Wed Nov 08 2023 14:23:06 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '35.09911602129817',
    'timeStamp': 'Wed Nov 08 2023 14:23:08 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '52.39188016279165',
    'timeStamp': 'Wed Nov 08 2023 14:30:48 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '52.39188016279165',
    'timeStamp': 'Wed Nov 08 2023 14:30:48 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '52.39188016279165',
    'timeStamp': 'Wed Nov 08 2023 14:30:48 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '52.39188016279165',
    'timeStamp': 'Wed Nov 08 2023 14:30:49 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '52.39188016279165',
    'timeStamp': 'Wed Nov 08 2023 14:30:49 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '66.06004990728343',
    'timeStamp': 'Wed Nov 08 2023 14:34:18 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '66.06004990728343',
    'timeStamp': 'Wed Nov 08 2023 14:34:19 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '66.06004990728343',
    'timeStamp': 'Wed Nov 08 2023 14:34:19 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '66.06004990728343',
    'timeStamp': 'Wed Nov 08 2023 14:34:19 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '66.06004990728343',
    'timeStamp': 'Wed Nov 08 2023 14:34:20 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '65.96299638259049',
    'timeStamp': 'Wed Nov 08 2023 16:06:19 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '65.96299638259049',
    'timeStamp': 'Wed Nov 08 2023 16:06:20 GMT+0530 (India Standard Time)'
   
  },
  {
    'dataValue': '65.96299638259049',
    'timeStamp': 'Wed Nov 08 2023 16:06:20 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '65.96299638259049',
    'timeStamp': 'Wed Nov 08 2023 16:06:21 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '65.96299638259049',
    'timeStamp': 'Wed Nov 08 2023 16:06:21 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '26.77713341824644',
    'timeStamp': 'Wed Nov 08 2023 16:15:53 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '26.77713341824644',
    'timeStamp': 'Wed Nov 08 2023 16:15:53 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '26.77713341824644',
    'timeStamp': 'Wed Nov 08 2023 16:15:54 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '26.77713341824644',
    'timeStamp': 'Wed Nov 08 2023 16:15:54 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '26.77713341824644',
    'timeStamp': 'Wed Nov 08 2023 16:15:54 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:08:58 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:08:59 GMT+0530 (India Standard Time)'
     },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:08:59 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:09:00 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:09:00 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:19:07 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:19:08 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:19:09 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:19:09 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '67.9188723018024',
    'timeStamp': 'Thu Nov 09 2023 12:19:09 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '32.058974379713845',
    'timeStamp': 'Thu Nov 09 2023 12:20:28 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '32.058974379713845',
    'timeStamp': 'Thu Nov 09 2023 12:20:29 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '32.058974379713845',
    'timeStamp': 'Thu Nov 09 2023 12:20:29 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '32.058974379713845',
    'timeStamp': 'Thu Nov 09 2023 12:20:29 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '32.058974379713845',
    'timeStamp': 'Thu Nov 09 2023 12:20:30 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '43.57895286252811',
    'timeStamp': 'Thu Nov 09 2023 14:53:33 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '43.57895286252811',
    'timeStamp': 'Thu Nov 09 2023 14:53:33 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '43.57895286252811',
    'timeStamp': 'Thu Nov 09 2023 14:53:34 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '43.57895286252811',
    'timeStamp': 'Thu Nov 09 2023 14:53:34 GMT+0530 (India Standard Time)'
    
  },
  {
    'dataValue': '43.57895286252811',
    'timeStamp': 'Thu Nov 09 2023 14:53:35 GMT+0530 (India Standard Time)'    
  }
]
    
    df = pd.DataFrame(jsondata)
    df['timeStamp'] = df['timeStamp'].apply(preprocess_timestamp)
    df['timeStamp'] = pd.to_datetime(df['timeStamp'],format='%a %b %d %Y %H:%M:%S %z')

    df['hour'] = df['imeStamp'].dt.hour
    df['minut'] = df['timeStamp'].dt.minute
    df['second'] = df['timeStamp'].dt.second

    target = 'dataValue'

    X = df[['hour','minute', 'second']]
    y = df[target]

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, 'trained_model.joblib')

    response_data = { "model":"trained"}
    try:
        print(json.dumps(response_data))
    except Exception as e:
        print(f"An error occurred: {e}")
train_model()    

