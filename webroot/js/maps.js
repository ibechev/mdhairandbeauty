var initMap = function() {
	var loc = {lat: 39.544330, lng: 2.594696};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: loc
	});

	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: loc,
		label: 'MD Hair & Beauty Salon'
	});
}
