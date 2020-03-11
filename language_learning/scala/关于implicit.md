# implicit 隐式定义

> 要求

- 只能定义到 ```trait``` ```class``` ```object``` 内

- 定义到参数时只能使用一次

```scala
implicit class RichDate(date: java.util.Date) // 可行!
implicit class Indexer[T](collecton: Seq[T], index: Int) // 不可行!
implicit class Indexer[T](collecton: Seq[T])(implicit index: Index) // 可行!
```

- 在一个作用范围内不能和类、方法、变量重名

> 使用说明

- 定义类型转换

```scala
implicit def string2Int(v:String):Int = {
    v.length * 2
};
+ "ibas"
// 8
```

- 定义扩展方法（语法糖）

```scala
implicit class intWithTimes(x: Int) {
    def times[A](f: => A):Unit = {
        def loop(current:Int):Unit = {
            if (current > 0) {
                f
                loop(current - 1);
            }
        }
        loop(x);
    }
    def go[A](f: => A):Unit = {
        f
        println(x);
    };
    def toPlus(y : Int):Int = {
        x + y
    }
}
// int 上就可以挂载两个方法 times 和 go
// 2 times println(1)
2.times(println(1))
// 1
// 1

// 2 go println(2)
2.go(println(2))
// 2
// 2

2 toPlus 4
// 6
```

```scala
implicit class ExtendedInt(val value: Int) extends AnyVal {
  def plus(other:Int) = value + other
}
1 plus 2
// 3
```