var getUserReposOLD = function (user) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
      "X-RapidAPI-Key": "b29978175cmsh7acead99898141dp1966d1jsn9658d91e4b1d",
    },
  };
  fetch("https://pizza-and-desserts.p.rapidapi.com/pizzas", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      displayRepos(response, user);
    })
    .catch((err) => console.error(err));
};

// Get the modal
var modal = document.getElementById("pizzaModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function displayRepos(data, user) {
  //grab the ul element from index.html
  var ulElement = document.getElementsByClassName("pizza-results");

  //loop through all the api results
  for (var i = 0; i < data.length; i++) {
    var pizzaDiv = document.createElement("div");
    pizzaDiv.setAttribute("id", i);
    pizzaDiv.setAttribute("class", "pizza-card");

    //create a li tag element
    var liTag = document.createElement("h2");
    liTag.setAttribute("class", "pizza-name");
    liTag.textContent = data[i].name;
    var ul = document.createElement("ul");
    var ingredientsArray = data[i].description.split(",");
    for (let ingredient of ingredientsArray) {
      let liTag2 = document.createElement("li");
      ingredient = ingredient.trim(); //remove leading and trailing whitespace
      liTag2.textContent = ingredient;
      liTag2.onclick = function () {
        showIngredientInfo(ingredient);
      };
      ul.append(liTag2);
    }

    //let temp = data[i].description
    // took out "'Description:' +" from liTag2.textContent
    //liTag2.textContent = data[i].description;
    //Tie description to spoonacular api to spit recipe
    // make pizzaDiv clickable via .onClick

    var imgTag = document.createElement("img");
    imgTag.setAttribute("class", "pizza-img");
    imgTag.setAttribute("src", data[i].img);
    var isVeg = data[i].veg;
    var pizzaBox = document.createElement("div");
    if (isVeg) {
      pizzaBox.setAttribute("class", "pizza-box green");
    } else {
      pizzaBox.setAttribute("class", "pizza-box red");
    }
    //append the li tag to html page
    pizzaDiv.appendChild(liTag);
    pizzaDiv.appendChild(pizzaBox);
    pizzaDiv.appendChild(ul);
    pizzaDiv.appendChild(imgTag);
    ulElement[0].appendChild(pizzaDiv);
  }
}

function showIngredientInfo(ingredient) {
  var url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&pageSize=2&api_key=Rwm9qOCYADe6GdSq4bPPA338B5gfjFpTzX28N8hv`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      var html = `<h2>${ingredient}</h2><ul>`;
      for (let nutrient of json.foods[0].foodNutrients) {
        html += `<li>${nutrient.nutrientName}: ${nutrient.value} ${nutrient.unitName}</li>`;
      }
      html += "</ul>";
      modal.innerHTML = html;
      modal.style.display = "block";
    });
}
// getUserRepos();
getUserReposOLD();

var apiKeyFDC = "Rwm9qOCYADe6GdSq4bPPA338B5gfjFpTzX28N8hv";
