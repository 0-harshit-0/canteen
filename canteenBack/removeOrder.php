<?php 
include 'connect.php';

function del($n) {
	// sql to delete a record
	$sql = "DELETE FROM Orders WHERE id=$n";

	if ($GLOBALS["conn"]->query($sql) === TRUE) {
	  echo "Record deleted successfully";
	} else {
	  echo "Error deleting record: " . $GLOBALS["conn"]->error;
	}
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	sqlConn();
	del($_GET['id']);
	$GLOBALS["conn"]->close();
	
	echo "updated";
}else {
	echo "no post";
}

?>