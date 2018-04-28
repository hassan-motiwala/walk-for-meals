var addresses;
var index = 0;

function getData() {
	const req = new XMLHttpRequest;

	req.open('GET', '/restaurants/location');

	//On Load
	req.addEventListener('load', function() {
		addresses = JSON.parse(req.responseText);
 		initMap();
	});

	//If error
	req.addEventListener('error', function() {
		console.log(req.status, "ERROR");
	});

	req.send();
}


function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: {lat: 40.7831, lng: -73.9712}
	});

	var geocoder = new google.maps.Geocoder();
	geocodeAddress(geocoder, map);
}


function geocodeAddress(geocoder, resultsMap) {

	while(index <= addresses.length-1) {	
		let location = addresses[index].address;
		let restaurantName = addresses[index].restaurantName;

		geocoder.geocode({'address': location}, function(results, status) {
		  	if (status === 'OK') {    
		    	resultsMap.setCenter(results[0].geometry.location);

		    	var marker = new google.maps.Marker({
		      		map: resultsMap,
		    	  	position: results[0].geometry.location
		    	});

		    	//Info Window
				let infoWindow = new google.maps.InfoWindow({
					content: restaurantName
				});

				//Restaurant Info
				marker.addListener('click', function(){
					infoWindow.open(resultsMap, marker);
				});

		  	}
		});
		index++;
	}
}