const  maintbl = document.getElementById("protbl");
//let source = document.getElementById("srcdata");
let frm;

$(document).on('click','#placeorder',()=>{order();});
$(document).on('click', '#ordercomplete',(e)=>{
    upload_data();
});

// ajax phase 
var today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const fdate = mm + "/" + dd + "/" + yyyy;
const upload_data = ()=>
{
    const sts = confirm("Are sure place the order ?")
    if(sts ===  true)
    {
        const srcdata = document.getElementById("srcdata").getElementsByTagName("tr");
        const srl = srcdata.length;
        console.log(srl);
        for(let i=0; i<srl; i++)
        {
             frm = new FormData();
             frm.append("odate", fdate);
             frm.append("code",srcdata[i].getElementsByTagName("td")[0].innerText);
             frm.append("product",srcdata[i].getElementsByTagName("td")[1].innerText);
             frm.append("qty",srcdata[i].getElementsByTagName("td")[2].innerText);
             frm.append("amt",srcdata[i].getElementsByTagName("td")[4].innerText);
             frm.append("tot",srcdata[i].getElementsByTagName("td")[5].innerText);
             frm.append("state",$("#state").val());
             frm.append("city",$("#city").val());
             frm.append("name",$("#name").val());
             frm.append("mobile",$("#mobile").val());
             frm.append("email",$("#email").val());
             frm.append("address",$("#address").val());
             frm.append("nett",$("#nett").text());
             frm.append("dnett",$("#dnett").text());
             frm.append("snett",$("#snett").text());
             frm.append("roff",$("#roff").text());
             frm.append("overall",$("#overall").text());  
             frm.append("mode",$("#payment").val());
             frm.append("csrfmiddlewaretoken",document.querySelector('input[name="csrfmiddlewaretoken"]').value);
             $.ajax({
                url:'/userdata/',
                type:'POST',
                dataType:'json',
                data:frm,
                caches:false,
                processData: false,
                contentType:false,
                success:(response)=>
                {
                   /*$("#srcdata").empty();
                   $("#protbl").empty();
                   $("#srctbl").hide("slow");
                   $("#city").val("");
                   $("#name").val("");
                   $("#mobile").val("");
                   $("#email").val("");
                   $("#address").val("");
                   alert ("Order Placed");*/
                },
                failure:()=>{}
            });
        }       
        $.ajax({
            url:'/useraccount/',
            type:'POST',
            dataType:'json',
            data:frm,
            caches:false,
            processData: false,
            contentType:false,
            success:(response)=>
            {
               $("#srcdata").empty();
               $("#protbl").empty();
               $("#srctbl").hide("slow");
               $("#city").val("");
               $("#name").val("");
               $("#mobile").val("");
               $("#email").val("");
               $("#address").val("");
               alert ("Order Placed");
            },
            failure:()=>{}
        });
        
    }
    else
    {
        return "";
    }
    
}
//order 
const order = ()=>
{

    let source = $("#srcdata");
    const state = $("#state").val();
    const city = $("#city").val();
    const name = $("#name").val();
    const mobile = $("#mobile").val();
    const email = $("#email").val();
    const address = $("#address").val();
    // validtion for userinformation 
    //console.log(name);
    if(state === "" || city === "" || name === "" || mobile === "" || address === "")
    {
        alert("please update the all necessary information");
        return "";
    }
    let col;
    const coll = maintbl.getElementsByTagName("tr");
    const trl = coll.length;
    source.empty(); 
    for(let i=1; i<trl; i++)    
    {
        if(coll[i].className == "totdata")
        {
            const tdv = coll[i].getElementsByTagName("td")[7].getElementsByTagName("input")[0].value;
            if(tdv !== "0")
            {
                col = "<tr>";
                col+= "<td>" + coll[i].getElementsByTagName("td")[1].innerText +"</td>";
                col+= "<td>" + coll[i].getElementsByTagName("td")[2].innerText +"</td>";
                col+= "<td>" + coll[i].getElementsByTagName("td")[7].getElementsByTagName("input")[0].value +"</td>";
                col+= "<td>" + coll[i].getElementsByTagName("td")[4].innerText +"</td>";
                col+= "<td>" + coll[i].getElementsByTagName("td")[5].innerText +"</td>";    
                col+= "<td>" + coll[i].getElementsByTagName("td")[8].getElementsByTagName("input")[0].value +"</td>";
                col+= "</tr>";
                source.append(col);
            }
        }

    }
    $("#srctbl").show();
    return "";
}


