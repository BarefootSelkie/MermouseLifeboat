function makeStationViewModel(stationID) {

  // Get information about this location
  var stationLocation = lifeboatStationLocations.filter((i) => i.SAP_ID == stationID)[0];

  // Get information about which vessels are assigned to this station
  var vessels = lifeboatAssignments
    .filter((assignment) => assignment.SAP_ID == stationID)
    .map((assignment) => lifeboatFleet.filter((vessel) => vessel.Equipment_ID == assignment.Equipment_ID)[0])
    .map(makeVesselViewModel);

  // Get information about any visits we have made to this station
  var visitInformation = visitedStations.some((i) => i.SAP_ID == stationID)
    ? visitedStations.filter((i) => i.SAP_ID == stationID)[0]
    : null;

  var visits = visitInformation ? visitInformation.Visits.map(makeVisitViewModel).sort(sortByDate) : [];

  return {
    id: stationID,
    name: stationLocation.Station,
    URL: stationLocation.URL,
    map: "http://maps.apple.com/?ll=" + stationLocation.Y + "," + stationLocation.X,
    vessels: vessels,
    summary: visitInformation ? visitInformation.Summary : null,
    visited: visitInformation && visitInformation.Visits.length > 0,
    status: visitInformation ? !visitInformation.Revisit ? '💚' : '🔶' : '🔴',
    pin: visitInformation ? pinBadges[visitInformation.Pin] : '',
    visits: visits,
    lastVisit: visits.length > 0 ? visits[0] : null,
    date: visits.length > 0 ? visits[0].date : "",
  };
}

function makeVesselViewModel(vessel) {
  var classData = lifeboatClasses.filter((classData) => {
    if (vessel.Class == "B-Class") {
      return classData.Class == vessel.Class && classData.Variant == vessel.Launch_Method
    }
    else {
      return classData.Class == vessel.Class;
    }
  })[0];

  if (!classData) {
    return null;
  }

  return {
    id: vessel.Equipment_ID,
    name: vessel.Equipment_Name
      .replace(vessel.ON_Number, "")
      .replace(vessel.Class, "")
      .replace("ILB", "")
      .replace("IRB", "")
      .replace("ALB", "")
      .replace("IRH", "")
      .replace("A85", "")
      .replace("A75", ""),
    lifeboatClass: classData.Name,
    lifeboatNumber: vessel.Lifeboat_Number,
    classRNLIpage: classData.RNLI_Web,
    MMSI: vessel.MMSI
  };
}

function makeVisitViewModel(visit) {
  return {
    date: visit.Date,
    notes: visit.Notes
  }
}