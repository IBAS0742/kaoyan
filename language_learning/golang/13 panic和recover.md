
```go
func tryRecover() {
    def func() {
        r := recover()
        if err,ok := r.(error); ok {
            fmt.Println("Error occurred", err)
        } else {
            panic(r)
        }
    } ()    // 要执行这个函数
    b := 0
    a := a / b
    fmt.Println(a)
}
```