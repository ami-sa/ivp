<?php
	// required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
	
	$domain_url = 'localhost/aser/others/learning/test_api/';

	$whitelist = array(
		'127.0.0.1',
		'::1'
	);

	if(!in_array($_SERVER['REMOTE_ADDR'], $whitelist))
	{
		$domain_url = 'https://www.en3ticket.com/api/';
	}

	function sendJsonRequest($url='', $data='')
	{
		
		
	}
	
	function callAPI($method, $url, $data){
	   $curl = curl_init();

	   switch ($method){
		  case "POST":
			 curl_setopt($curl, CURLOPT_POST, 1);
			 if ($data)
				curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
			 break;
		  case "PUT":
			 curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
			 if ($data)
				curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
			 break;
		  default:
			 if ($data)
				$url = sprintf("%s?%s", $url, http_build_query($data));
	   }

	   // OPTIONS:
	   curl_setopt($curl, CURLOPT_URL, $url);
	   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
		  'APIKEY: 111111111111111111111',
		  'Content-Type: application/json',
	   ));
	   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

	   // EXECUTE:
	   $result = curl_exec($curl);
	   if(!$result){die("Connection Failure");}
	   curl_close($curl);
	   return $result;
	}

	$command = isset($_GET['cmd']) ? ($_GET['cmd']) : '' ;                 // Read command

	switch($command)
	{
		case "ticket":     // event ticket details
			$id = $_GET['eid'];
			// echo file_get_contents($domain_url . 'api/get/get_attendize_ivp_ticket.php?eid=' . $id);
			
			$data_array =  array(
				   "eid" => $id
				);
				$get_data = callAPI('GET', $domain_url . 'api/get/get_attendize_ivp_ticket.php', $data_array);
				//$response = json_decode($get_data, true);

				
				echo $get_data;
				
			break;

		case "event":  // event details
			$id = '';
			if(isset($_GET['id']))
			{
				$id = isset($_GET['id']);
				$data_array =  array(
				   "id" => $id
				);
				$get_data = callAPI('GET', $domain_url . 'api/get/get_attendize_ivp_event.php', $data_array);
				
				echo $get_data;
			}
			else if(isset($_GET['oid']))
			{
				$id = isset($_GET['oid']);
				
				$data_array =  array(
				   "oid" => $id
				);
				$get_data = callAPI('GET', $domain_url . 'api/get/get_attendize_ivp_event.php', $data_array);
				
				echo $get_data;
				
				
			}
			else
			{
				// Do nothing
			}
			break;
			
		case "images":  // general church pics
			$id = $_GET['id'];
			
			$data_array =  array(
			   "id" => $id
			);
			$get_data = callAPI('GET', $domain_url . 'api/get/get_attendize_ivp_gallery.php', $data_array);
			
			echo $get_data;
			break;
			
			
		case "": // Handle file extension for files ending in '.'
		case NULL: // Handle no file extension
			// Do nothing
			break;
	}

?>


