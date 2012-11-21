@echo off

echo Running JSHINT on %1

java -jar .\build\tools\rhino.jar .\build\tools\fulljshint.js %1
