@echo off  
:_begin
set /p _confirm=�Ƿ�����localhost���ػ�����ṹ(y/n) :  
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
set /p _profile=������pom�ļ������profile��  
echo ��������%_profile% ������ṹ
echo mvn dbunit:operation -P%_profile%
call mvn dbunit:operation -P%_profile%

:_end
pause