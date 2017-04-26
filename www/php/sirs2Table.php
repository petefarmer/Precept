<?php

$action = $_GET['action'];

if ($action == 'get') {
  get();
}elseif($action == 'edit') {
  edit();
}

function get() {
  $mysqli = new mysqli("localhost", "arden", "arden", "SIRSDB");
  $query = "SELECT * FROM sirsvalues2";
  $results = array();
  if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
      $results[] = $row;
    }
  $result->free();
  }
  echo json_encode($results);
  $mysqli->close();
} 

function edit() {
  $conn = mysqli_connect("localhost", "arden", "arden", "SIRSDB");
  switch($_POST['oper']) {
    case "add":
      $query = "INSERT INTO sirsvalues2 VALUES (NULL,'$_POST[IDPatient]', now(), '$_POST[temperature]', '$_POST[heartRate]', '$_POST[respRate]', '$_POST[PaCO2]', '$_POST[WBcellCount]', '$_POST[immatureBand]')";
      mysqli_query($conn,$query) or die(mysql_error());;
      break;
    case "edit":
      // not implemented
      break;
    case "del":
      $query = "DELETE FROM sirsvalues2 WHERE id = '$_POST[id]'";
      mysqli_query($conn,$query) or die(mysql_error());;
      break;
  }
  mysqli_close($conn);
}

?>
