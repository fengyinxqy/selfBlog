/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-20 14:44:56
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 12:44:48
 * @FilePath: \项目_肖祺彦_2022.12.18.33\myBlog\modules\Http.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
/* 
  接口地址管理

  

*/
const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const pubKeyName = 'ua_publicKay'
const tokenName = "ua_jot"
const REQUEST_MAP = {
  'register': {
    withToken: false,
    url: '/register',
    method: 'POST',
    rsaKey: 'pwd'
  },
  'login': {
    withToken: false,
    url: '/login',
    method: 'POST',
    rsaKey: 'pwd'
  },
  'user': {
    withToken: true,
    url: '/',
    method: 'POST'
  },
  'pubKey': {
    withToken: false,
    url: '/getPublicKey',
    method: 'GET'
  }
}


axios.defaults.baseURL = BASEURL;

function encrypt(publicKey, value) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value)
}

export default class Http {
  constructor({ type = 'user', data = {}, callback } = {}) {
    this.type = type
    this.data = data
    this.callback = callback
    this.request = axios.create({ timeout: TIMEOUT })
    this.init()
  }

  init() {
    let type = this.type
    /* 如果没有就终止 */
    if (!(type in REQUEST_MAP)) {
      return false
    }
    // 复制一份对象
    Object.assign(this, REQUEST_MAP[type])
    if (this.withToken === true) {
      this.request.defaults.headers.common['Authorization'] = `Bearer ${store.get(tokenName)}`;
    }
    // 添加拦截器
    this.interceptors()
    // 发送请求
    this.send()
  }

  async send() {
    let { url, method, data } = this
    try {
      let result = await this.request[method?.toLowerCase()](url, data)
      result && this.callback(result)
    } catch (error) {
      console.log(error)
    }
  }

  async interceptors() {
    let rsaKey = this.rsaKey
    this.request.interceptors.request.use(async (config) => {
      let data = config.data
      if (rsaKey in data) {
        data[rsaKey] = await this.encrty(data[rsaKey])
      }
      data = JSON.stringify(data)
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    // 添加响应拦截器
    this.request.interceptors.response.use((response) => {
      let result = response.data
      if (result.statusCode !== 200) {
        console.warn('错误信息:', result.errMsg)
        return result?.data
      }
      if (this.type === 'login') {
        let token = result.data.token
        store.set(tokenName, token)
      }
      console.log('成功信息:', result.errMsg)
      return result?.data
    }, (error) => {
      return Promise.reject(error)
    })
  }
  redirect() {

  }
  // 加密
  async encrty(word) {
    let key = store.get(pubKeyName)
    if (!key || key === 'undefined') {
      key = await this.getPubKey()
    }
    return encrypt(key, word)
  }

  // 获取公钥
  async getPubKey() {
    //本地获取pubkey
    let key;
    try {
      let result = await axios.get('/getPublicKey')
      result = result.data
      if (result.statusCode === 200) {
        key = result.data.pubKey
        key = key.replace(/\. +/g, '')
        key = key.replace(/[\r\n]/g, '')
        store.set(pubKeyName, key)
      }
    } catch (err) {
      console.log(err)
    }
    return key
  }
}