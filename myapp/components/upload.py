from myapp.models import ordertbl as otbl
from myapp.models import userorder as uo
from myapp.models import user_account as uc
from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings
import os

class uploadproduct():

    def filterdata(request):
        if request.method=="GET":
            tbl = otbl.objects.all().values("group").distinct()
            atbl = otbl.objects.all().values()
            odt = list(atbl)
            dt = list(tbl);
            return JsonResponse({"data" : dt, "odata" : odt , "media_url":settings.MEDIA_URL})
            #return render(request, 'list.html', {"dt" : odt})
        else:
            return render(request, 'index.html', "")


    def upload_product(request):
        if request.method =="POST":
        
            dic = {
                "img" : request.FILES.get("image"),
                "code" : request.POST.get("code"),
                "product":request.POST.get("product"),
                "content":request.POST.get("content"),
                "aprice":request.POST.get("aprice"),
                "amt":request.POST.get("amt"),
                "dis":request.POST.get("dis"),
                "grp":request.POST.get("grp")   
            }
            """
            img = request.FILES.get("isrc")
            code = request.POST.get("code")
            product = request.POST.get("product")
            content = request.POST.get("content")
            aprice = request.POST.get("aprice")
            amt = request.POST.get("amt")
            grp = request.POST.get("grp")
            """
            #print(dic['img'])
            #data = otbl.objects.create(Image = dic["img"], Code = dic["code"], ProductName = dic["product"], Content = dic["content"], Aprice = dic["aprice"], Amount = dic["amt"], group = dic["grp"])
            data = otbl(Image = dic["img"], Code = dic["code"], ProductName = dic["product"], Content = dic["content"], Aprice = dic["aprice"], Amount = dic["amt"], discount = dic["dis"], group = dic["grp"])
            #data = otbl(code,product,content,aprice,amt,grp,img)
            data.save()
            print("Saved")
            lst = uploadproduct.Fetch_Details("ALL", otbl)
            return JsonResponse({"Status" : "Success", "data" : lst, "media_url":settings.MEDIA_URL})
        else:
            return JsonResponse({"Status" : "Failed"})
        
    def fetch(request):
        if request.method == "POST":
            lst = uploadproduct.Fetch_Details("ALL", otbl)
            return JsonResponse({"Status" : "Success", "Data" : lst, "media_url":settings.MEDIA_URL})
        
    def deleteProduct(request):
        if request.method == "POST":
            uid = request.POST.get("uid")
            #print(uid)      
            delv = otbl.objects.filter(id=uid)
            try:
            #imgpath = settings.MEDIA_ROOT  + "/" + dt[0]['Product_Image']
                delpath = delv.values()
                os.remove(settings.MEDIA_ROOT + "/" + delpath[0]["Image"])
                delv.delete()
            except:
                delv.delete()
            return JsonResponse({"Status":"Deleted"})
        else:
            return JsonResponse({"Status" : "Could not erase the record"})
    
    
    def orderUpdate(request):
        if request.method == "POST":
            udata = {
                "odate" : request.POST.get("odate"),
                "code"  : request.POST.get("code"),
                "product":request.POST.get("product"),
                "qty" : request.POST.get("qty"),
                "amt" : request.POST.get("amt"),
                "tot" : request.POST.get("tot"),
                "state" : request.POST.get("state"),
                "city" : request.POST.get("city"),
                "name" : request.POST.get("name"),
                "mobile" : request.POST.get("mobile"),
                "email" : request.POST.get("email"),
                "address" : request.POST.get("address"),
                "Status": "Pending"
            }
            #print(udata)
            data = uo.objects.create(OrderDate = udata['odate'], Code = udata['code'], ProductName = udata['product'], Qty =udata['qty'], Amount = udata['amt'], Total = udata['tot'], state = udata['state'], city=udata['city'], name = udata['name'], mobile = udata['mobile'], Email =udata['email'], Address = udata['address'], status = udata['Status'])
            data.save()
            return JsonResponse({"Status" : "Order Placed"});
        else:
            return JsonResponse({"Status" : "Failed Order"})

    def userAccount(request):
        if request.method == "POST":
            uacc = {
                "od": request.POST.get("odate"),
                "state" : request.POST.get("state"),
                "city" : request.POST.get("city"),
                "name" : request.POST.get("name"),
                "mobile" : request.POST.get("mobile"),
                "email" : request.POST.get("email"),
                "address" : request.POST.get("address"),
                "nett" : request.POST.get("nett"),
                "dnett" : request.POST.get("dnett"),
                "snett" : request.POST.get("snett"),
                "roff" : request.POST.get("roff"),
                "overall" : request.POST.get("overall"),
                "mode" : request.POST.get("mode")
            }
            uaccount = uc.objects.create(OD = uacc["od"],state = uacc["state"],city = uacc["city"], name = uacc["name"], mobile = uacc["mobile"], Email =uacc["email"], Address = uacc["address"], NetTotal =uacc["nett"], Discount=uacc["dnett"], SubTotal=uacc["snett"], Round=uacc["roff"], overAll=uacc["overall"], mode=uacc["mode"])
            uaccount.save()
            return JsonResponse({"Status": "Success"})
        else:
            return JsonResponse({"Status": "Error"})


    def Fetch_Details(data,otbl):
        if data == "ALL":
            dt = otbl.objects.all().values()
            lst = list(dt)
            return (lst)
        else:
            return ("")
        

    def update_details(request):
        if request.method=="POST":
            dic = {
                'id':request.POST.get("id"),
                "img" : request.FILES.get("img"),
                "code" : request.POST.get("code"),
                "product":request.POST.get("product"),
                "content":request.POST.get("content"),
                "aprice":request.POST.get("aprice"),
                "amt":request.POST.get("amt"),
                "dis":request.POST.get("dis"),
                "grp":request.POST.get("grp")   
            }
            data = otbl.objects.get(id = dic['id'])
            uploadproduct.image_upload(dic['id'], dic['img'], data)
            data.Code = dic["code"];
            data.ProductName=dic["product"]
            data.Content = dic["content"]
            data.Aprice = dic["aprice"] 
            data.Amount=dic["amt"]
            data.discount=dic["dis"]
            data.group=dic["grp"]
            data.save()
            return JsonResponse({"Data" : "Updated"})

    def image_upload(uid, uimg, data):
        if(uimg!= None):
                try:
                    img = otbl.objects.filter(id = uid).values()
                    os.remove(settings.MEDIA_ROOT + "/" + img[0]["Image"])  
                    data.Image = uimg;
                except:
                    data.Image = uimg; 