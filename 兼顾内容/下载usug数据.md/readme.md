## 下载 usug

```cmd
wget --no-check-certificate --keep-session-cookies --save-cookies cookie.txt --user-agent={'User-agent': "Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36" } -O login.rsp https://ers.cr.usgs.gov/

wget --no-check-certificate --load-cookies cookie.txt --keep-session-cookies --save-cookies cookie.txt --user-agent={'User-agent':"Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36"} --post-data="password=zzZZ11001100&csrf_token=7T7J6A%3D%3D&username=ibas009" https://ers.cr.usgs.gov/login

wget --no-check-certificate -c -4 --load-cookies cookie.txt --user-agent={'User-agent': "Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36" } -O test.tar.gz https://earthexplorer.usgs.gov/download/12864/LC81561192017038LGN00/STANDARD/EE
```

https://earthexplorer.usgs.gov/download/10880/10/STANDARD/EE

https://earthexplorer.usgs.gov/download/10880/5834653/FRB/EE

wget --no-check-certificate --load-cookies cookies.txt --keep-session-cookies --save-cookies cookies.txt --user-agent={'User-agent': "Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36" } --post-data="password=zzZZ11001100&csrf_token=W3bUzw%3D%3D&username=ibas003" https://ers.cr.usgs.gov/login