<?php 
include 'connect.php';

function getOrders() {
	$sql = "SELECT img, name, halfPrice, quantity, orderType FROM Items INNER JOIN Orders ON Items.id = Orders.orderID";

	$result = $GLOBALS["conn"]->query($sql);
	$a=array();
	
	if ($result->num_rows > 0) {
	  // output data of each row
	  while($row = $result->fetch_assoc()) {
	    array_push($a, $row);
	  }
	}
	echo json_encode($a);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	sqlConn();
	getOrders();
	$GLOBALS["conn"]->close();
}else {
	echo "no post";
}

?>