//This is the url template we will be fetching our information from https://world.openfoodfacts.net/api/v2/search?categories_tags_en=Orange Juice&countries_tags_en=United States&fields=product_name,nutrition_grades,brands,ingredients,nutriscore_grade,image_front_url,nova_group&sort_by=nutriscore_score
//Lets first do a fetch on orange juice and see what we get.
const URL = 'https://world.openfoodfacts.net/api/v2/search?categories_tags_en=Orange Juice&countries_tags_en=United States&fields=product_name,nutrition_grades,brands,ingredients,nutriscore_grade,image_front_url,nova_group&sort_by=nutriscore_score'
fetch(URL)
  .then(res => {
    if (!res.ok) {
      console.log('Failed Fetch')
    }
    console.log('Successful Fetch')
    return res.json();
    })
  .then(data => data.products[1])
  .then(product => createCard(product))
  .catch(err => console.log(err));

//Now that we can see the data for one product, lets start pseudocoding what we have to do.
//We know we will recieve an array of object products, with the object containing all the related data. We want to seperate each piece of info we want to be stored in a variable to be able to use template literals to print each card to the dom for each product. Lets try to print one card to the dom for the first product for now.

//Lets grab all the dom elements we need for this project, storing them globally in a variable
const category = document.querySelector('.input_category');
const searchButton = document.querySelector('button_search');
//This is the section we will be creating the cards in.
const cardsSection = document.querySelector('.content_cards');

function createCard(obj) {
  const brand = obj.brands;
  const product = obj.product_name;
  const imageUrl = obj.image_front_url || 'assets/alt-image.jpg';
  //Ingredients will be given as an array
  const ingredients = obj.ingredients;
  const testIngredient = ingredients[0].id
  const novaScore = obj.nova_group;
  const nutriScore = obj.nutriscore_grade;
  console.log(nutriScore);
  const cardElement = document.createElement('section');
  cardElement.classList.add('card');
  cardElement.innerHTML = `<h2 class="card_brand">${brand}</h2>
  <p class="card_product">${product}</p>
  <img src="${imageUrl}" alt="" class="card_image">
  <section class="card_info">
    <span class="product_nutri-score">${nutriScore}
    </span>
    <span class="product_NOVA-score">${novaScore}</span>
    <section class="product_ingredients">
      <h3>Ingredients</h3>
      <ul class="product_ingredients">
        <li>${testIngredient}</li>
      </ul>
    </section>
  </section>`
  cardsSection.appendChild(cardElement);
}
//We have our card element creator, now lets see if we can do it for each item in the array.