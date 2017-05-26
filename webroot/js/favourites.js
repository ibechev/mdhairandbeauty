$(document).ready(function() {

	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}

	$('#favourites').mouseup(function() {
		
		var box = $('#favourites');
		var recipe_id = $.urlParam('id'); 

		if (recipe_id != null) {
			$.get('backend_favourites.php', {recipe_id: recipe_id}).done(function(data) {

			box.html(data);
			})
		} else {
			window.location = '404.php';
		}
		

	});

})