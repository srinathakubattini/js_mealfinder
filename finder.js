const categoryList = document.getElementById("categories");
const hamburgerBtn =document.getElementById("hamburgerBtn");
const categoryThumbList = document.getElementById("categoriesList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const mealResult = document.getElementById("mealResult");
const mealdetails = document.getElementById("mealDetails");
const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");
const mealsByCategory = document.getElementById("mealsByCategory");
const mealsAfterSearching = document.getElementById("mealsAfterSearching");

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
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((res) => res.json())
    .then((data) => {
      mealResult.innerHTML = "";
      if (!data.meals) {
        mealResult.innerHTML = `<p class="text-gray-600">No meals found for "${mealName}".</p>`;
        return;
      }
      data.meals.forEach((meal) => {
        const mealCard = document.createElement("div");
        mealCard.className =
          "bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition cursor-pointer";
        mealCard.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-40 object-cover">
          <div class="p-4">
            <p class="text-sm text-gray-600 mb-1">${meal.strArea}</p>
            <h3 class="text-lg font-bold mb-2">${meal.strMeal}</h3>
          </div>
        `;
        mealCard.addEventListener("click", () => {
          showMealDetails(meal.idMeal);
          window.scrollTo({ top: 408, behavior: "smooth" });
        });
        mealResult.appendChild(mealCard);
      });
    });
    window.scrollTo({ top: 408, behavior: "smooth" });
});
// Enter key search
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// Fetch meals by category
function fetchMealsByCategory(categoryName, description) {
  const categoryDesc = document.getElementById("categoryDescription");
  const mealsList = document.getElementById("mealsList");

  mealsAfterSearching.classList.add("hidden");
  mealsByCategory.classList.remove("hidden");

  categoryDesc.innerHTML = `
    <div>
      <h3 class="text-lg font-bold text-orange-600 mb-2">${categoryName}</h3>
      <p class="text-gray-600 text-sm">${description}</p>
    </div>
  `;
  mealsList.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((res) => res.json())
    .then((data) => {
      mealsList.innerHTML = "";
      if (!data.meals) {
        mealsList.innerHTML = `<p class="text-gray-600">No meals found for "${categoryName}".</p>`;
        return;
      }
      data.meals.forEach((meal) => {
        const mealCard = document.createElement("div");
        mealCard.className =
          "bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition cursor-pointer";
        mealCard.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-40 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">${meal.strMeal}</h3>
          </div>
        `;
        mealCard.addEventListener("click", () => {
          showMealDetails(meal.idMeal);
          window.scrollTo({ top: 408, behavior: "smooth" });
        });
        mealsList.appendChild(mealCard);
      });
    });
}
// Show meal details
function showMealDetails(mealId) {
  mealdetails.classList.remove("hidden");
  mealsByCategory.classList.add("hidden");
  mealsAfterSearching.classList.add("hidden");
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const mealData = data.meals[0];
      document.getElementById("mealName").textContent = mealData.strMeal;

      // Header
      const ingredientsContainer = document.getElementById("ingredents");
      ingredientsContainer.innerHTML = `
        <div class="flex-1">
          <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" class="mt-6 w-full md:w-96 rounded shadow-lg" />
        </div>
        <div id="mealDetailsText" class="flex-1 flex-col p-4">
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-3xl font-bold text-orange-600 mb-3">${mealData.strMeal}</h2>
          <p class="text-gray-700 my-1"><strong>Category:</strong> ${mealData.strCategory}</p>
          <p class="text-gray-700 my-1"><strong>Area:</strong> ${mealData.strArea}</p>
          ${mealData.strTags 
            ? `
              <div class="my-2 flex items-center">
                <strong class="text-gray-800">Tags:</strong>
                <div class="flex space-x-2 flex-wrap mt-1 mx-1">
                  ${mealData.strTags.split(',').map(tag => `
                    <span class="text-orange-500 px-1 rounded text-sm font-medium border-2 border-orange-500">
                      ${tag.trim()}
                    </span>
                  `).join('')}
                </div>
              </div>
            `
            : ""
          }
          ${mealData.strSource ? `<p class="text-blue-600 mt-2"><a href="${mealData.strSource}" target="_blank" class="underline hover:text-blue-800">Source</a></p>` : ""}
        </div>
        </div>
      `;

      gi
    });

}

