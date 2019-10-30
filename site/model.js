// Raw data from RNLI https://data-rnli.opendata.arcgis.com/
var lifeboatStationLocations = [];
var lifeboatFleet = [];

// Generated data
var lifeboatAssignments = [];
var lifeboatClasses = [];

// Data about stations (e.g. notes, visit information, etc)
var visitedStations = [];

// Wrapper function to make promises work better with jquery
function load(path, destination) {
  return new Promise(function(resolve, reject) {
    $.getJSON(path,(data) => {
      data.forEach((item) => destination.push(item))
    }).done(resolve).fail(reject);
  });
}

// Load in JSON data from files
function loadData(nextFunction) {
  return new Promise((resolve, reject) => {
    Promise.all([
      load("json/RNLI_Lifeboat_Station_Locations.json", lifeboatStationLocations),
      load("json/visited_stations.json", visitedStations),
      load("json/RNLI_Lifeboat_Fleet.json", lifeboatFleet),
      load("json/Generated_Lifeboat_Assignments.json", lifeboatAssignments),
      load("json/Generated_Lifeboat_Classes.json", lifeboatClasses)
    ])
    .then(resolve);
  });
}