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
// get max number recette 
const maxrecette = 6;
function getnumber(arayvalues) {
  const getnumber = Math.ceil(arayvalues.length / maxrecette);
  return getnumber;
}

function sliceelement(arayvalues) {
  const sliceelement = [];
  for (let i = 0; i < getnumber(arayvalues); i++) {
    sliceelement.push(arayvalues.slice(i * maxrecette, (i + 1) * maxrecette));
  }
  return sliceelement;
}
// button search
const search = document.getElementById("search-btn");
search.addEventListener("click", function (e) {
  e.preventDefault();
  cards.innerHTML="";
  output="";
  const input = document.getElementById("search-input").value;
  const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => searchbutton(data.meals));
});
// button pagination
function btnpagination(arayvalues) {
  let pagenumb = document.getElementById("pagi-num");
  pagenumb.innerHTML = "";
  for (let i = 0; i < getnumber(arayvalues); i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "page-item");
    const a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.innerHTML = i + 1;
    li.appendChild(a);
    a.addEventListener("click", () => {
      output="";
      let activremov = document.querySelectorAll("li");
      activremov.forEach((e) => {
        e.classList.remove("active");
      });
      li.setAttribute("class", "active");
      // Display the appropriate page when the button is clicked
      disppage(i, arayvalues);
    });
    pagenumb.appendChild(li);
  }
}
function disppage(getnumber, arayvalues) {
  cards.innerHTML = "";
  const page = sliceelement(arayvalues)[getnumber];
  for (const data of page) {
    creatcards(data);
  }
}

function searchbutton(data) {
  cards.innerHTML = "";
  if (data == null) {
    cards.innerHTML = "";
    cards.innerHTML = `<p class="text-danger display-5 text-center" >
	 try Again
	 </p>`;
  } else {
    sliceelement(data);
    btnpagination(data);
    disppage(0, data);
  }
}
