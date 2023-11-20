//This is the url template we will be fetching our information from https://world.openfoodfacts.net/api/v2/search?categories_tags_en=Orange Juice&countries_tags_en=United States&fields=product_name,nutrition_grades,brands,ingredients,nutriscore_grade,image_front_url,nova_group&sort_by=nutriscore_score
//Lets first do a fetch on orange juice and see what we get.
// const URL = 'https://world.openfoodfacts.net/api/v2/search?categories_tags_en=Orange Juice&countries_tags_en=United States&fields=product_name,nutrition_grades,brands,ingredients,nutriscore_grade,image_front_url,nova_group&sort_by=nutriscore_score'
// fetch(URL)
//   .then(res => {
//     if (!res.ok) {
//       console.log('Failed Fetch')
//     }
//     console.log('Successful Fetch')
//     return res.json();
//     })
//   .then(data => data.products)
//   .then(products => products.forEach(product => createCard(product)))
//   .catch(err => console.log(err));

//Now that we can see the data for one product, lets start pseudocoding what we have to do.
//We know we will recieve an array of object products, with the object containing all the related data. We want to seperate each piece of info we want to be stored in a variable to be able to use template literals to print each card to the dom for each product. Lets try to print one card to the dom for the first product for now.

//Lets grab all the dom elements we need for this project, storing them globally in a variable
const currentCategory = document.querySelector('.input_category');
const searchButton = document.querySelector('.button_search');
//This is the section we will be creating the cards in.
const cardsSection = document.querySelector('.content_cards');

//Function to dynamically create cards for each product
function createCard(obj) {
  const product = obj.product_name;
  let brand = obj.brands;
  let imageUrl = obj.image_front_url;

  //Ingredients will be given as an array of objects, but the property doesn't exist in some so we can set a conditional to set the ingredients if availiable, do nothing if not.
  let ingredients = obj.ingredients;
  let nutriScore = obj.nutriscore_grade.toUpperCase();
  let novaScore = obj.nova_group;

  //Setting default values for properties that were not found
  brand = brand || 'No brand specified';
  imageUrl = imageUrl || 'assets/alt-image.jpg';
  novaScore = obj.nova_group || 'No NOVA Score provided';
  nutriScore = nutriScore || 'No Nutri-Score provided';

  //Mapping ingredients to their ids and joining them to form a list of ingredients.
  if (ingredients != undefined) {
    ingredients = obj.ingredients.map(e => e.id.replace('en:', '').replace('la:', '')).join(', ');
    }
  const cardElement = document.createElement('section');
  cardElement.classList.add('card');
  cardElement.innerHTML = `<h2 class="card_brand | fs-medium">${brand}</h2>
  <p class="card_product | fs-small">${product}</p>
  <img src="${imageUrl}" alt="" class="card_image">
  <section class="card_info">
    <h3 class="fs-xsmall">Nutri-Score</h3>
    <span class="product_nutri-score fs-small">${nutriScore}
    </span>
    <h3 class="fs-xsmall">NOVA</h3>
    <span class="product_NOVA-score fs-small">${novaScore}</span>
    ${ingredients ? `<section class="product_ingredients">
    <h3 class="fs-medium">Ingredients</h3>
    <p class="product_ingredients | fs-small">${ingredients}
    </p>
  </section>` : ''}
  </section>`

  cardsSection.appendChild(cardElement);
}
//We have our card element creator, now lets see if we can do it for each item in the array.

//Now that both the fetch and createCards() function is working successfully in printing the cards to the dom from the products result, we can encapsulate the fetch in a function to be called on the click event of the search button

function fetchProducts() {
  const category = currentCategory.value;
  const options = {
    'User-Agent': 'takingcareofme.netlify.app, ptai7722@gmail.com',
  };
  const url = `https://world.openfoodfacts.net/api/v2/search?categories_tags_en=${category}&countries_tags_en=United States&fields=product_name,nutrition_grades,brands,ingredients,nutriscore_grade,image_front_url,nova_group&sort_by=nutriscore_score`

  //guard clause if there is no current input
  if (!category) return;
  
  //Calling resetting of the content_cards section each new fetch.
  resetCards();

  fetch(url, options)
    .then(res => {
      if (!res.ok) {
        console.log('Failed Fetch')
      }
      console.log('Successful Fetch')
      return res.json();
      })
    .then(data => data.products)
    .then(products => {
      products.forEach(product => createCard(product))
    })
    .catch(err => console.log(err));
}

function resetCards() {
  cardsSection.innerHTML = '';
}

//Function to initialize an event listener, with the parameters of the element we want to add a listener to, and the function to bind to the event.
function initEventListener(element, func) {
  element.addEventListener('click', func)
}

initEventListener(searchButton, (e) => {
  fetchProducts();
});