$(document).ready(function() {

	$(".search-box").keyup(function() {
		
		//get the input value
		var search_q = $(this).val();

		var s_box = $(this).siblings('.result');
 
		if(search_q.length) {
			
			if(1 == 1) {

				$.get('backend_search.php', {query: search_q}).done(function(data) {
					//display the returned data in browser
					s_box.html(data);
						
				})

			}

		} else {

			s_box.empty();

		}

	});

});