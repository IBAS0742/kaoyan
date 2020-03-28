package utils

import (
	"fmt"
	"strconv"
	"strings"
	
	"os"
	"os/exec"
	"syscall"
)

type EqBar struct {
	Total int
	Percent int
	Size int
}
func (eb * EqBar)ShowPlusOne() {
	eb.Percent++
	eb.Show()
}
func (eb EqBar)Show() {
	str := "[" + eqBar(eb.Size * eb.Percent / eb.Total, eb.Size) + "] " +
		strconv.Itoa(100 * eb.Percent / eb.Total) + "%"
	fmt.Printf("\r%s", str)
}
func (eb * EqBar)ShowNumPlusOne() {
	eb.Percent++
	eb.ShowNum()
}
func (eb EqBar)ShowNum() {
	cur := eb.Size * eb.Percent / eb.Total
	str := "[" + eqBar(cur, eb.Size) + "] " +
		strconv.Itoa(eb.Percent) + "/" + strconv.Itoa(eb.Total)
	fmt.Printf("\r%s", str)
}
func eqBar(count, size int) string {
	str := ""
	for i := 0; i < size; i++ {
		if i < count {
			str += "="
		} else {
			str += " "
		}
	}
	return str
}


/// color 
type Color struct {
	Black        int // 黑色
	Blue         int // 蓝色
	Green        int // 绿色
	Cyan         int // 青色
	Red          int // 红色
	Purple       int // 紫色
	Yellow       int // 黄色
	Light_gray   int // 淡灰色（系统默认值）
	Gray         int // 灰色
	Light_blue   int // 亮蓝色
	Light_green  int // 亮绿色
	Light_cyan   int // 亮青色
	Light_red    int // 亮红色
	Light_purple int // 亮紫色
	Light_yellow int // 亮黄色
	White        int // 白色
}
var (
	kernel32    *syscall.LazyDLL  = syscall.NewLazyDLL(`kernel32.dll`)
	proc        *syscall.LazyProc = kernel32.NewProc(`SetConsoleTextAttribute`)
	CloseHandle *syscall.LazyProc = kernel32.NewProc(`CloseHandle`)

	// 给字体颜色对象赋值
	FontColor Color = Color{0, 1, 2, 3, 4,
		5, 6, 7, 8,
		9, 10, 11, 12,
		13, 14, 15}
)
func ColorPrint(s string, i int) {
	handle, _, _ := proc.Call(uintptr(syscall.Stdout), uintptr(i))
	print(s)
	CloseHandle.Call(handle)
}