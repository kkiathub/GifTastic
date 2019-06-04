// curl "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
var topics = ["cat", "dog", "pig"];

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

    // specify the rating
    queryParams.rating = "g";

    return queryURL + $.param(queryParams);
  }

  // function to display animal gifs
  function displayAnimalGifs() {

    var queryURL = buildQueryURL($(this).attr("data-name"));
    console.log(queryURL);
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#animals-view").empty();
      console.log(response);

      var results = response.data;
      // ========================

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<figure>");
        animalDiv.addClass("animal-box");

        var p = $("<figcaption>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>").attr("src", results[i].images.fixed_height.url);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        
        $("#animals-view").append(animalDiv );
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
      a.addClass("animal btn btn-info");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the initial button text
      a.text(topics[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();

    if (animal.length===0) {
        // if null string, return.
        return;
    }

    if (topics.indexOf(animal)>=0) {
        // this animal is already existed in the array.
        console.log(animal + "repeat!");
        return;
    }

    // The movie from the textbox is then added to our array
    topics.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

  });


  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".animal", displayAnimalGifs);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
  