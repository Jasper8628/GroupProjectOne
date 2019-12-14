$("#advancedSearch").click(function(){
    openAdvancedSearchModal();
});
$( ".close-btn").click(function(){
    closeModal();
});

function openAdvancedSearchModal(){
    $(".modal").css("display","block");
}
function closeModal(){
    $(".modal").css("display","none");
}



var QueryURL = "https://api.scryfall.com/cards/search?order=cmc&unique=cards&q=e%3Adom";
var QueryURL2 = "https://api.scryfall.com/cards/search?order=cmc&unique=cards&q=e%3Adom&page=2"; //first queryURL then depend on user  this will get updated and ajax call will be run again
var responseData;
var numSlide;
var white = [];
var blue = [];
var black = [];
var red = [];
var green = [];
var multiColor = [];
var cardPool = [];
var colorless = [];
var lands = [];
var searchPool = [];
var firstSearch = true;

$(".color-filter").on("click", function () {
  $(".card").remove();
  $(".new-slide").remove();
  var filter = $(this).attr("value");
  if (firstSearch) {
    searchPool = [];
    //5 is the highest possible number of colors
    //this 2-level for-loop is to sort cards by color while placing the multicolored cards at the end of the array
    for (var j = 1; j < 5; j++) {
      for (var i = 0; i < responseData.length; i++) {
        if (responseData[i].colors.length == j && responseData[i].colors.indexOf(filter) != -1) {
          searchPool.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost, "colors": responseData[i].colors, "oracle": responseData[i].oracle_text, "type": responseData[i].type_line });
        }
        //saving potentially useful data of each card for later when interactability is needed
      }
    }
    firstSearch = false;
  }
  else {
    var buffer = [];
    for (var j = 0; j < searchPool.length; j++) {
      if (searchPool[j].colors.indexOf(filter) != -1) {
        buffer.push({ "imgUrl": searchPool[j].imgUrl, "name": searchPool[j].name, "manaCost": searchPool[j].manaCost, "colors": searchPool[j].colors, "oracle": searchPool[j].oracle, "type": searchPool[j].type });
        //saving potentially useful data of each card for later when interactability is needed
      }
    }
    searchPool = buffer;
  }

 
  //this 2-level for-loop dynamically creates new carousel slides then append images to the slides
  var slideActive=false;
  for (var i = 0; i < Math.ceil(searchPool.length / 18); i++) {
    var createCarousel = $('<div>');
    createCarousel.addClass("carousel-item");
    if(slideActive==false){
      createCarousel.addClass("new-slide active");
      slideActive=true;
    }
    else{
      createCarousel.addClass("new-slide");
    }
    var createContainer = $('<div>');
    var createRow = $('<div>');
    createContainer.addClass("container");
    createRow.addClass("row");
    $(".carousel-inner").append(createCarousel);
    createCarousel.append(createContainer);
    createContainer.append(createRow);
    for (var j = i * 18; j < (i + 1) * 18 ; j++) {
      var createImg = $('<img>');
      createImg.attr("style", "background-color:black");
      createImg.attr("src", searchPool[j].imgUrl);
      createImg.addClass("col-md-2 card cardImgs");
      createRow.append(createImg);
    }
  }
});

$(".type-filter").on("click", function () {
  $(".card").remove();
  $(".new-slide").remove();
  var filter = $(this).attr("value");
  if (firstSearch) {
    searchPool = [];
    for (var i = 0; i < responseData.length; i++) {
      if (responseData[i].type_line.indexOf(filter) != -1 || responseData[i].name.indexOf(filter) != -1 || responseData[i].oracle_text.indexOf(filter) != -1) {
        searchPool.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost, "colors": responseData[i].colors, "oracle": responseData[i].oracle_text, "type": responseData[i].type_line });
      }
    }
    firstSearch = false;
  }
  else {
    var buffer = [];
    for (var j = 0; j < searchPool.length; j++) {
      if (searchPool[j].type.indexOf(filter) != -1 || searchPool[j].name.indexOf(filter) != -1 || searchPool[j].oracle.indexOf(filter) != -1) {
        buffer.push({ "imgUrl": searchPool[j].imgUrl, "name": searchPool[j].name, "manaCost": searchPool[j].manaCost, "colors": searchPool[j].colors, "oracle": searchPool[j].oracle, "type": searchPool[j].type });
      }
    }
    searchPool = buffer;
  }

  // these for-loops display cards from the searchPool in the first carousel slide;
  var slideActive=false;
  for (var i = 0; i < Math.ceil(searchPool.length / 18); i++) {
    var createCarousel = $('<div>');
    createCarousel.addClass("carousel-item");
    if(slideActive==false){
      createCarousel.addClass("new-slide active");
      slideActive=true;
    }
    else{
      createCarousel.addClass("new-slide");
    }
    var createContainer = $('<div>');
    var createRow = $('<div>');
    createContainer.addClass("container");
    createRow.addClass("row");
    $(".carousel-inner").append(createCarousel);
    createCarousel.append(createContainer);
    createContainer.append(createRow);
    for (var j = i * 18; j < (i + 1) * 18 ; j++) {
      var createImg = $('<img>');
      createImg.attr("style", "background-color:black");
      createImg.attr("src", searchPool[j].imgUrl);
      createImg.addClass("col-md-2 card cardImgs");
      createRow.append(createImg);
    }
  }
});


$(".reset").on("click", function () {
  $(".card").remove();
  $(".new-slide").remove();
  white=[];
  blue=[];
  black=[];
  red=[];
  green=[];
  multiColor=[];
  colorless=[];
  lands=[];
  responseData=[];
  searchPool = [];
  buffer = [];
  cardPool = [];
  firstSearch = true;
  API_CALL();
});

function sortByColor() {
  for (var i = 0; i < responseData.length; i++) {
    if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "W") {
      white.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "U") {
      blue.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "B") {
      black.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "R") {
      red.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "G") {
      green.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    }
    else if (responseData[i].colors.length == 0 && (responseData[i].type_line.indexOf("Artifact") != -1 || responseData[i].type_line.indexOf("Planeswalker") != -1)) {
      colorless.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    } else if (responseData[i].colors.length > 1) {
      multiColor.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    }
    else {
      lands.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost });
    }
  }
  cardPool = white.concat(blue);
  cardPool = cardPool.concat(black);
  cardPool = cardPool.concat(red);
  cardPool = cardPool.concat(green);
  cardPool = cardPool.concat(multiColor);
  cardPool = cardPool.concat(colorless);
  cardPool = cardPool.concat(lands);
}

function API_CALL() {
  $.ajax({
    url: QueryURL,
    method: "GET"
  }).then(function (response) {
    responseData = response.data;
    $.ajax({
      url: QueryURL2,
      //the api call only returns 175 results, therefore a second api call for the second page of the same search term is required
      method: "GET"
    }).then(function (feed) {
      var newResponseData = feed.data;
      responseData = responseData.concat(newResponseData);
      sortByColor();

      numSlide = responseData.length / 18;
      var slideActive=false;
     
      for (var i = 0; i < Math.ceil(numSlide); i++) {
        var createCarousel = $('<div>');
        createCarousel.addClass("carousel-item")
        if(slideActive==false){
          createCarousel.addClass("active new-slide");
          slideActive=true;
        }
        else{
          createCarousel.addClass("new-slide")
        }
        var createContainer = $('<div>');
        var createRow = $('<div>');
        createContainer.addClass("container");
        createRow.addClass("row");
        $(".carousel-inner").append(createCarousel);
        createCarousel.append(createContainer);
        createContainer.append(createRow);
        for (var j = i * 18; j < (i + 1) * 18; j++) {
          var createImg = $('<img>');
          createImg.attr("style", "background-color:transparent");
          createImg.attr("src", cardPool[j].imgUrl);
          createImg.addClass("col-md-2 card cardImgs");
          createRow.append(createImg);
        }
      }
    });

  });

  //$("#carouselExampleControls").carousel();

  $(".left").on("click", function () {
    $("#carouselExampleControls").carousel("prev");
  });
  $(".right").on("click", function () {
    $("#carouselExampleControls").carousel("next");
  });
}

// $("#carouselExampleControls").carousel();
$(".left").on("click", function () {
  $("#carouselExampleControls").carousel("prev");
});
$(".right").on("click", function () {
  $("#carouselExampleControls").carousel("next");
});
API_CALL();