# map

- slice、map、function 不能作为 key

- struct 类型不包含以上字段也可以做 key

```go
// map[keyType] valueType { key: value }
m := map[string] string {
    "name": "ccmouse",
}

for k,v := range m {
    fmt.Println(k,v)
}

// 获取值
name := m["name"]
age := m["age"] // 空
if name,ok := m["name"]; ok {
    fmt.Println(name)
} else {
    fmt.Println("key = name not exists")
}
// 删除
delete(m, "name")
```