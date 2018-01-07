from django.shortcuts import render
from django.http import JsonResponse
from calculator.models import Calculations

# Create your views here.
def index(request):
    return render(request, 'index.html')

def history(request):
    data = Calculations.objects.all()
    return render(request, 'history.html', {'calculations': data})

def equate(request):
    curr = float(request.POST.get("curr",'0'))
    ans = float(request.POST.get("ans",'0'))
    oper = request.POST.get("oper")
    cal = Calculations(operand1=ans, operator=oper, operand2=curr)
    cal.save()
    if request.POST:
        if oper == '+':
            ans = curr + ans
        elif oper == '-':
            ans = ans - curr
        elif oper == '*':
            ans = curr * ans
        elif oper == '/':
            if curr != 0:
                ans = ans / curr
            else:
                ans = 'Division by zero is invalid'
        return JsonResponse({'ans':ans})