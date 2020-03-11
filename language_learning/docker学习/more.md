# docker 的更多操作

- 指定 IP 范围

```cmd
docker network create --subnet=192.168.0.0/16 staticnet
docker run -d -p 27017:27017 --net staticnet --ip 192.168.0.2 mongo
docker run -d -p 7301:7301 -p 6378:6379 --net staticnet --ip 192.168.0.3 node:easyMock
```