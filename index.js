/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  games.forEach(game => {
    // create a new div element which will be come the game card that displays info about a game
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    // set inner HTML using a template literal to display some info about each game
    gameCard.innerHTML += `<img class="game-img" src="${game.img}" alt="${game.name}">`
    gameCard.innerHTML += `<h3 class="game-name">${game.name}</h3>`
    gameCard.innerHTML += `<p class="game-description">${game.description}</p>`
    gameCard.innerHTML += `<p class="backers">Backers: ${game.backers}</p>`

    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  });

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let backers = GAMES_JSON.reduce( (total, game) => {
  return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = backers.toLocaleString();


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let raised = GAMES_JSON.reduce( (total, game) => {
  return total + game.pledged;
}, 0);

// set inner HTML using template literal
raised = raised.toLocaleString();
raisedCard.innerHTML = `$${raised}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
  let unfundedGames = GAMES_JSON.filter( game => {
    return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( game => {
      return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGamesCount = GAMES_JSON.reduce( (total, game) => {
  return game.pledged < game.goal ? total + 1 : total;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
let unfundedGamesString = `A total of $${raised} has been raised for ${GAMES_JSON.length} games. 
Currently, there are ${unfundedGamesCount} unfunded ${unfundedGamesCount === 1 ? "game" : "games"} on our site.`;
console.log(unfundedGamesString);

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.innerHTML += `<p>${unfundedGamesString}</p>`;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...others] = sortedGames;


// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = document.createElement("h3");
firstGameName.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameName);

// do the same for the runner up item
const secondGameName = document.createElement("h3");
secondGameName.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameName);



/************************************************************************************
 * BONUS Challenge: Add a search bar to the page that filters games by name as the user types 
 */
function filterGamesByName() {
  deleteChildElements(gamesContainer);
  const searchValue = searchInput.value.toLowerCase();
  const filteredGames = GAMES_JSON.filter( game => {
    return game.name.toLowerCase().includes(searchValue);
  });

  addGamesToPage(filteredGames);
}

const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("keyup", filterGamesByName);

// add nav bar to get to our games section
const navBar = document.getElementById("nav-btn");
navBar.addEventListener("click", () => {
  window.scrollTo({
    top: document.getElementById("our-games").offsetTop
  });
});