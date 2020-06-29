# HTTP

```go
func main() {
    resp,err := http.Get("url")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    s,err := httputil.DumpResponse(resp,true)
    if err != nil {
        panic(err)
    }
    fmt.Println(s)
}

// 设置访问头部
func main() {
    request,err := http.NewRequest(
        http.MethodGet,
        "url",nil)
    request.Header.Add("User-Agent","")
    resp,err := http.DefaultClient.Do(request)
    ....同上
}

func main() {
    client := http.Client{
        CheckRedirect: func(
            req *http.Request,
            vai []*http.Request) error {
                fmt.Println("Redirect:",req)
                return nil
            },
        )
    }
    resp,err := Client.Do(request)
    ....同上
}
```

- 可以添加一个 "net/http/pprof" 来监测服务的性能

```go
import {
    _ "net/http/pprof"
}
```