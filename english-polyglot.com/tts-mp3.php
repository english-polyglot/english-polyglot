<?php
$qs = http_build_query(array("ie" => "utf-8", "tl" => $_GET["tl"], "q" => $_GET["q"], "tk" => $_GET["tk"], "client" => "t"));

$dir = $_GET["dr"];
$file = $_GET["fl"];

    if(!is_dir($dir))
        mkdir($dir);
    else
        if(substr(sprintf('%o', fileperms($dir)), -4)!="0777")
            chmod($dir, 0777);
			
$dirfile=$dir.$file.'.mp3';

if (!file_exists($dirfile))
{	
	$mp3 = file_get_contents("https://translate.google.com/translate_tts?". $qs);		
	file_put_contents($dirfile, $mp3);
}

?>