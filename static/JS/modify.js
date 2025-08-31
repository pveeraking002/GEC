

$(document).on('click','#mod_btn',(e)=>
{
    e.preventDefault();
    const dec = confirm("Are you sure want to modify the data");
    const tr = document.getElementById("tbody").getElementsByTagName("tr");
    if(dec === true)
    {
        for(let i=0; i<tr.length; i++)
        {     
            if(tr[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked == true)
            {
                let frm = new FormData();
                frm.append('id',tr[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0].id);
                frm.append('img', tr[i].getElementsByTagName("td")[1].getElementsByTagName("input")[0].files[0]);
                frm.append('code', tr[i].getElementsByTagName("td")[3].getElementsByTagName("input")[0].value);
                frm.append('product', tr[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value);
                frm.append('content', tr[i].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value);
                frm.append('aprice', tr[i].getElementsByTagName("td")[6].getElementsByTagName("input")[0].value);
                frm.append('amt', tr[i].getElementsByTagName("td")[7].getElementsByTagName("input")[0].value);
                frm.append('grp', tr[i].getElementsByTagName("td")[8].getElementsByTagName("input")[0].value);
                frm.append('csrfmiddlewaretoken',document.querySelector('input[name="csrfmiddlewaretoken"]').value);
                $.ajax({
                    url:'/modify/',
                    type:'post',
                    dataType:'json',
                    processData:false,
                    contentType:false,
                    caches:false,
                    data:frm,
                    success:()=>{},
                    failure:()=>{}
                }); 
            
            }
        }   

        alert("Data has updated");
    }

    

});
