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

	url_event_domain = "https://www.en3ticket.com/";

	url_api =  "https://www.en3ticket.com/api/"; 
	
	url_event_tool = "ihttps://vp.en3ticket.com/e/";
	
jQuery(function(){
	
	var event_organiser_id = 1;

	var event_id = 1;		// default = 1
	
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
	};
	
	// *************************************************************** Ticket Details *************************************************

	function getIvpEventTicketDetail(mainUrl, eventId)
	{
		
		$.ajax({
			url: mainUrl + 'api/get/get_attendize_ivp_ticket.php?eid='+eventId,	// eid==>event_id
			type: 'get',
			async: false,
			contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
			dataType: 'JSON',									// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
			success: function(response){
				
				if(response)
				{
					
					var len = Object.keys(response.message).length;
					
					// Standard Ticket
					if(3<=len)
					{
						$('#ticket_standard_title').html(response.message[2].ticket_title);
						$('#standard_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[2].ticket_count) - parseInt(response.message[2].ticket_sold))+ '</b>');
						$('#standard_desc').html(response.message[2].ticket_desc);
						$('#ticket_cost_standard').html(response.message[2].ticket_cost);	
						
					}
					else{
						$('#ticket_standard_title').html('-');
						$('#standard_spaces_left').html('<b>Spaces Left: 0</b>');
						$('#standard_desc').html('');
						$('#ticket_cost_standard').html('0.00');
					}
					
					// VIP Ticket
					if(2<=len)
					{
						$('#ticket_vip_title').html(response.message[1].ticket_title);
						$('#vip_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[1].ticket_count) - parseInt(response.message[1].ticket_sold))+ '</b>');
						$('#vip_desc').html(response.message[1].ticket_desc);
						$('#ticket_cost_vip').html(response.message[1].ticket_cost);	
						
					}
					else{
						$('#ticket_vip_title').html('-');
						$('#vip_spaces_left').html('<b>Spaces Left: 0</b>');
						$('#vip_desc').html('');
						$('#ticket_cost_vip').html('0.00');
					}
					
					// VVIP Ticket
					if(1<=len)
					{
						
						$('#ticket_vvip_title').html(response.message[0].ticket_title);
						$('#vvip_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[0].ticket_count) - parseInt(response.message[0].ticket_sold))+ '</b>');
						$('#vvip_desc').html(response.message[0].ticket_desc);
						$('#ticket_cost_vvip').html(response.message[0].ticket_cost);	
						
					}
					else{
						$('#ticket_vvip_title').html('-');
						$('#vvip_spaces_left').html('<b>Spaces Left: 0</b>');
						$('#vvip_desc').html('');
						$('#ticket_cost_vvip').html('0.00');
					}	
				}
						
			},
			
			error: function(xhr, status, error){
				$('#ticket_vvip_title').html('-');
				$('#vvip_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#vvip_desc').html('');
				$('#ticket_cost_vvip').html('0.00');
				
				
				$('#ticket_vip_title').html('-');
				$('#vip_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#vip_desc').html('');
				$('#ticket_cost_vip').html('0.00');
				
				
				$('#ticket_standard_title').html('-');
				$('#standard_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#standard_desc').html('');
				$('#ticket_cost_standard').html('0.00');
			}
		});
	}
	
	// *************************************************************** Event Details *************************************************

	{
		// Query event details from server based on oid and/or eid
		
		var eid = getUrlParameter('eid');
		
		
		var url_server = url_api + 'api/get/get_attendize_ivp_event.php';
		if( ('' == eid) || (undefined == eid))
		{
			url_server = url_server + '?oid='+event_organiser_id;
		}
		else
		{
			url_server = url_server + '?id='+eid;		// event id found
		}
		
		
		
		// Get event details
		$.ajax({
			url: url_server,	// oid==>organiser id
			type: 'GET',
			async: false,
			contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
			dataType: 'JSON',					// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
			success: function(response){
				
				if(response)
				{
					var len = Object.keys(response.message).length;
					
					if(0 < len)
					{
						var tmp;
						for(tmp = 0; tmp<len; tmp++)
						{
							 // alert(response.message[tmp].isEventExpired);
							
							if( ('0' == response.message[tmp].isEventDisabled) && ('0' == response.message[tmp].isEventExpired) )
							{
								event_id = response.message[tmp].event_id;
					
								$('#buy_now').attr('href', url_event_tool + response.message[tmp].event_id + '/' + response.message[tmp].event_title);
								$('#intro_video').attr('href', response.message[tmp].event_details);
								
								// We do not change the tile since it will always be IVP. $('#event_title').html(response.message[tmp].event_title);
								$('#event_sub_detail').html('From ' + response.message[tmp].event_start + ' - ' + response.message[tmp].event_end);
								$('#about_event').html(response.message[tmp].event_desc);
								$('#event_date').html(response.message[tmp].event_start + ' - ' + response.message[tmp].event_end);
								
								
								// $('#event_location').html(response.message[tmp].event_venue + ', ' + response.message[tmp].event_addr1 + ', ' + response.message[tmp].event_addr2 + ', ' + response.message[tmp].event_postcode + ', ' + response.message[tmp].event_city);


								var location_of_event = ' ';
								
								// The order of the 'ifs' should not be changed
								if( (null !== response.message[tmp].event_venue) && ('' !== response.message[tmp].event_venue) && (' ' !== response.message[tmp].event_venue) )
								{
									location_of_event = response.message[tmp].event_venue;
								}
								else
								{
									// Do nothing
								}
								
								if( (null !== response.message[tmp].event_addr1) && ('' !== response.message[tmp].event_addr1) && (' ' !== response.message[tmp].event_addr1) )
								{
									location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') : '' ) + response.message[tmp].event_addr1;
								}
								else
								{
									// Do nothing
								}
								
								if( (null !== response.message[tmp].event_addr2) && ('' !== response.message[tmp].event_addr2) && (' ' !== response.message[tmp].event_addr2) )
								{
									location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') : '' ) + response.message[tmp].event_addr2;
									
								}
								else
								{
									// Do nothing
								}
								
								
								if( (null !== response.message[tmp].event_postcode) && ('' !== response.message[tmp].event_postcode) && (' ' !== response.message[tmp].event_postcode) )
								{
									location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') : '' )  + response.message[tmp].event_postcode;
									
								}
								else
								{
									// Do nothing
								}
								
								
								if( (null !== response.message[tmp].event_city) && ('' !== response.message[tmp].event_city) && (' ' !== response.message[tmp].event_city) )
								{
									location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') : '' ) + response.message[tmp].event_city;
								}
								else
								{
									// Do nothing
								}						 
								
								
								$('#event_location').html(location_of_event);
																								
								getIvpEventTicketDetail(url_api, event_id);
								break;
							}
							else
							{
								// Do nothing
							}
						}						
					}		
				}
			},
			error: function(xhr, status, error){
				console.log('getEventError', (xhr.statusText + xhr.responseText));
				// alert(xhr.responseText);
			}
		});				
	}
		
	
	
})


// *************************************************************** Gallery *************************************************	
	function getIvpGalleryImages(type)
	{
		
		var filesArray = []; 
		var filesObject = new Object();
			alert(url_api + 'api/get/get_attendize_ivp_gallery.php?id='+type);
		$.ajax({
			url: url_api + 'api/get/get_attendize_ivp_gallery.php?id='+type,	
			type: 'get',
			async: false,
			
			contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
			dataType: 'JSON',									// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
			success: function(response){
				
				if(response)
				{
					var tmpCntr = 0;
					var len = Object.keys(response.message).length;
					// alert(len);
					var tmp;
					
					var gallery_div = '<div class="owl-carousel gallery-carousel" id="gallery_pics"> </div>';
					
					
					var tmpImages = '';
					for(tmp = 0; tmp<len; tmp++)
					{
						var name = response.message[tmp].name;
						var url = response.message[tmp].url;
						var type = response.message[tmp].type;
															
						
						if( ('ivp' === type) && (10 > tmpCntr) )
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
			},
			
			error: function(xhr, status, error){
				
				// var err = eval("(" + xhr.responseText + ")");
				alert(xhr.responseText);
			}
		});
	}
	
	getIvpGalleryImages('gallery');
	
		
	// *************************************************************** Venue images *************************************************
	getIvpGalleryImages('venue');
	
	

