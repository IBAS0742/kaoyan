# dart 环境配置(web 开发)

> 1. 安装 choco

```batch
::管理员运行
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

> 2. 安装 dart sdk

```batch
:: 不能翻墙
choco install dart-sdk
```