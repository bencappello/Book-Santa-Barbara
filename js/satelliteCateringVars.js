const calendarID = "thefactory@booksantabarbara.com"

function dom(id) {
    return document.getElementById(id);
};

//Form Sections
//event info
var eventNameInput = dom("event-name-input");
var eventDateInput = dom("event-date-input");
var startTimeInput = dom("start-time-input");
var endTimeInput = dom("end-time-input");
var guestsSlider = dom("guests-slider");
var guestsInput = dom("guest-count-input");

//dinner
var buffetInput = dom("serviced-buffet");
var familyInput = dom("seated-family-style");
var platedInput = dom("seated-plated");
var breadInput = dom("bread-service");
var oddsEndsInput = dom("odds-and-ends");

//A la carte
var stationAppetizersInput = dom("station-appetizers-input");
var passedSavoryAppetizersInput = dom("passed-savory-appetizers-input");
var passedDessertsInput = dom("passed-desserts");

var stationAppetizers = dom("station-appetizers");
var passedSavoryAppetizers = dom("passed-savory-appetizers-input");
var passedDesserts = dom("passed-desserts");


//Event Summary
var dateLineItem = dom("date-line-item");
var startLineItem = dom("start-line-item");
var endLineItem = dom("end-line-item");
var guestsLineItem = dom("guests-line-item");

var eventNameDisplay = dom("event-name-display");
var eventDateDisplay = dom("event-date-display");
var startTimeDisplay = dom("start-time-display");
var endTimeDisplay = dom("end-time-display");
var guestCountDisplay = dom("guest-count-display");

//Cost Summary
var foodMinDisplay = dom("food-min-display");
var foodMinInput = dom("food-min-input");

var dinnerCostLineItem = dom("dinner-line-item");
var dinnerSelectionDisplay = dom("dinner-selection-display");
var dinnerCostDisplay = dom("dinner-cost-display");
var dinnerCostInput = dom("dinner-cost-input");

var breadCostLineItem = dom("bread-line-item");
var breadSelectionDisplay = dom("bread-selection-display");
var breadCostDisplay = dom("bread-cost-display");
var breadCostInput = dom("bread-cost-input");

var oddsEndsCostLineItem = dom("odds-ends-line-item");
var oddsEndsSelectionDisplay = dom("odds-ends-selection-display");
var oddsEndsCostDisplay = dom("odds-ends-cost-display");
var oddsEndsCostInput = dom("odds-ends-cost-input");

var aLaCarteCostLineItem = dom("a-la-carte-line-item");
var aLaCarteSelectionDisplay = dom("a-la-carte-selection-display");
var aLaCarteCostDisplay = dom("a-la-carte-cost-display");
var aLaCarteCostInput = dom("a-la-carte-cost-input");

var dessertCostLineItem = dom("dessert-line-item");
var dessertSelectionDisplay = dom("dessert-selection-display");
var dessertCostDisplay = dom("dessert-cost-display");
var dessertCostInput = dom("dessert-cost-input");

var drinksCostLineItem = dom("drinks-line-item");
var drinksSelectionDisplay = dom("drinks-selection-display");
var drinksCostDisplay = dom("drinks-cost-display");
var drinksCostInput = dom("drinks-cost-input");

var totalCostDisplay = dom("total-cost-display");
var totalCostInput = dom("total-cost-input");

var depositDisplay = dom("deposit-display");
var depositInput = dom("deposit-input");