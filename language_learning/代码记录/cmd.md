* 获取当前目录下所有文件及文件夹的绝对路径
```bash
@echo off& setlocal EnableDelayedExpansion
for /f "delims=" %%a in ('dir /b') do (
    set var=%cd%\%%a
    set var=!var:\\=\!
    echo !var!
)
```