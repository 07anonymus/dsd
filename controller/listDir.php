 <?php
  require_once("../model/FileDetails.php");
  class ListFiles {
    public $videos    = array();
    public $pictures  = array();
    public $music     = array();
    public $files     = array();
    
    public function __construct() {
      $path = "../uploads/";
      $dir = opendir($path);
      while ($file = readdir($dir)) {
        if ($file != '.' && $file != '..') {
          
          $length = strpos(mime_content_type($path.$file),"/");
          $match  = substr(mime_content_type($path.$file),0, $length);

          if ($match == "video") {
            array_push($this->videos, new FileDetails($path, $file, mime_content_type($path.$file)));
          } elseif ($match == "image") {
            array_push($this->pictures, new FileDetails($path, $file, mime_content_type($path.$file)));
          } elseif ($match == "audio") {
            array_push($this->music, new FileDetails($path, $file, mime_content_type($path.$file)));
          } else {
            array_push($this->files, new FileDetails($path, $file, mime_content_type($path.$file)));
            
          }
        }
      }
    
    closedir($dir);
    }
  }

  echo json_encode(new ListFiles());
?>
