---
author: "HearLing"
---

# 什么是跨域，怎么解决

要聊跨域，那就要先聊聊 同源策略了。

## 什么是同源策略

在浏览器安全里面我们也有讲过：

如果两个 URL 的协议、域名和端口都相同，我们就称这两个 URL 同源。两个不同的源之间若想要相互访问资源或者操作 DOM，那么会有一套基础的安全策略的制约，我们把这称为同源策略。

- DOM 层面：限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作。
- 数据层面：限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据。
- 网络层面：限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点。

所以我们通常说的跨域问题，都是同源策略对 Ajax 产生的影响。下面列举一些常见的解决跨域问题的方法：

## 代理

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/476218fe8ac54be9addf17812ada3e21~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

一图胜前言，以 vue 为例，配置：

```js
// vue 的开发服务器代理配置
// vue.config.js
module.exports = {
  devServer: {
    // 配置开发服务器
    proxy: {
      // 配置代理
      '/api': {
        // 若请求路径以 /api 开头
        target: 'http://dev.taobao.com', // 将其转发到 http://dev.taobao.com
      },
    },
  },
}
```

这样的场景就如图所示，可以用在开发环境解决跨域

## JSONP

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0206925bfde4e939756c32ae800c777~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

做法就如图所示，用 script 元素请求服务器，浏览器并不会阻止 script 元素的请求，不会产生跨域。服务器拿到请求后，响应一段 js 代码（函数 callback 调用），调用客户端预先生成好的函数，把浏览器需要的数据作为参数传给函数，从而间接传递给客户端。

缺点很明显：只能支持 GET 请求

## CORS

跨域资源共享：当浏览器需要跨域访问服务器，需要获得服务器允许。详细可以看这个 [官方解释](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)。CORS 标准对不同的场景有规范要求，这里就只列举常见的简单请求场景吧。

![](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png)

简单场景的要求：

- 使用 GET、HEAD、POST 三者之一
- 除了被用户代理自动设置的标头字段（例如 Connection、User-Agent 或其他在 Fetch 规范中定义为禁用标头名称的标头），允许人为设置的字段为 Fetch 规范定义的对 CORS 安全的标头字段集合。
  > 上述的集合：Accept、Accept-Language、Content-Language、Content-Type（需要注意额外的限制）、Range（只允许简单的范围标头值 如 bytes=256- 或 bytes=127-255）
- Content-Type 标头所指定的媒体类型的值仅限于 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded` 三者之一。
- 给定一个 XMLHttpRequest 实例 xhr，没有调用 xhr.upload.addEventListener()，以监听该上传请求。
- 请求中没有使用 ReadableStream 对象。

比如说，假如站点 `https://foo.example` 的网页应用想要访问 `https://bar.other` 的资源。foo.example 的网页中可能包含类似于下面的 JavaScript 代码：

```js
const xhr = new XMLHttpRequest()
const url = 'https://bar.other/resources/public-data/'

xhr.open('GET', url)
xhr.onreadystatechange = someHandler
xhr.send()
```

此操作实行了客户端和服务器之间的简单交换，使用 CORS 标头字段来处理权限：

![](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/simple-req.png)

上述请求报文：

```
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example //表明该请求来源于 http://foo.example
```

服务器如何响应：

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]
```

本例中，服务端返回的 Access-Control-Allow-Origin 标头的 Access-Control-Allow-Origin: \* 值表明，该资源可以被任意外源访问。。如果 `https://bar.other` 的资源持有者想限制他的资源只能通过 `https://foo.example` 来访问（也就是说，非 `https://foo.example` 域无法通过跨源访问访问到该资源），他可以设置：`Access-Control-Allow-Origin: https://foo.example`

其它需要预检和附带身份凭证的场景的可以在官方详细了解。

## 跨域请求如何携带 cookie?

这涉及到 CROS 规范中的附带身份凭证的请求，只是有一个比较好的问法。

通过 CROS 跨域设置 withCredentials 标志为 true，从而向服务器发送 Cookies。但是，也需要服务器端的响应中携带 Access-Control-Allow-Credentials: true，浏览器才会把响应内容返回给请求的发送者。

![](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cred-req-updated.png)

客户端与服务器端交互示例如下：

```
GET /resources/credentialed-content/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Referer: https://foo.example/examples/credential.html
Origin: https://foo.example
Cookie: pageAccess=2

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:34:52 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 106
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain

[text/plain payload]
```
