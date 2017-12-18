# jsonp-implementation

cy-jsonp 实现了一个简易的 jsonp 库

## 安装

使用 npm 

```shell
$ npm install cy-jsonp --save
```

之后在您的项目中导入模块


```javascript
import jsonp from 'cy-jsonp'
// or 
// const jsonp = require('cy-jsonp')
```

或在浏览器直接引入 `dist/jsonp.js`

```html
<script src="xxxx/dist/jsonp.js"></script>
```

## API
#### `jsonp(url [, data ,opts ,cb])`

jsonp 函数将返回一个 promise 实例

* `url`: {string} 请求地址
* `data`: {object} 可选，请求需要传递的参数，将被转换为 `queryString`
* `opts`: {object} 可选，配置项
    * `param`: {string} 指定回调函数名的键(字段名)，默认为 `"callback"`
    * `prefix`: {string} 指定自动生成的回调函数名前缀，默认为 `"jsonp"`
    * `name`: {string} 指定回调函数名(作为 param 的值)，默认为 `prefix + count`（count 为内部计数器）
    * `timeout`: {number} 设置请求超时毫秒数，默认为 `60000`，当为 `0` 时不设置超时
* `cb(err, data)`: 可选，请求成功或超时后执行的回调。该函数将在 `resolve(data)`/`reject(err)` 之前被调用

## 示例

jsonp 函数中 第2、3、4个参数都是可以省略的，也可以在第2或第3个参数中传递回调函数

1.使用 promise 的 `then/catch` 来接收响应

```javascript
jsonp('http://jsfiddle.net/echo/jsonp', {
  pageNo: 1,
  pageSize: 10,
  keyword: 'heihei'
}).then(data => {
  // TODO
}).catch(err => {
  // TODO
})
```

2.使用回调函数来接收响应

```javascript
jsonp('http://jsfiddle.net/echo/jsonp',
  {
    pageNo: 1,
    pageSize: 10,
    keyword: 'heihei'
  },
  function (err, data) {
    if(err){
      // TODO
      return
    }
    // TODO
  }
)
```

