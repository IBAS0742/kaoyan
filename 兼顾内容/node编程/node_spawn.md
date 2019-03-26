## spawn 子进程创建和监听

创建文件夹，文件夹下有以下文件

> a.py

> a.py.js

```python 2 -- a.py
#!/usr/bin/python
# -*- coding: UTF-8 -*-
# a.py
import sys,os
import time
sys.stdout.write("fileName" + sys.argv[0]);
sys.stdout.flush();
for i in range(1, len(sys.argv),2):
    time.sleep(int(sys.argv[i]));
    sys.stdout.write("param " + str(i) + ' ' + sys.argv[i + 1]);
    sys.stdout.flush();
raise BaseException('test exception');
```

```cmd
:: 在 终端 测试 a.py 脚本
python a.py 3 first 2 second 1 third
:: 输出
::fileNamea.pyparam 1 firstparam 3 secondparam 5 thirdTraceback (most recent call last):
::  File "a.py", line 11, in <module>
::    raise BaseException('test exception');
::BaseException: test exception
```

```Javascript -- Node v10.14.0 -- a.py.js
// a.py.js
const spawn = require('child_process').spawn;
var pythonA = spawn('python', ['a.py','3','first','2','second','1','third']);

pythonA.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pythonA.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

pythonA.on('close', (code) => {
  console.log(`child process exit code : ${code}`);
});
```

```cmd
:: 在 终端 测试 a.py.js 脚本
node a.py.js
:: 输出
:: stdout: fileNamea.py
:: stdout: param 1 first    (三秒后输出)
:: stdout: param 3 second   (两秒后输出)
:: stdout: param 5 third    (一秒后输出)
:: stderr: Traceback (most recent call last):
::   File "a.py", line 11, in <module>
::     raise BaseException('test exception');
:: BaseException: test exception
:: 
:: child process exit code : 1
```