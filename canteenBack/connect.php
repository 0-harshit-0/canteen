<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");

function sqlConn() {
	$servername = "localhost";
	$username = "root";
	$password = "1234";
	$dbname = "canteen";


	// Create connection
	$GLOBALS["conn"] = new mysqli($servername, $username, $password, $dbname);
	if ($GLOBALS["conn"]->connect_error) {
		die("Connection failed: " . $GLOBALS["conn"]->connect_error);
	}
	//echo "Connected successfully";
}

function createTable() {
	// sql to create table
	$sql = "CREATE TABLE Items (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		img TEXT NOT NULL,
		name TEXT NOT NULL,
		description TEXT NOT NULL,
		halfPrice INT NOT NULL,
		fullPrice INT NOT NULL,
		inStock BOOL NOT NULL 
	)";

	if ($GLOBALS["conn"]->query($sql) === TRUE) {
	  echo "Table Items created successfully";
	} else {
	  echo "Error creating table: ". $GLOBALS["conn"]->error;
	}
}
function createOrderTable() {
	$sql = "CREATE TABLE Orders (
	    id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	    quantity int UNSIGNED NOT NULL,
	    orderID int UNSIGNED NOT null,
	    orderType text NOT null,
	    orderStatus text NOT null,
	    FOREIGN KEY (orderID) REFERENCES Items(id)
	)";
	if ($GLOBALS["conn"]->query($sql) === TRUE) {
	  echo "Table Items created successfully";
	} else {
	  echo "Error creating table: ". $GLOBALS["conn"]->error;
	}
}
?>
