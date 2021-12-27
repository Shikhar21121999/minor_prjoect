from tensorflow.keras.models import model_from_json
import pandas as pd
from model_data import *

def get_model(json_path, wieght_path):
    json_file = open(json_path, 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights(wieght_path)
    loaded_model.compile(loss='mean_squared_error', optimizer='adam')
    return loaded_model

# get train, test, model for prediction of a company
def get_train_test_model(company_name):
    company_path = "model_data/" + company_name + '/' + company_name
    print(company_name)
    print(f"{company_path}_train.csv")
    train = pd.DataFrame(pd.read_csv(f"{company_path}_train.csv"))
    test = pd.DataFrame(pd.read_csv(f"{company_path}_test.csv"))
    return (train, test, get_model(f"{company_path}_model.json",f"{company_path}_model.h5"))
