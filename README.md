## nodeProxy

这是一个node代理服务。

### 原理

简单来说，代理服务就是代替用户访问目标站点的服务器。对于一个前端来说最常见的用途就是跨域访问后台 API, eg: 如果前端项目部署在A.com下，而后台接口部署在B.com下。 那么你只需要在A.com域名下运行这个代理服务(记得先把代码里的服务代理url改为B.com)，那么代理服务将会 转发给B.com。

总而言之，代理服务将代替你去请求B.com的接口，然后将请求得到的数据返回给你。

![代理示意图](http://img.flura.cn/1586695254978.png)

ps: 结果了一层转发，这样明显会变慢，非不得已不要用这种解决跨域，加cors请求头才是最好的解决方式



### 效果

运行nodeProxy.js  访问localhost:/3000 我们可以看到和直接访问baidu.com的效果一模一样

![1586693745725](http://img.flura.cn/1586693745725.png)



![1586693838409](http://img.flura.cn/1586693838409.png)



![1586693906621](http://img.flura.cn/1586693906621.png)



### 代码

```
const express = require("express");
const request = require("request");
const app = express();

app.use("/", function (req, res) {
  let url = "https://www.proxy.com" + req.originalUrl; // 这就是被代理的url。填写你要代理的目标服务器
  console.log("这是被转发的url", url);
  req.pipe(request(url)).pipe(res);
});

console.log("代理服务运行");
app.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1");
```

这个 pipe 方法很神奇，正如它的名字（管道）一样，它把浏览器的请求数据传给 request 客户端，然后将目标服务器的响应数据传回浏览器。 通过这个实现转发。