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
      for (var i = 8780; i < 8791; i ++){
        (function(){
          var cardData = {
            id: data.features[i].properties.OBJECTID,
            addr: data.features[i].properties.ADDRESS,
            beat: data.features[i].properties.BEAT,
            c4se: data.features[i].properties.CASE,
            crime: data.features[i].properties.CRIME,
            date: data.features[i].properties.DATE_,
            time: Date(data.features[i].properties.TIME)

          }
          var props = data.features[i].properties;
          var beats = data.features[i].properties.ADDRESS;
          var crimeString = data.features[i].properties.CRIME;
          console.log(crimeString);
          var markerColor = crimeType(crimeString);
          putArr.push(props);
          // // console.log(putArr);
          geocoder.geocode({'address': props.ADDRESS + indy}, function(results, status){
            if(status === google.maps.GeocoderStatus.OK){
              addMarker(putArr, results, markerColor, crimeString, cardData);
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
  //~~~~~~~~~~~~~~~~~~
  //~~~~~~~~~~~~~~~~~~
  //~~~~~~~~~~~~~~~~~~
  //this is the constructor for future map data logging
  // function MapData(id, address, crime, caseNum, beat, time, ucr, date){
  //   this.id = id;
  //   this.address = address;
  //   this.crime = crime;
  //   this.caseNum = caseNum;
  //   this.beat = beat;
  //   this.time = function(){
  //     return time.getHours();
  //   };
  //   this.ucr = ucr;
  //   this.date = date;
  //
  // }
  // var newMapData = new MapData('bing','111 hello st', 'assult')
  // console.log(newMapData);
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
      } else {
        return markerColor = "orange-dot.png";
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
  function addMarker(data, LatLng, markerColor, crimeString, cardData){
    //console.log(LatLng[0].geometry.location.lat()+''+LatLng[0].geometry.location.lng());
    var aLat = LatLng[0].geometry.location.lat();
    var aLng = LatLng[0].geometry.location.lng();
    var objLatLng = {
      lat: aLat,
      lng: aLng
    }
    this.cardData = cardData;
    var indy = ' Indianapolis, IN';
    cardData.addr = cardData.addr+indy;
    // for(i=; i < data.length; i++){
    //   var crimeInfo = data[i];
    // }
    //for(i=0; i < data.length; i++){
    var contentString =
    '<div id="pointWindow">'+
          '<div id="">'+
              '<ul class="crimeList">'+
                '<li class="crimeTitle">'+
                  '<h4>Crime</h4>'+
                  '<span class="cardDataStyle">'+cardData.crime+'</span>'+
                '</li>'+
                '<li class="leftPanel">'+
                  '<h2>Where</h2>'+
                  '<hr class="infoHr">'+
                  '<h4>Police Beat</h4>'+
                  '<span class="cardDataStyle">'+cardData.beat+'</span>'+
                  '<h4>Address</h4>'+
                  '<span class="cardDataStyle">'+cardData.addr+'</span>'+
                  '<h4>Police Beat</h4>'+
                  '<span class="cardDataStyle">'+cardData.beat+'</span>'+
                  '<small class="smallCDS">'+objLatLng.lat+'</small>'+
                '</li>'+
                '<li class="rightPanel">'+
                  '<h2>When</h2>'+
                  '<hr class="infoHr">'+
                  '<h4>Date | Time</h4>'+
                  '<span class="cardDataStyle">'+cardData.time+'</span>'+
                '</li>'+
              '</ul>'+
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
