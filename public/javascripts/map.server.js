// var lats=[];
// var longs=[];
// var map;
// var markers=[];

$(document).ready(function(){

  // var mapcoords= {
  //   "loc1" : [{
  //     "latitude": 39.80936,
  //     "longitude": -86.15047,
  //     "crime": "AGGRIVATED ASSAULT-GUN"
  //   }, {
  //     "latitude": 39.77001,
  //     "longitude": -86.26499,
  //     "crime": "AGGRIVATED ASSAULT-GUN"
  //   }, {
  //     "latitude": 39.77446,
  //     "longitude": -86.12026,
  //     "crime": "AGGRIVATED ASSAULT-GUN"
  //   }, {
  //     "latitude": 39.77235,
  //     "longitude": -86.13031,
  //     "crime": "AGGRIVATED ASSAULT-GUN"
  //   }, {
  //     "latitude": 39.74383,
  //     "longitude": -86.14706,
  //     "crime": "AGGRIVATED ASSAULT-GUN"
  //   }]
  // }
  // console.log(mapcoords.loc1.length);
  // function addMarker (lati, longi){
  //   var marker = new google.maps.Marker({
  //     position: {lat: lati, lng: longi},
  //     map: map,
  //     title: "AGGRIVATED ASSAULT-GUN",
  //     icon:'http://megaicons.net/static/img/icons_sizes/15/534/32/map-marker-ball-left-pink-icon.png',
  //     animation:google.maps.Animation.DROP
  //   });// end of marker constructor
  //   console.log(marker.position);
  // }
  // function letsLoop(){
  //   var loarr = ['1one','2two','3three'];
  //
  //   for(var i=0; i < loarr.length; i++){
  //     console.log(loarr[i]);
  //   }
  // }
  // letsLoop();
  //~~~~~~~~~~~~~~~~~~~
  var myLatLng = new google.maps.LatLng( 39.74383, -86.14706);

  var examplePoint ={
    zoom: 11,
    center: myLatLng
  }
  var titleData = {
    title: 'we did it again',
    desc: 'some more data here'
  }
  var map = new google.maps.Map(document.getElementById('googleMap'), examplePoint, console.log('hit in map var'));

  var marker = new google.maps.Marker({
    position: myLatLng,
    title: titleData.title + titleData.desc
  })

  marker.setMap(map);
  $.ajax({
    url:'http://data.indy.gov/datasets/5c8a9412cf454753bc774d31d8505b50_12.geojson',
    type:'get',
    success:function(data){
      console.log(data);
      var tumble = data.features[1].properties.ADDRESS+' Indianapolis, IN'
      console.log(tumble);
      for (var i = 0; i < data.features.length; i ++){
        console.log(data.features[i]);
        console.log('hit em: ' + i);
      }
      //for(var crime in data){
      //  if(data[crime].primary_type==$('option:selected').val()){
      //    addMarker(data[crime]);
      // };//end of if statment
      //}//end of for in loop
      /////////////////////////change event listener
    },
    error:function(err){
      console.log(err);
    }
  });
});

//~~~~~~~~~~~~~~~~~~~
//   function addTheMarkers(){
//     console.log('hit');
//     for (var i = 0; i < mapcoords.loc1.length; i++) {
//       var lati = mapcoords.loc1[i].latitude;
//       var longi = mapcoords.loc1[i].longitude;
//       console.log(lati + ' ::::  '+ longi);
//       addMarker(lati, longi);
//     };
//   }
//   addTheMarkers();
// });

// var mapcoords= {
//   "loc1" : [{
//     "latitude": 39.80936,
//     "longitude": -86.15047,
//     "crime": "AGGRIVATED ASSAULT-GUN"
//   }, {
//     "latitude": 39.77001,
//     "longitude": -86.26499,
//     "crime": "AGGRIVATED ASSAULT-GUN"
//   }, {
//     "latitude": 39.77446,
//     "longitude": -86.12026,
//     "crime": "AGGRIVATED ASSAULT-GUN"
//   }, {
//     "latitude": 39.77235,
//     "longitude": -86.13031,
//     "crime": "AGGRIVATED ASSAULT-GUN"
//   }, {
//     "latitude": 39.74383,
//     "longitude": -86.14706,
//     "crime": "AGGRIVATED ASSAULT-GUN"
//   }]
// }
// function addMarker (lati, longi){
//   var marker = new google.maps.Marker({
//     position: {lat: lati, lng: longi},
//     map: map,
//     title: "AGGRIVATED ASSAULT-GUN",
//     icon:'http://megaicons.net/static/img/icons_sizes/15/534/32/map-marker-ball-left-pink-icon.png',
//     animation:google.maps.Animation.DROP
//   });// end of marker constructor
//   markers.push(marker);
// }
// function addTheMarkers(){
//   console.log('hit');
//   for (var i = 0; i < mapcoords.length; i++) {
//     console.log(i+ 'hello');
//     var lati = jsonDP.loc1[i].latitude;
//     var longi = jsonDP.loc1[i].longitude;
//     addMarker(lati, longi);
//   };
// }
