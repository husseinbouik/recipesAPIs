// get element by id
const cards = document.getElementById("allcards");
// declare avaribal to apend our html
let details = "";
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
  output += 
  `<div class="card mb-3 item" style="max-width: 540px;">
<div class="row g-0">
  <div class="col-md-4">
    <img src="${data.strMealThumb}" class="img-fluid rounded-start "  alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${data.strMeal}</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "modaldata(${data.idMeal})">
      For More
    </button>
    </div>
  </div>
</div>
</div>`;

  // console.log(output);
  cards.innerHTML = output;
}



cards.addEventListener("click", modaldata)

function modaldata(e) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e} `)
    .then(response => response.json())
    .then((data) => fillmodel(data.meals[0]))
}


function fillmodel(data) {
  output = `
  <div class="modal-body">
<img src="${data.strMealThumb}" class="modal-img   img-fluid"  >
<h5 class="modal-title" id="exampleModalLabel">${data.strMeal}</h5>
<ul>
<h6> Category : ${data.strCategory}</h6>
<h6>Area : ${data.strArea}</h6>

</ul>
<h5 class="ingrédient"> ingrédient:</h5>
</div>
  `
  let i=1;
  do {
    output +=`<li>${data["strIngredient" + i]}  : ${data["strMeasure" + i]} </li>`;
    i++

  } while ( data["strIngredient" + i] !== null &&
      data["strIngredient" + i] !== "");

  output +=`<h5>instruction:</h5>
  <p  class="preparation">${data.strInstructions}</p>
  <a href="${data.strYoutube}"  type="button" class="btn btn-outline-danger" target="_blank">video</a>

  
  `;
  document.getElementById('modal').innerHTML = output;
}

 
