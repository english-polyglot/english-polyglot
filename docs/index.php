<?php
date_default_timezone_set('Etc/GMT+3');
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
</head>

<body>
<video width="320" height="240" controls="controls" >
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.	
</video>

<?php	
echo "<form action=''>
	<input type='hidden' name='uid' value='Anonymous'>
	<input type='hidden' name='date' value='".date('Y-m-d H:i:s')."'>
	<textarea name='message' id='' cols='30' rows='10'></textarea>
	<button type='submit' name='submit'>Comment</button>		
</form>";
?>
</body>
</html>