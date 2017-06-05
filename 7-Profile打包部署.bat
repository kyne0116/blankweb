@echo off  

set /p _profile=请输入pom文件定义的profile：  
echo mvn clean install -Dmaven.test.skip=true -P%_profile%
call mvn clean install -Dmaven.test.skip=true -P%_profile%

pause