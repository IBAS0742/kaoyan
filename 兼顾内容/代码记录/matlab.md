## 记录 matlab 的所有骚操作

> 一般操作

```matlab
% 文件名，字符串拼接
for i = 1 : 10
    fileName = ['c:\tmp\',num2str(i),'.txt'];
end
```

> 常见非专业要求函数

| 函数 | 功能 |
|--|--|
| num2str | 将数字转为字符串 |
| meshgrid | 生成网格采样点（见例子） |
| max/min | 计算最大/小值（见例子，有重点） |
| exist | 判断文件是否存在 |
| nanmean | 计算包含 nan 数组的平均值 |
| eval | 运行表达式(同 js) |
| rot90(A,n) | 逆时针旋转矩阵A,n个90° |
| hist | 计算数值分布直方图(可以统计图像的像素分布) |
| pie([1,2,3,4]) | 绘制饼图 |
| subplot(a,b,c) | 绘制多个子图 |
| load | 加载 mat 文件 |

- subplot(a,b,c) a,b 表示将界面划分为 a*b 份，现在在第 c 份上绘制图像 

- 以下是例子

```matlab
% 关于 meshgrid
a = 1:3;b = 1 : 2 : 5;
[aa,bb] = meshgrid(a,b);
aa = [
1     2     3
1     2     3
1     2     3]
bb = [
1     1     1
3     3     3
5     5     5]

% 关于 max/min
a = rand(3,3,2);
% 获取矩阵 a 的第 n 维的最大值
max(a,[],n);
```

> 对栅格的操作

```matlab
% 读取一个栅格文件，并获取地理信息
[v,R] = geotiffread('文件名');
% 写一个栅格文件
geotiffwrite('文件名', 矩阵,R);
```

> 对于矢量

| 函数 | 作用 |
| -- | -- |
| inpolygon | 判断点是否在一个多边形里面 |

```matlab
% 读取矢量文件
S=shaperead(shpName);
% 便利矢量中的每个 要素
for ii = 1:numel(S)
    %获取适量的 extent
    S(ii).BoundingBox;
    SS(i).('字段名') = 赋值/获取;

    % xlanbel 一个点的x坐标
    % ylanbel 一个点的y坐标
    % SS(i).X 如果矢量是 面 ，这里是x的点集
    % SS(i).Y 如果矢量是 面 ，这里是y的点集
    inpolygon(xlanbel,ylabel,SS(i).X,SS(i).Y);
end
```



