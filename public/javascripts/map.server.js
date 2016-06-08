// var lats=[];
// var longs=[];
// var map;
// var markers=[];

$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', initialize());
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
  var avar = "I'M PART OF THE FIRST HEADING";
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+avar+'</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
  var map = new google.maps.Map(document.getElementById('googleMap'), examplePoint, console.log('hit in map var'));
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  var geocoder = new google.maps.Geocoder();
  var marker = new google.maps.Marker({
    position: myLatLng,
    title: titleData.title + titleData.desc
  })
  marker.addListener('click', function(){
    infowindow.open(map, marker);
  })

  marker.setMap(map);
  $.ajax({
    url:'http://data.indy.gov/datasets/5c8a9412cf454753bc774d31d8505b50_12.geojson',
    type:'get',
    success:function(data){
      console.log(data);
      let indy = " INDIANAPOLIS, IN";
      var tumble = data.features[1].properties.ADDRESS+' Indianapolis, IN'
      console.log(tumble);
      //~~~~~~~~~~~~~~~~~~~~~~~~~
      //~~~~~~~~GOOD CODE~~~~~~~~
      //=======DONT DELETE=======
      //~~~~~~~~GOOD CODE~~~~~~~~
      //~~~~~~~~~~~~~~~~~~~~~~~~~
      for (var i = 0; i < 25; i ++){
        console.log(data.features[i].properties.ADDRESS + indy);
        console.log('hit em: ' + i);
        geocoder.geocode({'address': data.features[i].properties.ADDRESS + indy}, function(results, status){
          if(status === google.maps.GeocoderStatus.OK){
              addMarker(data, results);
          }else{
            alert('error ):')
          }
        })
        //appending data clearly works w/ this code
        //$('nav').append('<span>'+data.features[i].properties.ADDRESS+ indy+ '</span>');
      }
      //~~~~~~~~~~~~~~~~~~~~~~~~~
      //~~~~~~~~GOOD CODE~~~~~~~~
      //=======end of good=======

      //~~~~~~~~GOOD CODE~~~~~~~~
      //~~~~~~~~~~~~~~~~~~~~~~~~~
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


  //More crimes need to be added
  function crimeType(crimeString) {
      if crimeString.contains("ROBBERY") {
        return "FE7569";
      } else if crimeString.contains("RAPE") {
        return "EED540";
      } else {
        return "FFFFFF";
      }

  }

  function initialize() {
    var mapInit = {
      center:new google.maps.LatLng(39.7684,-86.1581),
      zoom:11,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
  }
  function addMarker(data, LatLng){
    console.log(LatLng[0].geometry.location.lat()+''+LatLng[0].geometry.location.lng());
    var fmLatLng = "'"+ LatLng[0].geometry.location.lat()+','+LatLng[0].geometry.location.lng() + "'";
    var anLatLng = LatLng[0].geometry.location.lat()+''+LatLng[0].geometry.location.lng();
    var aLat = LatLng[0].geometry.location.lat();
    var aLng = LatLng[0].geometry.location.lng();
    var objLatLng = {
      lat: aLat,
      lng: aLng
    }
    //Needs to send actual crime from JSON
    var crimeString = "HELLO" //JSon call goes here
    var markerColor = crimeType(crimeString);
    var marker = new google.maps.Marker({
      position: objLatLng,
      map: map,
      animation: google.maps.Animation.DROP
    })
  }
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
