
const form = document.getElementsByClassName("flem");

$("#upro").click((event)=>{
    event.preventDefault();
    if($("#isrc").val() == "" && $("#code").val()=="" && $("#product").val() == "")
    {
        alert("Please update all the fields");
        return"";
    }
    console.log($("#isrc")[0].files[0]);
    var frm = new FormData();
    frm.append("image",$("#isrc")[0].files[0]); 
    frm.append("code",$("#code").val());
    frm.append("product",$("#product").val());
    frm.append("content",$("#content").val());
    frm.append("aprice",$("#aprice").val());
    frm.append("amt",$("#amt").val());
    frm.append("dis",$("#dis").val());
    frm.append("grp",$("#grp").val());
    frm.append("csrfmiddlewaretoken",document.querySelector('input[name="csrfmiddlewaretoken"]').value);
    $.ajax({
           url:'/upload/',
           type:'POST',
           dataType:'json',
           enctype:'multipart/form-data',
           processData:false,
           contentType:false,
           caches:false,
           data:frm,
           success:(response)=>
           {
               if(response.Status == "Success")
               {
                    fetch_record();
                    $("#isrc").val("");
                    $("#code").val(""); 
                    $("#product").val("");
                    $("#content").val("");
                    $("#aprice").val("");
                    $("#grp").val("");
                    $("#dis").val("");
               }
           },
           failure:()=>{}
    });

});

//refresh the page 

$("#refresh").click((e)=>{
    e.preventDefault();
    fetch_record();
}); 


//delete record 

$(document).on('click', '.delete_btn', function(e) 
{
        e.preventDefault();
        const id = e.target.id;
        if(id == "")
        {
            return "";
        }
        else 
        {
            $.ajax({
                    url:"/deletepro/",
                    type:"POST",
                    dataType:'json',
                    data:{"uid" : id, "csrfmiddlewaretoken" : document.querySelector('input[name="csrfmiddlewaretoken"]').value},
                    success:(res)=>{
                        if(res.Status == "Deleted")
                        {
                            alert("Record Erased");
                            fetch_record();
                            return ;
                        }
                    }, failure:()=>{}
            });
        }
});

// load data 

$("#pricelist").click(function(e){
    //e.preventDefault();
    $.ajax({
        url:'/filterdata/',
        type:'GET',
        dataType:'json',
        data:{"csrfmiddlewaretoken":document.querySelector('input[name="csrfmiddlewaretoken"]').value},
        success:(tb)=>
        {
            var data = tb.data;
            var adata = tb.odata;
            const ima = tb.media_url;
            //console.log(data);
            //console.log(adata);
            var txc = $("#protbl")
            let acc;
            txc.empty();

            for(let i=0; i<data.length; i++)
            {
                
                let grp = data[i].group;
                acc = "<tr class ='totgroup'><td colspan='9' style='background-color:silver; color:#403f3d;' id='group" + i +"'>"+ data[i].group  +"</td></tr>";  
                txc.append(acc);
                for(let x=0; x<adata.length; x++)
                {
                    if(grp === adata[x].group)
                    {   
                        acc = "<tr class='totdata'>";
                        acc += "<td><img src='" + ima + adata[x].Image  +"' width='50px' height='50px' loading='lazy'  class='vwin'/></td>";  
                        acc += "<td>"+ adata[x].Code  +"</td>";  
                        acc += "<td>"+ adata[x].ProductName  +"</td>";  
                        acc += "<td>"+ adata[x].Content  +"</td>";  
                        acc += "<td>"+ adata[x].Aprice  +"</td>";  
                        acc += "<td><input type='text' id='amount"+ x +"' style='display:none' value='" + adata[x].Amount + "'/>"+ adata[x].Amount  +"</td>"; 
                        acc += "<td style='display:none;' class='"+ data[i].group + "'>"+ adata[x].discount  +"</td>";   
                        acc += "<td><input type='text' id='"+ x + "' placeholder='QTY' value='0' class='flem' onfocusout='cal(this)'/></td>";  
                        acc += "<td><input type='text' id='t"+ x +"' placeholder='TOTAL' value ='0.00' class='flem' disabled='disabled'/></td>";  
                        acc +="</tr>";
                        txc.append(acc);
                    }
                }   

            }
        },
        failure:()=>{}
    });
});

function cal(e) 
{
    let tr = e.id;
    let qty = $("#"+tr).val();
    var nett= 0;
    var calc= 0;
    var aprice=0;
    var nettotal = 0;
    let gross=0;
    let discount=0;
    let wdt = 0.00;
    let txc = document.getElementById("protbl").getElementsByTagName("tr");
    if(qty != "")
    {
        let amt = $("#amount"+tr).val();
        let total = amt*qty;
        $("#t"+tr).val(total.toFixed(2));
        TotalCalculation();

        /*for(let i=0; i<txc.length; i++)
        {
            if(txc[i].className == "totdata")
            {
                var txt = txc[i].getElementsByTagName("td")[8].getElementsByTagName("input")[0].value;
                console.log( typeof txt);
                if(txt != String.empty || txt != "TOTAL")
                {
                   
                    var neto = parseFloat(txc[i].getElementsByTagName("td")[4].innerText);
                    var  odiscount = neto * qty;
                    //const dis = parseFloat(txc[i].getElementsByTagName("td")[6].innerText);
                    
                    console.log(odiscount);
                
                        if(neto === 0.00 || neto === 0)
                        {
                            //console.log(txc[i].getElementsByTagName("td")[4].innerText);
                            if(isNaN(txt) === false)
                            {
                                if(typeof txt === "number")
                                {
                                    wdt = parseFloat(wdt) + parseFloat(txt);  
                                    $("#wdt").text(wdt.toFixed(2)); 
                                    calc = gross + wdt;
                                    //gross = gross;   
                                    //console.log(calc);
                                    $("#snett").text(calc.toFixed(2));     
                                    $("#overall").text(calc.toFixed(2)); 
                                    calc = 0;

                                }
                            }
                            
                        }
                        else
                        {
                            if(isNaN(txt) === false)
                            {
                                if (typeof txt === "number")
                                {   
                                    nettotal = nettotal + odiscount;
                                    //console.log(nettotal);
                                    nett = nett + txt;   
                                    //console.log(nett);                    
                                    // clear block 
                                    const dis = disCal(); 
                                    $("#nett").text(nettotal.toFixed(2));
                                    discount = nettotal * dis /100;
                                    $("#dnett").text(discount.toFixed(2));
                                    let gro = nettotal - discount;
                                    calc = gro;
                                    gross = calc + wdt;
                                    $("#snett").text(gross.toFixed(2)); 
                                    $("#overall").text(gross.toFixed(2)); 
                                    calc = 0;
                                }
                            }   
                    }
                    
                } // Closing Neto 
            
        
            } // Totdata closing 
        
        
        }*/
    }
    else
    {
        $("#"+tr).val("0");
        $("#t"+tr).val("0.00");
    }         
        
}

function disCal()
{
    /*
    var ttl = 0;
    let calc = false;
    const totblk = document.getElementsByClassName("totgroup");
    const rstblk = document.getElementsByClassName("totdata");  
    for(var i=0; i<totblk.length; i++)
    {
        const txt = totblk[i].getElementsByTagName("td")[0].innerText;
        //alert(txt);
        for(let x=0; x<rstblk.length; x++)
        {
            //if(totblk[i].getElementsByTagName("td")[0].innerText === rstblk[x].getElementsByTagName("td")[7].className && rstblk[x].getElementsByTagName("td")[7].getElementsByTagName("input")[0].value !== "")
            if(txt === rstblk[x].getElementsByTagName("td")[6].className && rstblk[x].getElementsByTagName("td")[7].getElementsByTagName("input")[0].value !== "" && calc == false)
            {
                ttl = ttl + parseFloat(rstblk[x].getElementsByTagName("td")[6].innerText);
                calc = true;
                //alert(ttl);
                break;
            }
        }
        calc = false;
    }
    */
    return parseFloat(80.00);

}
function fetch_record()
{
    $.ajax({
        url:"/fetch/",
        type:"POST",
        dataType:"json",
        data : {"csrfmiddlewaretoken":document.querySelector('input[name="csrfmiddlewaretoken"]').value},
        success:(response)=>
        {
            if(response.Status == "Success")
           {
                var dt = response.Data;   
                const iurl = response.media_url;
                //console.log(dt);
                var tb = $("#tbody");  
                let acctr;  
                tb.empty();
                for(let i=0; i<dt.length; i++)
                {
                    acctr = "<tr>";
                    acctr += "<td><input type='checkbox' id='"+ dt[i].id +"'/></td>";
                    acctr += "<td><input type='file' class ='tbinp'/></td>";
                    acctr += "<td><img src="+  iurl + dt[i].Image + " width='20' height='20'/></td>";
                    acctr += "<td><input type='text' value='" + dt[i].Code + "' class='tbinp'/></td>";
                    acctr += "<td><input type='text' value='" + dt[i].ProductName + "' class='tbinp'/></td>";
                    acctr += "<td><input type='text' value='" + dt[i].Content + "' class='tbinp'/></td>";
                    acctr += "<td><input type='text' value='" + dt[i].Aprice + "' class='tbinp'/></td>";
                    acctr += "<td><input type='text' value='" + dt[i].Amount + "' class='tbinp'/></td>";
                    acctr += "<td><input type=text' value='" + dt[i].group + "' class='tbinp'/></td>";
                    acctr += "<td><a href='#' class='delete_btn'><i class='fa fa-trash' id='" + dt[i].id + "'class='delete_btn'></i></a></td>";
                    acctr += "</tr>";   
                    tb.append(acctr);
                }
           }    
            
            }, failure:()=>{}
        });
}   


////order details 



$(document).on('click','.vwin',(e)=>{
    const ssrc = e.target.src;
    document.getElementById("vimage").src = ssrc;
    $("#imager").show();
});




$("#vcls").click(()=>{$("#imager").hide();});