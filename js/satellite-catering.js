//event details
function dom(id) {
    return document.getElementById(id);
};

//Form Sections
var guestsSlider = dom("guests-slider");
var guestsInput = dom("guest-count-input");

//dinner
var buffetInput = dom("serviced-buffet");
var familyInput = dom("seated-family-style");
var platedInput = dom("seated-plated");
var breadInput = dom("bread-service");
var oddsEndsInput = dom("odds-and-ends");

//A la carte
var stationAppetizersInput = dom("station-appetizers");
var passedSavoryAppetizersInput = dom("passed-savory-appetizers");
var passedDessertsInput = dom("passed-desserts");

var stationAppetizers = dom("station-appetizers");
var passedSavoryAppetizers = dom("passed-savory-appetizers");
var passedDesserts = dom("passed-desserts");

//Cost Summary
var guestsLineItem = dom("guests-line-item");
var guestCountDisplay = dom("guest-count-display");

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

//set defaults
passedSavoryAppetizers.hidden = true
passedDesserts.hidden = true
guestsSlider.value = 0;
guestsInput.value = 0;
guestsLineItem.style.display = 'none';
dinnerCostLineItem.style.display = 'none';
aLaCarteCostLineItem.style.display = 'none';
dessertCostLineItem.style.display = 'none';
drinksCostLineItem.style.display = 'none';

foodMinDisplay.innerHTML = "$0";
totalCostDisplay.innerHTML = "$" 
depositDisplay.innerHTML = "$0";


//onchange
guestsSlider.oninput = calculateChange;
guestsSlider.onchange = calculateChange;
guestsInput.onchange = calculateChange;

buffetInput.oninput = onBuffetInput;
familyInput.oninput = onFamilyInput;
platedInput.oninput = onPlatedInput;

document.getElementsByName('bread-service').forEach(function(el) {
    el.oninput = onBreadInput;
});
document.getElementsByName('odds-and-ends').forEach(function(el) {
    el.oninput = onOddsEndsInput;
});

stationAppetizersInput.oninput = calculateChange;
passedSavoryAppetizersInput.oninput = calculateChange;
passedDessertsInput.oninput = calculateChange;


//Calculation
function calculateChange() {
  var foodMinLineItem = calculateFoodMinLineItem();
  var totalCost = calculateTotalCost();

  guestsInput.value = guestsSlider.value;

  if (eventDateInput.value) { 
    dateLineItem.style.display = 'flex';
    eventDateDisplay.innerHTML = eventDateObject.toLocaleString("en-US", {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
  };
  if (startTimeInput.value) { 
    startLineItem.style.display = 'flex';
    startTimeDisplay.innerHTML = startTimeInput.value.replace(":00", ":00 ");
  };
  if (endTimeInput.value) { 
    endLineItem.style.display = 'flex';
    endTimeDisplay.innerHTML = endTimeInput.value.replace(":00", ":00 ");
  };
  if (guestsInput.value && guestsInput.value !== '0') { 
    guestsLineItem.style.display = 'flex';
    guestCountDisplay.innerHTML = guestsInput.value;
  };

  //cost updating

  if (typeof foodMinLineItem === 'number') {
    foodMinDisplay.innerHTML = "$" + foodMinLineItem.toString();
  } else {
    foodMinDisplay.innerHTML = foodMinLineItem.toString();
  }

  totalCostDisplay.innerHTML = "$" + totalCost.toString();
  totalCostInput.value = totalCost;
  depositDisplay.innerHTML = "$" + calculateDeposit(totalCost).toString();
  depositInput.value = calculateDeposit(totalCost);
};

function onBuffetInput() {
    if (buffetInput.checked === true) {
        familyInput.checked = false;
        platedInput.checked = false;
    };

    calculateChange();
}
function onFamilyInput() {
    if (familyInput.checked === true) {
        buffetInput.checked = false;
        platedInput.checked = false;
    };
    
    calculateChange();
}
function onPlatedInput() {
    if (platedInput.checked === true) {
        buffetInput.checked = false;
        familyInput.checked = false;
    };
    
    calculateChange();
}
function onBreadInput() {
    if (this.checked === true) {
        document.getElementsByName('bread-service').forEach(function(el) {
            el.checked = true;
        });
    } else {
        document.getElementsByName('bread-service').forEach(function(el) {
            el.checked = false;
        });
    };
    
    calculateChange();
}
function onOddsEndsInput() {
    if (this.checked === true) {
        document.getElementsByName('odds-and-ends').forEach(function(el) {
            el.checked = true;
        });
    } else {
        document.getElementsByName('odds-and-ends').forEach(function(el) {
            el.checked = false;
        });
    };
    
    calculateChange();
}

function calculateDeposit(total) {
  return total * 0.2;
}

function calculateFoodMinLineItem() {
  if (guestsSlider.value > 200) {
    return 'Inquire';
  } else {
    return calculateFoodMin();
  }
};

function calculateFoodMin() {
  if (guestsSlider.value <= 50) {
    return 5000;
  } else if (guestsSlider.value <= 100) {
    return 7000;
  } else if (guestsSlider.value <= 150) {
    return 8500;
  } else {
    return 10000;
  };
};

function calculateDinnerCost() {
  if (buffetInput.checked === true) {
    familyInput.checked = false;
    platedInput.checked = false;
    dinnerCostLineItem.style.display = 'flex';
    dinnerSelectionDisplay.innerText = "Serviced Buffet Dinner";
    dinnerCostDisplay.innerHTML = "$60 per";
    dinnerCostInput = 60;
    return 60;
  } else if (familyInput.checked === true) {
    buffetInput.checked = false;
    platedInput.checked = false;
    dinnerCostLineItem.style.display = 'flex';
    dinnerSelectionDisplay.innerText = "Seated Family Style Dinner";
    dinnerCostDisplay.innerHTML = "$70 per";
    dinnerCostInput = 70;
    return 70;
  } else if (platedInput.checked === true) {
    buffetInput.checked = false;
    familyInput.checked = false;
    dinnerCostLineItem.style.display = 'flex';
    dinnerSelectionDisplay.innerText = "Seated Plated Dinner";
    dinnerCostDisplay.innerHTML = "$80 per";
    dinnerCostInput = 80;
    return 80;
  } else {
    dinnerCostLineItem.style.display = 'none';
    dinnerCostInput = 0;
    return 0;
  };
};

function calculateBreadCost() {
  if (breadInput.checked === true) {
    breadCostLineItem.style.display = 'flex';
    breadSelectionDisplay.innerText = "Bread Service";
    breadCostDisplay.innerHTML = "$7 per";
    breadCostInput = 7;
    return 7;
  } else {
    breadCostLineItem.style.display = 'none';
    breadCostInput = 0;
    return 0;
  };
};

function calculateOddsEndsCost() {
  if (oddsEndsInput.checked === true) {
    oddsEndsCostLineItem.style.display = 'flex';
    oddsEndsSelectionDisplay.innerText = "Odds & Ends";
    oddsEndsCostDisplay.innerHTML = "$8 per";
    oddsEndsCostInput = 8;
    return 8;
  } else {
    oddsEndsCostLineItem.style.display = 'none';
    oddsEndsCostInput = 0;
    return 0;
  };
};

function calculateALaCarteCost() {
  if (stationAppetizersInput.checked === true) {
    aLaCarteCostLineItem.style.display = 'flex';
    aLaCarteSelectionDisplay.innerText = "Station Appetizers";
    aLaCarteCostDisplay.innerHTML = "$30 per";
    aLaCarteCostInput = 30;
    return 30;
  } else if (passedSavoryAppetizersInput.checked === true) {
    aLaCarteCostLineItem.style.display = 'flex';
    aLaCarteSelectionDisplay.innerText = "Passed Savory Appetizers";
    aLaCarteCostDisplay.innerHTML = "$35 per";
    aLaCarteCostInput = 35;
    return 35;
  } else if (passedDessertsInput.checked === true) {
    aLaCarteCostLineItem.style.display = 'flex';
    aLaCarteSelectionDisplay.innerText = "Passed Desserts";
    aLaCarteCostDisplay.innerHTML = "$14 per";
    aLaCarteCostInput = 14;
    return 14;
  } else {
    aLaCarteCostLineItem.style.display = 'none';
    aLaCarteCostInput = 0;
    return 0;
  };
};

function calculateTotalCost() {
    return (
        calculateDinnerCost() + 
        calculateBreadCost() + 
        calculateOddsEndsCost() + 
        calculateALaCarteCost()
    ) * Number(guestsInput.value);
};

//Google Calendar
const calendarID = "reservations@booksantabarbara.com"
const apiKey = "AIzaSyDPrCboenJFa5OmYdaZTs4bpM8BFO0-HSM"
const googleURL = "https://www.googleapis.com/calendar/v3/calendars/" + calendarID + "/events?key=" + apiKey;

var events = {};
var eventsAsStrings = {};
  
fetch(googleURL)
  .then((response) => response.json())
  .then((json) => json.items.forEach(function(event){
    let start;
    let end;
    let startEndPair;
    let startEndPairStrings;

    if (event.transparency == 'transparent') {
      return;
    }

    if (event.start.dateTime) {
      start = new Date(event.start.dateTime);
      end = new Date(event.end.dateTime);
      startEndPair = [start.getHours(), end.getHours()]
      startEndPairStrings = [start.getHours().toString(), end.toLocaleTimeString()]
    } else {
      start = new Date(event.start.date.replace(/-/g, '\/'));
      end = new Date(event.start.date.replace(/-/g, '\/'));
      end.setHours(23)
      end.setMinutes(59)
      startEndPair = [start.getHours(), end.getHours()]
      startEndPairStrings = [start.getHours().toString(), end.toLocaleTimeString()]
    }

    if (!events[start.toDateString()]) {
      events[start.toDateString()] = [startEndPair]
      eventsAsStrings[start.toDateString()] = [startEndPairStrings]
    } else {
      events[start.toDateString()].push(startEndPair);
      eventsAsStrings[start.toDateString()].push(startEndPairStrings);
    }
  }))

//DATEPICKER
var datePicker = $('input#event-date-input');

datePicker.datepicker({
  beforeShowDay: dayAvailable,
  changeMonth: true,
  changeYear: true,
  maxDate: "+7y",
  onUpdateDatepicker: addCalendarTitle
});

function addCalendarTitle() {
  $('#ui-datepicker-div').prepend('<p id="calendar-title" class="calendar-title">Live Availability Calendar</p>');
} 

function dayAvailable(date) {
  var dateString = date.toDateString();
  var startEndTimePairsArray = events[dateString];
  var morningAvailable = true;
  var eveningAvailable = true;

  //If day is in past
  if (date < new Date() ) {
    return [ false ]
  };

  //If no events on that day
  if (!startEndTimePairsArray) {
    return [ true ];
  };

  startEndTimePairsArray.forEach(function(startEndPair) {
    let startHour = startEndPair[0];
    let endHour = startEndPair[1];

    if (startHour < 12) {
      morningAvailable = false;
    }
    if (endHour > 17) {
      eveningAvailable = false
    }
  });

  return [ morningAvailable || eveningAvailable ];
};

//TIMEPICKER
var startTime = $('input#start-time-input');
var endTime = $('input#end-time-input');

startTime.timepicker({
  'step': () => 60,
  'scrollDefault': '11:00am',
  'forceRoundTime': true
});
endTime.timepicker({
  'step': () => 60,
  'scrollDefault': '11:00am',
  'forceRoundTime': true
});
  
datePicker.change(setDisabledTimes);

function setDisabledTimes() {
  let date = new Date(datePicker.val()).toDateString();
  
  if (events[date]) {
    startTime.timepicker('option', 'disableTimeRanges', eventsAsStrings[date]);
    endTime.timepicker('option', 'disableTimeRanges', eventsAsStrings[date]);
  } else {
    startTime.timepicker('option', 'disableTimeRanges', []);
    endTime.timepicker('option', 'disableTimeRanges', []);
  }
};