# Envi_read_and_write_for_matlab用法

> 可以将该文件夹加入到 matlab 的工具箱，然后每次启动都可以使用

![](./ENVI-read-and-write-for-MATLAB-master\addToPath.png)

> 使用方法可以直接看源码或者看 ```envi_test.m``` 文件

```matlab
%test script
clearvars

D=rand(2,3,4)+j*rand(2,3,4);
info=enviinfo(D);
enviwrite(D,info,'a.dat');

[D2,info2]=enviread('a.dat');

isequal(D,D2)
isequal(info,info2)

info3=info2;
info3.header_offset=10000;
D3=D2;
enviwrite(D3,info3,'a3.dat');

[D3a,info3a]=enviread('a3.dat');

isequal(D3,D3a)
isequal(info3,info3a)
```