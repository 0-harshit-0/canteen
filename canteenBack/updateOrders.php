<?php 
include 'connect.php';

function updateStatus($n, $value) {
	// sql to delete a record
	$sql = "UPDATE orders SET orderStatus='$value' WHERE orders.id=$n";

	if ($GLOBALS["conn"]->query($sql) === TRUE) {
	  echo "Record updated successfully";
	} else {
	  echo "Error updating record: " . $GLOBALS["conn"]->error;
	}
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	sqlConn();
	updateStatus($_GET['id'], $_GET['value']);
	$GLOBALS["conn"]->close();
	
	echo "updated";
}else {
	echo "no post";
}

?>