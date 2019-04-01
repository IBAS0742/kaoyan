# docker安装(win 10)

- [参考链接](https://blog.csdn.net/hunan961/article/details/79484098#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87)

- [参考链接失效可用](./pic/docker安装.md.png)

## 1. 环境准备

1. 开启虚拟化，可能需要在 bios 中开启。可以在 **任务管理器 -> 性能 -> CPU -> 图表下方**可以看到是否成功开启。

2. 开启 Hyper-V，在 windows 功能中开启 

## 2. 下载并安装[Docker Desktop for Windows](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe)

3. 检查安装

```
>docker --version
Docker version 18.09.2, build 6247962

>docker-compose --version
docker-compose version 1.23.2, build 1110ad01

>docker-machine --version
docker-machine version 0.16.1, build cce350d7
```