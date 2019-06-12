$(document).ready(function() {

var giphyKey = "ebLf7WRabdqXmFc7BjhdTDPDNiP4bA4T";
var marvelPubKey ="72dfe9ce4a224033d095c4fcf90e07c7";
var marvelPrivKey ="45f957f0116b59b04efc1c75bbbc302bea8d15f9";
var Search ="Thor";
var ts= $.now();
/*var marvelHash = md5(ts+marvelPubKey+marvelPrivKey);*/
var giphyUrl ="https://api.giphy.com/v1/gifs/search?q="+ Search + "&api_key=" +giphyKey + "&limit=10";
var marvelUrl ="https://gateway.marvel.com/v1/public/comics?ts=1&apikey="


console.log(ts);


$.ajax({
    url: giphyUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.data[0].images.fixed_height_small_still.url);

    for (i=0; i < 10; i++){

    var imgDiv = $("<img>");
    imgDiv.attr("src", response.data[i].images.fixed_height_small_still.url)
    $("#results").append(imgDiv);




    }


    /* $(function(){
        var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
        $.getJSON( marvelAPI, {
            apikey: marvelPubKey
          })
            .done(function( response ) {
              var results = response.data.results;
              var resultsLen = results.length;
              var output = '<ul>'; 
              
              for(var i=0; i<resultsLen; i++){
                if(results[i].images.length > 0) {
                  var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                  output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
                }
              }  
              output += '</ul>'
              $('#results').append(output);
          });
           
        });*/

    
  });






























/* end doc ready function */    
});