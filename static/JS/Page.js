const pagnumbers = document.getElementById("pagination-numbers");
const paginated_list = document.getElementById("jdata");
const listitms = paginated_list.querySelectorAll("tr");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const limit = 5;
const pageCount= Math.ceil(listitms.length/limit);
let currentpage;

const appendPageNumbers = (index)=>
{
    const pageNumber = document.createElement('button');
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index",index);
    pageNumber.setAttribute("aria-label", "page" + index);
    pagnumbers.appendChild(pageNumber);
}

const getPaginationNumbers=()=>
{
    for(let i=1; i<=pageCount; i++)
    {
        appendPageNumbers(i);
    }
}


window.addEventListener("DOMContentLoaded", () => {
    getPaginationNumbers();
    setCurrentPage(1);  
    document.querySelectorAll(".pagination-number").forEach((button)=>{
        const pageindex = Number(button.getAttribute("page-index"));
        if(pageindex)
        {
            button.addEventListener("click",()=>{
                setCurrentPage(pageindex);
            });
        }
    });

  });


  const setCurrentPage = (pagenum)=>
  {
    currentpage = pagenum;
    getActivePageNumber();
    const prevpage = (pagenum - 1 ) * limit;
    const nextpage = pagenum * limit;
    listitms.forEach((item, index)=>{
        item.classList.add("hidden");
        if(index >= prevpage && index < nextpage)   
        {
            item.classList.remove("hidden");    
        }
    });
     
  }

 const getActivePageNumber = ()=>
 {
    document.querySelectorAll(".pagination-number").forEach((button)=>{
        button.classList.remove("active");
        
        const pageIndex = Number(button.getAttribute("page-index"));
        if(pageIndex == currentpage)
        {
            button.classList.add("active");
        }
    });
 }