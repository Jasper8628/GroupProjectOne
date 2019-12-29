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
  $(this).css('color', 'yellow');
  $(this).css('border', '.5px solid yellow')
});
/*$(".icon").click(function () {
  $(this).css('border', '2px solid yellow');
  $(this).css('border-radius', '2em');
});
*/
$(".color-filter").click(function () {
  $(this).css('border', '2px solid yellow');
  $(this).css('border-radius', '3em');
})

$(".modalNumButtons").click(function () {
  $(this).css('color', 'yellow');
  $(this).css('border', '1px solid yellow');
});

function openNav() {
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.marginTop = "70px";
  document.getElementById("carouselExampleControls").style.marginRight = "350px";
  document.getElementById("carouselExampleControls").style.width = "75%";

  addToDeckToggle = 1; //toggle for card adding to deck

}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("carouselExampleControls").style.marginRight = "auto";
  document.getElementById("carouselExampleControls").style.width = "100%";
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
var deckList = [];
var deckCount;
var addToDeckToggle;
var deckCountString;
var cmcLand = [];
var cmc0=[];
var cmc1 = [];
var cmc2 = [];
var cmc3 = [];
var cmc4 = [];
var cmc5 = [];
var cmc6 = [];
var arrayOfCmc = [];
var cmcClass0=".cmc0";
var cmcClass1=".cmc1";
var cmcClass2=".cmc2";
var cmcClass3=".cmc3";
var cmcClass4=".cmc4";
var cmcClass5=".cmc5";
var cmcClass6=".cmc6";
var cmcClassLand=".cmcLand";

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
var uniqueID;
var numSlide;
var cardsFound = 0;
var classMulticolor = ".multi-color";
var classColor = ".color-filter";
var classType = ".type-filter";
var classRarity = ".rarity-filter";
var classCost = ".number-filter";
var featureArray = [];
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
// firstSearch and firstTypeSearch are switches to direct the search method to either search on the base level or search on the refined level
var firstSearch = true;
var firstTypeSearch = true;

$("#search").on("click", function () {
  $(".card").remove();
  $(".new-slide").remove();
  var input = $("#input").val();
  var searchTerm = input.charAt(0).toUpperCase() + input.slice(1);
  if (firstSearch) {
    // when no filter button has been selected, the type search will search from all of the cards
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
          "rarity": responseData[i].rarity,
          "set": responseData[i].set,
          "setIndex": responseData[i].collector_number
        });
      }
    }
    firstTypeSearch = false;
    display(searchPool);
  }
  else {
    // when at least one filter button has been selected, the type search will search in a refined pool defined by the selected filters
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
          "rarity": searchPool[j].rarity,
          "set": searchPool[j].set,
          "setIndex": searchPool[j].setIndex
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
      //populate 5 filter arrays with values based on which filter button has been selected
      if ($(this).attr("class").indexOf(classColor) != -1) {
        $("." + filter).attr("style", "border-color: gold");
      }
      else {
        $(this).attr("style", "border-color: gold");
      }
      if (filter == "7") {
        // special consideration for the option "7+" in the number filter
        filterArray.push("7", "8", "9", "10", "11", "12", "13", "14", "15", "16");
      }
      else {
        filterArray.push(filter);
      }
    }
    else {
      if ($(this).attr("class").indexOf(classColor) != -1) {
        $("." + filter).attr("style", "border-color: white");
      }
      else {
        // if the same filter has been selected, then the next click will de-select it
        $(this).attr("style", "border-color:white");
      }

      if (filter == "7") {
        // special consideration for the option "7+"
        filterArray.splice(filterArray.indexOf(filter), 10);
      }
      else {
        filterArray.splice(filterArray.indexOf(filter), 1);
      }
    }

    if (firstTypeSearch) {
      // if no type search has been performed, the filter buttons will filter all cards
      searchPool = [];
      firstSearch = false;
      displaySearch(cardPool, arrayOfFilters, searchPool);
    }
    else {
      // if a type search has been performed, the filter buttons will only filter the search result
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
  $("button").attr("style", "border-color: white");
  searchPool = [];
  secondSearch = [];
  firstSearch = true;
  firstTypeSearch = true;
  colorFilter.splice(0, colorFilter.length);
  costFilter.splice(0, costFilter.length);
  rarityFilter.splice(0, rarityFilter.length);
  typeFilter.splice(0, typeFilter.length);
  featureArray = [];
  multiColorFilter.splice(0, multiColorFilter.length);

  display(cardPool);
});

function sortByColor() {
  // placing mono-colored cards first then in the order of "white" ,"blue","black","red","green","multicolor","colorless" and "lands"
  for (var i = 0; i < responseData.length; i++) {
    if (responseData[i].colors.length == 1 && responseData[i].colors[0] == "W") {
      white.push({
        //attaching all searchable key words to each card in the json format
        "imgUrl": responseData[i].image_uris.border_crop,
        "name": responseData[i].name,
        "type": responseData[i].type_line,
        "oracle": responseData[i].oracle_text,
        "manaCost": responseData[i].mana_cost,
        "colors": responseData[i].colors,
        "rarity": responseData[i].rarity,
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
        "cmc": responseData[i].cmc,
        "set": responseData[i].set,
        "setIndex": responseData[i].collector_number
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
  console.log(cardPool);

}

function displaySearch(array, arrayOfFilters, array2) {
  cardsFound = 0;
  //line 289-310: populate featureArray with searchable key words from the json object attached to each card
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

    //line 313-337: set the condition for the colorArray to return a positive result based on whether or not "multercolor" has been selected
    var counter = 0; //positive results are recorded by var counter
    if (colorFilter.length == 0) {
      counter++;
    }
    else if (multiColorFilter.length == 0) {
      //when multicolor is not selected, the search result is the union of selected colors
      for (var y = 0; y < colorFilter.length; y++) {
        var feature = colorFilter[y];
        if (featureArray.indexOf(feature) != -1) {
          counter++;
          break;
        }
      }
    }
    else {
      //when multicolor is selected, the search result is the intersection of selected colors
      var counter2 = 0;
      for (var z = 0; z < colorFilter.length; z++) {
        var feature = colorFilter[z];
        if (featureArray.indexOf(feature) != -1) {
          counter2++;
        }
      }
      if (counter2 == colorFilter.length) {
        counter++;
      }
    }
    // line 339-351: set the condition for the rest of the filters to return a positive result
    for (var j = 1; j < arrayOfFilters.length; j++) {
      if (arrayOfFilters[j].length == 0) {
        counter++
      }
      for (var k = 0; k < arrayOfFilters[j].length; k++) {
        var feature = arrayOfFilters[j][k];
        if (featureArray.indexOf(feature) != -1) {
          counter++;

          // all search results for these filters are unions of selected filters
          break;
        }
      }
    }
    console.log(counter);
    // line 353-370: only when all 5 filters return positive will the the card be picked by the search method for display
    if (counter == 5) {
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
          "rarity": array[i].rarity,
          "set": array[i].set,
          "setIndex": array[i].setIndex
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
  //creating a number of carousel slides based on the size of the search result
  for (var i = 0; i < Math.ceil(numSlide); i++) {
    var createCarousel = $('<div>');
    createCarousel.addClass("carousel-item");
    if (slideActive == false) {
      // assigning "class active" to only one slide for carousel to function properly
      createCarousel.addClass("active new-slide");
      slideActive = true;
    }
    else {
      createCarousel.addClass("new-slide");
    }
    var createContainer = $('<div>');
    var createRow = $('<div>');
    createContainer.addClass("container");
    createRow.addClass("row");
    $(".carousel-inner").append(createCarousel);
    createCarousel.append(createContainer);
    createContainer.append(createRow);
    for (var j = i * 18; j < (i + 1) * 18; j++) {
      //populating carousel slide with 18 cards
      var createImg = $('<img>');
      createImg.attr("style", "background-color:transparent");
      createImg.attr("src", array[j].imgUrl);
      //adding usable information for future "on click" events
      createImg.attr("data-cost", array[j].cmc);
      createImg.attr("data-name", array[j].name);
      createImg.attr("id", array[j].set + array[j].setIndex);
      createImg.attr("data-set", array[j].set);
      createImg.attr("data-index", array[j].setIndex);
      createImg.attr("data-type", array[j].type);

      for (h = 0; h < array[j].colors.length; h++) {
        createImg.addClass(array[j].colors[h]);
      }
      createImg.addClass("col-md-2 card cardImgs");
      createRow.append(createImg);
      $(".card").unbind().click(addCardToDeck);
    }
  }
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
      console.log(responseData);
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
          createImg.attr("data-cost", cardPool[j].cmc);
          createImg.attr("data-name", cardPool[j].name);
          createImg.attr("id", cardPool[j].set + cardPool[j].setIndex);
          createImg.attr("data-set", cardPool[j].set);
          createImg.attr("data-index", cardPool[j].setIndex);
          createImg.attr("data-type", cardPool[j].type);
          for (h = 0; h < cardPool[j].colors.length; h++) {
            createImg.addClass(cardPool[j].colors[h]);
          }
          createImg.addClass("col-md-2 card cardImgs");
          createRow.append(createImg);
          $(".card").unbind().click(addCardToDeck);
        }
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
function searchJson(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].cardChosen.id === value) {
      return i;
    }
  }
}
function sortByCost() {
  arrayOfCmc = [];
  arrayOfCmc.push(cmcLand, cmc1, cmc2, cmc3, cmc4, cmc5, cmc6);
  for (var j = 0; j < deckList.length; j++) {
    var value = deckList[j].cardChosen.id;
    for (var i = 0; i < arrayOfCmc.length; i++) {
      var index = searchJson(arrayOfCmc[i], value);
      if (index == null && deckList[j].cardChosen.cmc == i) {
        arrayOfCmc[i].push(deckList[j]);
      }
    }
    if (searchJson(arrayOfCmc[6], value) == null && deckList[j].cardChosen.cmc > 6) {
      arrayOfCmc[6].push(deckList[j]);
    }
  }
  arrayOfCmc.splice(0, 1);
  arrayOfCmc.push(cmcLand);
  deckList = arrayOfCmc.flat(1);
}

function addCardToDeck() {
  if (addToDeckToggle === 1) {
    var cardChosen = $(this).attr("id"); //set button text to be the name of the card
    var indexOfCopy = searchJson(deckList, cardChosen); //searches through deck array to find if card chosen is same as existing deck card
    if (indexOfCopy == null) { //if chosen card is not already in deck, add one to the end of the deckList array
      //deck.push(cardChosen);
      deckList.push({
        cardChosen: {
          "imgUrl": $(this).attr("src"),
          "name": $(this).attr("data-name"),
          "cmc": $(this).attr("data-cost"),
          "set": $(this).attr("data-set"),
          "setIndex": $(this).attr("data-index"),
          "id": $(this).attr("id"),
          "type": $(this).attr("data-type"),
          "numCopy": 1
        }
      });
    }
    else {
      deckList[indexOfCopy].cardChosen.numCopy++;
      if (deckList[indexOfCopy].cardChosen.numCopy >= 4 && $(this).attr("data-type").indexOf("Basic Land") == -1) { //dont let there be more than 4 copies of the same card
        deckList[indexOfCopy].cardChosen.numCopy = 4;
      }
    }
    sortByCost();
    buildDeck(cmc1,cmcClass1); //runs buildDeck function after card has been added to deck array
    buildDeck(cmc2,cmcClass2);
    buildDeck(cmc3,cmcClass3);
    buildDeck(cmc4,cmcClass4);
    buildDeck(cmc5,cmcClass5);
    buildDeck(cmc6,cmcClass6);
    buildDeck(cmcLand,cmcClassLand);
  }
}

function buildDeck(array,cmcClass) {
  $(cmcClass).text(""); //clear the temporary built deck every time function is run
  for (var j = 0; j < array.length; j++) { //goes through length of deck and creates a button for each card
    var cardBtn = $("<img>");
    var cardCountBtn = $("<button>");
    var createRow = $('<div>');
    createRow.addClass("row");
    createRow.addClass("row-deck");
    var cardImage = array[j].cardChosen.imgUrl;
    cardBtn.addClass("card-button");
    cardBtn.addClass("col-11-md");
    cardBtn.attr("src", cardImage);
    cardBtn.attr("id", array[j].cardChosen.id);
    cardCountBtn.addClass("col-1-md");
    cardCountBtn.addClass("card-counter");
    cardCountBtn.text(array[j].cardChosen.numCopy + "x");
    cardCountBtn.attr("data-text", array[j].cardChosen.numCopy + "x");
    //cardCountBtn is a counter that tells user how many of the same card is in their deck
    $(cmcClass).append(createRow);
    createRow.append(cardCountBtn);
    createRow.append(cardBtn);
    cardBtn.addClass("remove-from-deck");
    cardCountBtn.addClass(array[j].cardChosen.id);
    cardCountBtn.attr("data-id", array[j].cardChosen.id);
    cardCountBtn.addClass("card-counter");
    $(".remove-from-deck").unbind().click(removeFromDeck); //on click for each card button, the remove from deck functionality is added
  };
  $(".card-counter").on("click", function () {
    var buttonChosen = $(this).attr("data-id");
    var indexOfButton = searchJson(array, buttonChosen);
    if (array[indexOfButton].cardChosen.numCopy >= 4 && $("#" + buttonChosen).attr("data-type").indexOf("Basic Land") == -1) {
      array[indexOfButton].cardChosen.numCopy = 4;
    }
    else {
      array[indexOfButton].cardChosen.numCopy = array[indexOfButton].cardChosen.numCopy + 1;
    }
    $(this).text(array[indexOfButton].cardChosen.numCopy + "x");
    $(this).attr("data-text", array[indexOfButton].cardChosen.numCopy + "x");
  });
  $(".card-counter").hover(function () {
    $(this).text("+");
  },
    function () {
      var oldText = $(this).attr("data-text");
      $(this).text(oldText);
    });
};

function removeFromDeck() {
  var removedCardName = $(this).attr("id"); //get name of card user wants to remove
  var index = searchJson(deckList, removedCardName); //searches deck array for card name
  if (deckList[index].cardChosen.numCopy == 1) { //if only one copy of that card exists, then remove it from the array and from the UI
    //deck.splice(index, 1);
    //deckCount.splice(index, 1);
    deckList.splice(index, 1); //remove deck count element from array
    for (var i = 0; i < arrayOfCmc.length; i++) {
      var index2 = searchJson(arrayOfCmc[i], removedCardName);
      if (index2 != null) {
        arrayOfCmc[i].splice(index2, 1);
      }
    }
    console.log(deckList);
    //$(".card-counter[data-name='" + $(this).text() + "']").remove();
    $("." + removedCardName).remove(); //remove card counter from UI for specific button
    $(this).remove();
  }
  else {
    deckList[index].cardChosen.numCopy = deckList[index].cardChosen.numCopy - 1; //if multiple copies of card exist, then remove only one from the existing card count
    $("." + removedCardName).text(deckList[index].cardChosen.numCopy + "x");
  }
};

$(".saveButton").on("click", function () { //for save deck button
  deckString = JSON.stringify(deck);
  localStorage.setItem("deckString", deckString);
  deckCountString = JSON.stringify(deckCount);
  localStorage.setItem("deckCountString", deckCountString);
});







