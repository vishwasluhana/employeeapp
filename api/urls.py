from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('employees/', views.getEmployees, name='employees'),
    path('employees/<uuid:pk>/', views.getEmployee, name='employee'),
    path('employees/create', views.createEmployee, name='create-employee'),
    path('employees/update/<uuid:pk>', views.updateEmployee, name='update-employee'),
    path('employees/delete/<uuid:pk>', views.deleteEmployee, name='delete-employee'),
]