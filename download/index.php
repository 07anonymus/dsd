<?php
  require_once("../model/FileDetails.php");

  function FindFile($code) {
    $path = "../uploads/";
    $dir = opendir($path);
    while ($file = readdir($dir)) {
      if ($file != '.' && $file != '..') {
        
        $match = new FileDetails($path, $file, mime_content_type($path.$file));
        if ($match->code == $code) {
          return $match;
        } else {
          // echo 0;
        }
      }
    }
    closedir($dir);
  }
  
  if (isset($_GET["file_code"])) {
    $result = FindFile($_GET["file_code"]);
    if (!$result) {
      echo "<h3>No se encontro tu archivo</h3>";
    } else {
      $path = "../uploads/";
      $size = filesize($path.$result->name);

      header("Accept-Ranges: bytes");
      header("Range: bytes=0-50000");
      header("Content-Type: $result->mime; filename: $result->name", true, 200);
      header("Content-Length: $size;");
      
      // Handle big size files for take care server Memory
      if (filesize($path.$result->name) > 1024 * 1024) {
        $nombre_fichero = $path.$result->name;
        $gestor = fopen($nombre_fichero, "rb");
        
        while (!feof($gestor)) {
          echo fread($gestor, 1024 * 1024*5);
        }
        fclose($gestor);
      } else {
        readfile($path.$result->name);
      }


    }
  } else {
    echo "<h2> No deberias estar aqui, este sitio esta restringido x el administrador, vuelve pues de donde has venido</h2";
  }
?>
