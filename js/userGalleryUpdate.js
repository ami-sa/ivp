alert(url_api);

var url_event_domain = "http://localhost/aser/";

// api.com == "localhost/aser/others/learning/test_api/"; //
var url_api =  "http://localhost/aser/others/learning/test_api/"; // ToDo: Change accordingly.

var url_event_tool = url_event_domain + "login-sys/ers/attendize/public/e/";

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
{
	// It's a local server! Do nothing
}
else
{
	url_event_domain = "https://www.en3ticket.com/";

	url_api =  "www.en3ticket.com/api/"; 
	
	url_event_tool = url_event_domain + "ivp/public/e/";
}

	/*
	url_event_domain = "https://www.en3ticket.com/";

	url_api =  "https://www.en3ticket.com/api/"; 
	
	url_event_tool = "https://ivp.en3ticket.com/e/";
	
	*/
	


// *************************************************************** Gallery *************************************************	

	function procesGalleryImages(response, type)
	{
		
		
		if(response)
		{
			alert('xhr.responseText525252');
			var tmpCntr = 0;
			var len = Object.keys(response.message).length;
			
			var tmp;
												
			
			var tmpImages = '';
			for(tmp = 0; tmp<len; tmp++)
			{
				var name = response.message[tmp].name;
				var url = response.message[tmp].url;
				var type = response.message[tmp].type;
													
				
				if( ('gallery' === type) && (10 > tmpCntr) )
				{
					
					
					var img_element = '<img src="'+ url +'" alt="">';
					
					var a_element = '<a href="'+url+'" class="venobox" data-gall="gallery-carousel">'+img_element+'</a>';
					tmpImages = a_element + tmpImages;
					
															
					var section_main =     '<div class="container">\
						<div class="section-header">\
						  <h2>Gallery</h2>\
						  <p>Check our gallery from the recent events</p>\
						</div>\
					  </div>\
							<div class="owl-carousel gallery-carousel" id="gallery_pics">'
								+ tmpImages +
							'</div>';

					$('#gallery').html(section_main);
					
					
				}
				else if( ('venue' === type) && (7 > tmpCntr) )		// venue images
				{
					
					var venue_img = '\
									  <div class="col-lg-3 col-md-4">\
										<div class="venue-gallery">\
										  <a href="'+url+'" class="venobox" data-gall="venue-gallery">\
											<img src="'+url+'" alt="" class="img-fluid">\
										  </a>\
										</div>\
									  </div>\
					';
					
					tmpImages = venue_img + tmpImages;
					
					var venue_html = '\
									  <div class="col-lg-3 col-md-4">\
										<div class="venue-gallery">\
										  <a href="img/venue-gallery/1.jpg" class="venobox" data-gall="venue-gallery">\
											<img src="img/venue-gallery/1.jpg" alt="" class="img-fluid">\
										  </a>\
										</div>\
									  </div>' + tmpImages;
					
					$('#venue_pics').html(venue_html);						
					
				}
				tmpCntr++;
			}
								
		}
	}
	
	
	function getIvpGalleryImages(type)
	{
						
		var req_url = url_api + 'api/get/get_attendize_ivp_gallery.php?id='+type;
		
		if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
		{
			$.ajax({
				url: req_url,	
				type: 'get',
				async: false,			
				contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
				dataType: 'JSON',									// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
				success: function(response)
				{
					alert('xhr.responseText00');
					procesGalleryImages(response, type);
				},
				
				error: function(xhr, status, error){
					
					// var err = eval("(" + xhr.responseText + ")");
					alert(xhr.responseText);
				}
			});
		}
		else
		{
			$.ajax({
			  crossOrigin: true,
			  url: req_url,
			  //dataType: "json", //no need. if you use crossOrigin, the dataType will be override with "json"
			  //charset: 'ISO-8859-1', //use it to define the charset of the target url
			  context: {},
			  success: function(data) {
				 // alert(data);
				  procesGalleryImages(data, type);
				}
			})
			.done(function( data, textStatus, jqXHR ) {
				alert(data);
			});
		}
				
	}
	
	getIvpGalleryImages('gallery');
	getIvpGalleryImages('venue');