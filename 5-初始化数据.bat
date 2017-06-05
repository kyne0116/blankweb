@echo off  
:_begin
set /p _confirm=是否生成localhost本地环境表结构(y/n) :  
if %_confirm%==y goto _default
if %_confirm%==Y goto _default
if %_confirm%==n goto _chose  
if %_confirm%==N goto _chose  
goto _begin

:_default  
echo mvn dbunit:operation
call mvn dbunit:operation
goto _end
 
:_chose
set /p _profile=请输入pom文件定义的profile：  
echo 正在生成%_profile% 环境表结构
echo mvn dbunit:operation -P%_profile%
call mvn dbunit:operation -P%_profile%

:_end
pause