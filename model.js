// Raw data from RNLI https://data-rnli.opendata.arcgis.com/
var lifeboatStationLocations = [];
var lifeboatFleet = [];

// Generated data
var lifeboatAssignments = [];
var lifeboatClasses = [];

// Data about stations (e.g. notes, visit information, etc)
var visitedStations = [];

function loadData(nextFunction)
{
  $.getJSON("json/RNLI_Lifeboat_Station_Locations.json", function (data) {
    lifeboatStationLocations = data;
    $.getJSON("json/visited_stations.json", function (data) {
      visitedStations = data;
      $.getJSON("json/RNLI_Lifeboat_Fleet.json", function (data) {
        lifeboatFleet = data;
        $.getJSON("json/Generated_Lifeboat_Assignments.json", function (data) {
          lifeboatAssignments = data;
          $.getJSON("json/Generated_Lifeboat_Classes.json", function (data) {
            lifeboatClasses = data;
            nextFunction();
          });
        });
      });
    });
  });

}