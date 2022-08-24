<?php

function downloadMP3( $url, $file ){    
    $curl = curl_init();

    curl_setopt( $curl, CURLOPT_URL, $url );
    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $curl, CURLOPT_REFERER, 'http://translate.google.com/' );
    curl_setopt( $curl, CURLOPT_USERAGENT, 'stagefright/1.2 (Linux;Android 5.0)' );

    $output = curl_exec( $curl );    

    curl_close( $curl );

    if( $output === false ) { 
        return false;
    }

    $fp = fopen( $file, 'wb' );
    fwrite( $fp, $output );
    fclose( $fp );

    return true;
}

$word = "I%20love%20Oxana%20very";

$file  = md5( $word ) . '.mp3';

if ( !file_exists( $file ) ) {
    $url = 'http://translate.google.com/translate_tts?ie=UTF-8&q=' . $word . '&tl=en&tk=176153.295002&client=t';
    downloadMP3( $url, $file );
}
	
?>