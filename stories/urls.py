from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('stories', views.stories, name='stories' ),
]