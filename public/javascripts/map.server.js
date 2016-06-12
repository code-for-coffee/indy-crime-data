// var lats=[];
// var longs=[];
// var map;
// var markers=[];

$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', initialize());

  var myLatLng = new google.maps.LatLng( 39.74383, -86.14706);

  var centerPoint ={
    zoom: 11,
    center: myLatLng
  }
  var titleData = {
    title: 'we did it again',
    desc: 'some more data here'
  }
  var avar = "I'M PART OF THE FIRST HEADING";
  var map = new google.maps.Map(document.getElementById('googleMap'), centerPoint, console.log('hit in map var'));
  var geocoder = new google.maps.Geocoder();
  $.ajax({
    url:'http://data.indy.gov/datasets/5c8a9412cf454753bc774d31d8505b50_12.geojson',
    type:'get',
    success:function(data){
      var indy = " INDIANAPOLIS, IN";
      var putArr = [];
      console.log(data);
      // var NewMapData = new MapData(this.props.OBJECTID);
      // console.log(NewMapData.id);
      for (var i = 150; i < 161; i ++){
        (function(x){
          var props = data.features[i].properties;
          var beats = data.features[i].properties.ADDRESS;
          var crimeString = data.features[i].properties.CRIME;
          console.log(crimeString);
          var markerColor = crimeType(crimeString);
          putArr.push(props);
          // // console.log(putArr);
          geocoder.geocode({'address': props.ADDRESS + indy}, function(results, status){
            if(status === google.maps.GeocoderStatus.OK){
              addMarker(putArr, results, markerColor, crimeString, beats);
            }else{
              console.log(status + ':::' + results);
            }
          })
        })(i);
      }
    },
    error:function(err){
      console.log(err);
    }
  });

  function MapData(id, address, crime, caseNum, beat, time, ucr, date){
    this.id = id;
    this.address = address;
    this.crime = crime;
    this.caseNum = caseNum;
    this.beat = beat;
    this.time = function(){
      return time.getHours();
    };
    this.ucr = ucr;
    this.date = date;

  }
  // var localeMapData = new MapData()
  //More crimes need to be added
  function crimeType(crimeString) {
      if (crimeString.includes("ROBBERY")) {
        return markerColor = "red-dot.png";
      } else if (crimeString.includes("RAPE")) {
        return markerColor = "purple-dot.png";
      } else if (crimeString.includes("ASSAULT")) {
        return markerColor = "blue-dot.png";
      } else if (crimeString.includes("LARCENY")) {
        return markerColor = "green-dot.png"
      } else if (crimeString.includes("STOLEN VEHICLE")) {
        return markerColor = "orange-dot.png";
      } else {
        return markerColor = "yellow-dot.png"
      }

  }

  function initialize() {
    var mapInit = {
      center:new google.maps.LatLng(39.7684,-86.1581),
      zoom:11,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
  }
  // function createInfoWindow(marker, strContent){
  //   google.maps.event.addListener(marker, 'click', function () {
  //           infoWindow.setContent(strContent);
  //           infoWindow.open(map, this);
  //       });
  // }
  // function createInfoWindow(marker, popupContent) {
  //     var infowindow = new google.maps.InfoWindow({
  //       content: contentString
  //     });
  //    google.maps.event.addListener(marker, 'click', function () {
  //        infoWindow.setContent(contContent);
  //        infoWindow.open(map, this);
  //    });
  //  }
  function addMarker(data, LatLng, markerColor, crimeString, beat){
    //console.log(LatLng[0].geometry.location.lat()+''+LatLng[0].geometry.location.lng());
    var aLat = LatLng[0].geometry.location.lat();
    var aLng = LatLng[0].geometry.location.lng();
    var stuff = data.ADDRESS;
    var objLatLng = {
      lat: aLat,
      lng: aLng
    }
    this.beat = beat;
    // for(i=; i < data.length; i++){
    //   var crimeInfo = data[i];
    // }
    //for(i=0; i < data.length; i++){
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+objLatLng.lat+' '+objLatLng.lng+'</h1>'+
        '<div id="bodyContent">'+
        '<p><b>'+beat+'+</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>'+
        ': the address.</p>'+
        '</div>'+
        '</div>';
    var marker = new google.maps.Marker({
      position: objLatLng,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/' + markerColor,
      title: crimeString,
      animation: google.maps.Animation.DROP
    }).addListener('click', function(){
      infowindow.open(map, this);
      console.log(infowindow);
    });;
    var infowindow = new google.maps.InfoWindow({
          content: contentString
    });
    //}
  }
});
