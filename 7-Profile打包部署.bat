@echo off  

set /p _profile=������pom�ļ������profile��  
echo mvn clean install -Dmaven.test.skip=true -P%_profile%
call mvn clean install -Dmaven.test.skip=true -P%_profile%

pause