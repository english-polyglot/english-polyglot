<?php
	$langru = "ru";
	$langen = "en";
	$num_gen = 2;
	if (file_exists('DB-'.$num_gen.'.xml')) {
    $xml = simplexml_load_file('DB-'.$num_gen.'.xml');
//	$messages = new SimpleXmlElement($xml);
//	echo $messages->asXml();

	  setlocale(LC_ALL, 'en_US.UTF8');
	  function toAscii($str) {
		  $clean = iconv('UTF-8', 'ASCII//TRANSLIT', $str);
		  $clean = preg_replace("/[^a-zA-Z0-9\/_| -]/", '', $clean);
		  $clean = strtolower(trim($clean, '-'));
		  $clean = preg_replace("/[\/_| -]+/", '-', $clean);
		  $clean = strtolower(trim($clean, '-'));
		  $clean = ucfirst($clean);
	      //$clean .= '-ru';
		  return $clean;
	  }
	  $pap = -1;
	  foreach ($xml->messages as $ms ) {
		//$items[] =  "{$ms->message}";
		$pap = $pap + 1;
	  }
	  //print_r($items);
	  
	if ($pap > 0) {
		$pap = -1;
	 	foreach ($xml->messages as $ms ) {
		$pap = $pap + 1;
		print_r($pap);
		foreach ($ms->message as $m) {
    //echo $character->name, ' played by ', $character->actor, PHP_EOL;
	$textru = $m->russian;
	$texten = $m->english;
	print_r($texten.$textru);
	//$text = $xml->message[0]->english;
    //print_r($xml->message[0]->english);	
	

	//$config = new SimpleXmlElement('DB-6.xml');
//	foreach ($movies->movie->characters->character as $character) {
//    echo $character->name, ' played by ', $character->actor, PHP_EOL;
//	}
//	echo $config->messages->message[0];
//	echo $config->asXml();
	
	
    //$text = "Apollo 11 launched July 16th and landed July 20th. That trip took four days, from Earth to Moon";
    // Yes French is a beautiful language.
    

    // Name of the MP3 file generated using the MD5 hash
    // Added things to prevent bug if you want the same sentence in two different languages
	
	

    
	$fileru = toAscii($texten)."-ru";
	$fileen = toAscii($texten);
	
	//$file = preg_replace('/[^-a-z0-9]+/i', '-', strtolower(rtrim(trim($text1),"?")));
	
	//$file = preg_replace('/[^\w\s]|_/g',"", $text1);
//	print_r($file);
//	$file = preg_replace('/(^\s*)|(\s*$)/gi',"", $file);
//	$file = preg_replace('/[ ]{2,}/gi'," ", $file);
//	$file = preg_replace('/\n /',"\n", $file);
//	$file = strtolower($file);
//	$file = preg_replace('/\s+/g',"-", $file);
	
	
	//$file  = md5($lang."?".urlencode($text));
	
	
	//echo $file, PHP_EOL;
    // Save the MP3 file in this folder with the .mp3 extension 
    // $file = 'audio/g-'. $num_gen .'/'. $pap .'/'. $file .".mp3";
	$dir = 'audio/g-'. $num_gen .'/'. $pap .'/';
	$dirfileen = $dir.$fileen.'.mp3';
	$dirfileru = $dir.$fileru.'.mp3';
	print_r($dirfileen.$dirfileru);
	//$ourFileHandle = fopen($file, 'w') or die("can't open file");
//	echo $ourFileHandle;

    // Verify if folder exists, if it doesn't, create it, if exists, verify CHMOD
    if(!is_dir($dir))
        mkdir($dir);
    else
        if(substr(sprintf('%o', fileperms($dir)), -4)!="0777")
            chmod($dir, 0777);


    // If the MP3 file exists, do not create a new request
    if (!file_exists($fileen))
    {
		echo " hello <br />";
        // Download the content
        $mp3 = file_get_contents(
        'http://translate.google.com/translate_tts?ie=UTF-8&q='. urlencode($texten) .'&tl='. $langen .'&total=1&idx=0&textlen=5&prev=input');
		
        file_put_contents($dirfileen, $mp3);
    }
	else {echo " hii <br />";}
	
	if (!file_exists($fileru))
    {
		echo " hello <br />";
        // Download the content
        $mp3 = file_get_contents(
        'http://translate.google.com/translate_tts?ie=UTF-8&q='. urlencode($textru) .'&tl='. $langru .'&total=1&idx=0&textlen=5&prev=input');
		
        file_put_contents($dirfileru, $mp3);
    }
	else {echo " hii <br />";}
	
	}
	} 
	}
	else {
		foreach ($xml->message as $m) {
    //echo $character->name, ' played by ', $character->actor, PHP_EOL;
	$textru = $m->russian;
	$texten = $m->english;
	print_r($texten.$textru);
		
	//$text = $xml->message[0]->english;
    //print_r($xml->message[0]->english);	
	

	//$config = new SimpleXmlElement('DB-6.xml');
//	foreach ($movies->movie->characters->character as $character) {
//    echo $character->name, ' played by ', $character->actor, PHP_EOL;
//	}
//	echo $config->messages->message[0];
//	echo $config->asXml();
	
	
    //$text = "Apollo 11 launched July 16th and landed July 20th. That trip took four days, from Earth to Moon";
    // Yes French is a beautiful language.
    

    // Name of the MP3 file generated using the MD5 hash
    // Added things to prevent bug if you want the same sentence in two different languages
	
	

    
	$fileru = toAscii($texten)."-ru";
	$fileen = toAscii($texten);
	
	//$file = preg_replace('/[^-a-z0-9]+/i', '-', strtolower(rtrim(trim($text1),"?")));
	
	//$file = preg_replace('/[^\w\s]|_/g',"", $text1);
//	print_r($file);
//	$file = preg_replace('/(^\s*)|(\s*$)/gi',"", $file);
//	$file = preg_replace('/[ ]{2,}/gi'," ", $file);
//	$file = preg_replace('/\n /',"\n", $file);
//	$file = strtolower($file);
//	$file = preg_replace('/\s+/g',"-", $file);
	
	
	//$file  = md5($lang."?".urlencode($text));
	
	
	//echo $file, PHP_EOL;
    // Save the MP3 file in this folder with the .mp3 extension 
	
    //$file = 'audio/g-'. $num_gen .'/' . $file .".mp3";
	
	
		$dir = 'audio/g-'.$num_gen.'/';
		$dirfileen = $dir.$fileen.'.mp3';
		$dirfileru = $dir.$fileru.'.mp3';
		print_r($dirfileen.$dirfileru);
	//$ourFileHandle = fopen($file, 'w') or die("can't open file");
//	echo $ourFileHandle;

    // Verify if folder exists, if it doesn't, create it, if exists, verify CHMOD
    if(!is_dir($dir))
        mkdir($dir);
    else
        if(substr(sprintf('%o', fileperms($dir)), -4)!="0777")
            chmod($dir, 0777);


    // If the MP3 file exists, do not create a new request
    if (!file_exists($fileen))
    {
		echo " hello <br />";
        // Download the content
        $mp3 = file_get_contents(
        'http://translate.google.com/translate_tts?ie=UTF-8&q='. urlencode($texten) .'&tl='. $langen .'&total=1&idx=0&textlen=5&prev=input');
		
        file_put_contents($dirfileen, $mp3);
    }
	else {echo " hii <br />";}
	
	if (!file_exists($fileru))
    {
		echo " hello <br />";
        // Download the content
        $mp3 = file_get_contents(
        'http://translate.google.com/translate_tts?ie=UTF-8&q='. urlencode($textru) .'&tl='. $langru .'&total=1&idx=0&textlen=5&prev=input');
		
        file_put_contents($dirfileru, $mp3);
    }
	else {echo " hii <br />";}
	
	
	}
	}
} else {
    exit('Failed to open xml-file.');
}

?>