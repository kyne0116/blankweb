@echo off  
:_begin
set /p _confirm=�Ƿ�����localhost���ػ�����ṹ(y/n) :  
if %_confirm%==y goto _default
if %_confirm%==Y goto _default
if %_confirm%==n goto _chose  
if %_confirm%==N goto _chose  
goto _begin

:_default  
echo mvn hibernate3:hbm2ddl --> ddl.log
call mvn hibernate3:hbm2ddl --> ddl.log
goto _end
 
:_chose
set /p _profile=������pom�ļ������profile��  
echo ��������%_profile% ������ṹ
echo mvn hibernate3:hbm2ddl -P%_profile% --> ddl.log
call mvn hibernate3:hbm2ddl -P%_profile% --> ddl.log

:_end
pause