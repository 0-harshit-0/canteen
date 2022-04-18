<?php 
include 'connect.php';


function insertOrderData($i,$q, $t="half") {
	// prepare and bind
	$stmt = $GLOBALS["conn"]->prepare("INSERT INTO Orders (quantity, orderID, orderType) VALUES (?, ?, ?)");
	$stmt->bind_param("iis", $quant, $orderID, $orderType);

	// set parameters and execute
	$orderID = $i;
	$quant = $q;
	$orderType = $t;
	$stmt->execute();

	$stmt->close();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	sqlConn();
	
	$insertData = json_decode($_POST["orders"]);
	for ($x = 0; $x <= count($insertData)-1; $x++) {
		insertOrderData(
			$insertData[$x]->id, $insertData[$x]->quant, $insertData[$x]->type
		);
	}
	

	$GLOBALS["conn"]->close();

	echo $_POST['orders'];
}else {
	echo "no post";
}

?>