@echo off

echo Running JSLINT on %1

java -jar .\build\tools\rhino.jar .\build\tools\fulljslint.js %1
