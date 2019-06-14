$(document).ready(function() {

var characters= ["Thor", "Spiderman", "Iron Man", "Captain America", "Hulk", "Black Widow", "Black Panther", "Hawkeye"]
var giphyKey = "ebLf7WRabdqXmFc7BjhdTDPDNiP4bA4T";
var marvelPubKey ="72dfe9ce4a224033d095c4fcf90e07c7";
var marvelPrivKey ="45f957f0116b59b04efc1c75bbbc302bea8d15f9";
var Search ="";
var ts= $.now();








function getGiphy(Search) {
  var giphyUrl ="https://api.giphy.com/v1/gifs/search?q="+ Search + "&api_key=" +giphyKey + "&limit=10";
  $.ajax({
    url: giphyUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
    console.log(response.data[0].images.fixed_height_small_still.url);

    for (i=0; i < 10; i++){
    var containerDiv = $("<div>");
    containerDiv.addClass("giphyCont");
    containerDiv.attr("id", "gc"+i);
    $("#results").append(containerDiv);

    var imgDiv = $("<img>");
    imgDiv.attr("src", response.data[i].images.fixed_height_small_still.url);
    imgDiv.attr("notClicked", response.data[i].images.fixed_height_small_still.url);
    imgDiv.attr("clicked",response.data[i].images.fixed_height_small.url);
    imgDiv.addClass("giphyBtn");
    imgDiv.attr("isClicked", "false");
    imgDiv.attr("id", "giphy"+i);
    $("#gc"+i).append(imgDiv);
    var ratingDiv = $("<div>");
    ratingDiv.html("Rated " + response.data[i].rating);
    ratingDiv.addClass("giphyRating");
    ratingDiv.attr("id", "gr"+i);
    $("#gc"+i).append(ratingDiv);

    var favCheckbox = $('<input type ="checkbox" name="' + Search+i + '" class="css-checkbox" id="'+ Search + i + '"> <label for="' + Search+i +'" class="css-label fav"></label>');
   favCheckbox.attr("gid", i );
    
    $("#gr"+i).append(favCheckbox);


   

    }

    $(".giphyBtn").on("click", function () {
      console.log("giphy clicked");
    
      var isClicked =$(this).attr("isClicked");
      console.log("Is clicked " + isClicked);
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

      $(".fav").on("click", function () {
  var favSelected = $(this).attr("gid");
  $("#gc" + favSelected).clone(true).appendTo("#favs");
console.log("fav clicked");



});

  });







  
/*end getGiphy*/
};




  











function createButtons() {


  $("#buttons").empty();

 
  for (var i = 0; i < characters.length; i++) {

   
    var button = $("<button>");
  
    button.addClass("btn btn-secondary char-btn");
    
    button.attr("char-name", characters[i]);

    button.attr("type", "button");
  
    button.text(characters[i]);
  
    $("#buttons").append(button);
  }
/* end create Button */
};

















createButtons();





$(".char-btn").on("click", function (){
$("#results").empty();
  Search=$(this).attr("char-name");
console.log("char btn clicked");
getGiphy(Search);
});



/* end doc ready function */    
});