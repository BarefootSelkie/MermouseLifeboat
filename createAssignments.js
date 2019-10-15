console.log("fnord")
const fs = require('fs');
const csv = require('csv-parser');

var stations = [];
var fleet = [];
var assignments = [];

function merge()
{
  stations.forEach((station) => {
    fleet.forEach((vessel) => {

      if (vessel.Current_Location && Math.abs(station.Lat_Dec_De - vessel.Current_Lat) < 0.001)
      {
        console.log("Found " + vessel.Equipment_Name + " (" + vessel.Current_Location + ") at " + station.Station);
        assignments.push({"SAP_ID": station.SAP_ID, "Equipment_ID": vessel.Equipment_ID});
      }
    });
  });

  write();

}

// Write CSV files
function write()
{
  fs.writeFile('assignments.json', JSON.stringify(assignments), 'utf8', () => { console.log("Done")});
}

// Load in both CSV files and call merge()
function init()
{
  fs.createReadStream('RNLI_Lifeboat_Station_Locations.csv')
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
      stations.push(row);
    })
    .on('end', () => {
      console.log('Stations parsed');

      fs.createReadStream('RNLI_Lifeboat_Fleet.csv')
        .pipe(csv())
        .on('data', (row) => {
          console.log(row);
          fleet.push(row);
        })
        .on('end', () => {
          console.log('Fleet parsed');
          merge();
        });
    });
}

init();

