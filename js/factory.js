//event details
function dom(id) {
    return document.getElementById(id);
};

var eventNameInput = dom("event-name-input");
var eventDateInput = dom("event-date-input");
var startTimeInput = dom("start-time-input");
var endTimeInput = dom("end-time-input");
var guestsSlider = dom("guests-slider");
var guestsInput = dom("guest-count-input");

//food & beverage
const baseKitchenCost = 1250;
var noFoodInput = dom("no-food");
var outsideCateringInput = dom("outside-catering");
var foodBeverageInput = dom("food-beverage");

//entertainment
var sonosInput = dom("sonos");
var interestedEntertainmentInput = dom("interested-entertainment");
var paWirelessInput = dom("pa-wireless");

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
const baseCost = 1500;
var baseDayCostDisplay = dom("base-day-cost-display");
var baseDayCostInput = dom("base-day-cost-input");

var foodCostDisplay = dom("food-cost-display");
var foodCostInput = dom("food-cost-input");

var entertainmentCostDisplay = dom("entertainment-cost-display");
var entertainmentCostInput = dom("entertainment-cost-input");

var totalCostDisplay = dom("total-cost-display");
var totalCostInput = dom("total-cost-input");
var depositDisplay = dom("deposit-display");
var depositInput = dom("deposit-input");

//set defaults
noFoodInput.checked = true;
guestsSlider.value = 0;
sonosInput.checked = true;
entertainmentCostDisplay.value = 0;
guestsInput.value = 0;

eventNameDisplay.hidden = true;
dateLineItem.style.display = 'none';
startLineItem.style.display = 'none';
endLineItem.style.display = 'none';
guestsLineItem.style.display = 'none';

baseDayCostDisplay.innerHTML = "$" + baseCost.toString();
foodCostDisplay.innerHTML = "$0";
entertainmentCostDisplay.innerHTML = "$0";
totalCostDisplay.innerHTML = "$" + baseCost.toString();
depositDisplay.innerHTML = "$" + calculateDeposit(baseCost).toString();

//Calculation
function calculateChange() {
  var eventDateObject = new Date(eventDateInput.value);
  var baseDayCost = calculateBaseDayCost();
  var foodCostLineItem = calculateFoodCostLineItem();
  var entertainmentCost = calculateEntertainmentCost();
  var totalCost = baseDayCost + entertainmentCost + calculateFoodCost();

  guestsInput.value = guestsSlider.value;
  
  //event details updating
  if (eventNameInput.value) { 
    eventNameDisplay.hidden = false;
    eventNameDisplay.innerHTML = eventNameInput.value;
  };
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
  baseDayCostDisplay.innerHTML = "$" + baseDayCost.toString();
  baseDayCostInput.value = baseDayCost;

  if (typeof foodCostLineItem === 'number') {
    foodCostDisplay.innerHTML = "$" + foodCostLineItem.toString();
  } else {
    foodCostDisplay.innerHTML = foodCostLineItem.toString();
  }

  foodCostInput.value = foodCostLineItem;
  entertainmentCostDisplay.innerHTML = "$" + entertainmentCost.toString();
  entertainmentCostInput.value = entertainmentCost;
  baseDayCostDisplay.innerHTML = "$" + baseDayCost.toString();
  baseDayCostInput.value = baseDayCost;
  totalCostDisplay.innerHTML = "$" + totalCost.toString();
  totalCostInput.value = totalCost;
  depositDisplay.innerHTML = "$" + calculateDeposit(totalCost).toString();
  depositInput.value = calculateDeposit(totalCost);
};

eventNameInput.onchange = calculateChange;
eventDateInput.onchange = calculateChange;
startTimeInput.onchange = calculateChange;
endTimeInput.onchange = calculateChange;
guestsSlider.oninput = calculateChange;
guestsSlider.onchange = calculateChange;
guestsInput.onchange = calculateChange;
noFoodInput.onchange = calculateChange;
outsideCateringInput.onchange = calculateChange;
foodBeverageInput.onchange = calculateChange;
sonosInput.onchange = calculateChange;
interestedEntertainmentInput.onchange = calculateChange;
paWirelessInput.onchange = calculateChange;

function calculateDeposit(total) {
  return total * 0.2;
}

function calculateBaseDayCost() {
  var eventDate = new Date(Date.parse(eventDateInput.value));
  var day = eventDate.getDay();

  if (day === 5 || day === 0 ) {
  	return 2500;
  } else if (day === 6) {
  	return 3000;
  } else {
  	return 1500;
  }
};

function calculateFoodCostLineItem() {
  if (foodBeverageInput.checked && guestsSlider.value > 200) {
    return 'Inquire';
  } else {
    return calculateFoodCost();
  }
};

function calculateFoodCost() {
  var cost;
  
  if (noFoodInput.checked === true) {
    if (monThruThurs()) {
      cost = 0;
    } else {
      cost = baseKitchenCost;
    };
  } else if (outsideCateringInput.checked ===true) {
    cost = baseKitchenCost;
  } else {
    cost = calculateGuestFoodCost();
  };

  return cost;
};

function monThruThurs() {
  var eventDate = new Date(Date.parse(eventDateInput.value));
  var day = eventDate.getDay();

  if (day === 5 || day === 6 || day === 0 ) {
  	return false;
  } else {
  	return true;
  }
};

function calculateGuestFoodCost() {
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

function calculateEntertainmentCost() {
 if (sonosInput.checked === true) {
    return 0
  } else {
    return 800
  };
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