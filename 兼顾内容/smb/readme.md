# SMB 

> [微软官方文档](https://docs.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview)

> [微软官方关于 MS-CIFS 协议说明](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-cifs/d416ff7c-c536-406e-a951-4f04b2fd1d2b)

- 可以下载 ```pdf```、```docx```、```errata```、```diff``` 格式文档离线阅读

- pdf 文档有 760+ 页

> [nodejs 实现的包](https://www.npmjs.com/package/smb2)

- 基于 ```ntlm``` 实现

- 个人认为实现上不完整，部分测试无法通过

```javascript
/**
 * 简单测试
 * npm -i smb2
 * 创建一个 main.js 文件内容如下
 * node main.js 运行
 */
// load the library
var SMB2 = require('smb2');
 
// create an SMB2 instance
var smb2Client = new SMB2({
    share:'\\\\ip\\path',
    domain:'DOMAIN',
    username:'username',
    password:'password'
});
```



