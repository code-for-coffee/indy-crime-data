var lats=[];
var longs=[];
var map;
var markers=[];

$(document).ready(function(){
  console.log('hello fuckboizi');
  $.ajax({
    url:'https://data.indy.gov/datasets/5c8a9412cf454753bc774d31d8505b50_12.geojson',
    type:'get',
    success:function(data){
      //var date = new Date;
      // $('#endDate').val(parseDateString(date))
      console.log(data);
      var tumble = data.features[1].properties.ADDRESS+' Indianapolis, IN'
      console.log(tumble);
      //fillCrimeSelector('#type','primary_type',data);
      //getIUCR($('#type').val());
      //for(var crime in data){
      //  if(data[crime].primary_type==$('option:selected').val()){
      //    addMarker(data[crime]);
      // };//end of if statment
      //}//end of for in loop
      /////////////////////////change event listener
      $('#type').change(function(){
        $('#description').empty();
        removeMarkers(markers);
        redrawMap();
        getIUCR($('#type').val());
      });

      $('#description').change(function(){
        removeMarkers(markers);
        redrawMap();
      });

      $('#startDate').change(function(){
        removeMarkers(markers);
        redrawMap();
      });

      $('#endDate').change(function(){
        removeMarkers(markers);
        redrawMap();
      });

    },
    error:function(err){
      console.log(err);
    }
  });
  addTheMarkers();
});

var mapcoords= {
  "loc1" : [{
    "latitude": 39.80936,
    "longitude": -86.15047,
    "crime": "AGGRIVATED ASSAULT-GUN"
  }, {
    "latitude": 39.77001,
    "longitude": -86.26499,
    "crime": "AGGRIVATED ASSAULT-GUN"
  }, {
    "latitude": 39.77446,
    "longitude": -86.12026,
    "crime": "AGGRIVATED ASSAULT-GUN"
  }, {
    "latitude": 39.77235,
    "longitude": -86.13031,
    "crime": "AGGRIVATED ASSAULT-GUN"
  }, {
    "latitude": 39.74383,
    "longitude": -86.14706,
    "crime": "AGGRIVATED ASSAULT-GUN"
  }]
}
function addMarker (data){
  var marker = new google.maps.Marker({
    position: data,
    map: map,
    icon:'http://megaicons.net/static/img/icons_sizes/15/534/32/map-marker-ball-left-pink-icon.png',
    animation:google.maps.Animation.DROP
  });// end of marker constructor
  markers.push(marker);
}
function addTheMarkers(){
  console.log('hit');
  var jsonDP = JSON.parse(mapcoords);
  for (var i = 0; i < mapcoords.length; i++) {
    console.log(i+ 'hello');
    var lati = jsonDP.loc1[i].latitude;
    var lng = jsonDP.loc1[i].longitude;
    var crime = {lat: lati, lng: lng};
    addMarker(crime);
  };
}
