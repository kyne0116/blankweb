@echo off  
:_begin
set /p _confirm=�Ƿ�����localhost���ػ���(y/n) :  
if %_confirm%==y goto _default
if %_confirm%==Y goto _default
if %_confirm%==n goto _chose  
if %_confirm%==N goto _chose  
goto _begin

:_default  
echo mvn tomcat7:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true --> tomcat.log
call mvn tomcat7:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true --> tomcat.log
goto _end
 
:_chose
set /p _profile=������pom�ļ������profile��  
echo ��������%_profile% ���л���
echo mvn tomcat7:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true -P%_profile% --> tomcat.log
call mvn tomcat7:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true -P%_profile% --> tomcat.log

:_end
pause