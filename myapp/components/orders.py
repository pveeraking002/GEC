from django.shortcuts import render, redirect
from django.http import JsonResponse
from myapp.models import users as usr
from myapp.models import userorder as uord
from myapp.models import user_account as uac

class orders_pro:
    
    def home(request):

        if 'golduser' in request.session:
            data = request.session['golduser']
            return  render(request, 'demo/ordertbl.html',{"data" : data})
        else:
            return orders_pro.login(request)

    def login(request):
        if request.method == "POST":
            uname = request.POST.get('uname')
            upass = request.POST.get("upass")
            if(uname !="" and upass !=""):
                data = usr.objects.filter(username=uname, password=upass).values()
                if(data):
                    request.session['golduser'] = uname
                    return render(request,'demo/ordertbl.html', {"data" : data[0]['username']})
                else:
                    return render(request, 'orders.html')
            else:
               return render(request, 'orders.html')
        return render(request, 'orders.html')   

    def logoff(request,next_page=None,
           template_name='demo/orders.html',
           current_app=None, extra_context=None):
        print(request.method)
        if request.method =="POST":
            try:
                while request.session['golduser']:
                    del request.session['golduser']
                request.session.modified = True
                request.session.flush() 
                return JsonResponse({"Status" : "success"})
            except KeyError:
               return JsonResponse({"Status" : "success"})
    
    def OrderDeatils(request):
        if request.method == "POST":
            typ = request.POST.get("type")
            alldata = orders_pro.fetch_order_details(typ)
            dt = uac.objects.all().values()
            udt = list(dt);
            return JsonResponse({"data" : alldata, "udt":udt})
        return JsonResponse({"data" : "Data Not found"})



    def updatestatus(request):
        if request.method == "POST":
            uid = request.POST.get('uid')
            uval = request.POST.get('uval')
            if(uid):
                ctab = uord.objects.get(id = uid)
                ctab.status =  uval
                ctab.save()
                return JsonResponse({"Status" : "Data Updated"})
            else:
                return JsonResponse({"Status" : "Data Not Found"})


    def fetch_order_details(data):
        if data == "ALL":
            data = uord.objects.all().values()
            alllist = list(data)    
            return alllist
        else:
            return list()
