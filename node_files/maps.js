var app = angular.module('app', ['uiSlider']);
 
/*
- need to know range of dates for the scroller
- this could mean we get the full list of timestamps
- all we do on user updates is hide the old marker, show the new one, set the content to the time
*/

function Slidey($scope){
  $scope.locs = [
    {loc: "ceid", time: "Dec 2, 5PM"},
    {loc: "oc", time: "Dec 3, 5PM"},
    {loc: "ceid", time: "Dec 4, 5PM"},
    {loc: "oc", time: "Dec 5, 5PM"},
    {loc: "woolsey", time: "Dec 6, 5PM"},
    {loc: "ceid", time: "Dec 7, 5PM"},
    {loc: "ceid", time: "Dec 8, 5PM"},
    {loc: "woolsey", time: "Dec 9, 5PM"},
    {loc: "oc", time: "Dec 10, 5PM"},
    {loc: "ceid", time: "Dec 10, 6PM"},
    {loc: "oc", time: "Dec 10, 7PM"},
    {loc: "ceid", time: "Dec 10, 8PM"},
    {loc: "woolsey", time: "Dec 10, 9PM"},
    {loc: "ceid", time: "Dec 10, 10PM"},
    {loc: "ceid", time: "Dec 10, 11PM"}
  ];
  $scope.timeidx = $scope.locs.length - 1;

  function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(41.3111, -72.9267),
        zoom: 17 
    };
    $scope.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var infowindow = new google.maps.InfoWindow({});
    
    $scope.ceid = new google.maps.Marker({
        position: new google.maps.LatLng(41.312508, -72.925242),
        title:"CEID"
    }); 

    $scope.woolsey = new google.maps.Marker({
        position: new google.maps.LatLng(41.311823, -72.926014),
        title:"Woolsey Hall"
    });

    $scope.oc = new google.maps.Marker({
        position: new google.maps.LatLng(41.308894, -72.928706),
        title:"Old Campus"
    });

    google.maps.event.addListener($scope.woolsey, 'click', function() {
      infowindow.setContent('You were in Woolsey Hall at ' + $scope.locs[$scope.timeidx].time);
      infowindow.open($scope.map, $scope.woolsey);
    });

    google.maps.event.addListener($scope.ceid, 'click', function() {
      infowindow.setContent('You were in the CEID at ' + $scope.locs[$scope.timeidx].time);
      infowindow.open($scope.map, $scope.ceid);
    });

    google.maps.event.addListener($scope.oc, 'click', function() {
      infowindow.setContent('You were on Old Campus at ' + $scope.locs[$scope.timeidx].time);
      infowindow.open($scope.map, $scope.oc);
    });

  }
  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.updateMarkers = function() {
    var info = $scope.locs[$scope.timeidx];
    if ($scope[info.loc]) {
      if ($scope.prev) $scope.prev.setMap(null);
      $scope[info.loc].setMap($scope.map);    
      $scope.prev = $scope[info.loc];
    }
  }
}
