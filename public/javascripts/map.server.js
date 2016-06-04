var lats=[];
var longs=[];
var map;
var markers=[];

$(document).ready(function(){
  console.log('hello fuckboizi');
  $.ajax({
    url:'http://data.indy.gov/datasets/5c8a9412cf454753bc774d31d8505b50_12.geojson',
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
});
// console.log(data.features[1].properties);
//
// function addMarker(data){
//   var marker = new google.maps.Marker({
//     position: {lat: data.features.properties.X_COORD}
//   })
// function addMarker (data){
//   var marker = new google.maps.Marker({
//   position: {lat:parseFloat(data.latitude),lng:parseFloat(data.longitude)},
//   map: map,
//   icon:'http://megaicons.net/static/img/icons_sizes/15/534/32/map-marker-ball-left-pink-icon.png',
//   title: data.primary_type+' ---- '+data.description+' ---- '+data.date,
//   animation:google.maps.Animation.DROP
// });// end of marker constructor
//     markers.push(marker);
//   }
// }
