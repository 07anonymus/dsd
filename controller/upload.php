<?php

  $name = $_FILES['file'];
  @$move = move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/'.$_FILES['file']['name']);
//  echo "<br><h2>Details:</h2>";
  foreach ($name as $key => $value) {
  //  echo $key, ": ";
    //echo $value, "<br>";
  }
	echo json_encode([$move, $name]);
 ?>
