$.getJSON( {
    url  : 'https://maps.googleapis.com/maps/api/geocode/json',
    data : {
        sensor  : false,
        address : address
    },
    success : function( data, textStatus ) {
        console.log( textStatus, data );
    }
} );
