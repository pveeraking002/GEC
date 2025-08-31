from django.urls import path
from myapp import views as vew
from myapp.components.login import login as log
from myapp.components.upload import uploadproduct as upl
from myapp.components.orders import orders_pro as ord   

urlpatterns = [
    path('', vew.index, name="index"),
    path('login', log.user_login, name="userlogin"),
    path('upload/', upl.upload_product, name="UploadProduct"),
    path('fetch/', upl.fetch, name="Fetchdata"),
    path('deletepro/', upl.deleteProduct, name="deleteProduct"),
    path('filterdata/', upl.filterdata, name="FilterData"),
    path('userdata/', upl.orderUpdate, name="UserUpdate"),
    path('useraccount/', upl.userAccount, name="UserAccount"),
    path('orders/', ord.home, name="orders"),
    path('orderdetails/',ord.OrderDeatils, name="OrderDetails"),
    path('logoff/',ord.logoff, name="logoff"),
    path('status/', ord.updatestatus, name='UpdateStaus'),
    path('modify/',upl.update_details, name="ModifyStatus"),
]   
