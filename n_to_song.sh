#!/bin/bash

logfile="/tmp/$(cat /dev/urandom | head -n1 | md5).log"
echo "writing to $logfile"
date >> "$logfile"

n_number=1

while read -r line <&3
do
  echo "generating ${n_number}_${line}.mp3"
  notes=$(echo "$line" | grep -o .)

  str=""
  for note in $notes
  do
    case $note in

      0)
        str="${str}|0.mp3"
        ;;

      1)
        str="${str}|1.mp3"
        ;;

      2)
        str="${str}|2.mp3"
        ;;

      3)
        str="${str}|3.mp3"
        ;;

      4)
        str="${str}|4.mp3"
        ;;

      5)
        str="${str}|5.mp3"
        ;;

      6)
        str="${str}|6.mp3"
        ;;

      7)
        str="${str}|7.mp3"
        ;;

      8)
        str="${str}|8.mp3"
        ;;

      9)
        str="${str}|9.mp3"
        ;;

      A)
        str="${str}|10.mp3"
        ;;

      B)
        str="${str}|11.mp3"
        ;;

      C)
        str="${str}|12.mp3"
        ;;

      D)
        str="${str}|13.mp3"
        ;;

      E)
        str="${str}|14.mp3"
        ;;

      *)
        echo -n "case unknown"
        ;;
  esac
  done

  str="concat:${str:1}"

  mkdir -p out
  ffmpeg -i "$str" -map_metadata -1 -acodec copy "out/${n_number}_${line}.mp3" >> "$logfile" 2>&1 || echo "failed to generate ${n_number}_${line}.mp3"
  
  n_number=$((n_number + 1))
done 3<"9999_n_list.txt"

echo "all line done"

date >> "$logfile"
