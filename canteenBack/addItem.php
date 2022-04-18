<?php 
include 'connect.php';

function insertCartData($i,$n,$d,$h,$f,$s) {
	// prepare and bind
	$stmt = $GLOBALS["conn"]->prepare("INSERT INTO Items (img, name, description, halfPrice, fullPrice, inStock) VALUES (?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("sssiii", $img, $name, $description, $halfPrice, $fullPrice, $inStock);

	// set parameters and execute
	$img = $i;
	$name = $n;
	$description = $d;
	$halfPrice = $h;
	$fullPrice = $f;
	$inStock = $s;
	$stmt->execute();

	$stmt->close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	sqlConn();
	//createTable();
	$insertData = json_decode($_POST["insertData"]);
	insertCartData(
		$insertData->img,
		$insertData->name,
		$insertData->des,
		$insertData->hp,
		$insertData->fp,
		$insertData->in
	);

	$GLOBALS["conn"]->close();
	
	echo "updated";
}else {
	echo "no post";
}

?>