<?php

$action = $_GET['action'];

if ($action == 'get') {
  get();
}

function get() {
$mysqli = new mysqli("localhost", "arden", "arden", "SIRSDB");

$query = "SELECT * FROM sirsvalues";

$results = array();

if ($result = $mysqli->query($query)) {

  /* fetch associative array */
  while ($row = $result->fetch_assoc()) {
    $results[] = $row;
  }

  /* free result set */
    $result->free();
}

/* print json object*/
echo json_encode($results);

/* close connection */
$mysqli->close();

} /* close get() */

?>
