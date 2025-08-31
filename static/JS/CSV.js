var csvFileData = [];  
var csvTotal=[];

console.log(csvFileData);

function writeCsv()
{
    Data_Extraction();
    var csv = "Date,ProductName,Qty,Amount,Total,User,Mobile,Address,City,State,Status\n";
    csvFileData.forEach(function(row) {  
        csv += row.join(',');  
        csv += "\n";  
    });  
    //document.write(csv);
    var hiddenElement = document.createElement('a');  
    hiddenElement.setAttribute("href",'data:text/csv;charset=utf-8,' + encodeURI(csv));  
    hiddenElement.setAttribute("download",'GE_Order_Book(' + $("#jmobile").val() + ').csv');  
    hiddenElement.click();  
    write_tot_sales();
}   

function write_tot_sales()
{ 
    var csvt = "Date,State,Name,City,Mobile,NetTotal,Discount,SubTotal,Round,Overall,Mode\n";
    csvTotal.forEach(function(row) {  
        csvt += row.join(',');  
        csvt += "\n";  
    });  
    //document.write(csvt);
    var hiddenElement = document.createElement('a'); 
    hiddenElement.setAttribute("href",'data:text/csv;charset=utf-8,' + encodeURI(csvt));  
    hiddenElement.setAttribute("download",'User_Total_Sales_Report(' + $("#jmobile").val() + ').csv');  
    hiddenElement.click();  
}
