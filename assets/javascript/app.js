var topics = ["hamburger", "hot dog", "taco", "noodles", "pasta", "wonton", "pho", "fried chicken", "nuts"];
var f_neutral = "😐";
var f_love = "😍";

var favorList = [];

function buildQueryURL(searchStr) {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.giphy.com/v1/gifs/search?";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { "api_key": "cwRHwkytb76ostXPP8HCCjlwR29RZzYe" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = searchStr;

  // specify the number of records returned
  queryParams.limit = 10;
  console.log($.param(queryParams));
  return queryURL + $.param(queryParams);
}

// function to display food gifs
function isInFavorite(id) {
  for (var i = 0; i < favorList.length; i++) {
    if ( favorList[i].id === id ) {
      return true;
    }
  }
  return false;
}

function displayFoodGifs() {
  var queryURL = buildQueryURL($(this).attr("data-name"));
  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    $("#food-view").empty();

    var results = response.data;
    // ========================

    for (var i = 0; i < results.length; i++) {
      var foodDiv = $("<figure>");
      foodDiv.addClass("food-box");
      {/* <a href="#" data-toggle="tooltip" title="Hooray!">Hover over me</a> */ }
      var p = $("<h5>").text("Rating: " + results[i].rating);
      // var p2 = $("<figcaption>").text(f_neutral + results[i].title);
      var p2 = $("<h6>");
      p2.addClass("food-title");
      if (isInFavorite(results[i].id)) {
        p2.append('<a href="#" class="title-link" title="Click to remove from favorite!">' + f_love + results[i].title + "</a>");

      } else {
        p2.append('<a href="#" class="title-link" title="Click to add to favorite!">' + f_neutral + results[i].title + "</a>");
      }
       var foodImage = $("<img>").attr("src", results[i].images.fixed_height.url);
      foodImage.attr("data-id", results[i].id);
      foodImage.attr("data-rating", results[i].rating);
      foodImage.attr("data-still", results[i].images.fixed_height_still.url);
      foodImage.attr("data-anim", results[i].images.fixed_height.url);
      foodImage.attr("data-state", "animate");
      foodImage.addClass("img-gif");
      foodDiv.append(p);
      foodDiv.append(p2);
      foodDiv.append(foodImage);

      $("#food-view").append(foodDiv);
    }

  });

}

function displayFavoriteGifs() {
  $("#food-view").empty();

  for (var i = 0; i < favorList.length; i++) {
    var foodDiv = $("<figure>");
    foodDiv.addClass("food-box");

    var p = $("<h5>").text("Rating: " + favorList[i].itemRating);
    var p2 = $("<h6>");
    p2.addClass("food-title");
    var title = favorList[i].title.replace(f_neutral, f_love);
    p2.append('<a href="#" class="title-link" title="Click to remove from favorite!">' + title + "</a>");
    var foodImage = $("<img>").attr("src", favorList[i].itemAnim);
    foodImage.attr("data-id", favorList[i].id);
    foodImage.attr("data-rating", favorList[i].itemRating);
    foodImage.attr("data-still", favorList[i].itemStill);
    foodImage.attr("data-anim", favorList[i].itemAnim);
    foodImage.attr("data-state", "animate");
    foodImage.addClass("img-gif");
    foodDiv.append(p);
    foodDiv.append(p2);
    foodDiv.append(foodImage);

    $("#food-view").append(foodDiv);
  }
}

// Function for displaying topic buttons
function renderButtons() {

  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  var a = $("<button>");
  a.attr("type", "button");
  a.addClass("favor btn btn-warning");
  a.text("Favorite");
  $("#buttons-view").append(a);

  // Loops through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    a = $("<button>");
    // Adds a class of movie to our button
    a.attr("type", "button");
    a.addClass("food btn btn-info");
    // Added a data-attribute
    a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

function toggleAnimation() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-anim"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}


function addToFavorite(item) {

  var itemInfo = item.next();
  var favItem = {
    id : itemInfo.attr("data-id"),
    title : item.text(),
    itemStill : itemInfo.attr("data-still"),
    itemAnim : itemInfo.attr("data-anim"),
    itemRating : itemInfo.attr("data-rating")
  };

  favorList.push(favItem);

  // save to local storage
  localStorage.clear();
  localStorage.setItem("favorList", JSON.stringify(favorList));
}

function removeFromFavorite(item) {
  var itemId = item.next().attr("data-id");
  for(var i=0; i<favorList.length; i++) {
    if (favorList[i].id === itemId) {
      favorList.splice(i,1);
      console.log(favorList);
      return;
    }
  }
  // save to local storage
  localStorage.clear();
  localStorage.setItem("favorList", favorList);
}

function loadFavorite() {
  var data = localStorage.getItem("favorList");
  if (data === null) {
    return;
  }
  favorList = JSON.parse(data);

}

function toggleFavorite() {
  var tipStr;
  var title = $(this).text();
  var emoj = title.substr(0, 2);
  if (emoj == f_neutral) {
    if (favorList.length < 10 ) {
      tipStr = "Click to remove from favorite!";
      title = title.replace(f_neutral, f_love);
      addToFavorite($(this));
    } else {
      tipStr = "Favrite Gifs reach limit of 10!";
    }
  } else {
    tipStr = "Click to add to favorite!";
    title = title.replace(f_love, f_neutral);
    removeFromFavorite($(this));
  }

  aNode = $("<a>");
  aNode.attr("href","#");
  aNode.addClass("title-link");
  aNode.attr("title", tipStr);
  aNode.text(title);

  $(this).empty();
  $(this).append(aNode);
}

function addNewItem(item) {
  if (item.length === 0) {
    // if null string, return.
    return;
  }
  // clear input text
  $("#food-input").val("");

  if (topics.indexOf(item) >= 0) {
    // this food is already existed in the array.
    console.log(item + "repeat!");
    return;
  }

  // The movie from the textbox is then added to our array
  topics.push(item);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
}

/******************************************************************************/
/* all event functions */
/******************************************************************************/

$("#food-input").keyup(function (e) {
  if (e.keyCode == 13) {
    addNewItem($("#food-input").val().trim());
  }
});

$("#add-food").on("click", function (event) {
  event.preventDefault();

  addNewItem($("#food-input").val().trim());
});


// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".food", displayFoodGifs);
$(document).on("click", ".favor", displayFavoriteGifs);

$(document).on("click", ".img-gif", toggleAnimation);

$(document).on("click", ".food-title", toggleFavorite);

// Calling the renderButtons function to display the intial buttons
renderButtons();

loadFavorite();
