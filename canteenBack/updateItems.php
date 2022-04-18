<?php 
include 'connect.php';

function updateStock($n, $value) {
	// sql to delete a record
	$sql = "UPDATE items SET inStock=$value WHERE id=$n";

	if ($GLOBALS["conn"]->query($sql) === TRUE) {
	  echo "Record updated successfully";
	} else {
	  echo "Error updating record: " . $conn->error;
	}
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	sqlConn();
	updateStock($_GET['id'], $_GET['value']);
	$GLOBALS["conn"]->close();
	
	echo "updated";
}else {
	echo "no post";
}

?>