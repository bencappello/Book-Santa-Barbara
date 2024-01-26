const calendarID = "c_1883pm1dfe5o2ittjte4j7c5t2e5e@resource.calendar.google.com"

function dom(id) {
    return document.getElementById(id);
};

//Form Sections
var brettCoRequestForm = dom("brett-co-request-form");

//checkboxes
var ceremony = dom("ceremony");
var ceremonySound = dom("ceremony-sound");
var remotePower = dom("remote-power");
var customSongs = dom("custom-songs");
var beachCeremony = dom("beach-ceremony");
var cocktailHour = dom("cocktail-hour");
var trio = dom("trio");
var fullBand = dom("full-band");
var cocktailAddedTime = dom("cocktail-added-time");
var dinner = dom("dinner");
var playlist = dom("playlist");
var jazzTrio = dom("jazz-trio");
var liveVinyl = dom("live-vinyl");
var dinnerAddedTime = dom("dinner-added-time");
var djAndInstruments = dom("dj-and-instruments");
var horns = dom("horns");
var percussion = dom("percussion");
var electricGuitar = dom("electric-guitar");
var djAddedTime = dom("dj-added-time");
var djLiveDances = dom("dj-live-dances");
var danceBand = dom("dance-band");
var saxophone = dom("saxophone");
var bandAddedPlayers = dom("band-added-players");
var bandAddedTime = dom("band-added-time");
var silentDisco = dom("silent-disco");


var customSongsSlider = dom("custom-songs-slider");
var customSongsInput = dom("custom-songs-input");

var cocktailAddedTimeSlider = dom("cocktail-added-time-slider");
var cocktailAddedTimeInput = dom("cocktail-added-time-input");

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

var numberOfHeadphonesSlider = dom("number-of-headphones-slider");
var numberOfHeadphonesInput = dom("number-of-headphones-input");


//Summary Sections

//event info
var eventNameInput = dom("event-name-input");
var eventDateInput = dom("event-date-input");
var startTimeInput = dom("start-time-input");
var endTimeInput = dom("end-time-input");
var guestsSlider = dom("guests-slider");
var guestsInput = dom("guest-count-input");

//ceremony
var ceremony = dom("ceremony");
var ceremonyLineItem = dom("ceremony-line-item");
var ceremonySelectionDisplay = dom("ceremony-selection-display");
var ceremonyCostDisplay = dom("ceremony-cost-display");

var ceremonySound = dom("ceremony-sound");
var ceremonySoundLineItem = dom("ceremony-sound-line-item");
var ceremonySoundSelectionDisplay = dom("ceremony-sound-selection-display");
var ceremonySoundCostDisplay = dom("ceremony-sound-cost-display");

var customSongs = dom("custom-songs");
var customSongsLineItem = dom("custom-songs-line-item");
var customSongsSelectionDisplay = dom("custom-songs-selection-display");
var customSongsCostDisplay = dom("custom-songs-cost-display");
var customSongsInput = dom("custom-songs-input");
var customSongsSlider = dom("custom-songs-slider");

var beachCeremony = dom("beach-ceremony");
var beachCeremonyLineItem = dom("beach-ceremony-line-item");
var beachCeremonySelectionDisplay = dom("beach-ceremony-selection-display");
var beachCeremonyCostDisplay = dom("beach-ceremony-cost-display");

var ceremonyTotalLineItem = dom("ceremony-total-line-item");
var ceremonyTotalSelectionDisplay = dom("ceremony-total-selection-display");
var ceremonyTotalCostDisplay = dom("ceremony-total-cost-display");

//cocktail hour
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

var cocktailHourTotal = dom("cocktail-hour-total");
var cocktailHourTotalLineItem = dom("cocktail-hour-total-line-item");
var cocktailHourTotalSelectionDisplay = dom("cocktail-hour-total-selection-display");
var cocktailHourTotalCostDisplay = dom("cocktail-hour-total-cost-display");

//dinner
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

var dinnerTotal = dom("dinner-total");
var dinnerTotalLineItem = dom("dinner-total-line-item");
var dinnerTotalSelectionDisplay = dom("dinner-total-selection-display");
var dinnerTotalCostDisplay = dom("dinner-total-cost-display");

//DJ
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

var djTotal = dom("dj-total");
var djTotalLineItem = dom("dj-total-line-item");
var djTotalSelectionDisplay = dom("dj-total-selection-display");
var djTotalCostDisplay = dom("dj-total-cost-display");

//dance band
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

var bandTotal = dom("band-total");
var bandTotalLineItem = dom("band-total-line-item");
var bandTotalSelectionDisplay = dom("band-total-selection-display");
var bandTotalCostDisplay = dom("band-total-cost-display");

//silent disco
var silentDiscoTotal = dom("silent-disco-total");
var silentDiscoTotalLineItem = dom("silent-disco-total-line-item");
var silentDiscoTotalSelectionDisplay = dom("silent-disco-total-selection-display");
var silentDiscoTotalCostDisplay = dom("silent-disco-total-cost-display");

//totals
var totalCostDisplay = dom("total-cost-display");
var totalCostInput = dom("total-cost-input");

var depositDisplay = dom("deposit-display");
var depositInput = dom("deposit-input");

// //set defaults
// //inputs
// guestsSlider.value = 0;
// guestsInput.value = 0;
// barTimeSlider.value = 0;
// barTimeInput.value = 0;

// //event details
// eventNameDisplay.hidden = true;
// dateLineItem.style.display = 'none';
// startLineItem.style.display = 'none';
// endLineItem.style.display = 'none';
// guestsLineItem.style.display = 'none';
// barTimeLineItem.style.display = 'none';

// //cost details
// breadLineItem.style.display = 'none';
// oddsEndsLineItem.style.display = 'none';
// dinnerLineItem.style.display = 'none';
// stationAppetizersLineItem.style.display = 'none';
// passedSavoryAppetizersLineItem.style.display = 'none';
// passedDessertsLineItem.style.display = 'none';
// lunchCostLineItem.style.display = 'none';

// openBarCostLineItem.style.display = 'none';
// staffedBarCostLineItem.style.display = 'none';

// //total details
// totalCostDisplay.innerHTML = "$0" 
// depositDisplay.innerHTML = "$0";
