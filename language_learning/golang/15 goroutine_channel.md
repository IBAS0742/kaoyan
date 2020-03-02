# 并发编程

```go
func main() {
    var a [10]int
    for i := 0;i < 10;i++ {
        go func() {
            a[i]++
            // go 开启的是携程，如果不主动交出控制权
            // 携程将一直执行，不会主动停下来
            runtime.Gosched()
        }
    }
    // 如果不加这一行，for执行完就退出了，
    // for 里面的 gorutine 就没机会执行
    time.Sleep(time.Milliscond)
    fmt.Println(a)
}
```

- go 交出控制权可能的操作

```
1. I/O,select
2. channel
3. 等待锁
4. 函数调用（有些时候）
5. runtime.Gosched()
```

# channel

```
func chanDemo() {
    c := make(chan int)
    go func() {
        for {
            d := <- c
            fmt.Println(d)
        }
    }()
    c <- 1
    c <- 2
    time.Sleep(time.Milliscond)
}
```

- 定义只能发数据的 channel

> chan<- int // 指定 channel 只能收数据，数据类型是 int

> <-chan int // 指定 channel 只能发数据，不能收数据

```go
func createWork(id int) chan<- int {
    c := make(chan int)
    go func() {
        for {
            // 这里是唯一可以收数据的地方
            fmt.Printf("Worker %d received %c\n",
            id, <- c);
        }
    }
    return c
}

func testCreateWork() {
    c := createWork(0)
    c <- 1
    n := <- c // 这个会报错，因为 c 只能发数据
}
```

- channel 如果收到数据没有及时收走是会报错的

> 可以通过定义缓冲区来解决

```go
c := make(chan int)
c <- 1
// 单纯执行上面内容会报错，因为没有定义一个接数据的方法

c := make(chan int,3)
c <- 1
c <- 2
c <- 3
// 上面这种不会报错，因为定义了大小为三的缓冲区
c <- 4
// 再加一个就会报错了
```

- channel 可以在执行结束后告诉接收方

```go
c := make(chan int)
go func() {
    for {
        if n,ok <- c;
        ok {
            fmt.Print(n)
        } else {
            break;
        }
    }
} ()
// 或者使用以下这个方法
// go func() {
//     for n := range c {
//         fmt.Print(n)
//     }
// } ()
c <- 1
c <- 2
c <- 3
close(c)
```

- 开启多个 goruntine 后用 channel 来共享数据，如果想判断执行结束，可以使用以下方法

```go
var wg sync.WaitGroup
c := make(chan int)
go func() {
    for n := range c {
        fmt.Print(n)
        // 任务数减一
        wg.Done()
    }
}
for i := 1;i < 10;i++ {
    c <- i
    // 任务数加一
    wg.Add(1)
}
// 等待任务完成
wg.Wait()
```

- select

```go
func main() {
    var c1,c2 chan int
    select {
        case n := <- c1 :
            fmt.Println("Received from c2",n)
        case n := <- c2 :
            fmt.Println("Received from c2",n)
        default:
            fmt.Print("No value")
    }
}
```