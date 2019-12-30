
jQuery(function(){

	$('#subscribe_form').submit(function(e) {

		e.preventDefault();
		
		var f = $(this).find('.form-group'),
		  ferror = false,
		  emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

		f.children('input').each(function() { // run all inputs

		  var i = $(this); // current input
		  var rule = i.attr('data-rule');

		  if (rule !== undefined) {
			var ierror = false; // error flag for current input
			var pos = rule.indexOf(':', 0);
			if (pos >= 0) {
			  var exp = rule.substr(pos + 1, rule.length);
			  rule = rule.substr(0, pos);
			} else {
			  rule = rule.substr(pos + 1, rule.length);
			}

			switch (rule) {
			  case 'required':
				if (i.val() === '') {
				  ferror = ierror = true;
				}
				break;

			  case 'minlen':
				if (i.val().length < parseInt(exp)) {
				  ferror = ierror = true;
				}
				break;

			  case 'email':
				if (!emailExp.test(i.val())) {
				  ferror = ierror = true;
				}
				break;

			  case 'checked':
				if (! i.is(':checked')) {
				  ferror = ierror = true;
				}
				break;

			  case 'regexp':
				exp = new RegExp(exp);
				if (!exp.test(i.val())) {
				  ferror = ierror = true;
				}
				break;
			}
			i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
		  }
		});
		
		f.children('textarea').each(function() { // run all inputs

		  var i = $(this); // current input
		  var rule = i.attr('data-rule');

		  if (rule !== undefined) {
			var ierror = false; // error flag for current input
			var pos = rule.indexOf(':', 0);
			if (pos >= 0) {
			  var exp = rule.substr(pos + 1, rule.length);
			  rule = rule.substr(0, pos);
			} else {
			  rule = rule.substr(pos + 1, rule.length);
			}

			switch (rule) {
			  case 'required':
				if (i.val() === '') {
				  ferror = ierror = true;
				}
				break;

			  case 'minlen':
				if (i.val().length < parseInt(exp)) {
				  ferror = ierror = true;
				}
				break;
			}
			i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
		  }
		});
		if (ferror) 
		{
			alert("Parse Error");
			return false;
		}
		else{
			
			var emailObject = new Object();
				
				
			emailObject.receiver_name        	= "AMI Event Admin";
			emailObject.receiver_email        	= 'eric_tizie@yahoo.com';// $('#public_email').html();		// AMI Email which is hard coded 
			emailObject.email_subject      		= 'Newsletter Subscription Request';
			emailObject.email_body_html    		= 'Dear Admin,\n' + $('#subscribe_email').val() + " has requested to be subscribed to the newsletter.";
			emailObject.email_body_no_html    	= 'Dear Admin,\n' + $('#subscribe_email').val() + " has requested to be subscribed to the newsletter.";
			emailObject.email_attachment       	= "";
			
			
			
			var url_event_domain = "http://localhost/aser/";
			// ToDo: Change link
			var action = url_event_domain + 'others/learning/test_api/api/action/send_email.php';
		
			
			$.ajax({
				type: "POST",
				url: action,
				data: JSON.stringify(emailObject),
				contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
				dataType: 'JSON',									// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
				processData: false,
				success: function(msg) {
					 // alert(msg.message);
				if (msg.message == 'OK') {
					$("#subscriptionsuccess").addClass("show");
					$("#subscriptionerror").removeClass("show");
					$('#subscribe_email').val("");
				} else {
					$("#subscriptionerror").addClass("show");
					$("#subscriptionsuccess").removeClass("show");
					$('#subscribe_email').val("");
				}
			},
					
				error: function(xhr, status, error){
					alert(xhr.responseText);
				}
			});
		}
	});

})



