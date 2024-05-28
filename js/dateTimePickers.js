//Google Calendar
console.log("timepickers, calendarID)
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
var eventLength = 0;

startTime.timepicker({
  'step': () => 60,
  'scrollDefault': '11:00am',
  'forceRoundTime': true,
  'minTime': '1:00am',
  'maxTime': '12:00am'
});
endTime.timepicker({
  'step': () => 60,
  'scrollDefault': '11:00am',
  'forceRoundTime': true,
  'minTime': '1:00am',
  'maxTime': '12:00am'
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

function parseTimeString(timeString) {
  const [time, modifier] = timeString.split(/(am|pm)/);
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'pm' && hours !== 12) {
      hours += 12;
  }
  if (modifier === 'am' && hours === 12) {
      hours = 0;
  }

  return { hours, minutes };
}

function calculateHoursBetween(startTime, endTime) {
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);

  let startInMinutes = start.hours * 60 + start.minutes;
  let endInMinutes = end.hours * 60 + end.minutes;

  let diffInMinutes = endInMinutes - startInMinutes;
  if (diffInMinutes < 0) {
      diffInMinutes += 24 * 60; // handle cases where endTime is on the next day
  }

  return diffInMinutes / 60;
}