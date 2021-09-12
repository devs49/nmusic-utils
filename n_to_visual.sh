#!/bin/bash

n_number=1

while read -r line <&3
do
  echo "generating ${n_number}_${line}.svg"
  
  mkdir -p out
  node gen_svg.js "$line" > "out/${n_number}_${line}.svg" || echo "failed to generate ${n_number}_${line}.svg"
  
  n_number=$((n_number + 1))
done 3<"9999_n_list.txt"

echo "all line done"
