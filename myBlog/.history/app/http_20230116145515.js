import axios from 'axios'
import JSEncrypt from 'jsencrypt'
import store from 'store'
import Message from './message'
//


const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const pubKeyName = 'ua_publicKay'
const tokenName = "ua_jot"

const REQUEST_MAP = {
  'register': {
    withToken: false,
    url: 'admin/register',
    method: 'POST',
    rsaKey: 'password'
  },
  'user': {
    withToken: false,
    url: '/user',
    method: 'POST'
  },
  'login': {
    withToken: false,
    url: 'admin/login',
    method: 'POST',
    rsaKey: 'password'
  },
  'pubKey': {
    withToken: false,
    url: '/keys',
    method: 'GET'
  },
  'articles': {
    withToken: false,
    url: '/api/rest/articles',
    method: 'GET'
  },
  // 'postArticle': {
  //   withToken: true,
  //   url: '/api/rest/articles',
  //   method: 'POST'
  // },
  // 'getArticleById': {
  //   withToken: false,
  //   rest: true,
  //   url: '/api/rest/articles/:id',
  //   method: 'GET'
  // },
  'columns': {
    withToken: false,
    url: '/api/rest/columns',
    method: 'GET'
  }
}

function encrypt(publicKey, value) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value)
}


axios.defaults.baseURL = BASEURL;

export default class Http {
  constructor({ type = 'user', data = {} } = {}) {
    this.type = type
    this.data = data
    this.request = axios.create({ timeout: TIMEOUT })
    this.init()
  }

  init() {
    let type = this.type
    if (!(type in REQUEST_MAP)) {
      return false;
    }
    Object.assign(this, REQUEST_MAP[type])
    if (this.withToken === true) {
      //如果需要Token 配置实例默认请求头 添加token
      this.request.defaults.headers.common['Authorization'] = `Bearer ${store.get(tokenName)}`;
    }
    //添加拦截器
    this.interceptors()
  }

  async send() {
    let { url, method, data } = this
    try {
      let result = await this.request[method?.toLowerCase()](url, data)
      return result
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async interceptors() {
    let rsaKey = this.rsaKey
    //请求拦截
    this.request.interceptors.request.use(async (config) => {
      let data = config.data
      //如果存在需要加密的 data 键
      console.log(rsaKey)
      if (rsaKey in data) {
        //加密处理
        data[rsaKey] = await this.encrty(data[rsaKey])
      }
      data = JSON.stringify(data)

      return config;

    }, (error) => {

      return Promise.reject(error);
    });
    // 添加响应拦截器
    this.request.interceptors.response.use((response) => {
      //剥离最外层
      let result = response.data
      //p判断任务状态码 是否 为正常 正常为200
      if (result.statusCode !== 200) {
        console.warn('错误信息:', result.errMsg)
        return result?.data;
      }
      //拦截登录成功 后的token
      if (this.type === 'login' || this.type === 'register') {
        let token = result.data.token;
        //本地存储token
        store.set(tokenName, token)
      }
      console.log('成功信息:', result.errMsg)
      return result?.data;
    }, (error) => {
      // 对响应错误做点什么
      console.log(error)
      let message = error.response.data.message
      new Message(message).danger()
      return Promise.reject(error);
    });

  }

  async encrty(word) {
    let key = store.get(pubKeyName)
    if (!key || key === 'undefined') {
      key = await this.getPubKey()
    }
    return encrypt(key, word)
  }

  async getPubKey() {
    let key;
    let { method, url } = REQUEST_MAP['pubKey']
    try {
      let result = await axios[method.toLocaleLowerCase()](url)
      result = result.data
      key = result.data.pubKey
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      store.set(pubKeyName, key)
    } catch (err) {
      let message = error.response.data.message
      new Message(message).danger()
    }
    return key
  }


}