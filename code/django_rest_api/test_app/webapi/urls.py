from django.urls import path
from . import views
urlpatterns = [
    path('api/profile/', views.ProfileListCreate.as_view() ),
]
