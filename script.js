//opening Modal  the button
$("#advancedSearch").click(function () {
  openAdvancedSearchModal();
});
$(".close-btn").click(function () {
  closeModal();
});
//openmodal function
function openAdvancedSearchModal() {
  $(".modal").css("display", "block");
}
function closeModal() {
  $(".modal").css("display", "none");
}
//closing the modal by clicking anywhere in the page

$(document).click(function (e) {
  if ($(e.target).is(".modal") || ($(e.target).is('body')) || $(e.target).is("#carouselExampleControls")) {
    $(".modal").css("display", "none");
  }
});
//CSS Toggle
$(".modalAdvanceButtons").click(function () {
  $(this).css('color', 'yellow');
  $(this).css('border', '.5px solid yellow')
});

$(".color-filter").click(function(){
  $(this).css('border', '2px solid yellow');
  $(this).css('border-radius', '3em');
})
$(".modalNumButtons").click(function () {
  $(this).css('color', 'yellow');
  $(this).css('border', '1px solid yellow');
});
//opening side nav bar
function openNav() {
  document.getElementById("mySidebar").style.width = "350px";
  document.getElementById("mySidebar").style.marginTop = "70px";
  document.getElementById("collection").style.marginRight = "350px";
  addToDeckToggle = 1; //toggle for card adding to deck
  
}
//closing the side navbar
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("collection").style.marginRight = "auto";
  addToDeckToggle = 0; //toggle for card adding to deck
  
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


///////////////// Add to deck part /////////////////
var deck;
var deckString;
var deckCount;
var addToDeckToggle;
var deckCountString;

if (localStorage.getItem("deckString") === null) {
  deck = [];
  deckCount = [];

}
else {

  deckString = localStorage.getItem("deckString");
  deckCountString = localStorage.getItem("deckCountString");
  deck = JSON.parse(deckString);
  deckCount = JSON.parse(deckCountString);
  buildDeck(); //build first deck using local storage
};
/////////////////////////////////////

var apiUrl = "https://api.scryfall.com/cards/search?order=cmc&unique=cards&q=e"
var apiUrl2 = "https://api.scryfall.com/cards/search?order=cmc&page=2&unique=cards&q=e"
var QueryURL = "https://api.scryfall.com/cards/search?order=cmc&unique=cards&q=e%3Adom";
var QueryURL2 = "https://api.scryfall.com/cards/search?order=cmc&page=2&unique=cards&q=e%3Adom"; //first queryURL then depend on user  this will get updated and ajax call will be run again
var responseData;
var numSlide;
var cardsFound = 0;
var classMulticolor = ".multi-color";
var classColor = ".color-filter";
var classType = ".type-filter";
var classRarity = ".rarity-filter";
var classCost = ".number-filter";
var featureArray2 = [];
var featureArray = [];
var searchTermFilter = [];
var multiColorFilter = [];
var colorFilter = [];
var costFilter = [];
var typeFilter = [];
var rarityFilter = [];
var arrayOfFilters = [colorFilter, multiColorFilter, costFilter, typeFilter, rarityFilter];
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
var secondSearch = []
var firstSearch = true;
var firstTypeSearch = true;



$("#search").on("click", function () {
  $(".card").remove();
  $(".new-slide").remove();
  var input = $("#input").val();
  var searchTerm = input.charAt(0).toUpperCase() + input.slice(1);
  if (firstSearch) {
    searchPool = [];
    for (var i = 0; i < responseData.length; i++) {
      if (responseData[i].type_line.indexOf(searchTerm) != -1 || responseData[i].name.indexOf(searchTerm) != -1 || responseData[i].oracle_text.indexOf(searchTerm) != -1 || responseData[i].oracle_text.search(input) != -1) {
        searchPool.push({
          "imgUrl": responseData[i].image_uris.border_crop,
          "name": responseData[i].name,
          "manaCost": responseData[i].mana_cost,
          "colors": responseData[i].colors,
          "oracle": responseData[i].oracle_text,
          "type": responseData[i].type_line,
          "cmc": responseData[i].cmc,
          "rarity": responseData[i].rarity
        });
      }
    }
    firstTypeSearch = false;
    display(searchPool);
  }
  else {
    console.log(searchPool);
    for (var j = 0; j < searchPool.length; j++) {
      if (searchPool[j].type.indexOf(searchTerm) != -1 || searchPool[j].name.indexOf(searchTerm) != -1 || searchPool[j].oracle.indexOf(searchTerm) != -1 || searchPool[j].oracle.search(input) != -1) {
        secondSearch.push({
          "imgUrl": searchPool[j].imgUrl,
          "name": searchPool[j].name,
          "manaCost": searchPool[j].manaCost,
          "colors": searchPool[j].colors,
          "oracle": searchPool[j].oracle,
          "type": searchPool[j].type,
          "cmc": searchPool[j].cmc,
          "rarity": searchPool[j].rarity
        });
      }
    }
    display(secondSearch);
  }
});

function addFilters(buttonClass, filterArray) {
  $(buttonClass).on("click", function () {
    $(".card").remove();
    $(".new-slide").remove();
    var filter = $(this).attr("value");
    if (filterArray.indexOf(filter) == -1) {
      $(this).attr("style", "border-color: gold");
      if (filter == "7") {
        filterArray.push("7", "8", "9", "10", "11", "12", "13", "14", "15", "16");
      }
      else {
        filterArray.push(filter);
      }
    }
    else {

      $(this).attr("style", "border-color:white");
      if (filter == "7") {
        filterArray.splice(filterArray.indexOf(filter), 10);
      }
      else {
        filterArray.splice(filterArray.indexOf(filter), 1);
      }
    }
    if (firstTypeSearch) {
      searchPool = [];
      firstSearch = false;
      displaySearch(cardPool, arrayOfFilters, searchPool);
    }
    else {
      secondSearch = [];
      displaySearch(searchPool, arrayOfFilters, secondSearch);
    }
  });
}
addFilters(classMulticolor, multiColorFilter);
addFilters(classColor, colorFilter);
addFilters(classType, typeFilter);
addFilters(classRarity, rarityFilter);
addFilters(classCost, costFilter);

$(".set-filter").on("click", function () {
  apiUrl = "https://api.scryfall.com/cards/search?order=cmc&unique=cards&q=e"
  apiUrl2 = "https://api.scryfall.com/cards/search?order=cmc&page=2&unique=cards&q=e"
  var filter = $(this).attr("value");
  apiUrl = apiUrl + filter;
  apiUrl2 = apiUrl2 + filter;
});

$("#go").on("click", function () {
  $(".card").remove();
  $(".new-slide").remove();
  API_CALL(apiUrl, apiUrl2);
});

$("#reset").on("click", function () {
  $(".card").remove();
  $(".new-slide").remove();
  searchPool = [];
  secondSearch = [];
  firstSearch = true;
  firstTypeSearch = true;
  colorFilter = [];
  costFilter = [];
  rarityFilter = [];
  typeFilter = [];
  featureArray = [];
  filterArray = [];
  console.log(arrayOfFilters);
  display(cardPool);
});

function sortByColor() {
  for (var i = 0; i < responseData.length; i++) {
    if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "W") {
      white.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "U") {
      blue.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "B") {
      black.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "R") {
      red.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
    }
    else if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "G") {
      green.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
    }
    else if (responseData[i].colors.length == 0 && (responseData[i].type_line.indexOf("Artifact") != -1 || responseData[i].type_line.indexOf("Planeswalker") != -1)) {
      colorless.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
    } else if (responseData[i].colors.length > 1) {
      multiColor.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
    }
    else {
      lands.push({
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc
      });
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

function displaySearch(array, arrayOfFilters, array2) {
  cardsFound = 0;
  for (var i = 0; i < array.length; i++) {
    featureArray = [];
    if (array[i].colors.length < 1) {
      featureArray.push("C");
    }
    else if (array[i].colors.length == 1) {
      featureArray.push(array[i].colors[0]);
    }
    else {
      for (var m = 0; m < array[i].colors.length; m++) {
        featureArray.push(array[i].colors[m]);
      }
      featureArray.push("M");
    }
    featureArray.push(array[i].cmc.toString());
    var typeLine = array[i].type;
    var words = typeLine.split(" ");
    for (var p = 0; p < words.length; p++) {
      featureArray.push(words[p]);
    }
    featureArray.push(array[i].rarity);
    var counter = 0;
    for (var j = 0; j < arrayOfFilters.length; j++) {
      if (arrayOfFilters[j].length == 0) {
        counter++
      }
      for (k = 0; k < arrayOfFilters[j].length; k++) {
        var feature = arrayOfFilters[j][k];
        if (featureArray.indexOf(feature) != -1) {
          counter++;
        }
      }
    }
    if (counter >= 5) {
      cardsFound++;
      array2.push(
        {
          "imgUrl": array[i].imgUrl,
          "name": array[i].name,
          "manaCost": array[i].manaCost,
          "colors": array[i].colors,
          "oracle": array[i].oracle,
          "type": array[i].type,
          "cmc": array[i].cmc,
          "rarity": array[i].rarity

        }
      );
    }
  }
  display(array2);
 
  $(".remove-from-deck").unbind().click(removeFromDeck);  //remove from deck on click listener added to buttons

}

function display(array) {
  cardsFound = array.length;
 
  $(".found").text("Cards Found: " + cardsFound);
  numSlide = array.length / 18;
  var slideActive = false;
  for (var i = 0; i < Math.ceil(numSlide); i++) {
    var createCarousel = $('<div>');
    createCarousel.addClass("carousel-item")
    if (slideActive == false) {
      createCarousel.addClass("active new-slide");
      slideActive = true;
    }
    else {
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

      createImg.attr("src", array[j].imgUrl);
      
      createImg.attr("data-cost", array[j].manaCost);
      createImg.attr("data-name", array[j].name);
      for (h = 0; h < array[j].colors.length; h++) {
        createImg.addClass(array[j].colors[h]);
      }
      createImg.addClass("col-md-2 card cardImgs");
      createRow.append(createImg);
    }

  }

  $(".card").on("click", addCardToDeck);


}
function API_CALL(url1, url2) {
  $.ajax({
    url: url1,
    method: "GET"
  }).then(function (response) {
    responseData = response.data;
    
    $.ajax({
      url: url2,
      //the api call only returns 175 results, therefore a second api call for the second page of the same search term is required
      method: "GET"
    }).then(function (feed) {
      var newResponseData = feed.data;
      responseData = responseData.concat(newResponseData);
      sortByColor();
      cardsFound = cardPool.length;
      $(".found").text("Cards Found: " + cardsFound);
      numSlide = cardPool.length / 18;
      var slideActive = false;
      for (var i = 0; i < Math.ceil(numSlide); i++) {
        var createCarousel = $('<div>');
        createCarousel.addClass("carousel-item")
        if (slideActive == false) {
          createCarousel.addClass("active new-slide");
          slideActive = true;
        }
        else {
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
          createImg.attr("data-cost", cardPool[j].manaCost);
          createImg.attr("data-name", cardPool[j].name);
          for (h = 0; h < cardPool[j].colors.length; h++) {
            createImg.addClass(cardPool[j].colors[h]);
          }
          createImg.addClass("col-md-2 card cardImgs");
          createRow.append(createImg);
        }
        $(".card").unbind().click(addCardToDeck);
      }   
      $(".remove-from-deck").unbind().click(removeFromDeck);  //remove from deck on click listener added to buttons
    });
    
    $(".remove-from-deck").unbind().click(removeFromDeck);  //remove from deck on click listener added to buttons

  });
  $(".card").on("click", addCardToDeck);
  $(".remove-from-deck").unbind().click(removeFromDeck);  //remove from deck on click listener added to buttons
}

$(".left").on("click", function () {
  $("#carouselExampleControls").carousel("prev");
});
$(".right").on("click", function () {
  $("#carouselExampleControls").carousel("next");
});
API_CALL(QueryURL, QueryURL2);

/////////////////////////// add card to deck functionality //////////////////////



function addCardToDeck() {

  if (addToDeckToggle === 1) {
    var cardChosen = $(this).attr("data-name"); //set button text to be the name of the card
    console.log("Card chosen: " + cardChosen);
    var indexOfCopy = deck.indexOf(cardChosen); //searches through deck array to find if card chosen is same as existing deck card
    if (indexOfCopy < 0) { //if chosen card is not already in deck, add one to the end of the deckCount array
      deckCount.push(1);
      deck.push(cardChosen); //add chosen card to the end of the deck array
    }
    else {
      deckCount[indexOfCopy] = deckCount[indexOfCopy] + 1;
      if (deckCount[indexOfCopy] === 5) { //dont let there be more than 4 copies of the same card
        deckCount[indexOfCopy] = 4;
      }
    }
    buildDeck(); //runs buildDeck function after card has been added to deck array
  }
};

function buildDeck() {

  $(".deck-collection").text(""); //clear the temporary built deck every time function is run
  for (var j = 0; j < deck.length; j++) { //goes through length of deck and creates a button for each card
    var cardBtn = $("<button>");
    var cardCountBtn = $("<button>");
    cardBtn.text(deck[j]);
    cardBtn.addClass("btn btn-dark");
    cardCountBtn.text(deckCount[j]);
    cardCountBtn.addClass("btn btn-danger");
    cardCountBtn.css("padding-right: 5px") //cardCountBtn is a counter that tells user how many of the same card is in their deck
    $(".deck-collection").append(cardCountBtn);
    $(".deck-collection").append(cardBtn);
    $(".deck-collection").append($("<p>"));
    cardBtn.addClass("remove-from-deck");
    cardCountBtn.attr("data-name", deck[j]);
    cardCountBtn.addClass("card-counter");
    $(".remove-from-deck").unbind().click(removeFromDeck); //on click for each card button, the remove from deck functionality is added
  };
};

function removeFromDeck() {

  var removedCardName = $(this).text(); //get name of card user wants to remove
  var index = deck.indexOf(removedCardName); //searches deck array for card name

  if (deckCount[index] === 1) { //if only one copy of that card exists, then remove it from the array and from the UI
    deck.splice(index, 1);
    deckCount.splice(index, 1); //remove deck count element from array
    var str = "" + $(this).text(); 
    $(`.card-counter[data-name="${str}"]`).remove(); //remove card counter from UI for specific button
    $(this).remove();
  }
  else {
    var str = "" + $(this).text(); 
    deckCount[index] = deckCount[index] - 1; //if multiple copies of card exist, then remove only one from the existing card count
    $(`.card-counter[data-name="${str}"]`).text(deckCount[index]);
  }
};
$(".saveButton").on("click", function () { //for save deck button
  deckString = JSON.stringify(deck);
  localStorage.setItem("deckString", deckString);
  deckCountString = JSON.stringify(deckCount);
  localStorage.setItem("deckCountString", deckCountString);
})







