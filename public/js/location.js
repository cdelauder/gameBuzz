var placer = {
  getLocation: function(callback) {

    // navigator.geolocation ? navigator.geolocation.getCurrentPosition(this.showPosition) : console.log('This browser does not support geoLocation.')
    if (navigator.geolocation) {
      var response = navigator.geolocation.getCurrentPosition(this.showPosition)
      callback.call(User.username(), response)

      return 'working, please wait'
    } else {
      return 'failed'
    }
    return response
  },

  showPosition: function(position) {
    console.log({latitude: position.coords.latitude, longitude: position.coords.longitude})
    var userLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude}
    return userLocation
  },

  getDistanceInMiles: function(latitude1,longitude1,latitude2,longitude2) {
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
  },

  degreesToRadians: function(degrees) {
    return degrees * (Math.PI/180)
  },
}