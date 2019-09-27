# render.iconfont

可以将阿里图标库的 icon、svg、unicode 渲染到 html 的小工具

### 为什么要用这个组件？

可以利用这个小工具快速、优雅的选择自己的想要的类型（`Unicode`、`Symbol`、`Class`）来添加自己喜欢的图标。

### 为什么要用这个组件？

1.我们可以直接点击阿里的「iconfont」的下载代码

!(image)['./public/img/pic1.png']

2.找到你下载好的代码，添加到你的项目中

!(image)['./public/img/pic2.jpg']

3.记住你的路径，在你的 html 上，引入小工具

```html
<script src="./dist/min/tool.iconfont.min.js"></script>
```

4.实例化小工具

```
    new fontIcon({
      path: './example_svg',
      type: 'unicode',
      size: 30,
      selector: '.fonticon-unicode',
      className: 'icon-custom2'
    });
```

### 我们该怎么选择图标的类型？

#### 1.font-class 引用

> font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。

与 Unicode 使用方式相比，具有如下特点:

- 兼容性良好，支持 IE8+，及所有现代浏览器。
- 相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。
- 因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。
- 不过因为本质上还是使用的字体，所以多色图标还是不支持的。

#### 2.Unicode 引用

Unicode 是字体在网页端最原始的应用方式，特点是：

- 兼容性最好，支持 IE6+，及所有现代浏览器。
- 支持按字体的方式去动态调整图标大小，颜色等等
- 但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。
- 注意：新版 iconfont 支持多色图标，这些多色图标在 Unicode
- 模式下将不能使用，如果有需求建议使用 symbol 的引用方式

#### 3.Symbol 引用

这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章
这种用法其实是做了一个 SVG 的集合，与另外两种相比具有如下特点：

- 支持多色图标了，不再受单色限制。
- 通过一些技巧，支持像字体那样，通过`font-size`,`color`来调整样式。
- 兼容性较差，支持 IE9+，及现代浏览器。
- 浏览器渲染 SVG 的性能一般，还不如 png。