from django.db import models

# Create your models here.


class ordertbl(models.Model):
    id = models.AutoField(primary_key=True)
    Image = models.ImageField(upload_to='images/', null=True)
    Code = models.CharField(max_length=50, default="")
    ProductName=models.CharField(max_length=200, default="")
    Content = models.CharField(max_length=20, default="")
    Aprice = models.CharField(max_length=10, default="")
    Amount=models.CharField(max_length=10, default="")
    discount=models.CharField(max_length=10, null=True)
    group=models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.ProductName


class users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, null=False, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.username
    
class userorder(models.Model):
    id = models.AutoField(primary_key=True);
    OrderDate = models.CharField(max_length=20, null=False)
    Code = models.CharField(max_length=10)
    ProductName = models.CharField(max_length=100)
    Qty = models.CharField(max_length=10)
    Amount = models.CharField(max_length=10)
    Total = models.CharField(max_length=10)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    mobile=models.CharField(max_length=13)
    Email =models.CharField(max_length=50)
    Address=models.CharField(max_length=100) 
    status = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.name

class user_account(models.Model):
    id = models.AutoField(primary_key=True)
    OD = models.CharField(max_length=20)
    state = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    mobile=models.CharField(max_length=13)
    Email =models.CharField(max_length=50)
    Address=models.CharField(max_length=100)  
    NetTotal = models.CharField(max_length=10)
    Discount = models.CharField(max_length=10)
    SubTotal =models.CharField(max_length=10)
    Round = models.CharField(max_length=10)
    overAll = models.CharField(max_length=10)
    mode = models.CharField(max_length=10)

    def __str__(self):
        return self.name
