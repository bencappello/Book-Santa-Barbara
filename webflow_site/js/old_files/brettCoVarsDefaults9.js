const calendarID = "c_18830fm7jfvm6i9ol6had48r9ourq@resource.calendar.google.com"

function dom(id) {
    return document.getElementById(id);
};

//FORM INPUTS
var brettCoRequestForm = dom("brett-co-request-form");

//event info
var eventNameInput = dom("event-name-input");
var eventDateInput = dom("event-date-input");
var startTimeInput = dom("start-time-input");
var endTimeInput = dom("end-time-input");
var guestsSlider = dom("guests-slider");
var guestsInput = dom("guest-count-input");

//sliders
var customSongsSlider = dom("custom-songs-slider");
var customSongsInput = dom("custom-songs-input");

var cocktailHourAddedTimeSlider = dom("cocktail-hour-added-time-slider");
var cocktailHourAddedTimeInput = dom("cocktail-hour-added-time-input");

var dinnerAddedTimeSlider = dom("dinner-added-time-slider");
var dinnerAddedTimeInput = dom("dinner-added-time-input");

var hornsSlider = dom("horns-slider");
var hornsInput = dom("horns-input");

var djAddedTimeSlider = dom("dj-added-time-slider");
var djAddedTimeInput = dom("dj-added-time-input");

var djLiveDancesSlider = dom("dj-live-dances-slider");
var djLiveDancesInput = dom("dj-live-dances-input");

var bandAddedPlayersSlider = dom("band-added-players-slider");
var bandAddedPlayersInput = dom("band-added-players-input");

var bandAddedTimeSlider = dom("band-added-time-slider");
var bandAddedTimeInput = dom("band-added-time-input");

var silentDiscoSlider = dom("silent-disco-slider");
var silentDiscoInput = dom("silent-disco-input");


//SUMMARY SECTIONS
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

//ceremony
var ceremony = dom("ceremony");

var ceremonyTotalLineItem = dom("ceremony-total-line-item");
var ceremonyTotalSelectionDisplay = dom("ceremony-total-selection-display");
var ceremonyTotalCostDisplay = dom("ceremony-total-cost-display");

var ceremonySound = dom("ceremony-sound");
var ceremonySoundLineItem = dom("ceremony-sound-line-item");
var ceremonySoundSelectionDisplay = dom("ceremony-sound-selection-display");
var ceremonySoundCostDisplay = dom("ceremony-sound-cost-display");

var remotePower = dom("remote-power");
var remotePowerLineItem = dom("remote-power-line-item");
var remotePowerSelectionDisplay = dom("remote-power-selection-display");
var remotePowerCostDisplay = dom("remote-power-cost-display");

var customSongs = dom("custom-songs");
var customSongsLineItem = dom("custom-songs-line-item");
var customSongsSelectionDisplay = dom("custom-songs-selection-display");
var customSongsCostDisplay = dom("custom-songs-cost-display");

var beachCeremony = dom("beach-ceremony");
var beachCeremonyLineItem = dom("beach-ceremony-line-item");
var beachCeremonySelectionDisplay = dom("beach-ceremony-selection-display");
var beachCeremonyCostDisplay = dom("beach-ceremony-cost-display");

//cocktail hour
var cocktailHour = dom("cocktail-hour");

var cocktailHourTotalLineItem = dom("cocktail-hour-total-line-item");
var cocktailHourTotalSelectionDisplay = dom("cocktail-hour-total-selection-display");
var cocktailHourTotalCostDisplay = dom("cocktail-hour-total-cost-display");

var trio = dom("trio");
var trioLineItem = dom("trio-line-item");
var trioSelectionDisplay = dom("trio-selection-display");
var trioCostDisplay = dom("trio-cost-display");

var fullBand = dom("full-band");
var fullBandLineItem = dom("full-band-line-item");
var fullBandSelectionDisplay = dom("full-band-selection-display");
var fullBandCostDisplay = dom("full-band-cost-display");

var cocktailHourAddedTime = dom("cocktail-hour-added-time");
var cocktailHourAddedTimeLineItem = dom("cocktail-hour-added-time-line-item");
var cocktailHourAddedTimeSelectionDisplay = dom("cocktail-hour-added-time-selection-display");
var cocktailHourAddedTimeCostDisplay = dom("cocktail-hour-added-time-cost-display");

//dinner
var dinner = dom("dinner");

var dinnerTotalLineItem = dom("dinner-total-line-item");
var dinnerTotalSelectionDisplay = dom("dinner-total-selection-display");
var dinnerTotalCostDisplay = dom("dinner-total-cost-display");

var playlist = dom("playlist");
var playlistLineItem = dom("playlist-line-item");
var playlistSelectionDisplay = dom("playlist-selection-display");
var playlistCostDisplay = dom("playlist-cost-display");

var jazzTrio = dom("jazz-trio");
var jazzTrioLineItem = dom("jazz-trio-line-item");
var jazzTrioSelectionDisplay = dom("jazz-trio-selection-display");
var jazzTrioCostDisplay = dom("jazz-trio-cost-display");

var liveVinyl = dom("live-vinyl");
var liveVinylLineItem = dom("live-vinyl-line-item");
var liveVinylSelectionDisplay = dom("live-vinyl-selection-display");
var liveVinylCostDisplay = dom("live-vinyl-cost-display");

var dinnerAddedTime = dom("dinner-added-time");
var dinnerAddedTimeLineItem = dom("dinner-added-time-line-item");
var dinnerAddedTimeSelectionDisplay = dom("dinner-added-time-selection-display");
var dinnerAddedTimeCostDisplay = dom("dinner-added-time-cost-display");

//DJ
var dj = dom("dj");

var djTotalLineItem = dom("dj-total-line-item");
var djTotalSelectionDisplay = dom("dj-total-selection-display");
var djTotalCostDisplay = dom("dj-total-cost-display");

var horns = dom("horns");
var hornsLineItem = dom("horns-line-item");
var hornsSelectionDisplay = dom("horns-selection-display");
var hornsCostDisplay = dom("horns-cost-display");

var percussion = dom("percussion");
var percussionLineItem = dom("percussion-line-item");
var percussionSelectionDisplay = dom("percussion-selection-display");
var percussionCostDisplay = dom("percussion-cost-display");

var electricGuitar = dom("electric-guitar");
var electricGuitarLineItem = dom("electric-guitar-line-item");
var electricGuitarSelectionDisplay = dom("electric-guitar-selection-display");
var electricGuitarCostDisplay = dom("electric-guitar-cost-display");

var djAddedTime = dom("dj-added-time");
var djAddedTimeLineItem = dom("dj-added-time-line-item");
var djAddedTimeSelectionDisplay = dom("dj-added-time-selection-display");
var djAddedTimeCostDisplay = dom("dj-added-time-cost-display");

var djLiveDances = dom("dj-live-dances");
var djLiveDancesLineItem = dom("dj-live-dances-line-item");
var djLiveDancesSelectionDisplay = dom("dj-live-dances-selection-display");
var djLiveDancesCostDisplay = dom("dj-live-dances-cost-display");

//dance band
var band = dom("band");

var bandTotalLineItem = dom("band-total-line-item");
var bandTotalSelectionDisplay = dom("band-total-selection-display");
var bandTotalCostDisplay = dom("band-total-cost-display");

var saxophone = dom("saxophone");
var saxophoneLineItem = dom("saxophone-line-item");
var saxophoneSelectionDisplay = dom("saxophone-selection-display");
var saxophoneCostDisplay = dom("saxophone-cost-display");

var bandAddedPlayers = dom("band-added-players");
var bandAddedPlayersLineItem = dom("band-added-players-line-item");
var bandAddedPlayersSelectionDisplay = dom("band-added-players-selection-display");
var bandAddedPlayersCostDisplay = dom("band-added-players-cost-display");

var bandAddedTime = dom("band-added-time");
var bandAddedTimeLineItem = dom("band-added-time-line-item");
var bandAddedTimeSelectionDisplay = dom("band-added-time-selection-display");
var bandAddedTimeCostDisplay = dom("band-added-time-cost-display");

var bandLiveDances = dom("band-live-dances");
var bandLiveDancesLineItem = dom("band-live-dances-line-item");
var bandLiveDancesSelectionDisplay = dom("band-live-dances-selection-display");
var bandLiveDancesCostDisplay = dom("band-live-dances-cost-display");

//silent disco
var silentDisco = dom("silent-disco");

var silentDiscoTotalLineItem = dom("silent-disco-total-line-item");
var silentDiscoTotalSelectionDisplay = dom("silent-disco-total-selection-display");
var silentDiscoTotalCostDisplay = dom("silent-disco-total-cost-display");

//totals
var totalCostDisplay = dom("total-cost-display");
var totalCostInput = dom("total-cost-input");

var depositDisplay = dom("deposit-display");
var depositInput = dom("deposit-input");

//set defaults
//inputs
guestsInput.value = guestsSlider.value = 0;
customSongsInput.value = customSongsSlider.value = 0;
cocktailHourAddedTimeInput.value = cocktailHourAddedTimeSlider.value = 0;
dinnerAddedTimeInput.value = dinnerAddedTimeSlider.value = 0;
hornsInput.value = hornsSlider.value = 0;
djAddedTimeInput.value = djAddedTimeSlider.value = 0;
djLiveDancesInput.value = djLiveDancesSlider.value = 0;
bandAddedPlayersInput.value = bandAddedPlayersSlider.value = 0;
bandAddedTimeInput.value = bandAddedTimeSlider.value = 0;
silentDiscoInput.value = silentDiscoSlider.value = 0;

//total details
totalCostDisplay.innerHTML = "$0" 
depositDisplay.innerHTML = "$0";
