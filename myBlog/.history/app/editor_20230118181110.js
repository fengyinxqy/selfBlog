import Editor from 'wangeditor'
import $ from 'jquery'
import store from 'store'
import Http from './http'

const pubKeyName = 'ua_publicKay'
const tokenName = "ua_jot"
const URL = 'http://127.0.0.1:3000/upload/article'

export default class Edite {
  constructor() {
    this.editor = null
  }
  init(ele = '.blog-write--wrap') {
    this.editor = new Editor(ele)
    this.editor.config.focus = false
    this.editor.config.zIndex = 1000
    this.upload()
    this.create()
  }

  upload() {
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 1
    this.editor.config.uploadFileName = 'file'
    this.editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${store.get(tokenName)}`,
    }
  }

  create() {
    this.editor.create()
  }

}