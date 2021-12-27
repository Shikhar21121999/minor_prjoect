from django.test import TestCase

from django.urls import path
from .views import PredictGroupView

urlpatterns = [
    path('stock_prediction/', PredictGroupView.as_view(), name='stock_prediction')
]
