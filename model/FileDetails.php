<?php

class FileDetails {
  private $path = null;
  public $name = null;
  public $code = null;
  public $mime = null;

  public function __construct($path, $name, $mime) {
    $this->path = $path;
    $this->name = $name;
    $this->mime = $mime;
    $this->code = $this->set_code($name);
  }
  private function set_code($name) {
    $hash = sha1($name);
    $arr_from_hash = str_split($hash);
    $numbers = array();
    $code = "";
    for ($i=0; $i < count($arr_from_hash); $i++) { 
      if ($arr_from_hash[$i] == is_numeric($arr_from_hash[$i])) {
        array_push($numbers, $arr_from_hash[$i]);
      }
    }
    for ($i=0; $i < count($numbers); $i++) {
      $code .= $numbers[$i];
    }
    return $code;
  }
}


?>