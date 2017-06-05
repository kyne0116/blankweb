@echo off  
:_begin
set /p _confirm=是否运行localhost本地环境(y/n) :  
if %_confirm%==y goto _default
if %_confirm%==Y goto _default
if %_confirm%==n goto _chose  
if %_confirm%==N goto _chose  
goto _begin

:_default  
echo mvn jetty:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true --> jetty.log
call mvn jetty:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true --> jetty.log
goto _end
 
:_chose
set /p _profile=请输入pom文件定义的profile：  
echo 正在启动%_profile% 运行环境
echo mvn jetty:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true -P%_profile% --> jetty.log
call mvn jetty:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true -P%_profile% --> jetty.log

:_end
pause