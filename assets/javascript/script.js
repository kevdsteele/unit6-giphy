$(document).ready(function() {

var giphyKey = "ebLf7WRabdqXmFc7BjhdTDPDNiP4bA4T";
var marvelPubKey ="72dfe9ce4a224033d095c4fcf90e07c7";
var marvelPrivKey ="45f957f0116b59b04efc1c75bbbc302bea8d15f9";
var Search ="Thor";
var ts= $.now();

var hash = CryptoJS.MD5(ts+marvelPrivKey+marvelPubKey);

var giphyUrl ="https://api.giphy.com/v1/gifs/search?q="+ Search + "&api_key=" +giphyKey + "&limit=10";

var marvelUrl ="https://gateway.marvel.com/v1/public/comics?ts="+ ts +"&apikey="+ marvelPubKey + "&hash="+ hash;




$.ajax({
    url: giphyUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log("hash is " + hash);
    console.log(response.data[0].images.fixed_height_small_still.url);

    for (i=0; i < 10; i++){

    var imgDiv = $("<img>");
    imgDiv.attr("src", response.data[i].images.fixed_height_small_still.url)
    $("#results").append(imgDiv);




    }


    

    
  });

  $.ajax({
    url: marvelUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);


    


    

    
  });

  






























/* end doc ready function */    
});