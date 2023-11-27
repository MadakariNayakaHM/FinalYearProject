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

        df['hour'] = df['timeStamp'].dt.hour
        df['minute'] = df['timeStamp'].dt.minute
        df['second'] = df['timeStamp'].dt.second

        target = 'dataValue'

        X = df[['hour', 'minute', 'second']]  # Exclude 'timeStamp'
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
                "hour": prediction_time.hour,
                "minute": prediction_time.minute,
                "second": prediction_time.second
            })

        variable_predictions = {}

        model = models[variable_name]
        new_data_df = pd.DataFrame(new_data)
        prediction = model.predict(new_data_df[['hour', 'minute', 'second']])  # Exclude 'timeStamp'
        variable_predictions["dataName"] = variable_name
        variable_predictions["predictions"] = prediction.tolist()
        variable_predictions["timestamps"] = new_data_df.apply(
            lambda row: row.to_dict(), axis=1).tolist()

        predictions.append(variable_predictions)

    response_data = {"predictions": predictions, "status": "predicted"}

    try:
        print(json.dumps(response_data))
    except Exception as e:
        print(f"An error occurred: {e}")

train_and_predict()
