function TotalCalculation()
{
    var WithoutDiscount = 0.00;
    var GrossTotal = 0.00;
    var subtotal = 0.00;
    var calc = 0;
    let txc = document.getElementById("protbl").getElementsByTagName("tr");
    var wdt = 0.00;
    for(let i=0; i<txc.length; i++)
    {
        //totdata
        if(txc[i].className === "totdata")
        {
            var bxtotal = parseFloat(txc[i].getElementsByTagName("td")[8].getElementsByTagName("input")[0].value);
            var bxqty = txc[i].getElementsByTagName("td")[7].getElementsByTagName("input")[0].value;
            //actual price from web
            var neto = parseFloat(txc[i].getElementsByTagName("td")[4].innerText);
            // calc Actual Total 
            var ActualAmount = neto * bxqty;
            //console.log(ActualAmount);
            if(neto === 0.00 || neto === 0)
            {
                //console.log(txc[i].getElementsByTagName("td")[4].innerText);
                if(isNaN(bxtotal) === false)
                {
                    if(typeof bxtotal === "number")
                    {
                        if(bxqty != 0)
                        {
                            let conTotal = parseFloat(txc[i].getElementsByTagName("td")[5].innerText);
                            let conMth = conTotal * bxqty;
                            //console.log(wdt);
                            //console.log(conMth);
                            wdt =  parseFloat(conMth) + wdt;  
                            //console.log(wdt);   
                            $("#wdt").text(wdt.toFixed(2)); 
                            calc = WithoutDiscount + wdt;
                            //gross = gross;   
                            //console.log(calc);    
                            $("#snett").text(calc.toFixed(2));     
                            $("#overall").text(calc.toFixed(2)); 
                            //calc = 0;
                        }

                    }// closng  bx total nan par 
                }
                
            }
            else
            {
                if(isNaN(bxtotal) === false)
                {
                    if (typeof bxtotal === "number")
                    {   

                        if(bxqty !=0)
                        {
                            let calGrossTotal = ActualAmount;
                            GrossTotal = calGrossTotal + GrossTotal;

                            //discount Cal    
                        }


                        /*
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
                        calc = 0;*/
                    }
                }   
            }

        } // totdata cosing 

       
    }//closing For loop
    // tot calculation 

    //console.log(GrossTotal);
    $("#nett").text(GrossTotal.toFixed(2));
    const dis = GrossTotal*80/100;
    subtotal = parseFloat(GrossTotal - dis);
    $("#dnett").text(dis.toFixed(2));
    $("#snett").text(subtotal.toFixed(2)); 
    const overall = parseFloat(subtotal + calc);
    $("#overall").text(overall.toFixed(2)); 
}