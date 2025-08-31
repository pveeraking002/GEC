from myapp.models import users as usr
from django.shortcuts import render,HttpResponse

class login:
    def user_login(request):    
        if request.method == "POST":
            uname = request.POST.get("uname")
            passw = request.POST.get("passw")
            if(uname == "" and passw ==""):
                return "Please Check your credentials"
            else:
                user = usr.objects.filter(username=uname, password=passw).values()
                if user:
                    param = {"data" : user}
                    print(param)
                    return render(request, 'index.html', param)
                else:
                    return render(request, 'index.html')
        else:
             return render(request, 'index.html')    