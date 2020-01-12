# GroupProjectOne
Features and Methodology:
 The goal is to replicate the card-searching and deck-building experience in the game MTG Arena (hence the name);
 The application micmics the game in UI layout, colors and overall asthetics;
 The application uses a 2-level nested api call from scryfall.com, with pre-defined mana-cost order and set abbreviations;
 Advanced search api calls are deemed too slow in response time, therefore a local search method based on the api response is proposed;
 The search method takes in search terms from filter buttons, placing them into a 2-level nested arrays, then compares each values in the arrays against each card from the api response;
 Each card generates a temperary array of searchable key words, to be compared with the values from the nested arrays;
 To compare, a 2-level nested if-clause is used, the daughter arrays, representing each filter type, are considered the union of all values in each array,
 therefore if any one of the value is matched with the card's key words, the corresponding daughter's if-clause returns true;
 Only when all of the daughter if-clauses return true, will the main if-clause return true, in this case, a counter is used instead to track the number of true statements;
 Only when the counter is equal to the length of the mother array of the nested arrays, will the card be passed into the search-result array;
 A display function is then applied to the search-result array to display selected cards into the carousel based on the filter buttons clicked;

 The deck-builder function uses similar display methodology, in which each card, when clicked on, is passed into a temperary array of objects of searchable key words for each card;
 Then a for-loop is used to create an image then attaches the corresponding url for each object in the temperary arry;
 A second view format is also added to the deck-builder to resemble the functionality provided in the game,
 in which a column is created for each different mana-cost, a sort function is then applied to the temperary arry to determine which column each card will be displayed into;
 The deck list can then be exported to the clipboard as a text file, in a format recognizable to the game;
 The file can then be directly imported into the game as a new deck, just like other decks created inside the game.

Future development:
 Two different methods of hover-to-enlarge are currently present in the application, however the one only using css trick is less favorable;
 Moving forward, all three view formats (the carousel, the list-view and the mana-curve-view) should have the same hover-to-enlarge functionality;
 A more polished UI for the deck-builder will be added, featuring name creation and a thumb nail for the deck;
 A second tab will be added to house multiple decks, preferrablity using server storage instead of local storage.

Known Issue(s):
 One issue with double-faced cards is yet to be addressed, currently double-faced cards are displayed but not fully searchable;
 Hover-to-enlarge only displays the front side of the card.
 Data needed to fix this issue is nested in the "card_faces" property of the response data, replacing key values used in most of aforementioned functions;
 causing "uncaught error: undefined";
 Therefore either a patching of the objects passed into arrays or a reconstruction of said objects will be attempted.
