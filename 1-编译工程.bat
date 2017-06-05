@echo off  
:_begin
set /p _confirm=是否编译localhost本地环境(y/n) :  
if %_confirm%==y goto _default
if %_confirm%==Y goto _default
if %_confirm%==n goto _chose  
if %_confirm%==N goto _chose  
goto _begin

:_default  
echo mvn compile
call mvn compile
goto _end
 
:_chose
set /p _profile=请输入pom文件定义的profile：  
echo 正在编译%_profile% 环境
echo mvn compile -P%_profile%
call mvn compile -P%_profile%

:_end
pause