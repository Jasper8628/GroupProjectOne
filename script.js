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
          "rarity": responseData[i].rarity
        });
      }
    }
    firstTypeSearch = false;
    display(searchPool);
  }
  else {
    // when at least one filter button has been selected, the type search will search in a refined pool defined by the selected filters
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
      //populate 5 filter arrays with values based on which filter button has been selected
      if ($(this).attr("class").indexOf(classColor) != -1) {
        $("."+filter).attr("style", "border-color: gold");
      }
      else {
        $(this).attr("style", "border-color: gold");
      }
      
      console.log( $("."+filter).attr("style"));
      console.log(filter);
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
        $("."+filter).attr("style", "border-color: white");
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
      
    console.log( $("."+filter).attr("style"));
    console.log(filter);
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
  $("button").attr("style","border-color: white");
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

  console.log(arrayOfFilters);
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
          "rarity": array[i].rarity
        }
      );
    }
  }
  display(array2);
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
      createImg.attr("data-cost", array[j].manaCost);
      createImg.attr("data-name", array[j].name);
      for (h = 0; h < array[j].colors.length; h++) {
        createImg.addClass(array[j].colors[h]);
      }
      createImg.addClass("col-md-2 card cardImgs");
      createRow.append(createImg);
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
      sortByColor();
      display(cardPool);
    });
  });
}

$(".left").on("click", function () {
  $("#carouselExampleControls").carousel("prev");
});
$(".right").on("click", function () {
  $("#carouselExampleControls").carousel("next");
});
API_CALL(QueryURL, QueryURL2);