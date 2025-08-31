
var men = document.getElementById("burger");
var cls = document.getElementById("clsburger");
var prc =document.getElementById("pricelist");
var safty = document.getElementById("safety");
var hme =document.getElementById("home");
var log = document.getElementById("user");
var clsbe = document.getElementById("clsbe");
var bwin = document.getElementById("pwin");
const placeorder = document.getElementById("placeorder");
const abt = document.getElementById("contactus");


// main content 
var mainc = document.getElementById("maincontent");

$(document).ready(function(){
    $(men).click(()=>{
        $("#burgermenu").toggle();
    });
    $(cls).click(()=>{
        $("#burgermenu").hide();
    });
    //price list
    $(prc).click(()=>{
        $(".mainpage").hide();
        $(".safty").hide();
        $(".contact").hide();
        $(".list").show();
        if(window.innerWidth<700)
        {
            $("#burgermenu").hide();
        }
    }); 
    // safty tab
    $(safty).click(()=>{
        $(".mainpage").hide();
        $(".list").hide();
        $(".contact").hide();
        $(".safty").show();
        if(window.innerWidth<700)
        {
            $("#burgermenu").hide();
        }
    }); 
    //abot tab  
    $(abt).click(()=>{
        $(".mainpage").hide();
        $(".list").hide();
        $(".safty").hide();
        $(".contact").show();
        if(window.innerWidth<700)
        {
            $("#burgermenu").hide();
        }
    });
    $(hme).click(()=>{
        $(".list").hide();
        $(".contact").hide();
        $(".safty").hide();
        $(".mainpage").show();
         if(window.innerWidth<700)
        {
            $("#burgermenu").hide();
        }
    });

    $(log).click(()=>{
        $("#logwindow").toggle("slow");
    });
    $(log).mouseover(()=>{
        $(".afuser").slideDown("slow");
        $(".beuser").slideDown("slow");
    });
    $(clsbe).click(()=>{
        $(".afuser").hide("slow");
        $(".beuser").hide("slow");
    });
    $(bwin).click(()=>{
        $(".uploadproduct").toggle("slow");
    });
    
    $("#cancelorder").click(()=>{
        $("#srcdata").empty();
        $("#srctbl").hide("slow");
    });

});     



