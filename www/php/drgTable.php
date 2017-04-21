<?php
$mysqli = new mysqli("localhost", "arden", "arden", "precept");
$query = "SELECT id,title FROM drg";

$results = array();

if ($result = $mysqli->query($query)) {

  /* fetch associative array */
  while ($row = $result->fetch_assoc()) {
    $results[] = $row;
  }

  /* free result set */
    $result->free();
}

/* close connection */
$mysqli->close();

/* print json object*/
echo json_encode($results);
?>
