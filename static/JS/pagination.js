var data;
var tdata;
$(window).on('load',(e)=>
{   
    e.preventDefault();
    order_details();
});


const order_details = ()=>{

    $.ajax({
        url:'/orderdetails/',   
        type:'POST',
        dataType:'json',
        data:{type : "ALL", "csrfmiddlewaretoken":document.querySelector('input[name="csrfmiddlewaretoken"]').value},
        success:(res)=>
        {
            var dtbl = $("#jdata");
            dtbl.empty();
            let tr;
            const od = res.data;
            const dt = res.udt;
            data = od;
            tdata=dt;
            if(res.data)
            {
                for(let x=0; x<od.length; x++)
                {   
                    let dtr = new Date(od[x].OrderDate);
                    let odr = dtr.getMonth()+1 + "/" +dtr.getDate()+ "/" +dtr.getFullYear();
                        tr = "<tr>";
                        tr += "<td>" + odr + "</td>";
                        tr += "<td>" + od[x].ProductName + "</td>";
                        tr += "<td>" + od[x].Qty + "</td>";
                        tr += "<td>" + od[x].Amount + "</td>";
                        tr += "<td>" + od[x].Total + "</td>";
                        tr += "<td>" + od[x].name + "</td>";
                        tr += "<td>" + od[x].mobile + "</td>";
                        tr += "<td>" + od[x].Address + "</td>";
                        tr += "<td>" + od[x].city + "</td>";
                        tr += "<td>" + od[x].state + "</td>";
                        tr += "<td>"+ od[x].status +"</td>";
                        tr += "<td><select id='"+ od[x].id+ "' class='status'><option value='None'>None</option><option value='Ready To Deliver'>Ready To Deliver</option><option value='Delivered'>Delivered</option><option value='Cancelled'>Cancelled</option></select></td>"
                        tr += "</tr>";
                        dtbl.append(tr);
                }

            }
            else 
            {   
                tr = "<tr>DATA NOT FOUND</tr>";
            }
            
        },
        failure:()=>{}  
    }); 

}



$(document).on('click','#logoff',(e)=>
{
    alert("logged off");
    e.preventDefault();
    $.ajax({
        url:'/logoff/',
        type:"POST",
        data:{'csrfmiddlewaretoken':document.querySelector('input[name="csrfmiddlewaretoken"]').value},
        success:(res)=>
        {
            //console.log(res);
            if(res.Status == "success")
            {
                window.location.replace("https://goldeneaglecrackers.in");
            }
        }
    });
});     


$(document).on('change','.status',(e)=>
{
    e.preventDefault();
    const dec = confirm("Are you sure want to update the data ?");
    if(dec === true)
    {
        const uid = e.target.id;
        const uval = e.target.value;    
        $.ajax({
            url:"/status/",
            type:"POST",
            dataType:'json',
            data:{"uid":uid, "uval":uval, "csrfmiddlewaretoken" : document.querySelector('input[name="csrfmiddlewaretoken"]').value},
            success:(res)=>{
                window.location.reload();
            }, failure:()=>{}
        });
    }
    
});     

$(document).on('click','#fetch',(e)=>{
    e.preventDefault();
    const jdate = $("#jdate").val();
    const jsts = $("#jsts").val();
    const jmobile = $("#jmobile").val();
    const limit = document.getElementById("jdata").getElementsByTagName("tr");
    const odate = new Date(document.getElementById("jdate").value);
    const mob = document.getElementById("jmobile").value;
    const dd = odate.getDate();
    const mm = odate.getMonth()+ 1 ;
    const yy = odate.getFullYear();
    let orf = mm + "/" + dd + "/" + yy;
    if(jsts !="None" ||  orf !="" || mob != "")
    {
        if(orf == "NaN/NaN/NaN")
        {
            orf="";
        }
        for(let i=0; i<limit.length; i++)
        {
            const data = limit[i].getElementsByTagName("td");
            if(orf!="")
            {
                if(data[0].innerText != orf)
                {
                    limit[i].hidden=true;
                }
                else
                {
                    limit[i].hidden=false;
                }
            }    
            if(jsts!="None" && orf =="")
            {
                if(data[10].innerText != jsts)
                {
                    limit[i].hidden=true;
                }
                else
                {
                    limit[i].hidden=false;
                }
            }
            if(jsts!="None" && orf !="")
            {
                if(data[10].innerText != jsts || data[0].innerText != orf)
                {
                    limit[i].hidden=true;   
                }
                else
                {
                    limit[i].hidden=false;
                }
            }
            if(mob!="")
            {
                if(data[6].innerText != mob)
                {
                    limit[i].hidden=true;   
                }
                else
                {
                    limit[i].hidden=false;
                }
            }




        }
           
    }
    else
    {   
        order_details();
    }

});

function Data_Extraction()
{
    const mobs =  $("#jmobile").val();
    const od = data;
    const dt = tdata;
    csvFileData=[];
    csvTotal=[];
    for(let x=0; x<data.length; x++)
    {
        if(mobs == od[x].mobile || mobs=="*")
        {
            //console.log(od[x].mobile);
            let dtr = new Date(od[x].OrderDate);
            let odr = dtr.getMonth()+1 + "/" +dtr.getDate()+ "/" +dtr.getFullYear();
            csvFileData.push([odr, od[x].ProductName, od[x].Qty,od[x].Amount,od[x].Total,od[x].name,od[x].mobile,od[x].Address,od[x].city,od[x].state,od[x].status]);
        }
    }

    //total 
    for(let j=0; j<tdata.length; j++)
    {
        let dtr = new Date(dt[j].OD);
        let odr = dtr.getMonth()+1 + "/" +dtr.getDate()+ "/" +dtr.getFullYear();
        if(mobs == dt[j].mobile || mobs=="*")
        {
            csvTotal.push([odr,dt[j].state, dt[j].name, dt[j].city,dt[j].mobile,dt[j].NetTotal, dt[j].Discount, dt[j].SubTotal, dt[j].Round, dt[j].overAll, dt[j].mode]);
        }
    }

}