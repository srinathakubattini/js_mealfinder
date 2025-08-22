const categoryList = document.getElementById("categories");
const hamburgerBtn =document.getElementById("hamburgerBtn");
const categoryThumbList = document.getElementById("categoriesList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const mealResult = document.getElementById("mealResult");
const mealdetails = document.getElementById("mealDetails");
const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");

hamburgerBtn.addEventListener("click",()=>{
    categoryList.classList.toggle("hidden");

});
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
.then(response =>{
    if(!response.ok){
        throw new Error("Network response was not ok" + response.statusText);
    }
    return response.json();
})
.then(data => {
    
    const categories = data.categories;


    const closeItem=document.createElement("li");
    closeItem.className ="flex justify-end px-2";
    const closeBtn=document.createElement("button");
    closeBtn.innerHTML='<i class="fa-solid fa-xmark text-gray-500 hover:text-red-500 text-md"></i>'
    closeBtn.addEventListener("click",()=>{
        categoryList.classList.add("hidden");
    });
    closeItem.appendChild(closeBtn);
    categoryList.appendChild(closeItem);


    // add items in category by API
    const listItem = document.createElement("li");
      listItem.className =
        "block text-gray-700 text-s px-4 py-1 hover:bg-gray-100 cursor-pointer hover:text-orange-500";
      listItem.textContent = strCategory;
      listItem.addEventListener("click", () => {
        categoryList.classList.add("hidden");
        fetchMealsByCategory(strCategory, strCategoryDescription);
        window.scrollTo({ top: 408, behavior: "smooth" });
      });
      categoryList.appendChild(listItem);
      categoryList.appendChild(document.createElement("hr"));
})
.catch(err => {
  console.error("Fetch error:", err);
  const li = document.createElement("li");
  li.textContent = "Failed to load categories.";
  li.className = "px-4 py-2 text-red-500";
  categorielist.appendChild(li);
});

