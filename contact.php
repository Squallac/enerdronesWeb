<?php


$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = 'eli@enerdrones.hk'; //you can put more recipient, just separated by comma ( , )
$subject = $name . ' has sent an email from our website';

$email_message = wordwrap($message, 70, "\r\n");

$headers = 'From: ' . $email ."\r\n" .
		   'Reply-To: ' . $email . "\r\n" .
		   'X-Mailer: PHP/' . phpversion();

$has_sent_email = mail($to, $subject, $email_message, $headers);

$response = array('status' => $has_sent_email);

echo json_encode($response);

?>