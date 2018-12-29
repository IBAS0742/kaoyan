# 安装 fabric

> 使用虚拟机安装 fabric 1.4

> 虚拟机系统 centos 7.4 [下载地址](http://vault.centos.org/7.4.1708/isos/x86_64/CentOS-7-x86_64-Minimal-1708.iso)

- fabric 版本 1.4

> - 安装基本环境
> - [参考文档](https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html)

>> - 安装 curl
```bash
yum install -y curl
```

>> - 安装 docker 18.03.0-ce

>>> - 我网络问题，使用了 rpm 安装

>>> - docker-ce 18.03.0 [下载地址](https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-18.03.0.ce-1.el7.centos.x86_64.rpm)

>>> - docker-compose [下载地址](https://github.com/docker/compose/releases/download/1.20.1/docker-compose-Linux-x86_64)

```bash
# rpm 包安装
yum install docker-ce-18.03.0.ce-1.el7.centos.x86_64.rpm
```

```bash
# 网络好采用该方法
# 删除就版本
yum remove docker \
    docker-common \
    docker-selinux \
    docker-engine
# 安装一些必要的内容
yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
# 添加源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 查看有哪些可用的版本
yum list docker-ce --showduplicates | sort -r
# 安装（官方要求是 17.06.2 及以上）
yum install -y docker-ce-18.03.0.ce-1.el7.centos
```

>>> - 启动 docker
```bash
service docker start
```

```bash
# 安装 docker-compose （官方要求是 1.14.0 及以上）
# 该步骤如果无法连接到，可以考虑下载后上传到虚拟机，然后解药到 /usr/local/bin/docker-compose 目录即可得到同样的效果
sudo curl -L https://github.com/docker/compose/releases/download/1.20.1/docke-compose-` uname -s`-` uname -m` -o /usr/local/bin/docker-compose
# 将 docker-compose 复制到 /usr/bin 中
cp /usr/local/bin/docker-compose /usr/bin
# 检查 docker-compose 是否完成安装
docker-compose --version
```

>>> - 检查 docker-compose 时可能会失败

```bash
docker-compose --version
# bash: /bin/docker-compose: 权限不够
# 添加权限
chmod +x /usr/local/bin/docker-compose
chmod +x /bin/docker-compose
```

>> - 继续安装 go

```bash 
# 官方要求（1.11.x）
# 安装 wget
yum install -y wget 
# 下载（我是用了服务器上传）
wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz
# 解药到 /usr/local
tar -C /usr/local/ -xzf go1.11.linux-amd64.tar.gz 
# 修改 /etc/profile 文件
vi /etc/profile
# 在文件最底下添加 
# export GOPATH=/opt/gopath
# export PATH=$PATH:/usr/local/go/bin:$GOPATH

# 更新环境
source /etc/profile
# 检查 go 是否安装
go version
```

>> - 继续安装 Node 8.15 和 NPM 6.4.1

```bash
# node （官方要求 8.x，npm 5.6.0）
# 暂停安装（吐槽一下，后面进行实例时，官方要求node版本是 8.9 - 9.0）
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

>> - python (系统自带了 2.7 ，无需其他)

> - 安装 fabric

>> - 到 fabric 官方 GitHub 上下载 [fabric-samples](https://github.com/hyperledger/fabric-samples/tree/v1.4.0-rc2)

>> - 解压后上传到服务器（我是用 FileZilla）

>> - 安装 Fabric Samples 和 二进制文件

```bash
# cd 到要按照的位置
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s 1.4.0-rc2
```

```bash
#我打算将内容放到 /usr/local/fabric 下
mkdir /usr/local/fabric
cp bin /usr/local/fabric/bin
# 修改 /ect/profile 文件，将刚刚添加的最后一句话修改为
export PATH=$PATH:/usr/local/fabric/bin:/usr/local/go/bin:$GOPATH
# 更新环境
source /etc/profile
```

>>> - 修改 node 版本

```bash
wget http://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.gz
tar zxvf node-v8.9.4-linux-x64.tar.gz
mv node-v8.9.4-linux-x64 /usr/local/
mv /usr/local/node-v8.9.4-linux-x64 /usr/local/node
# 修改 /etc/profile
export NODE_HOME=/usr/local/node
export PATH=$PATH:$NODE_HOME/bin:/usr/local/fabric/bin:/usr/local/go/bin:$GOPATH
# 更新环境
source /etc/profile
```