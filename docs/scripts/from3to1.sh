#!/bin/bash

# Combine one generator-fraz file from 3 separated files
# You need run this script from folder with the subfolders '1-avatar', '2-pulp-fiction' ...
# In each subfolder you must have per three .xml files: 'avatar-en','avatar-ru','avatar-tr-en'
# from wich the script will combine one file: avatar.xml
#
# See useful-shell-scripts.txt (in same folder) file for shell commands to prepare above three files before combine

from3to1() {
	echo "dir: $dir"
	name=${dir#*-}
	#name=${dir//[0-9]+-(.+[^\.])/\1}
	#name=$(echo "$dir" | sed -r "s/^[0-9]+-(.+[^\.])/\1/g")
	#echo $name
	en=$name-en.xml; ru=$name-ru.xml; tr=$name-tr-en.xml
	if [ -f "$en" ] && [ -f "$ru" ] && [ -f "$tr" ]
	then
	    all_lines=$(wc -l < $en)
	    echo $all_lines
	    new=$name.xml
	    echo $new
	    IFS=$'\n' read -d '' -r -a en_lines < "$en"
	    IFS=$'\n' read -d '' -r -a ru_lines < "$ru"
	    IFS=$'\n' read -d '' -r -a tr_lines < "$tr"
	    #echo  "$en_lines"
	    for (( j=0; j<="$all_lines"; j++ ))
	    do
		#echo $j
	    	if [ "$j" -eq 0 ]; then
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' > $new
			echo "<m>" >> $new
		elif [ "$j" -gt 1 ] && [ "$j" -lt $((all_lines-1)) ]; then
			echo -e "\t<d>" >> $new
			local zero=${en_lines[$j]#*>}
			echo -e "\t\t<a>${zero%<*}</a>" >> $new
			#echo -e "\t${en_lines[$j]}" >> $new
			local first=${ru_lines[$j]#*>}
			echo -e "\t\t<b>${first%<*}</b>" >> $new
			local second=${tr_lines[$j]#*>}
			echo -e "\t\t<c>${second%<*}</c>" >> $new
			#echo -e "\t${ru_lines[$j]}" | sed -r "s/<a>(.+)<\/a>/<b>\1<\/b>/g" >> $new
			#echo -e "\t${tr_lines[$j]}" | sed -r "s/<a>(.+)<\/a>/<c>\1<\/c>/g" >> $new
			echo -e "\t</d>" >> $new
		elif [ "$j" -eq "$all_lines" ]; then
			echo "</m>" >> $new
		fi
	    done
	#echo $en $ru $tr
	cd ..
	fi
}

declare -a films=("1-avatar" "2-pulp-fiction" "3-no-country-for-old-men" "4-carnage" "5-matrix" "6-beowulf")

filmslength=${#films[@]}
#filmslength=1

for (( i=0; i<${filmslength}; i++ ))
do
    dir=${films[$i]}
    if [ -d "$dir" ]
    then
         cd -- "$dir" && from3to1
    else
	 echo "no dir"
    fi
    
    #echo "index: $i, value: ${films[$i]}"
done


