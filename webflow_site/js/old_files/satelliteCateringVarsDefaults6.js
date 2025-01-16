const calendarID = "c_1883pm1dfe5o2ittjte4j7c5t2e5e@resource.calendar.google.com"

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
var breadInput = dom("bread-input");
var oddsEndsInput = dom("odds-ends-input");

//A la carte
var stationAppetizersInput = dom("station-appetizers-input");
var passedSavoryAppetizersInput = dom("passed-savory-appetizers-input");
var passedDessertsInput = dom("passed-desserts-input");

//lunch
var lunchInput = dom("lunch-input");

//drinks
var openBarInput = dom("open-bar-input");
var staffedBarInput = dom("staffed-bar-input");

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

var stationAppetizersCostLineItem = dom("station-appetizers-line-item");
var stationAppetizersSelectionDisplay = dom("station-appetizers-selection-display");
var stationAppetizersCostDisplay = dom("station-appetizers-cost-display");
var stationAppetizersCostInput = dom("station-appetizers-cost-input");

var passedSavoryAppetizersCostLineItem = dom("passed-savory-appetizers-line-item");
var passedSavoryAppetizersSelectionDisplay = dom("passed-savory-appetizers-selection-display");
var passedSavoryAppetizersCostDisplay = dom("passed-savory-appetizers-cost-display");
var passedSavoryAppetizersCostInput = dom("passed-savory-appetizers-cost-input");

var passedDessertsCostLineItem = dom("passed-desserts-line-item");
var passedDessertsSelectionDisplay = dom("passed-desserts-selection-display");
var passedDessertsCostDisplay = dom("passed-desserts-cost-display");
var passedDessertsCostInput = dom("passed-desserts-cost-input");

var lunchCostLineItem = dom("lunch-line-item");
var lunchSelectionDisplay = dom("lunch-selection-display");
var lunchCostDisplay = dom("lunch-cost-display");
var lunchCostInput = dom("lunch-cost-input");

var openBarCostLineItem = dom("open-bar-line-item");
var openBarSelectionDisplay = dom("open-bar-selection-display");
var openBarCostDisplay = dom("open-bar-cost-display");
var openBarCostInput = dom("open-bar-cost-input");

var staffedBarCostLineItem = dom("staffed-bar-line-item");
var staffedBarSelectionDisplay = dom("staffed-bar-selection-display");
var staffedBarCostDisplay = dom("staffed-bar-cost-display");
var staffedBarCostInput = dom("staffed-bar-cost-input");

var totalCostDisplay = dom("total-cost-display");
var totalCostInput = dom("total-cost-input");

var depositDisplay = dom("deposit-display");
var depositInput = dom("deposit-input");

//set defaults
//inputs
guestsSlider.value = 0;
guestsInput.value = 0;

//event details
eventNameDisplay.hidden = true;
dateLineItem.style.display = 'none';
startLineItem.style.display = 'none';
endLineItem.style.display = 'none';
guestsLineItem.style.display = 'none';

//cost details
breadCostLineItem.style.display = 'none';
oddsEndsCostLineItem.style.display = 'none';
dinnerCostLineItem.style.display = 'none';
stationAppetizersCostLineItem.style.display = 'none';
passedSavoryAppetizersCostLineItem.style.display = 'none';
passedDessertsCostLineItem.style.display = 'none';
lunchCostLineItem.style.display = 'none';

openBarCostLineItem.style.display = 'none';
staffedBarCostLineItem.style.display = 'none';

//total details
foodMinDisplay.innerHTML = "$0";
totalCostDisplay.innerHTML = "$0" 
depositDisplay.innerHTML = "$0";
