#!/bin/bash

npm run dist
git add .
git rm -r $(git ls-files --deleted) 
git commit -m 'new release'
git push origin master
./patch.sh 
git push origin master

