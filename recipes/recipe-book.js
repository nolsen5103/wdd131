const recipes = [
  {
    name: 'Apple Crisp',
    description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
    tags: ['dessert', 'apple', 'fall'],
    rating: 4,
    image: 'images/apple-crisp.jpg',
    imageAlt: 'Apple crisp topped with a scoop of vanilla ice cream'
  },
  {
    name: 'Chicken Tacos',
    description: 'Seasoned chicken tacos with fresh lettuce, tomatoes, cheese, and a squeeze of lime.',
    tags: ['dinner', 'chicken', 'mexican'],
    rating: 5,
    image: 'images/chicken-tacos.jpg',
    imageAlt: 'Chicken tacos with fresh toppings'
  },
  {
    name: 'Garden Pasta Salad',
    description: 'A colorful pasta salad made with vegetables, herbs, and a light Italian dressing.',
    tags: ['salad', 'lunch', 'vegetarian'],
    rating: 4,
    image: 'images/pasta-salad.jpg',
    imageAlt: 'Pasta salad with colorful vegetables'
  },
  {
    name: 'Homemade Pancakes',
    description: 'Fluffy homemade pancakes that are perfect for breakfast with berries and maple syrup.',
    tags: ['breakfast', 'sweet', 'vegetarian'],
    rating: 5,
    image: 'images/pancakes.jpg',
    imageAlt: 'Stack of pancakes with berries and syrup'
  },
  {
    name: 'Tomato Basil Soup',
    description: 'A warm and comforting tomato soup finished with fresh basil and served with crusty bread.',
    tags: ['soup', 'lunch', 'vegetarian'],
    rating: 4,
    image: 'images/tomato-soup.jpg',
    imageAlt: 'Bowl of tomato basil soup'
  }
];

const resultsElement = document.querySelector('#recipe-results');
const searchInput = document.querySelector('#recipe-search');
const searchButton = document.querySelector('#search-button');
const statusElement = document.querySelector('#search-status');

function getStars(rating) {
  return '★ '.repeat(rating) + '☆ '.repeat(5 - rating).trim();
}

function createRecipeCard(recipe) {
  const tags = recipe.tags
    .map((tag) => `<span class="recipe-tag">${tag}</span>`)
    .join(' ');

  return `
    <article class="recipe-card">
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.imageAlt}"
        onerror="this.src='images/apple-crisp.jpg'; this.alt='Apple crisp recipe image';">
      <div class="recipe-content">
        <div class="recipe-tags">${tags}</div>
        <h1>${recipe.name}</h1>
        <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
          <span aria-hidden="true">${getStars(recipe.rating)}</span>
        </span>
        <p class="recipe-description">${recipe.description}</p>
      </div>
    </article>`;
}

function displayRecipes(recipeList, statusText) {
  resultsElement.innerHTML = recipeList.length
    ? recipeList.map(createRecipeCard).join('')
    : '<article class="recipe-card recipe-card--empty"><p>No recipes matched your search. Try another keyword.</p></article>';
  statusElement.textContent = statusText;
}

function showRandomRecipe() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  displayRecipes([recipes[randomIndex]], 'Featured recipe');
}

function searchRecipes() {
  const keywords = searchInput.value
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!keywords.length) {
    showRandomRecipe();
    return;
  }

  const matchingRecipes = recipes
    .filter((recipe) => {
      const searchableText = [recipe.name, recipe.description, ...recipe.tags]
        .join(' ')
        .toLowerCase();
      return keywords.every((keyword) => searchableText.includes(keyword));
    })
    .sort((recipeA, recipeB) => recipeA.name.localeCompare(recipeB.name));

  displayRecipes(
    matchingRecipes,
    `${matchingRecipes.length} recipe${matchingRecipes.length === 1 ? '' : 's'} found`
  );
}

searchInput.addEventListener('input', searchRecipes);
searchButton.addEventListener('click', searchRecipes);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') searchRecipes();
});

showRandomRecipe();
