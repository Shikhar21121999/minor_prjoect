from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
import json
from datetime import datetime
from stock_predictor import util
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import model_from_json

# Create your views here.

# src\rest\stock_predictor\model_data\google\google_train.csv
class PredictGroupView(APIView):

    def get(self, request):
        company = request.GET.get('company', False)
        # data = json.loads(request.body.decode("utf-8"))
        # company = data.get('company', None)
        # model = data.get('model', None)
        # to_date = datetime.strptime(request.GET.get('to_date'), "%Y%m%d") if request.GET.get('to_date') else None
        # from_date = datetime.strptime(request.GET.get('from_date'), "%Y%m%d") if request.GET.get('from_date') else None
        # for_date = datetime.strptime(request.GET.get('for_date'), "%Y%m%d") if request.GET.get('for_date') else None
        # company = "tesla"
        if company is None:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        if company == 'google':
            train, test, loaded_model = util.get_train_test_model('google')
            real_prices = test.iloc[:,1:2].values
            dataset_total = pd.concat((train['Open'], test['Open']), axis = 0)

            scaler = MinMaxScaler(feature_range = (0,1))
            inputs = dataset_total[len(dataset_total) - len(test) - 60: ].values
            inputs = inputs.reshape(-1,1) 
            inputs = scaler.fit_transform(inputs)
            X_test = [] 
            for i in range(60,80):
                X_test.append(inputs[i-60:i, 0])
            X_test = np.array(X_test)
            X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
            predicted_prices = loaded_model.predict(X_test)
            predicted_prices = scaler.inverse_transform(predicted_prices)
        else:
            train, test, loaded_model = util.get_train_test_model(company)
            scaler = MinMaxScaler(feature_range = (0,1))
            test.drop(["Volume","Date", "High", "Low", "Open"], axis = 1, inplace = True)
            train.drop(["Volume","Date", "High", "Low", "Open"], axis = 1, inplace = True)
            real_prices = test.values
            time_step = 40

            dataset_total = pd.concat((train["Close"], test["Close"]), axis = 0)
            inputs = dataset_total[len(dataset_total) - len(test) - time_step : ].values
            inputs = inputs.reshape(-1, 1)
            inputs = scaler.fit_transform(inputs)

            x_test = []
            for i in range(time_step, inputs.shape[0]):
                x_test.append(inputs[i - time_step : i , 0])
            x_test = np.array(x_test)
            x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

            predicted_prices = loaded_model.predict(x_test)
            predicted_prices = scaler.inverse_transform(predicted_prices)
        print(company)
        return Response({'real_prices': [int(real_price_arr[0]*100)/100 for real_price_arr in real_prices], 'predicted_prices': [int(pred_price_arr[0]*100)/100 for pred_price_arr in predicted_prices]}, status=status.HTTP_200_OK)
    

