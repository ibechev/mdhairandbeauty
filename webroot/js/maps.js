function initMap() {
	var uluru = {lat: 39.544330, lng: 2.594696};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: uluru
	});

	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: uluru,
		label: 'MD Hair & Beauty Salon'
	});
}
