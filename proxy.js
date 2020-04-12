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