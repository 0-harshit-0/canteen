<?php 
include 'connect.php';

function getItems() {
	$sql = "SELECT * FROM items";
	$result = $GLOBALS["conn"]->query($sql);
	$a=array();
	
	if ($result && $result->num_rows > 0) {
	  // output data of each row
	  while($row = $result->fetch_assoc()) {
	    array_push($a, $row);
	  }
	}
	echo json_encode($a);
}
function getItemsStock() {
	$sql = "SELECT * FROM items WHERE inStock='1'";
	$result = $GLOBALS["conn"]->query($sql);
	$a=array();
	
	if ($result && $result->num_rows > 0) {
	  // output data of each row
	  while($row = $result->fetch_assoc()) {
	    array_push($a, $row);
	  }
	}
	echo json_encode($a);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	
	sqlConn();
	
	if($_GET["inStock"] == "true") {
		getItemsStock();
	}else {
		getItems();
	}
	$GLOBALS["conn"]->close();
}else {
	echo "no post";
}

?>