from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^history/', views.history),
    url(r'^equate', views.equate)
]
