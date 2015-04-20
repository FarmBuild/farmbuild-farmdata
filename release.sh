#!/bin/bash

git add .
git rm -r $(git ls-files --deleted) 
git commit -m 'new release'
git push origin master
./patch.sh 
npm run dist
git add .
git rm -r $(git ls-files --deleted)
git commit -m 'new release'
git push origin master

