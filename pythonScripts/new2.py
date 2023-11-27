import json
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import sys

def train_model():
    jsondata = json.loads(sys.argv[1])

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

        X = df[['hour', 'minute', 'second']]
        y = df[target]

        model = LinearRegression()
        model.fit(X, y)

        models[variable_name] = model

        joblib.dump(model, f'trained_model_{variable_name}.joblib')

    response_data = {"models": models, "status": "trained"}

    try:
        print(json.dumps(response_data))
    except Exception as e:
        print(f"An error occurred: {e}")

train_model()
