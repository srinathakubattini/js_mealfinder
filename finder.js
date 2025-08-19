const caratbtn = document.getElementById("categoriebtn");
const categorielist =document.getElementById("categoriesbar");

caratbtn.addEventListener("click",()=>{
    categorielist.classList.toggle("hidden");

});
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
.then(response =>{
    if(!response.ok){
        throw new Error("Network response was not ok" + response.statusText);
    }
    return response.json();
})
.then(data => {
    
    const categoriesorder = data.categories;


    const closeitem=document.createElement("li");
    closeitem.className ="flex justify-end px-2";
    const closebtn=document.createElement("button");
    closebtn.innerHTML='<i class="fa-solid fa-xmark text-gray-500 hover:text-red-500 text-md"></i>'
    closebtn.addEventListener("click",()=>{
        categorielist.classList.add("hidden");
    });
    closeitem.appendChild(closebtn);
    categorielist.appendChild(closeitem);


    // add items in category by API
    categoriesorder.forEach(category => {
        const listitem =document.createElement("li");
        const link =document.createElement("a");
        link.textContent = category.strCategory
        link.href ="#";
        link.className = "text-base sm:text-lg md:text-xl text-gray-700 hover:text-orange-500";


        listitem.className ="text-s px-4 hover:bg-gray-100 cursor-pointer";
        listitem.appendChild(link);
        const divided =document.createElement("hr");
        divided.className ="border-gray-300 my-1";
        categorielist.appendChild(listitem);
        categorielist.appendChild(divided); 
    });
})
.catch(err => {
  console.error("Fetch error:", err);
  const li = document.createElement("li");
  li.textContent = "Failed to load categories.";
  li.className = "px-4 py-2 text-red-500";
  categorielist.appendChild(li);
});

