from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/employees',
        'GET /api/employees/<str:pk>',
    ]
    return Response(routes)

@api_view(['GET'])
def getEmployees(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEmployee(request, pk):
    employee = Employee.objects.get(emp_id=pk)
    serializer = EmployeeSerializer(employee, context={'request': request}, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createEmployee(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('success')
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def updateEmployee(request, pk):
    employee = Employee.objects.get(emp_id=pk)
    serializer = EmployeeSerializer(instance=employee, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('success')
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deleteEmployee(request, pk):
    employee = Employee.objects.get(emp_id=pk)
    employee.delete()
    return Response('deleted')