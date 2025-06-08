from django.shortcuts import render

# Create your views here.
def stories(request):
    return render(request, 'stories.html')