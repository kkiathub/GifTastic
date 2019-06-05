// curl "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
var topics = ["hamburger", "hot dog", "taco", "noodles", "pasta", "wonton", "pho", "fried chicken"];

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

    return queryURL + $.param(queryParams);
  }

  // function to display food gifs
  function displayFoodGifs() {

    var queryURL = buildQueryURL($(this).attr("data-name"));
    console.log(queryURL);
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#food-view").empty();
      console.log(response);

      var results = response.data;
      // ========================

      for (var i = 0; i < results.length; i++) {
        var foodDiv = $("<figure>");
        foodDiv.addClass("food-box");

        var p = $("<figcaption>").text("Rating: " + results[i].rating);
        var foodImage = $("<img>").attr("src", results[i].images.fixed_height.url);
        foodImage.attr("data-still",results[i].images.fixed_height_still.url );
        foodImage.attr("data-anim",results[i].images.fixed_height.url );
        foodImage.attr("data-state","animate");
        foodImage.addClass("img-gif");
        foodDiv.append(p);
        foodDiv.append(foodImage);
        
        $("#food-view").append(foodDiv );
      }

    });

  }

    // Function for displaying topic buttons
  function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.attr("type","button");
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

  $("#add-food").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var food = $("#food-input").val().trim();

    if (food.length===0) {
        // if null string, return.
        return;
    }

    if (topics.indexOf(food)>=0) {
        // this food is already existed in the array.
        console.log(food + "repeat!");
        return;
    }

    // The movie from the textbox is then added to our array
    topics.push(food);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

    // clear input text
    $("#food-input").val("");
  });


  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".food", displayFoodGifs);

  $(document).on("click", ".img-gif", toggleAnimation);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
  