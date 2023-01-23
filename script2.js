window.addEventListener("DOMContentLoaded", async function () {
  // get category
  let arraycategory = [];
  let category = document.getElementById("category");
  let cat = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );
  let respocategory = await cat.json();
  respocategory.meals.forEach((meal) => {
    arraycategory.push(meal.strCategory);
    console.log(arraycategory);
  });
  // create option
  for (let i = 0; i < arraycategory.length; i++) {
    let option = document.createElement("option");
    if (arraycategory[i] == "Lamb") {
      option.value = arraycategory[i];
      option.innerHTML = arraycategory[i];
      option.selected = true;
    } else {
      option.value = arraycategory[i];
      option.innerHTML = arraycategory[i];
    }
    category.appendChild(option);
  }
  // get area
  let arrayarea = [];
  let area = document.getElementById("area");
  let are = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let respoare = await are.json();
  respoare.meals.forEach((meal) => {
    arrayarea.push(meal.strArea);
  });
  // creat option area
  for (let i = 0; i < arrayarea.length; i++) {
    let option = document.createElement("option");
    if (arrayarea[i] == "Moroccan") {
      option.value = arrayarea[i];
      option.innerHTML = arrayarea[i];
      option.selected = true;
    } else {
      option.value = arrayarea[i];
      option.innerHTML = arrayarea[i];
    }
    area.appendChild(option);
  }
  getcat();
});
// show lamb and moroccan by default
     async function getcat() {
  let arraymoroccan, arraylamb;
  // show lamb
  arraylamb = [];
  let arr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`
  );
  let respocatego = await arr.json();
  respocatego.meals.forEach((meal) => {
    arraylamb.push(meal.idMeal);
  });
  // show moroccan
  arraymoroccan = [];
  let arrm = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=Moroccan`
  );
  let respomaro = await arrm.json();
  respomaro.meals.forEach((meal) => {
    arraymoroccan.push(meal.idMeal);
  });
  let match = arraymoroccan.filter(function (e) {
    return  arraylamb.indexOf(e) > -1;
  });
  //   get the element with  same id
  let arraymatch = [];
  for (let i = 0; i < match.length; i++) {
    const arrma = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match[i]}`
    );
    const arrmatch = await arrma.json();
    arraymatch.push(arrmatch.meals[0]);
  }
  sliceelement(arraymatch);
  createbtn(arraymatch);
  setpage(0, arraymatch);
}
// creat card
const card = document.getElementById("meal");
function getcard(data) {
  card.innerHTML += `
  <div class="card mb-3 item" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.strMealThumb}" class="img-fluid rounded-start "  alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.strMeal}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="modaldata(${data.idMeal})">
        For More
      </button>
      </div>
    </div>
  </div>
  </div>`;
}
card.addEventListener("click", modaldata)

function modaldata(e) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e} `)
    .then(response => response.json())
    .then((data) => fillmodel(data.meals[0]))
}


function fillmodel(data) {
  html = `
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
    html +=`<li>${data["strIngredient" + i]}  : ${data["strMeasure" + i]} </li>`;
    i++

  } while ( data["strIngredient" + i] !== null &&
      data["strIngredient" + i] !== "");

      html +=`<h5>instruction:</h5>
  <p  class="preparation">${data.strInstructions}</p>
  <a href="${data.strYoutube}"  type="button" class="btn btn-outline-danger" target="_blank">video</a>
  `;
  document.getElementById('modal').innerHTML = html;
} 
// // modal
//    card.addEventListener("click", getmodal)
// function getmodal(e) {
//   // get data
//   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)
//     .then((response) => response.json())
//     .then((data) => modaldetails(data.meals[0]));
// }
// function modaldetails(data) {
//   // creat modal
//   html = `
//   <div class="modal-body">
//   <img src="${data.strMealThumb}" class="modal-img   img-fluid"  >
//   <h5 class="modal-title" id="exampleModalLabel">${data.strMeal}</h5>
//   <ul>
//   <h6> Category : ${data.strCategory}</h6>
//   <h6>Area : ${data.strArea}</h6>
  
//   </ul>
//   <h5 class="ingrédient"> ingrédient:</h5>
//   </div>`;
//   //  measure
//   let i=1;
//   do {
//     html +=`<li>${data["strIngredient" + i]}  : ${data["strMeasure" + i]} </li>`;
//     i++;

//   } while ( data["strIngredient" + i] !== null &&
//       data["strIngredient" + i] !== "");
//       html +=`<h5>instruction:</h5>
//   <p  class="preparation">${data.strInstructions}</p>
//   <a href="${data.strYoutube}"  type="button" class="btn btn-outline-danger" target="_blank">video</a>
//   `;
//   document.getElementById("modal").innerHTML = html;
// }
// pagination
// get max number recette 

function getnumber(item) {
  let maxrecette = 6;
 const getnumber = Math.ceil(item.length / maxrecette)
 return getnumber
}
function sliceelement(item) {
  let maxrecette = 6;
  let sliceelement =[];
  for (let i = 0; i < getnumber(item) ; i++) { 
sliceelement.push(item.slice( i * maxrecette, (i + 1) * maxrecette
))
  }
  return sliceelement
}
// create button for pagination
function createbtn(item){
  let pagi = document.getElementById('pagi')
  pagi.innerHTML=""
 for (let i = 0; i < getnumber(item) ; i++){
  const li = document.createElement('li')
  li.setAttribute("class", "page-item")
  const a = document.createElement('a')
  a.setAttribute("class", "page-link")
  a.innerHTML = i + 1
  li.appendChild(a)
  a.addEventListener("click",() => {
    let active = document.querySelectorAll("li")
    active.forEach((e) =>{
     e.classList.remove("active")
    })
    li.setAttribute("class", "active")
    setpage(i, item)
  })
  pagi.appendChild(li)
 }
}
function setpage(getnumber, item) {
  card.innerHTML=""
  const pages = sliceelement(item)[getnumber]
  for (const data of pages) {  
    getcard(data)
  }
}
// show all card   
async function showalldata() {
  let strallcategory = [];
  const responsstrcategory = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
  let data = await responsstrcategory.json();
  data.meals.forEach((data) => {
    strallcategory.push(data.strCategory);
  });
  let allcategoryid = [];
  for (let i = 0; i < strallcategory.length; i++) {
    const responsid = await fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${strallcategory[i]}`
    );
    let data = await responsid.json();
    data.meals.forEach((data) => {
      allcategoryid.push(data.idMeal);
    });
  }
  let output = []
  for (let i = 0; i < allcategoryid.length; i++) {
    const resultid = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${allcategoryid[i]}`)
    let data = await resultid.json()
    data.meals.forEach((data) => {
      output.push(data)
    })
  }
  sliceelement(output);
  createbtn(output);
  setpage(0, output);

}

async function allcategory() {

  let everycategory = []
  const list = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  let data = await list.json()
  data.meals.forEach((data) => {
    everycategory.push(data.strCategory)

  })
  let allcategoryid = [];
  for (let i = 0; i < everycategory.length; i++) {
    const responsid = await fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${everycategory[i]}`
    );
    let data = await responsid.json();
    data.meals.forEach((data) => {
      allcategoryid.push(data.idMeal);
    });
  }
  let areaID = []
  let fetcharea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectA.value}`)
  let arearespos = await fetcharea.json()
  arearespos.meals.forEach((data) => {
    areaID.push(data.idMeal)
  })
  let match = areaID.filter(function (e) {
    return allcategoryid.indexOf(e) > -1;
  })
  let result = []
  for (let i = 0; i < match.length; i++) {
    let fetchid = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match[i]}`)
    idrespons = await fetchid.json()
    idrespons.meals.forEach((data) => {
      result.push(data)
    })
  }
  sliceelement(result);
  createbtn(result);
  setpage(0, result);

}
// get all area
async function allAreas() {
  let everyarea = []
  const list = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let data = await list.json()
  data.meals.forEach((data) => {
    everyarea.push(data.strArea)
  })
  let allareaid = [];
  for (let i = 0; i < everyarea.length; i++) {
    const responsid = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${everyarea[i]}`
    );
    let data = await responsid.json();
    data.meals.forEach((data) => {
      allareaid.push(data.idMeal);
    });
  }
  let categoryID = []
  let fetcharea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${select.value}`)
  let arearespos = await fetcharea.json()
  arearespos.meals.forEach((data) => {
    categoryID.push(data.idMeal)
  })
  let match = categoryID.filter(function (e) {
    return allareaid.indexOf(e) > -1;
  })
  let result = []
  for (let i = 0; i < match.length; i++) {
    let fetchid = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match[i]}`)
    idrespons = await fetchid.json()
    idrespons.meals.forEach((data) => {
      result.push(data)
    })
  }
  sliceelement(result);
  createbtn(result);
  setpage(0, result);
}
async function selected() {

  let catid = [];
  let areaid = [];
  const response1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${select.value}`
  );
  const category = await response1.json();
  category.meals.forEach((data) => {
    catid.push(data.idMeal);
  });
  const response2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectA.value}`
  );
  const area = await response2.json();
  area.meals.forEach((data) => {
    areaid.push(data.idMeal);
  });
  let sameid = areaid.filter(function (e) {
    return catid.indexOf(e) > -1;
  });
  let result = [];
  for (let i = 0; i < sameid.length; i++) {
    const idfitch = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${sameid[i]}`
    );
    const response = await idfitch.json();
    result.push(response.meals[0]);
  } if (result.lengt = 0) {
    card.innerHTML = "";
    card.innerHTML = `<p class="text-danger display-5 text-center" >
	   SORRY ,THIS RECIPE IS NOT FOUND CAN YOU SEARSH FOR SOMETHINGS ELSE 
	 </p>`;
  } else {

    sliceelement(result);
    createbtn(result);
    setpage(0, result);
  }

}

let selectA = document.getElementById("area");
let select = document.getElementById("category");

const filtratiobtn = document.getElementById("button");
filtratiobtn.addEventListener("click", function () {
  if (selectA.value == "allarea" && select.value == "allcategory") {
    showalldata();
  }

  else if (selectA.value != "allarea" && select.value == "allcategory") {
    allcategory()
  } else if (selectA.value == "allarea" && select.value != "allcategory") {
    allAreas()
  } else {
    selected()
  }

});