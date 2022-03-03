<?php
include_once("config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
  $type = mysqli_real_escape_string($mysqli, trim($request->type));
  $id = mysqli_real_escape_string($mysqli, trim($request->id));
  $user = mysqli_real_escape_string($mysqli, trim($request->user));
  $tags = mysqli_real_escape_string($mysqli, trim($request->tags));
  $link = mysqli_real_escape_string($mysqli, trim($request->link));
  if ($tags == null){
    $tags = "HentaiHardcore";
  }
  if ($request->type == "post"){
    $sql = "INSERT INTO imgs(Id,user,tags,link) VALUES ('{$id}','{$user}','{$tags}','{$link}')";
  }
  else if ($request->type == "delete"){
    $sql = "DELETE FROM imgs WHERE Id = '$id'";
  }

 // echo $sql;
if ($mysqli->query($sql) === TRUE) {
 
 
    $data = [
    'Id' => $id,
	  'user' => $user,
	  'tags' => $tags,
    'link'    => $link
    ];
    echo json_encode($data);
 
}
else{
  echo("Error description: " . $mysqli -> error);
}
}
?>