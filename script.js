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
      Launch demo modal
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
  output = "";
  output +=
    `
  <div class="modal-body">
<img src="${data.strMealThumb}" class="modal-img   img-fluid"  >
<h5 class="modal-title" id="exampleModalLabel">${data.strMeal}</h5>
<ul>
<li> Category : ${data.strCategory}</li>
<li>Area : ${data.strArea}</li>
<li>instruction:</li>
</ul>
<pre class="ingrédient"></pre>
<p  class="preparation">${data.strInstructions}</p>
<a id="video"  href="${data.strYoutube}" target="_blank">video</a>
</div>
  `
  document.getElementById('modal').innerHTML = output;
}


const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 5;

function DisplayList (items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];

		let item_element = document.createElement('div');
		item_element.classList.add('item');
		item_element.innerText = item;
		
		wrapper.appendChild(item_element);
	}
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, list_element, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

DisplayList(list_items, list_element, rows, current_page);
SetupPagination(list_items, pagination_element, rows);


