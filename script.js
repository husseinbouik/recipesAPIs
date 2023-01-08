// get element by id
const cards = document.getElementById("allcards");
// declare avaribal to apend our html
let output = "";
// after the load of content show us  6 random cards from the API(url)puis get the as a parametre response and returne it type json ,from the json data creats the cards
window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < 6; i++) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        return response.json();
      })
      .then((json) => creatcards(json.meals[0]));
  }
});

function creatcards(data) {
  output += `<div class="card mb-3" style="max-width: 540px;">
<div class="row g-0">
  <div class="col-md-4">
    <img src="${data.strMealThumb}" class="img-fluid rounded-start "  alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${data.strMeal}</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      <button type="button" class="btn btn-primary"  onclick=${
        data.idMeal} data-bs-toggle="modal" data-bs-target="#exampleModal">
      More details
    </button>
    </div>
  </div>
</div>
</div>`;

  console.log(output);
  cards.innerHTML = output;
}



 function br() {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772");
    then((response) => {
        return response.json();
      })
      .then((json) => modaldata(json.meals[0]));
};

const modal = document.getElementById("modals");
let details = "";
// fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772");
function modaldata(data) {
  details += `
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
    <img src="${data.strMealThumb}" class="card-img-top" alt="...">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <h5 class="card-title">${data.strMeal}</h5>
    <ol>
    <li>category : ${data.strCategory}</li>
    <li>country : ${data.strArea}</li>
    <li>instructions :</li>
    </ol>
    <p class="card-text"> ${data.strInstructions}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
    </div>
  </div>`;
}
modal.innerHTML = details;
