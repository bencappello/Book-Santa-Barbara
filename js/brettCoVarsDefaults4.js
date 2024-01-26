const calendarID = "c_1883pm1dfe5o2ittjte4j7c5t2e5e@resource.calendar.google.com"

function dom(id) {
    return document.getElementById(id);
};

//Form Sections
var brettCoRequestForm = dom("brett-co-request-form");

//event info
var eventNameInput = dom("event-name-input");
var eventDateInput = dom("event-date-input");
var startTimeInput = dom("start-time-input");
var endTimeInput = dom("end-time-input");
var guestsSlider = dom("guests-slider");
var guestsInput = dom("guest-count-input");

//ceremony
var ceremony = dom("ceremony");
var ceremonyCostLineItem = dom("ceremony-line-item");
var ceremonySelectionDisplay = dom("ceremony-selection-display");
var ceremonyCostDisplay = dom("ceremony-cost-display");

var ceremonySound = dom("ceremony-sound");
var ceremonySoundCostLineItem = dom("ceremony-sound-line-item");
var ceremonySoundSelectionDisplay = dom("ceremony-sound-selection-display");
var ceremonySoundCostDisplay = dom("ceremony-sound-cost-display");

var customSongs = dom("custom-songs");
var customSongsCostLineItem = dom("custom-songs-line-item");
var customSongsSelectionDisplay = dom("custom-songs-selection-display");
var customSongsCostDisplay = dom("custom-songs-cost-display");
var numberCustomSongsInput = dom("number-custom-songs-input");
var numberCustomSongsSlider = dom("number-custom-songs-slider");

var beachCeremony = dom("beach-ceremony");
var beachCeremonyCostLineItem = dom("beach-ceremony-line-item");
var beachCeremonySelectionDisplay = dom("beach-ceremony-selection-display");
var beachCeremonyCostDisplay = dom("beach-ceremony-cost-display");

var ceremonyTotalCostLineItem = dom("ceremony-total-line-item");
var ceremonyTotalSelectionDisplay = dom("ceremony-total-selection-display");
var ceremonyTotalCostDisplay = dom("ceremony-total-cost-display");

//cocktail hour
var trio = dom("trio");
var trioCostLineItem = dom("trio-line-item");
var trioSelectionDisplay = dom("trio-selection-display");
var trioCostDisplay = dom("trio-cost-display");

var fullBand = dom("full-band");
var fullBandCostLineItem = dom("full-band-line-item");
var fullBandSelectionDisplay = dom("full-band-selection-display");
var fullBandCostDisplay = dom("full-band-cost-display");

var cocktailHourAddedTime = dom("cocktail-hour-added-time");
var cocktailHourAddedTimeCostLineItem = dom("cocktail-hour-added-time-line-item");
var cocktailHourAddedTimeSelectionDisplay = dom("cocktail-hour-added-time-selection-display");
var cocktailHourAddedTimeCostDisplay = dom("cocktail-hour-added-time-cost-display");

var cocktailHourTotal = dom("cocktail-hour-total");
var cocktailHourTotalCostLineItem = dom("cocktail-hour-total-line-item");
var cocktailHourTotalSelectionDisplay = dom("cocktail-hour-total-selection-display");
var cocktailHourTotalCostDisplay = dom("cocktail-hour-total-cost-display");

//dinner
var playlist = dom("playlist");
var playlistCostLineItem = dom("playlist-line-item");
var playlistSelectionDisplay = dom("playlist-selection-display");
var playlistCostDisplay = dom("playlist-cost-display");

var jazzTrio = dom("jazz-trio");
var jazzTrioCostLineItem = dom("jazz-trio-line-item");
var jazzTrioSelectionDisplay = dom("jazz-trio-selection-display");
var jazzTrioCostDisplay = dom("jazz-trio-cost-display");

var liveVinyl = dom("live-vinyl");
var liveVinylCostLineItem = dom("live-vinyl-line-item");
var liveVinylSelectionDisplay = dom("live-vinyl-selection-display");
var liveVinylCostDisplay = dom("live-vinyl-cost-display");

var dinnerAddedTime = dom("dinner-added-time");
var dinnerAddedTimeCostLineItem = dom("dinner-added-time-line-item");
var dinnerAddedTimeSelectionDisplay = dom("dinner-added-time-selection-display");
var dinnerAddedTimeCostDisplay = dom("dinner-added-time-cost-display");

var dinnerTotal = dom("dinner-total");
var dinnerTotalCostLineItem = dom("dinner-total-line-item");
var dinnerTotalSelectionDisplay = dom("dinner-total-selection-display");
var dinnerTotalCostDisplay = dom("dinner-total-cost-display");

//DJ
var horns = dom("horns");
var hornsCostLineItem = dom("horns-line-item");
var hornsSelectionDisplay = dom("horns-selection-display");
var hornsCostDisplay = dom("horns-cost-display");

var percussion = dom("percussion");
var percussionCostLineItem = dom("percussion-line-item");
var percussionSelectionDisplay = dom("percussion-selection-display");
var percussionCostDisplay = dom("percussion-cost-display");

var electricGuitar = dom("electric-guitar");
var electricGuitarCostLineItem = dom("electric-guitar-line-item");
var electricGuitarSelectionDisplay = dom("electric-guitar-selection-display");
var electricGuitarCostDisplay = dom("electric-guitar-cost-display");

var djAddedTime = dom("dj-added-time");
var djAddedTimeCostLineItem = dom("dj-added-time-line-item");
var djAddedTimeSelectionDisplay = dom("dj-added-time-selection-display");
var djAddedTimeCostDisplay = dom("dj-added-time-cost-display");

var djLiveDances = dom("dj-live-dances");
var djLiveDancesCostLineItem = dom("dj-live-dances-line-item");
var djLiveDancesSelectionDisplay = dom("dj-live-dances-selection-display");
var djLiveDancesCostDisplay = dom("dj-live-dances-cost-display");

var djTotal = dom("dj-total");
var djTotalCostLineItem = dom("dj-total-line-item");
var djTotalSelectionDisplay = dom("dj-total-selection-display");
var djTotalCostDisplay = dom("dj-total-cost-display");

//dance band
var saxophone = dom("saxophone");
var saxophoneCostLineItem = dom("saxophone-line-item");
var saxophoneSelectionDisplay = dom("saxophone-selection-display");
var saxophoneCostDisplay = dom("saxophone-cost-display");

var addedPlayers = dom("added-players");
var addedPlayersCostLineItem = dom("added-players-line-item");
var addedPlayersSelectionDisplay = dom("added-players-selection-display");
var addedPlayersCostDisplay = dom("added-players-cost-display");

var bandAddedTime = dom("band-added-time");
var bandAddedTimeCostLineItem = dom("band-added-time-line-item");
var bandAddedTimeSelectionDisplay = dom("band-added-time-selection-display");
var bandAddedTimeCostDisplay = dom("band-added-time-cost-display");

var bandLiveDances = dom("band-live-dances");
var bandLiveDancesCostLineItem = dom("band-live-dances-line-item");
var bandLiveDancesSelectionDisplay = dom("band-live-dances-selection-display");
var bandLiveDancesCostDisplay = dom("band-live-dances-cost-display");

var bandTotal = dom("band-total");
var bandTotalCostLineItem = dom("band-total-line-item");
var bandTotalSelectionDisplay = dom("band-total-selection-display");
var bandTotalCostDisplay = dom("band-total-cost-display");

//silent disco
var silentDiscoTotal = dom("silent-disco-total");
var silentDiscoTotalCostLineItem = dom("silent-disco-total-line-item");
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
// breadCostLineItem.style.display = 'none';
// oddsEndsCostLineItem.style.display = 'none';
// dinnerCostLineItem.style.display = 'none';
// stationAppetizersCostLineItem.style.display = 'none';
// passedSavoryAppetizersCostLineItem.style.display = 'none';
// passedDessertsCostLineItem.style.display = 'none';
// lunchCostLineItem.style.display = 'none';

// openBarCostLineItem.style.display = 'none';
// staffedBarCostLineItem.style.display = 'none';

// //total details
// totalCostDisplay.innerHTML = "$0" 
// depositDisplay.innerHTML = "$0";
