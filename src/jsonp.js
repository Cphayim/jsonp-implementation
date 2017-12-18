/*
 * @Author: Cphayim 
 * @Date: 2017-12-18 14:27:12 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-12-18 14:28:14
 */

/**
 * @var {number} count
 */
let count = 0

/**
 * @function noop
 */
function noop() { }

/**
 * 发起一个 jsonp 请求
 * @function jsonp
 * @param {string}                url   
 * @param {object | function}     [data] 
 * @param {object | function}     [opts] 
 * @param {function}              [fn] 
 * @returns Promise instance
 */
export default function jsonp(url, data, opts, cb) {

  if (!url || typeof url !== 'string') {
    throw Error('jsonp: 需要一个 string 类型的 url 参数')
  }

  // 若第二个参数是回调，忽略第三个参数
  if (typeof data === 'function') {
    cb = data
    opts = {}
  }
  if (typeof opts === 'function') cb = opts

  if (!data) data = {}
  if (!opts) opts = {}

  /**
   * @var {string}  param     接收 jsonp 函数名的字段名
   * @var {string}  prefix    定义的前缀
   * @var {string}  id        定义的函数名 [默认为 prefix + count]
   * @var {number}  timeout   超时时长(毫秒)，为 0 时不设置超时
   */
  const param = opts.param || 'callback',
    prefix = opts.prefix || 'jsonp',
    id = opts.name || prefix + count++,
    timeout = ~~opts.timeout ? opts.timeout : 60000

  const queryString = getQueryString(data)

  url += `${url.indexOf('?') === -1 ? '?' : '&'}${param}=${id}${queryString ? '&' + queryString : ''}`

  let timer, script

  /**
   * @function clean
   */
  function clean() {
    if (script && script.parentNode) {
      script.parentNode.removeChild(script)
    }
    window[id] = noop
    clearTimeout(timer)
  }

  /**
   * @function mount
   */
  function mount() {
    script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
  }

  mount()

  return new Promise((resolve, reject) => {
    /**
     * 添加超时处理
     */
    if (timeout) {
      timer = setTimeout(() => {
        clean()
        const err = new Error('jsonp: request timeout!')
        if (typeof cb === 'function') cb(err)
        reject(err)
      }, timeout)
    }

    /**
     * 添加全局函数，等待脚本返回调用
     */
    window[id] = data => {
      clean()
      if (typeof cb === 'function') cb(null, data)
      resolve(data)
    }
  })
}

/**
 * 将参数对象转为查询字符串
 * @param   {object}   data
 * @returns
 */
function getQueryString(data) {
  let queryString = ''

  const keys = Object.keys(data)

  keys.forEach(key => queryString += `&${key}=${encodeURIComponent(data[key])}`)

  return queryString ? queryString.slice(1) : ''
}