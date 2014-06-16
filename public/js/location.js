function getLocation() {
  navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition) : console.log('This browser does not support geoLocation.')
}

function showPosition(position) {
  var userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude}
  console.log(userPosition)
  return userPosition
}

function getDistanceInMiles(latitude1,longitude1,latitude2,longitude2) {
  var earthRadius = 3963; // Radius of the earth in miles
  var dLatitude = degreesToRadians(latitude2-latitude1);  // degreesToRadians below
  var dLongitude = degreesToRadians(longitude2-longitude1);
  var a =
    Math.sin(dLatitude/2) * Math.sin(dLatitude/2) +
    Math.cos(degreesToRadians(latitude1)) * Math.cos(degreesToRadians(latitude2)) *
    Math.sin(dLongitude/2) * Math.sin(dLongitude/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var distanceInMiles = earthRadius * c; // Distance in miles
  return distanceInMiles;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI/180)
}