// wait until the DOM has loaded.
$('document').ready(function(){
	// console.log("test");
//all API calls go to this link
	const apiBaseUrl = 'http://api.themoviedb.org/3';
// all images use this link
	const imageBaseUrl = 'http://image.tmdb.org/t/p/';

	const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey
	// console.log(nowPlayingUrl);
// ********make ajax request to the nowPlayingUrl****
	$.getJSON(nowPlayingUrl,(nowPlayingData)=>{ // on load
		// console.log(nowPlayingData);
		var nowPlayingHTML= getHTML(nowPlayingData);
		$('#movie-grid').html(nowPlayingHTML);
		$('.movie-poster').click(function(){

			var thisMovieId = $(this).attr('movie-id');
			console.log(thisMovieId);
			var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
			$.getJSON(thisMovieUrl,(thisMovieData)=>{
				console.log(thisMovieData);
				$('#myModalLabel').html(thisMovieData.title);
				// Open teh modal
				$("#myModal").modal();
			});
		});
});
		
	$('#movie-form').submit((event)=>{ // want to use an event listener on your form
		console.log("gadgds")
		//Don't submit Form, JS will handle
		event.preventDefault();
		var userInput = $('#search-input').val(); // only inputs have values!
		$('search-input').val(''); // will set code back to nothing ( after you insert something)
		var safeUserInput = encodeURI(userInput);
		var searchUrl = apiBaseUrl + '/search/movie?query='+ safeUserInput + '&api_key=' + apiKey;
		console.log(searchUrl);


		//the code below will only happen if they submit the form
		$.getJSON(searchUrl,(searchMovieData)=>{
			var searchMovieHTML = getHTML(searchMovieData); // updating the DOM/ utility function
			$('#movie-grid').html(searchMovieHTML); 
		});
	});
		function getHTML(nowPlayingData){// change
			var nowPlayingHTML= ' ';
			//loop for all json data retrieved from request.
			for(let i = 0; i < nowPlayingData.results.length; i++){
				var posterURL = imageBaseUrl + 'w300'+ nowPlayingData.results[i].poster_path;
				nowPlayingHTML += '<div class="col-sm-6 col-md-3">';
					nowPlayingHTML += `<img src="${posterURL}">`;
				nowPlayingHTML += `</div>`;
			}
			return nowPlayingHTML
		}


	// $('#dropdown-menu').on('show.bs.dropdown',()=>{

	// 	apiBaseUrl = []
	// 	suspense[];
	// 	for(let i = 0; i < nowPlayingData.results.length;i++){
	// 		if()
	// 	}

	// });
});
