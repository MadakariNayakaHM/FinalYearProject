import json
import pandas as pd
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression
import joblib
import sys

def train_and_predict():
    jsondata = json.loads(sys.argv[1])
    predictdata = json.loads(sys.argv[2])

    # Create a dictionary to store models for each variable
    models = {}

    for variable_data in jsondata:
        variable_name = variable_data['dataName']
        df = pd.DataFrame(variable_data['dataSource'])

        df['timeStamp'] = pd.to_datetime(df['timeStamp'])

        target = 'dataValue'

        X = df[['timeStamp']]  # Include 'timeStamp'
        # Convert timeStamp to numeric representation (e.g., seconds since epoch)
        X['timeStamp'] = (X['timeStamp'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')  # Convert to seconds
        y = df[target]

        model = LinearRegression()
        model.fit(X, y)

        models[variable_name] = model

    # Predict individual data points
    predictions = []

    for variable_data in predictdata:
        variable_name = variable_data['dataName']
        interval = int(variable_data['interval'])
        number = int(variable_data['number'])

        current_time = datetime.now()
        new_data = []

        for i in range(number):
            prediction_time = current_time + timedelta(minutes=i * interval)
            new_data.append({
                "timeStamp": prediction_time
            })

        variable_predictions = {}

        model = models[variable_name]
        new_data_df = pd.DataFrame(new_data)
        new_data_df['timeStamp'] = (new_data_df['timeStamp'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')  # Convert to seconds

        prediction = model.predict(new_data_df[['timeStamp']])  # Include 'timeStamp'
        variable_predictions["dataName"] = variable_name
        variable_predictions["predictions"] = prediction.tolist()
        variable_predictions["timestamps"] = new_data_df['timeStamp'].apply(
            lambda ts: datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        ).tolist()

        predictions.append(variable_predictions)

    response_data = {"predictions": predictions, "status": "predicted"}

    try:
        print(json.dumps(response_data))
    except Exception as e:
        print(f"An error occurred: {e}")

train_and_predict()
