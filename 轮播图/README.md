# 轮播图

实现了一个简易的轮播图。包括自动轮播，左右点击切换功能。

使用：

调用createSwipper即可。

参数：```container```, 用于展示图片的固定大小的容器，注意container的样式需要自定义。建议设置：

```css
width: 500px;
height: 300px;
overflow: hidden;
position: relative;
```

```imgSrcs```, 数组形式，由图像的地址组成，如果使用本地图像的相对地址，则是相对于swipper文件的路径。

```duration```, 轮播时间（单位：毫秒），默认为2000毫秒
