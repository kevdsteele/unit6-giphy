$(document).ready(function() {

var characters= ["Thor", "Spiderman", "Iron Man", "Captain America", "Hulk", "Black Widow", "Black Panther", "Hawkeye"]

var giphyKey = "ebLf7WRabdqXmFc7BjhdTDPDNiP4bA4T";

var Search ="";

var offset = 0;








function getGiphy(Search) {
  console.log("offset is " + offset);
  var giphyUrl ="https://api.giphy.com/v1/gifs/search?q="+ Search + "&api_key=" +giphyKey + "&limit=10&offset=" + offset;
  $.ajax({
    url: giphyUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
   
    
    $("#show-more").css("display", "block");
    for (i=0; i < 10; i++){

 

    var containerDiv = $("<div>");
    containerDiv.addClass("giphyCont");
    containerDiv.attr("id", response.data[i].id );
    $("#results").append(containerDiv);

    var imgDiv = $("<img>");
    imgDiv.attr("src", response.data[i].images.fixed_height_small_still.url);
    imgDiv.attr("notClicked", response.data[i].images.fixed_height_small_still.url);
    imgDiv.attr("clicked",response.data[i].images.fixed_height_small.url);
    imgDiv.addClass("giphyBtn");
    imgDiv.attr("isClicked", "false");
    imgDiv.attr("id", "giphy"+i);
    $("#"+response.data[i].id ).append(imgDiv);
    var ratingDiv = $("<div>");
    ratingDiv.html("Rated " + response.data[i].rating);
    ratingDiv.addClass("giphyRating");
    ratingDiv.attr("id", "gr"+response.data[i].id );
    $("#"+response.data[i].id ).append(ratingDiv);

    var downIcon=$('<i class="fas fa-cloud-download-alt"></i>');
   downIcon.addClass("download");
   downIcon.attr("link", response.data[i].images.fixed_height_small.url);
    

    $("#gr"+response.data[i].id ).append(downIcon);

    /* <i class="fas fa-cloud-download-alt"></i>
    */

    var favCheckbox = $('<input type ="checkbox" name="' + Search+response.data[i].id  + '" class="css-checkbox" id="'+ Search + response.data[i].id  + '"> <label for="' + Search+response.data[i].id  +'" class="css-label fav"></label>');
   favCheckbox.attr("gid", response.data[i].id );
   favCheckbox.attr("clicked", response.data[i].images.fixed_height_small.url);
   favCheckbox.attr("notClicked", response.data[i].images.fixed_height_small_still.url )
  favCheckbox.attr("rating", response.data[i].rating)
    $("#gr"+response.data[i].id ).append(favCheckbox);


   

    };



  $(".fav").on("click", function () {
  console.log("fav clicked");
  var favSelected = $(this).attr("gid");
  var favStillLink = $(this).attr("notClicked");
  var favAniLink = $(this).attr("clicked");
  var favRating = $(this).attr("rating");

 var favExists=false;

for (i=0; i < favCharacters.length; i++) {
 if (favCharacters[i].CharID === favSelected) {
   favExists =true;


 }


}

console.log("does it exist "+ favExists);
if (!favExists) {
favCharacters.push({"CharID" : favSelected, "Still": favStillLink, "Ani": favAniLink, "Rating": favRating});
localStorage.setItem("favorites", JSON.stringify(favCharacters));
console.log("fav clicked");
console.log(favCharacters);

createFavs();
  
  }
});

  });







  
/*end getGiphy*/
};



function createFavs () {
$("#favs").empty();
for (i=0;i < favCharacters.length; i++) {

  var containerDiv = $("<div>");
  containerDiv.addClass("giphyCont");
  containerDiv.attr("id", "favgc"+i);
  $("#favs").append(containerDiv);

  var imgDiv = $("<img>");
  imgDiv.attr("src", favCharacters[i].Still);
  imgDiv.attr("notClicked", favCharacters[i].Still);
  imgDiv.attr("clicked",favCharacters[i].Ani);
  imgDiv.addClass("giphyBtn");
  imgDiv.attr("isClicked", "false");
  imgDiv.attr("id", "favgiphy"+i);
  $("#favgc"+i).append(imgDiv);
  var ratingDiv = $("<div>");
  ratingDiv.html("Rated " + favCharacters[i].Rating);
  ratingDiv.addClass("giphyRating");
  ratingDiv.attr("id", "favgr"+i);
  $("#favgc"+i).append(ratingDiv);

 /* var favCheckbox = $('<input type ="checkbox" name="' + Search+i + '" class="css-checkbox" id="'+ Search + i + '"> <label for="' + Search+i +'" class="css-label fav"></label>');
 favCheckbox.attr("gid", Search+i );
 favCheckbox.attr("clicked", response.data[i].images.fixed_height_small.url);
 favCheckbox.attr("notClicked", response.data[i].images.fixed_height_small_still.url )
  
  $("#gr"+i).append(favCheckbox);*/


/*end loop*/  
};




/*end create favs*/  
};
  











function createButtons(characters) {


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

















createButtons(characters);




/* Click button that parses value from button clicked to egt Giphys*/
$(document).on("click",".char-btn", function (event){
  event.preventDefault();
offset=0;
$("#results").empty();
Search=$(this).attr("char-name");
console.log("char btn clicked");
getGiphy(Search);
});

$(document).on("click","#clear", function (event){
  event.preventDefault();
$("#favs").empty();
favCharacters=[];
localStorage.clear();

});

$(document).on("click", "#show-more", function(event) {
event.preventDefault();
offset=offset+10;
console.log("offset is now " + offset)
getGiphy(Search);


});


/*Get local array of favorite characters */
var favCharacters = JSON.parse(localStorage.getItem("favorites"));


/* If the list does not exist in local storage declare a new empty array*/
if (!Array.isArray(favCharacters)) {
  favCharacters = [];
}

createFavs(favCharacters);

$("#add").on("click", function () {

var newChar=$("#add-text").val().trim();

for (i=0; i < characters.length; i++) {
if (newChar === characters[i]) {
var charExists= true;

alert("Character button already created");

} 





}

if (!charExists) {
  characters.push(newChar);
  createButtons(characters);
 $("#add-text").val("");
}




});




$(document).on("click", ".giphyBtn", function(event){
  event.preventDefault();
  console.log("giphy clicked");

  var isClicked =$(this).attr("isClicked");
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