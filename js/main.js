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
  .then(data => data.products[0])
  .then(product => console.log(product))
  .catch(err => console.log(err));