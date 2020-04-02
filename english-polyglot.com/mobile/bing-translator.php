<?php
//Einbinden der Translate-Klasse.
require_once('translate.class.php');
 
//Objekt des Translators erzeugen.
//Parameter 1: Anwendungs-ID der registrierten Anwendung.
//Parameter 2: Anwendungsschluessel der registrierten Anwendung.
$BingTranslator = new BingTranslator('7f39c785-9793-4c70-be17-e9b1b86e64a4', 'Yvio9XENl+gBY60kcBAJMZiKR9Dlkzo5BrslPvBCJeI');
 
//Uebersetzen eines Worts.
$translation = $BingTranslator->getTranslation('en', 'ru', 'but against different frames');
 
//Ausgeben des uebersetzten Worts (Hallo).
echo $translation;
?>