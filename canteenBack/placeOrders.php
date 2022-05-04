<?php 
include 'connect.php';


function insertOrderData($i,$q, $t="half", $s) {
	// prepare and bind
	$stmt = $GLOBALS["conn"]->prepare("INSERT INTO Orders (quantity, orderID, orderType, orderStatus) VALUES (?, ?, ?, ?)");
	$stmt->bind_param("iiss", $quant, $orderID, $orderType, $orderStatus);

	// set parameters and execute
	$orderID = $i;
	$quant = $q;
	$orderType = $t;
	$orderStatus = $s;
	$stmt->execute();

	$stmt->close();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	sqlConn();
	
	$insertData = json_decode($_POST["orders"]);
	for ($x = 0; $x <= count($insertData)-1; $x++) {
		insertOrderData(
			$insertData[$x]->id, $insertData[$x]->quant, $insertData[$x]->type, $insertData[$x]->status
		);
	}
	

	$GLOBALS["conn"]->close();

	echo $_POST['orders'];
}else {
	echo "no post";
}

?>