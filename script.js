$("#advancedSearch").click(function () {
  openAdvancedSearchModal();
});
$(".close-btn").click(function () {
  closeModal();
});

function openAdvancedSearchModal() {
  $("#modal").css("display", "block");
}
function closeModal() {
  $("#modal").css("display", "none");
}
$(".export").on("click", function () {
  $("#message").css("display", "block");
})
$(".modal-message").on("click", function () {
  $("#message").css("display", "none");
})

$(document).click(function (e) {
  if ($(e.target).is(".modal") || ($(e.target).is('body')) || $(e.target).is("#carouselExampleControls")) {
    $(".modal").css("display", "none");
  }
});

$(".modalAdvanceButtons").click(function () {
  $(this).css('border', '.5px solid yellow')
});
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
  document.getElementById("mySidebar").style.height = "100%";
  //document.getElementById("mySidebar").style.marginTop = "70px";
  document.getElementById("mySidebar").style.position = "absolute";
  document.getElementById("mySidebar").style.top = "0px";
  document.getElementById("mySidebar").style.right = "0px";
  //document.getElementById("carouselExampleControls").style.marginRight = "350px";
  document.getElementById("carouselExampleControls").style.width = "75%";
  addToDeckToggle = 1; //toggle for card adding to deck
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("carouselExampleControls").style.marginRight = "auto";
  document.getElementById("carouselExampleControls").style.width = "100%";
  addToDeckToggle = 0; //toggle for card adding to deck
}

var buttonSwitch = 0;
$(".curve-view").on("click", function () {
  if (buttonSwitch == 0) {
    curve_view();
    buttonSwitch = 1;
  }
  else {
    side_view();
    buttonSwitch = 0;
  }
});

var curveView = true;
function curve_view() {
  closeNav();
  curveView = false;
  buildCurve(cmc1, cmcClass1);
  buildCurve(cmc2, cmcClass2);
  buildCurve(cmc3, cmcClass3);
  buildCurve(cmc4, cmcClass4);
  buildCurve(cmc5, cmcClass5);
  buildCurve(cmc6, cmcClass6);
  document.getElementById("my-bottom-bar").style.height = "48%";
  document.getElementById("my-bottom-bar").style.position = "fixed";
  document.getElementById("my-bottom-bar").style.bottom = "0";
  document.getElementById("carouselExampleControls").style.width = "100%";
  $(".carousel-item").css("height", "350px");
  $(".new-col").attr("class", "new-col col-md-4");
  $(".curve-view").text("List View");
  $(".export-bottom").css("visibility", "visible");
  addToDeckToggle = 1; //toggle for card adding to deck
}

function side_view() {
  openNav();
  curveView = true;
  buildDeck(cmc1, cmcClass1);
  buildDeck(cmc2, cmcClass2);
  buildDeck(cmc3, cmcClass3);
  buildDeck(cmc4, cmcClass4);
  buildDeck(cmc5, cmcClass5);
  buildDeck(cmc6, cmcClass6);
  buildDeck(cmcLand, cmcClassLand);
  document.getElementById("my-bottom-bar").style.height = "0";
  document.getElementById("carouselExampleControls").style.width = "75%";
  $(".carousel-item").css("height", "800px");
  $(".new-col").attr("class", "new-col col-md-6");
  $(".curve-view").text("Curve View");
  $(".export-bottom").css("visibility", "collapse");
  addToDeckToggle = 1; //toggle for card adding to deck
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


///////////////// Add to deck variables /////////////////
var deck;
var deckString;
var deckList = [];
var deckCount;
var addToDeckToggle;
var deckCountString;
var cmcLand = [];
var cmc0 = [];
var cmc1 = [];
var cmc2 = [];
var cmc3 = [];
var cmc4 = [];
var cmc5 = [];
var cmc6 = [];
var arrayOfCmc = [];
var arrayOfCmcClass = [];
var cmcClass0 = "cmc0";
var cmcClass1 = "cmc1";
var cmcClass2 = "cmc2";
var cmcClass3 = "cmc3";
var cmcClass4 = "cmc4";
var cmcClass5 = "cmc5";
var cmcClass6 = "cmc6";
var cmcClassLand = "cmcLand";

if (localStorage.getItem("deckString") === null) {
  deckList = [];
}
else {
  deckList = JSON.parse(localStorage.getItem("deckString"));
  cmc1 = JSON.parse(localStorage.getItem("cmc1"));
  cmc2 = JSON.parse(localStorage.getItem("cmc2"));
  cmc3 = JSON.parse(localStorage.getItem("cmc3"));
  cmc4 = JSON.parse(localStorage.getItem("cmc4"));
  cmc5 = JSON.parse(localStorage.getItem("cmc5"));
  cmc6 = JSON.parse(localStorage.getItem("cmc6"));
  cmcLand = JSON.parse(localStorage.getItem("cmcLand"));

  buildDeck(cmc1, cmcClass1); //runs buildDeck function after card has been added to deck array
  buildDeck(cmc2, cmcClass2);
  buildDeck(cmc3, cmcClass3);
  buildDeck(cmc4, cmcClass4);
  buildDeck(cmc5, cmcClass5);
  buildDeck(cmc6, cmcClass6);
  buildDeck(cmcLand, cmcClassLand);
  buildCurve(cmc1, cmcClass1);
  buildCurve(cmc2, cmcClass2);
  buildCurve(cmc3, cmcClass3);
  buildCurve(cmc4, cmcClass4);
  buildCurve(cmc5, cmcClass5);
  buildCurve(cmc6, cmcClass6);
};
/////////////////////////////////////

var apiUrl = "https://api.scryfall.com/cards/search?order=cmc&unique=cards&q=e"
var apiUrl2 = "https://api.scryfall.com/cards/search?order=cmc&page=2&unique=cards&q=e"
var QueryURL = "https://api.scryfall.com/cards/search?order=cmc&unique=cards&q=e%3Am20";
var QueryURL2 = "https://api.scryfall.com/cards/search?order=cmc&page=2&unique=cards&q=e%3Am20"; //first queryURL then depend on user  this will get updated and ajax call will be run again
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
  white = [];
  blue = [];
  black = [];
  red = [];
  green = [];
  colorless = [];
  multiColor = [];
  lands = [];
  cardPool = [];
  reset();
  $(".set-filter").css("border", "solid 3px");
  $(".set-filter").css("border-color", "white");
  $(this).css("border", "solid 3px");
  $(this).css("border-color", "gold");
  API_CALL(apiUrl, apiUrl2);
});


$("#reset").on("click", function () {
  reset();
});

function reset() {
  $(".card").remove();
  $(".new-slide").remove();
  $("button").css("border-color", " white");
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
  if (curveView == false) {
    $(".export-bottom").css("visibility", "visible");
  }
}

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

    // line 581 to 619 construction of the first level of nested columns
    //class"new-col" will be used to manipulate column size based on a view format
    var createNewCol1 = $('<div>');
    createNewCol1.addClass("new-col col-md-6");
    var createNewRow1 = $('<div>');
    createNewRow1.addClass("row");
    createNewCol1.append(createNewRow1);
    createRow.append(createNewCol1);

    var createNewCol2 = $('<div>');
    createNewCol2.addClass("new-col col-md-6");
    var createNewRow2 = $('<div>');
    createNewRow2.addClass("row");
    createNewCol2.append(createNewRow2);
    createRow.append(createNewCol2);

    var createNewCol3 = $('<div>');
    createNewCol3.addClass("new-col col-md-6");
    var createNewRow3 = $('<div>');
    createNewRow3.addClass("row");
    createNewCol3.append(createNewRow3);
    createRow.append(createNewCol3);

    var createNewCol4 = $('<div>');
    createNewCol4.addClass("new-col col-md-6");
    var createNewRow4 = $('<div>');
    createNewRow4.addClass("row");
    createNewCol4.append(createNewRow4);
    createRow.append(createNewCol4);

    var createNewCol5 = $('<div>');
    createNewCol5.addClass("new-col col-md-6");
    var createNewRow5 = $('<div>');
    createNewRow5.addClass("row");
    createNewCol5.append(createNewRow5);
    createRow.append(createNewCol5);

    var createNewCol6 = $('<div>');
    createNewCol6.addClass("new-col col-md-6");
    var createNewRow6 = $('<div>');
    createNewRow6.addClass("row");
    createNewCol6.append(createNewRow6);
    createRow.append(createNewCol6);
    for (var k = 0, j = i * 18; k < 18, j < (i + 1) * 18; k++ , j++) {
      //populating carousel slide with 18 cards
      var createImg = $('<img>');
      var createDiv = $('<div>');
      createDiv.addClass("col-md-4 sub-col");
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
      createImg.addClass("card cardImgs");
      createDiv.append(createImg);
      //line 642 to 658 the second level of the nested columns
      //each mother column has 3 daughter columns in it
      //which allows 2 formats for display : 6 columns per row or 9 columns per row
      if (k < 3) {
        createNewRow1.append(createDiv);
      }
      else if (k < 6) {
        createNewRow2.append(createDiv);
      }
      else if (k < 9) {
        createNewRow3.append(createDiv);
      }
      else if (k < 12) {
        createNewRow4.append(createDiv);
      }
      else if (k < 15) {
        createNewRow5.append(createDiv);
      }
      else if (k < 18) {
        createNewRow6.append(createDiv);
      }
      if (curveView == false) {
        $(".new-col").attr("class", "new-col col-md-4");
        $(".carousel-item").css("height", "350px");
      }
      else {
        $(".new-col").attr("class", "new-col col-md-6");
        $(".carousel-item").css("height", "800px");
      }
      $(".card").unbind().click(addCardToDeck);
    }
  }
  $("#carouselExampleControls").carousel("pause");
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
      for (i = 0; i < responseData.length; i++) {
        if (responseData[i].colors == null) {
          console.log(responseData[i].name);
          responseData.splice(i, 1);
        }
      }
      sortByColor();
      display(cardPool);
    });
  });
}

$(".left").on("click", function () {
  $("#carouselExampleControls").carousel("prev");
  $("#carouselExampleControls").carousel("pause");

});
$(".right").on("click", function () {
  $("#carouselExampleControls").carousel("next");
  $("#carouselExampleControls").carousel("pause");
});
API_CALL(QueryURL, QueryURL2);

/////////////////////////// add card to deck functionality //////////////////////
function searchJson(array, value) {
  //returns an integer representing the index of any given card in the array based on the card's id
  for (var i = 0; i < array.length; i++) {
    if (array[i].cardChosen.id === value) {
      return i;
    }
  }
}

var deckCount = 0;
function countDeck() {
  if (localStorage.getItem("deck-count") != null) {
    deckCount = localStorage.getItem("deck-count");
  }
  else {
    deckCount = 0;
  }
  for (var i = 0; i < deckList.length; i++) {
    var numCopy = deckList[i].cardChosen.numCopy;
    deckCount = deckCount + numCopy;
    $(".deck-count").text(deckCount + "/60 Cards");

  }

}
function sortByCost() {
  countDeck();
  //similar logic to sortByColor function
  //but only uses deskList as the source of cards
  arrayOfCmc = [];
  arrayOfCmc.push(cmcLand, cmc1, cmc2, cmc3, cmc4, cmc5, cmc6);
  for (var j = 0; j < deckList.length; j++) {
    var value = deckList[j].cardChosen.id;
    for (var i = 0; i < arrayOfCmc.length; i++) {
      var index = searchJson(arrayOfCmc[i], value);
      //placing cards into respective arrays according to their cmc
      if (index == null && deckList[j].cardChosen.cmc == i) {
        arrayOfCmc[i].push(deckList[j]);
      }
    }
    if (searchJson(arrayOfCmc[6], value) == null && deckList[j].cardChosen.cmc > 6) {
      arrayOfCmc[6].push(deckList[j]);
    }
  }
  //re-organize lands to display last in the deckList
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
    //sortByCost();
    buildDeck(cmc1, cmcClass1); //runs buildDeck function after card has been added to deck array
    buildDeck(cmc2, cmcClass2);
    buildDeck(cmc3, cmcClass3);
    buildDeck(cmc4, cmcClass4);
    buildDeck(cmc5, cmcClass5);
    buildDeck(cmc6, cmcClass6);
    buildDeck(cmcLand, cmcClassLand);
    buildCurve(cmc1, cmcClass1);
    buildCurve(cmc2, cmcClass2);
    buildCurve(cmc3, cmcClass3);
    buildCurve(cmc4, cmcClass4);
    buildCurve(cmc5, cmcClass5);
    buildCurve(cmc6, cmcClass6);
    $("." + cardChosen).css("border", "solid 3px gold");
    setTimeout(function () {
      $("." + cardChosen).css("border", "none");
    }, 1000);
    if (indexOfCopy != null) {
      if (deckList[indexOfCopy].cardChosen.numCopy >= 4 && $(this).attr("data-type").indexOf("Basic Land") == -1) {
        $("." + cardChosen).css("border", "solid 3px red");
      }
      setTimeout(function () {
        $("." + cardChosen).css("border", "none");
      }, 1000);
    }
  }
  console.log(deckList);
}

function buildDeck(array, cmcClass) {
  $("#" + cmcClass).text("");
  sortByCost();//clear the temporary built deck every time function is run
  for (var j = 0; j < array.length; j++) { //goes through length of deck and creates a button for each card
    var cardBtn = $("<img>");
    var cardCountBtn = $("<button>");
    var createRow = $('<div>');
    createRow.addClass("row row-list");
    var cardImage = array[j].cardChosen.imgUrl;
    cardBtn.addClass("card-button");
    cardBtn.attr("src", cardImage);
    cardBtn.attr("id", array[j].cardChosen.id);
    cardCountBtn.addClass("card-counter");
    cardCountBtn.text(array[j].cardChosen.numCopy + "x");
    cardCountBtn.attr("data-text", array[j].cardChosen.numCopy + "x");
    //cardCountBtn is a counter that tells user how many of the same card is in their deck
    //line 787 using predeclared strings to allocate createRow to the corresponding div based on the results of the sortByCost function
    createRow.append(cardCountBtn);
    createRow.append(cardBtn);
    $("#" + cmcClass).append(createRow);
    cardBtn.addClass("remove-from-deck card-list");
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
    countDeck();
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
}

function buildCurve(array, cmcClass) {
  var zIndex = 0;
  var numSpacing = 0;
  $("." + cmcClass).text(""); //clear the temporary built deck every time function is run
  for (var j = 0; j < array.length; j++) {
    var spacing = numSpacing + "px";
    var copySpacing = numSpacing + 15 + "px";//goes through length of deck and creates a button for each card
    var cardBtn = $("<img>");
    var numCopy = $('<span>');
    var createRow = $('<div>');
    createRow.addClass("row remove-from-deck");
    numCopy.addClass("copy-text");
    numCopy.addClass(array[j].cardChosen.id);
    var cardCountBtn = $("<button>");
    var cardImage = array[j].cardChosen.imgUrl;
    cardBtn.attr("src", cardImage);
    cardBtn.attr("id", array[j].cardChosen.id);
    //createRow.append(cardBtn);
    if (array[j].cardChosen.numCopy > 1) {
      numCopy.text("X" + array[j].cardChosen.numCopy);
      //createRow.append(numCopy);
      $("." + cmcClass).append(numCopy);
      numCopy.css("position", "absolute");
      numCopy.css("top", copySpacing);
      numCopy.css("z-index", zIndex + 1);
      numSpacing = numSpacing + 18;
    }
    $("." + cmcClass).append(cardBtn);
    cardBtn.addClass("remove-from-deck");
    cardBtn.addClass("card-curve");
    cardBtn.addClass("col-md-11");
    cardBtn.css("position", "absolute");
    cardBtn.css("top", spacing);
    cardBtn.css("z-index", zIndex);
    cardCountBtn.addClass(array[j].cardChosen.id);
    zIndex++;
    numSpacing = numSpacing + 25;

    $(".remove-from-deck").unbind().click(removeFromDeck);
    //on click for each card button, the remove from deck functionality is added
  }
  $(".card-curve").hover(function () {
    var position = $(this).parent().position();
    var left = position.left;
    var hoverUrl = $(this).attr("src");
    $(".temp-img").attr("src", hoverUrl);
    //hoverImg.css("border-right","solid 8px grey");
    //hoverImg.css("border-bottom","solid 8px grey");
    $(".hover-div").css("visibility", "visible");
    $(".hover-div").css("z-index", 200);
    $(".hover-div").css("position", "absolute");
    $(".hover-div").css("left", left);
    $(".hover-div").css("top", "0px");
    $(".hover-div").css("height", "70px");
    $(".hover-div").css("width", "270px");
    $(".hover-div").css("transition", "0.3s");
  },
    function () {
      $(this).stop();
      $(".hover-div").css("transition", "0.5s");
      $(".hover-div").css("visibility", "collapse");
    });
}

function removeFromDeck() {
  countDeck();
  deckCount = deckCount - 1;
  $(".deck-count").text(deckCount + "/60");
  arrayOfCmcClass.push(cmcClass1, cmcClass2, cmcClass3, cmcClass4, cmcClass5, cmcClass6, cmcClassLand);
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
  localStorage.setItem("deck-count", deckCount);
  var deckString = JSON.stringify(deckList);
  localStorage.setItem("deckString", deckString);

  var cmc1Str = JSON.stringify(cmc1);
  localStorage.setItem("cmc1", cmc1Str);

  var cmc2Str = JSON.stringify(cmc2);
  localStorage.setItem("cmc2", cmc2Str);

  var cmc3Str = JSON.stringify(cmc3);
  localStorage.setItem("cmc3", cmc3Str);

  var cmc4Str = JSON.stringify(cmc4);
  localStorage.setItem("cmc4", cmc4Str);

  var cmc5Str = JSON.stringify(cmc5);
  localStorage.setItem("cmc5", cmc5Str);

  var cmc6Str = JSON.stringify(cmc6);
  localStorage.setItem("cmc6", cmc6Str);

  var cmcLandStr = JSON.stringify(cmcLand);
  localStorage.setItem("cmcLand", cmcLandStr);
});
$(".export").on("click", function () {
  var el = $('<textarea>');
  var text = [];
  for (var i = 0; i < deckList.length; i++) {
    var entry = [];
    var numCopy = deckList[i].cardChosen.numCopy;
    var name = deckList[i].cardChosen.name;
    var setName = deckList[i].cardChosen.set;
    var setIndex = deckList[i].cardChosen.setIndex;
    entry.push(numCopy, " ", name, " ", "(", setName, ")", " ", setIndex);
    text.push(entry.join(""));
  }
  for (var j = 0; j < text.length; j++) {
    el.val(el.val() + "\n" + text[j]);
  }
  $(".export").attr("title", "Copied to clipboard");
  $("body").append(el);
  el.select();
  document.execCommand("copy");
  console.log(el.val());
  el.remove();

});







