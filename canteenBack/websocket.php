<?php
include 'connect.php';

function addChat($f,$m) {
	$sql = "INSERT INTO Chats (msg, fr) VALUES ('$m', '$f')";

	if ($GLOBALS["conn"]->query($sql) === TRUE) {
	  echo "New record created successfully";
	} else {
	  echo "Error: " . $sql . "<br>" . $GLOBALS["conn"]->error;
	}
}

function del($fm) {
	// sql to delete a record
	$sql = "DELETE FROM Chats WHERE fr != '$fm'";
	$GLOBALS["conn"]->query($sql);
	/*if ($GLOBALS["conn"]->query($sql) === TRUE) {
	  echo "Record deleted successfully";
	} else {
	  echo "Error deleting record: " . $GLOBALS["conn"]->error;
	}*/
}
function getChat($fm) {
	$sql = "SELECT * FROM Chats WHERE fr != '$fm'";
	$result = $GLOBALS["conn"]->query($sql);
	$a=array();
	
	if ($result && $result->num_rows > 0) {
	  // output data of each row
	  while($row = $result->fetch_assoc()) {
	    array_push($a, $row);
	  }
	}

	del($fm);
	echo json_encode($a);
}

sqlConn();
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	getChat($_GET["from"]);
}else {
	$insertData = json_decode($_POST["msgs"]);
	addChat($insertData->from,$insertData->msg);
}
$GLOBALS["conn"]->close();
?>