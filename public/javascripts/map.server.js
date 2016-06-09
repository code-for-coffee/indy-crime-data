// var lats=[];
// var longs=[];
// var map;
// var markers=[];

$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', initialize());

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
  var map = new google.maps.Map(document.getElementById('googleMap'), examplePoint, console.log('hit in map var'));
  var geocoder = new google.maps.Geocoder();
  // var marker = new google.maps.Marker({
  //   position: myLatLng,
  //   title: titleData.title + titleData.desc
  // })
  // marker.addListener('click', function(){
  //   infowindow.open(map, marker);
  // })

  //marker.setMap(map);
  $.ajax({
    url:'http://data.indy.gov/datasets/5c8a9412cf454753bc774d31d8505b50_12.geojson',
    type:'get',
    success:function(data){
      console.log(data);
      let indy = " INDIANAPOLIS, IN";
      //~~~~~~~~~~~~~~~~~~~~~~~~~
      //~~~~~~~~GOOD CODE~~~~~~~~
      //=======DONT DELETE=======
      //~~~~~~~~GOOD CODE~~~~~~~~
      //~~~~~~~~~~~~~~~~~~~~~~~~~
      for (var i = 0; i < 11; i ++){
        // console.log(data.features[i].properties.ADDRESS + indy);
        // console.log('hit em: ' + i);
        var crimeString = data.features[i].properties.CRIME;
        var markerColor = crimeType(crimeString);
        geocoder.geocode({'address': data.features[i].properties.ADDRESS + indy}, function(results, status){
          if(status === google.maps.GeocoderStatus.OK){
            console.log(data + "::::" + results);
              addMarker(data, results, markerColor, crimeString);
          }else{
            console.log(status + ':::' + results);
          }
        })
      }
      //~~~~~~~~~~~~~~~~~~~~~~~~~
      //~~~~~~~~GOOD CODE~~~~~~~~
      //=======end of good=======
      //~~~~~~~~GOOD CODE~~~~~~~~
      //~~~~~~~~~~~~~~~~~~~~~~~~~
    },
    error:function(err){
      console.log(err);
    }
  });


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
  function addMarker(data, LatLng, markerColorl, crimeString){
    //console.log(LatLng[0].geometry.location.lat()+''+LatLng[0].geometry.location.lng());
    var aLat = LatLng[0].geometry.location.lat();
    var aLng = LatLng[0].geometry.location.lng();
    var objLatLng = {
      lat: aLat,
      lng: aLng
    }
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+avar+'</h1>'+
        '<div id="bodyContent">'+
        '<p><b>BINGBONG</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
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
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
      var marker = new google.maps.Marker({
      position: objLatLng,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/' + markerColor,
      title: crimeString,
      animation: google.maps.Animation.DROP
    });
    marker.addListener('click', function(){
      infowindow.open(map, marker);
    })
  }
});
