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
// pagination 
const maxecards = 6;

function pagenumber(arayvalues) {
  const pagenumber = Math.ceil(arayvalues.length / maxecards);
  return pagenumber;
}

function allpages(arayvalues){
  const allpages = [];
  for (let i = 0; i < pagenumber(arayvalues); i++) {
    allpages.push(arayvalues.slice(i * maxecards, (i + 1) * maxecards));
  }
  return allpages;
}
/////////  search //////
const search = document.getElementById("searchbtn");
search.addEventListener("click", function (e) {
  e.preventDefault();
  const input = document.getElementById("serchinput").value;
  const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => pagesersh(data.meals));
});

function btnpagination(arayvalues) {
  let footer = document.getElementById("pagin-num");
  footer.innerHTML = "";
  for (let i = 0; i < pagenumber(arayvalues); i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "page-item");
    const a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.innerHTML = i + 1;
    li.appendChild(a);
    a.addEventListener("click", () => {
      let activremov = document.querySelectorAll("li");
      activremov.forEach((e) => {
        e.classList.remove("active");
      });
      li.setAttribute("class", "active");
      // Display the appropriate page when the button is clicked
      displayPage(i, arayvalues);
    });
    footer.appendChild(li);
  }
}
function displayPage(pagenumber, arayvalues) {
  // Clear the current page

  cards.innerHTML = "";

  const page = allpages(arayvalues)[pagenumber];
  for (const data of page) {
    creatcards(data);
  }
}

function pagesersh(data) {
  cards.innerHTML = "";

  if (data == null) {
    cards.innerHTML = "";
    cards.innerHTML = `<p class="text-danger display-5 text-center" >
	   SORRY ,THIS RECIPE IS NOT FOUND CAN YOU SEARSH FOR SOMETHINGS ELSE 
	 </p>`;
  } else {
    allpages(data);
    btnpagination(data);
    displayPage(0, data);
  }
}
 
