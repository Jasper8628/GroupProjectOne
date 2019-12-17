$("#advancedSearch").click(function () {
  openAdvancedSearchModal();
});
$(".close-btn").click(function () {
  closeModal();
});

function openAdvancedSearchModal() {
  $(".modal").css("display", "block");
}
function closeModal() {
  $(".modal").css("display", "none");
}

$(document).click(function (e) {
  if ($(e.target).is(".modal") || ($(e.target).is('body')) || $(e.target).is("#carouselExampleControls")) {
    $(".modal").css("display", "none");
  }

});
$(".modalAdvanceButtons").click(function () {
  $(this).css('color', 'black');
  $(this).css('border', '.5px solid black')
});

$(".icons").click(function () {
  $(this).css('border', '2px solid black');
  $(this).css('border-radius', '2em');
});
$(".listIcons").click(function(){
  $(this).css('border', '2px solid rgba(240, 197, 57, 0.938)');
  $(this).css('border-radius', '3em');
})

$(".modalNumButtons").click(function () {
  $(this).css('color', 'black');
  $(this).css('border', '1px solid black');

});
function openNav() {
  document.getElementById("mySidebar").style.width = "350px";
  document.getElementById("mySidebar").style.marginTop = "70px";
  document.getElementById("collection").style.marginRight = "350px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("collection").style.marginRight = "auto";
}

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { 
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
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
  console.log("0")
  if (firstSearch) {
    console.log("1")
    searchPool = [];
    //5 is the highest possible number of colors
    //this 2-level for-loop is to sort cards by color while placing the multicolored cards at the end of the array
    for (var j = 1; j < 5; j++) {
      console.log("2")
      for (var i = 0; i < responseData.length; i++) {
        if (responseData[i].colors.length == j && responseData[i].colors.indexOf(filter) != -1) {
          searchPool.push({ "imgUrl": responseData[i].image_uris.border_crop, "name": responseData[i].name, "manaCost": responseData[i].mana_cost, "colors": responseData[i].colors, "oracle": responseData[i].oracle_text, "type": responseData[i].type_line });
        }
        //saving potentially useful data of each card for later when interactability is needed
      }
    }
    console.log("3")
    firstSearch = false;
  }
  else {
    console.log("4")
    console.log(searchPool);
    var buffer = [];
    for (var j = 0; j < searchPool.length; j++) {
      if (searchPool[j].colors.indexOf(filter) != -1) {
        console.log(searchPool[j].imgUrl);
        buffer.push({ "imgUrl": searchPool[j].imgUrl, "name": searchPool[j].name, "manaCost": searchPool[j].manaCost, "colors": searchPool[j].colors, "oracle": searchPool[j].oracle, "type": searchPool[j].type });
        //saving potentially useful data of each card for later when interactability is needed
      }
    }
    console.log("5")
    searchPool = buffer;
  }
  console.log("6")

  // these for-loops display cards from the searchPool in the first carousel slide;
  for (var i = 0; i < 18; i++) {
    var createImg = $('<img>');
    createImg.attr("style", "background-color:black");
    createImg.attr("src", searchPool[i].imgUrl);
    createImg.addClass("col-md-2 card cardImgs");
    $("#collection").append(createImg);
  }
  console.log("7")
  //this 2-level for-loop dynamically creates new carousel slides then append images to the slides
  for (var i = 1; i < Math.ceil(searchPool.length / 18) - 1; i++) {
    console.log(searchPool.length / 18)
    var createCarousel = $('<div>');
    createCarousel.addClass("carousel-item new-slide")
    var createContainer = $('<div>');
    var createRow = $('<div>');
    createContainer.addClass("container");
    createRow.addClass("row");
    $(".carousel-inner").append(createCarousel);
    createCarousel.append(createContainer);
    createContainer.append(createRow);
    for (var j = i * 18; j < (i + 1) * 18 || j < searchPool.length; j++) {
      var createImg = $('<img>');
      createImg.attr("style", "background-color:black");

      createImg.attr("src", searchPool[j].imgUrl);
      createImg.addClass("col-md-2 card cardImgs");
      createRow.append(createImg);
    }
  }
  console.log("9")
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
    /*  var colorPool=["W","U","B","R","G"];
     var newBuffer=[];
     for(var h=0; h<colorPool.length;h++){
       for(var k=0;k<searchPool.length;k++){
         if(searchPool[k].colors.indexOf(colorPool[h])!=-1){
           newBuffer.push(searchPool[k].imgUrl);
         }
       }
     } */
    firstSearch = false;
  }
  else {
    var buffer = [];
    for (var j = 0; j < searchPool.length; j++) {
      if (searchPool[j].type.indexOf(filter) != -1 || searchPool[j].name.indexOf(filter) != -1 || searchPool[j].oracle.indexOf(filter) != -1) {
        console.log(searchPool[j].imgUrl);
        buffer.push({ "imgUrl": searchPool[j].imgUrl, "name": searchPool[j].name, "manaCost": searchPool[j].manaCost, "colors": searchPool[j].colors, "oracle": searchPool[j].oracle, "type": searchPool[j].type });
      }
    }
    searchPool = buffer;
  }

  // these for-loops display cards from the searchPool in the first carousel slide;
  numSlide = searchPool.length / 18;
  for (var i = 0; i < 18; i++) {
    var createImg = $('<img>');
    createImg.attr("style", "background-color:black");
    createImg.attr("src", searchPool[i].imgUrl);
    createImg.addClass("col-md-2 card cardImgs");
    $("#collection").append(createImg);
  }
  //this 2-level for-loop dynamically creates new carousel slides then append images to the slides
  for (var i = 1; i < Math.ceil(searchPool.length / 18) - 1; i++) {
    var createCarousel = $('<div>');
    createCarousel.addClass("carousel-item new-slide")
    var createContainer = $('<div>');
    var createRow = $('<div>');
    createContainer.addClass("container");
    createRow.addClass("row");
    $(".carousel-inner").append(createCarousel);
    createCarousel.append(createContainer);
    createContainer.append(createRow);
    for (var j = i * 18; j < (i + 1) * 18 || j < searchPool.length; j++) {
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
  console.log(cardPool);
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
      for (var i = 0; i < 18; i++) {
        var createImg = $('<img>');
        createImg.attr("style", "background-color:transparent");
        createImg.attr("src", cardPool[i].imgUrl);
        console.log(createImg.attr("src"));
        createImg.addClass("col-md-2 card cardImgs");
        $("#collection").append(createImg);
      }
      for (var i = 1; i < Math.ceil(numSlide) - 1; i++) {
        var createCarousel = $('<div>');
        createCarousel.addClass("carousel-item new-slide")
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
  console.log(white);
  console.log(blue);
  console.log(black);
  console.log(red);
  console.log(green);

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
