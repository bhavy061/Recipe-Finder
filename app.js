document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".inputbox");
    const searchButton = document.querySelector("button");
    const recipeContainer = document.getElementById("recipeContainer");
    async function fetchRecipes(query) {
        recipeContainer.innerHTML = "<h3>Loading...</h3>"; 
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            displayRecipes(data.meals);
        } catch (error) {
            recipeContainer.innerHTML = "<h3>Error fetching recipes. Try again!</h3>";
        }
    }

    function displayRecipes(meals) {
        recipeContainer.innerHTML = ""; 
        if (!meals) {
            recipeContainer.innerHTML = "<h3>No recipes found!</h3>";
            return;
        }

        meals.forEach((meal) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <p><b>Category:</b> ${meal.strCategory}</p>
                <p><b>Area:</b> ${meal.strArea}</p>
                <a href="${meal.strYoutube}" target="_blank">Watch Recipe</a>
            `;
            recipeContainer.appendChild(recipeCard);
        });
    }

 
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchRecipes(query);
        }
    });
});
