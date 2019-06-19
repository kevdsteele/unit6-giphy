$(document).ready(function () {

  var characters = ["Thor", "Spider Man", "Iron Man", "Captain America", "Hulk", "Black Widow", "Black Panther", "Hawkeye"]

  var giphyKey = "ebLf7WRabdqXmFc7BjhdTDPDNiP4bA4T";

  var Search = "";

  var offset = 0;







  /* main function to get giphys from api call*/
  function getGiphy(Search) {
    console.log("offset is " + offset);
    var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + Search + "&api_key=" + giphyKey + "&limit=10&offset=" + offset;
    $.ajax({
      url: giphyUrl,
      method: "GET"
    }).then(function (response) {
      console.log(response);


      /* only show this button when there is content, otherwise it is hidden */
      $("#show-more").css("display", "block");

      for (i = 0; i < 10; i++) {

        var containerDiv = $("<div>");
        containerDiv.addClass("giphyCont");

        containerDiv.attr("id", response.data[i].id);
        $("#results").append(containerDiv);

        var header = $("<div>");
        header.html("ID: " + response.data[i].id);
        header.addClass("gif-title card-header");
        $("#" + response.data[i].id).append(header);

        var imgDiv = $("<img>");
        imgDiv.attr("src", response.data[i].images.fixed_height_small_still.url);
        imgDiv.attr("notClicked", response.data[i].images.fixed_height_small_still.url);
        imgDiv.attr("clicked", response.data[i].images.fixed_height_small.url);
        imgDiv.addClass("giphyBtn");
        imgDiv.attr("isClicked", "false");
        imgDiv.attr("id", "giphy" + i);
        $("#" + response.data[i].id).append(imgDiv);
        var ratingDiv = $("<div>");

        var giphyRating = response.data[i].rating;

        ratingDiv.html("Rated " + giphyRating.toUpperCase());
        ratingDiv.addClass("giphyRating card-footer");
        ratingDiv.attr("id", "gr" + response.data[i].id);
        $("#" + response.data[i].id).append(ratingDiv);

        var downIcon = $('<a target="_blank" href="' + response.data[i].images.fixed_height_small.url + '"download> <i class="fas fa-1x fa-cloud-download-alt"></i>');
        downIcon.addClass("download");
        $("#gr" + response.data[i].id).append(downIcon);



        var favCheckbox = $('<input type ="checkbox" name="' + Search + response.data[i].id + '" class="css-checkbox" id="' + Search + response.data[i].id + '"> <label for="' + Search + response.data[i].id + '" class="css-label fav"></label>');
        favCheckbox.attr("gid", response.data[i].id);
        favCheckbox.attr("clicked", response.data[i].images.fixed_height_small.url);
        favCheckbox.attr("notClicked", response.data[i].images.fixed_height_small_still.url)
        favCheckbox.attr("rating", response.data[i].rating)
        $("#gr" + response.data[i].id).append(favCheckbox);




      };


      /*when fav checkbox is clicked capture information and then call createFavs function */
      $(".fav").on("click", function () {
        console.log("fav clicked");
        var favSelected = $(this).attr("gid");
        var favStillLink = $(this).attr("notClicked");
        var favAniLink = $(this).attr("clicked");
        var favRating = $(this).attr("rating");

        var favExists = false;

        /*Check to make sure it is not already a favorite and alert user. Giphy ID used for unique value */
        for (i = 0; i < favCharacters.length; i++) {
          if (favCharacters[i].CharID === favSelected) {
            favExists = true;
            alert("This GIPHY is already in your Favorites");

          }


        }

        console.log("does it exist " + favExists);
        if (!favExists) {
          favCharacters.push({ "CharID": favSelected, "Still": favStillLink, "Ani": favAniLink, "Rating": favRating });
          localStorage.setItem("favorites", JSON.stringify(favCharacters));
          console.log("fav clicked");
          console.log(favCharacters);

          createFavs();

        }
      });

    });








    /*end getGiphy*/

    var movieURL = "https://www.omdbapi.com/?t=" + Search + "&y=&plot=short&apikey=3f41a1ad";

    $.ajax({
      url: movieURL,
      method: "GET"
    }).then(function (movieResponse) {
      console.log(movieResponse);
      $("#mov-poster").empty();
      $("#mov-info").empty();
      var movieTitle = $("<p>");
      movieTitle.text(movieResponse.Title);
      var moviePoster = $("<img>");
      moviePoster.attr("src", movieResponse.Poster);

      $("#mov-poster").append(moviePoster);
      var moviePlot = $("<p>");
      moviePlot.text(movieResponse.Plot);
      moviePlot.addClass("plot-text");
      $("#mov-info").append(movieTitle, moviePlot);



      /* end movie search*/
    });



  };


  /*function to populate fav giphys from array */
  function createFavs() {
    $("#favs").empty();
    for (i = 0; i < favCharacters.length; i++) {

      var containerDiv = $("<div>");
      containerDiv.addClass("giphyCont");
      containerDiv.attr("id", "favgc" + i);
      $("#favs").append(containerDiv);

      var header = $("<div>");
      header.html("Favorite " + (i + 1));
      header.addClass("gif-title card-header");
      $("#favgc" + i).append(header);

      var imgDiv = $("<img>");
      imgDiv.attr("src", favCharacters[i].Still);
      imgDiv.attr("notClicked", favCharacters[i].Still);
      imgDiv.attr("clicked", favCharacters[i].Ani);
      imgDiv.addClass("giphyBtn");
      imgDiv.attr("isClicked", "false");
      imgDiv.attr("id", "favgiphy" + i);
      $("#favgc" + i).append(imgDiv);
      var ratingDiv = $("<div>");

      ratingDiv.html("Rated " + favCharacters[i].Rating.toUpperCase());
      ratingDiv.addClass("giphyRating card-footer");
      ratingDiv.attr("id", "favgr" + i);
      $("#favgc" + i).append(ratingDiv);

      var downIcon = $('<a target="_blank" href="' + favCharacters[i].Still + '"download> <i class="fas fa-1x fa-cloud-download-alt"></i>');
      downIcon.addClass("download");
      $("#favgr" + i).append(downIcon);

      var favCheckbox = $('<input type ="checkbox" name="' + i + '" class="css-checkbox" id="' + i + '"> <label for="' + i + '" class="css-label fav"></label>');
      favCheckbox.attr("gid", i);
      favCheckbox.attr("checked", true);
      favCheckbox.addClass("rem-fav");
      $("#favgr" + i).append(favCheckbox);


      /*end loop*/
    };


    /*end create favs*/
  };



  /*function to create character buttons*/
  function createButtons(characters) {

    $("#buttons").empty();

    for (var i = 0; i < characters.length; i++) {

      var button = $("<button>");

      button.addClass("btn char-btn navbar-btn");

      button.attr("char-name", characters[i]);

      button.attr("type", "button");

      button.text(characters[i]);

      $("#buttons").append(button);
    }
    /* end create Button */
  };



  /* Click button that parses value from button clicked to get Giphys*/
  $(document).on("click", ".char-btn", function (event) {
    event.preventDefault();
    /*Need to reset offset when button is clicked */
    offset = 0;
    $("#results").empty();
    Search = $(this).attr("char-name");
    console.log("char btn clicked");
    getGiphy(Search);
  });


  /*Button to clear local storage*/
  $(document).on("click", "#clear", function (event) {
    event.preventDefault();
    $("#favs").empty();
    favCharacters = [];
    localStorage.clear();
  });

  /* increase offset value by 10 when show more clicked and send to getGiphy function*/
  $(document).on("click", "#show-more", function (event) {
    event.preventDefault();
    offset = offset + 10;
    console.log("offset is now " + offset)
    getGiphy(Search);
  });

  /* Button to remove just one giphy from favs array and local storage*/
  $(document).on("click", ".rem-fav", function () {

    var remFav = $(this).attr("gid");
    favCharacters.splice(remFav, 1);
    createFavs(favCharacters);
    localStorage.setItem("favorites", JSON.stringify(favCharacters));
  })


  /* on page load create buttons from existing characters array */
  createButtons(characters);

  /*on page load get local storage array of favorite characters */
  var favCharacters = JSON.parse(localStorage.getItem("favorites"));


  /* If the list does not exist in local storage declare a new empty array*/
  if (!Array.isArray(favCharacters)) {
    favCharacters = [];
  }

  /* populate favorites from local  storage*/
  createFavs(favCharacters);

  /* adds new character button to existing buttons - not persistent */
  $("#add").on("click", function () {

    var newChar = $("#add-text").val().trim();
    /* Check to make sure we are not duplicating char buttons*/

    for (i = 0; i < characters.length; i++) {
      if (newChar === characters[i]) {
        var charExists = true;

        alert("Character button already created");

      }


    }

    if (!charExists) {
      characters.push(newChar);
      createButtons(characters);
      $("#add-text").val("");
    }




  });


  /*Logic to play and pause giphy */

  $(document).on("click", ".giphyBtn", function (event) {
    event.preventDefault();
    console.log("giphy clicked");

    var isClicked = $(this).attr("isClicked");
    console.log("Is clicked initial status " + isClicked);
    if (isClicked === "false") {

      newImg = $(this).attr("clicked");
      $(this).attr("src", newImg);
      $(this).attr("isClicked", "true");

    } else {

      newImg = $(this).attr("notClicked");
      $(this).attr("src", newImg);
      $(this).attr("isClicked", "false");

    };



    /*end on click */
  });

  /* end doc ready function */
});