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
	url_event_domain = "//www.en3ticket.com/";

	url_api =  "//www.en3ticket.com/api/"; 
	
	url_event_tool = "//ivp.en3ticket.com/e/";
}

	
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

	function processEventTicketDetails(response, event_currency)
	{
		if(response)
		{
			console.log('TicketInfo', response);
			
			
			var len = Object.keys(response.message).length;
			if ( 6 > len )
			{
				
				$('#Ticket1').css("visibility", "visible");
				$('#Ticket2').css("visibility", "visible");
				$('#Ticket3').css("visibility", "visible");
				
				// Standard Ticket
				if(1<=len)
				{
					$('#ticket_standard_title').html(response.message[0].ticket_title);
					$('#standard_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[0].ticket_count) - parseInt(response.message[0].ticket_sold))+ '</b>');
					$('#standard_desc').html(response.message[0].ticket_desc);
					$('#ticket_cost_standard').html(event_currency + ' ' + response.message[0].ticket_cost);	
					
				}
				else{
					$('#ticket_standard_title').html('-');
					$('#standard_spaces_left').html('<b>Spaces Left: 0</b>');
					$('#standard_desc').html('');
					$('#ticket_cost_standard').html(event_currency + ' ' + '0.00');
					
					$('#Ticket1').css("visibility", "hidden");
				}
				
				// VIP Ticket
				if ( (2<=len) && (undefined !== response.message[1].ticket_title) )
				{
					$('#ticket_vip_title').html(response.message[1].ticket_title);
					$('#vip_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[1].ticket_count) - parseInt(response.message[1].ticket_sold))+ '</b>');
					$('#vip_desc').html(response.message[1].ticket_desc);
					$('#ticket_cost_vip').html(event_currency + ' ' + response.message[1].ticket_cost);	
										
				}
				else{
					$('#ticket_vip_title').html('-');
					$('#vip_spaces_left').html('<b>Spaces Left: 0</b>');
					$('#vip_desc').html('');
					$('#ticket_cost_vip').html(event_currency + ' ' + '0.00');
					
					$('#Ticket2').css("visibility", "hidden");
				}
				
				// VVIP Ticket
				if( (3<=len)  && (undefined !== response.message[2].ticket_title) )
				{
					
					$('#ticket_vvip_title').html(response.message[2].ticket_title);
					$('#vvip_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[2].ticket_count) - parseInt(response.message[2].ticket_sold))+ '</b>');
					$('#vvip_desc').html(response.message[2].ticket_desc);
					$('#ticket_cost_vvip').html(event_currency + ' ' + response.message[2].ticket_cost);	
					
				}
				else{
					$('#ticket_vvip_title').html('-');
					$('#vvip_spaces_left').html('<b>Spaces Left: 0</b>');
					$('#vvip_desc').html('');
					$('#ticket_cost_vvip').html(event_currency + ' ' + '0.00');
					
					$('#Ticket3').css("visibility", "hidden");
				}	
				
			}
			else
			{
				$('#Ticket1').css("visibility", "hidden");
				$('#Ticket2').css("visibility", "hidden");
				$('#Ticket3').css("visibility", "hidden");
				
				// Standard Ticket
				$('#ticket_standard_title').html('-');
				$('#standard_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#standard_desc').html('');
				$('#ticket_cost_standard').html(event_currency + ' ' + '0.00');
				
				
				// VIP Ticket
				$('#ticket_vip_title').html('-');
				$('#vip_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#vip_desc').html('');
				$('#ticket_cost_vip').html(event_currency + ' ' + '0.00');
				
				
				// VVIP Ticket
				$('#ticket_vvip_title').html('-');
				$('#vvip_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#vvip_desc').html('');
				$('#ticket_cost_vvip').html(event_currency + ' ' + '0.00');
					
			}	
			
		}
		else
		{
			// Standard Ticket
			$('#ticket_standard_title').html('-');
			$('#standard_spaces_left').html('<b>Spaces Left: 0</b>');
			$('#standard_desc').html('');
			$('#ticket_cost_standard').html(event_currency + ' ' + '0.00');
			
			
			// VIP Ticket
			$('#ticket_vip_title').html('-');
			$('#vip_spaces_left').html('<b>Spaces Left: 0</b>');
			$('#vip_desc').html('');
			$('#ticket_cost_vip').html(event_currency + ' ' + '0.00');
			
			
			// VVIP Ticket

			$('#ticket_vvip_title').html('-');
			$('#vvip_spaces_left').html('<b>Spaces Left: 0</b>');
			$('#vvip_desc').html('');
			$('#ticket_cost_vvip').html(event_currency + ' ' + '0.00');
				
			
		}
		
	}
	
	function resetEventTicketDetail()
	{
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
	
	function getIvpEventTicketDetail(mainUrl, eventId, event_currency)
	{
		var req_url = 'remote/remote.php?cmd=ticket&eid='+eventId;	// eid==>event_id
		
		$.ajax({
			url: req_url,
			type: 'get',
			async: false,
			contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
			dataType: 'JSON',									// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
			success: function(response){
				
				processEventTicketDetails(response, event_currency);
						
			},
			
			error: function(xhr, status, error){
				resetEventTicketDetail();
			}
		});
			
	}
	
	// *************************************************************** Event Details *************************************************
	function processEventDetails(response)
	{console.log('evt details', response);
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
						var event_id = response.message[tmp].event_id;
			
						var event_currency = response.message[tmp].symbol_left;
						
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
							location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') + response.message[tmp].event_addr1 : '' );
						}
						else
						{
							// Do nothing
						}
						
						if( (null !== response.message[tmp].event_addr2) && ('' !== response.message[tmp].event_addr2) && (' ' !== response.message[tmp].event_addr2) )
						{
							location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') + response.message[tmp].event_addr2 : '' );
							
						}
						else
						{
							// Do nothing
						}
						
						
						if( (null !== response.message[tmp].event_postcode) && ('' !== response.message[tmp].event_postcode) && (' ' !== response.message[tmp].event_postcode) )
						{
							location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') + response.message[tmp].event_postcode : '' ) ;
							
						}
						else
						{
							// Do nothing
						}
						
						
						if( (null !== response.message[tmp].event_city) && ('' !== response.message[tmp].event_city) && (' ' !== response.message[tmp].event_city) )
						{
							location_of_event = (( (location_of_event !== '') && (location_of_event !== ' '))? (location_of_event + ', ') + response.message[tmp].event_city : '' );
						}
						else
						{
							// Do nothing
						}						 
						
						
						$('#event_location').html(location_of_event);
																																							
						getIvpEventTicketDetail(url_api, event_id, event_currency);
						break;
					}
					else
					{
						// Do nothing
					}
				}						
			}		
		}
	}
	
	// *************************************************************** Event Details *************************************************
	{
		// Query event details from server based on oid and/or eid
		
		var eid = getUrlParameter('eid');
		
		
		var url_server =  'remote/remote.php';
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
			url: url_server+'&cmd=event',	// oid==>organiser id
			type: 'GET',
			async: false,
			contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
			dataType: 'JSON',					// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
			success: function(response){
				processEventDetails(response);
		
			},
			error: function(xhr, status, error){
				console.log('getEventError', (xhr.statusText + xhr.responseText));
				// alert(xhr.responseText);
			}
		});
		
	}
		
})


// *************************************************************** End *************************************************	
	


