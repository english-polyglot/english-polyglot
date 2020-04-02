<?php

$qs = http_build_query(array("ie" => "utf-8", "tl" => $_GET["tl"], "q" => $_GET["q"], "tk" => $_GET["tk"], "client" => "t"));
$ctx = stream_context_create(array("http"=>array("method"=>"GET","header"=>"Referer: https://translate.google.com/","user_agent"=>"stagefright/1.2 (Linux;Android 5.0)")));

header("Content-type: audio/mpeg");
header("Content-Transfer-Encoding: binary");
header('Pragma: no-cache');
header('Expires: 0');

$soundfile = file_get_contents("https://translate.google.com/translate_tts?". $qs, false, $ctx);

echo($soundfile);

?>