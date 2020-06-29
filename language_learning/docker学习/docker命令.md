# [docker 命令](http://www.runoob.com/docker/docker-command-manual.html)

- ps 

```bash
docker ps
```

![](./pic/ps.png)

- run

```bash
docker run ubuntu:15.10 /bin/echo "Hello world"

docker run -i -t ubuntu:15.10 /bin/bash

docker run -d ubuntu:15.10 /bin/sh  -c "while true; do echo hello world; sleep 1; done"
# 返回一个 id ，用于控制

docker run -d -p 80:80 --name webserver nginx
# 运行一个nginx服务并将 80 端口映射主机的 80 端口
```

![](./pic/ubuntu_hello_word.jpg)

```run``` 运行一个容器

```unbutn:15.10``` 运行 ```ubuntu``` 的 

```15.10``` 版本容器，该容器会在本地查找，找不到再从 [docker hub](https://hub.docker.com/_/ubuntu) 进行下载

```/bin/echo "Hello world"``` 执行的bash命令

```-i``` 允许对容器内的标准输入(stdin)进行交互

```-t``` 在容器中指定一个终端

```-d``` 后台模式运行容器

```--name``` docker 执行时会默认为镜像命名，这里可以人为指定名称，方便使用

- logs 查看容器执行过程的输出

- stop 停止容器

- stats 查看运行状态

- top 查看进程

- images 查看镜像

- pull 创建镜像 

```bash
docker pull ubuntu:15.10
```

- search 查找镜像

- commit 提交容器

```bash
docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2
```

```-a="runoob"``` 镜像的创建者

```e218edb10161``` 镜像的 id

```runoob/ubuntu:v2```镜像的名称:标签

![](./pic/docker_commit.jpg)

- build 构建镜像

```bash
docker build -t runoob/centos:6.7 .
```

```-t runoob/centos``` 表示要创建的目标镜像的名称

```.``` 表示当前目录，使用当前目录下的 ```Dockerfile``` 文件进行构建

```Dockerfile
# 镜像来源
FROM    centos:6.7
# 
MAINTAINER      Fisher "fisher@sudops.com"

# 执行的修改
RUN     /bin/echo 'root:123456' |chpasswd
RUN     useradd runoob
RUN     /bin/echo 'runoob:123456' |chpasswd
RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
# 暴露的端口
EXPOSE  22
EXPOSE  80
CMD     /usr/sbin/sshd -D
```

- tag 设置镜像的标签

```bash
docker tag 860c279d2fec runoob/centos:dev
```

- 端口映射

```-P(大写)``` 将镜像中的端口随机映射到主机的高端口

```-p(小写)``` 指定端口映射

```-p protA:protB``` ```portA``` 是主机使用的端口，```portB``` 是镜像中要被映射的端口

```bash
docker run -d -P --name webserver nginx
docker run -d -p 80:80 --name webserver nginx
```

> 端口映射默认是 tcp，udp 需要添加说明

```bash
docker run -d -p 80:80/udp --name webserver nginx
```

- port 可以查看映射情况

```bash
docker port docker_img_id 5000
```

```docker_img_id``` 在跑的 docker 镜像 id

```5000``` 该镜像中暴露的端口
