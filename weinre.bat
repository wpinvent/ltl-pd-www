@echo off

echo Running weinre via node...
echo To stop it, kill the node.exe tasks in taskmgr, or try using tasklist/taskkill Windows utilities

node node_modules\weinre\weinre --boundHost -all-
