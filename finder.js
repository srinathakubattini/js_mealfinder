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
.then((res) =>res.json())

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
    
    categories.forEach((category) => {
      const { strCategory, strCategoryDescription, strCategoryThumb } = category;

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
      // Thumbnail card
      const categoryThumb = document.createElement("div");
      categoryThumb.className =
        "bg-white shadow-lg relative text-center cursor-pointer rounded-lg overflow-hidden hover:shadow-xl transition w-65 h-60";
      categoryThumb.innerHTML = `
        <img src="${strCategoryThumb}" alt="${strCategory}" class="w-full h-60 object-cover p-2">
        <div class="absolute py-1 px-2 text-sm text-white bg-orange-500 rounded top-0 right-0 m-1">${strCategory}</div>
      `;
      categoryThumb.addEventListener("click", () =>{
        mealsAfterSearching.classList.add("hidden");
        mealdetails.classList.add("hidden");
        fetchMealsByCategory(strCategory, strCategoryDescription);
        window.scrollTo({ top: 408, behavior: "smooth" });
    });
      categoryThumbList.appendChild(categoryThumb);
    });
});
// Search meal by name
searchBtn.addEventListener("click", () => {
  const mealName = searchInput.value.trim();
  if (!mealName) {
    alert("Please enter a meal name to search.");
    return;
  }

  mealsAfterSearching.classList.remove("hidden");
  mealsByCategory.classList.add("hidden");
  
});

