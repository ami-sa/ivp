<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    // include object files
    include_once '../helpers/send_mail.inc.php';
    include_once '../shared/status.php';
    
    // get id of product to be edited
    $data = json_decode(file_get_contents("php://input"));
    
    // Read and sanitize update values
    $receiver_email         = htmlspecialchars(strip_tags($data->receiver_email));
    $receiver_name          = htmlspecialchars(strip_tags($data->receiver_name));
    $email_subject          = htmlspecialchars(strip_tags($data->email_subject));
    $email_body_html        = htmlspecialchars(strip_tags($data->email_body_html));
    $email_body_no_html     = htmlspecialchars(strip_tags($data->email_body_no_html));
    $email_attachment       = htmlspecialchars(strip_tags($data->email_attachment));
    
    if ('' == $email_attachment) {
        $email_attachment = null;
    }
    
    // Pass email connection information to constructor
    $email = new PhpGenericEmail(GENERIC_EMAIL_HOST, GENERIC_FROM_EMAIL, GENERIC_FROM_NAME, GENERIC_EMAIL_PWD);
    
    // Pass receiver info inorder to send email    
    $result = $email->genericSendEmail($receiver_email, $receiver_name, $email_subject, $email_body_html, $email_body_no_html, $email_attachment);
    
    // check if record is valid
    if(true == $result)
    {
        
        // set response code - 200 OK
        http_response_code(200);
        
        // show learner data in json format
         echo (GetJsonStatusMsg::getJsonString('OK'));
        // echo "OK";
    }
    else 
    {
        http_response_code(404);
        $errMsg = GetJsonStatusMsg::getJsonErrorString($result);
        echo ($errMsg);
    }
    
?>