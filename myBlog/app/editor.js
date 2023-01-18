/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-18 17:29:15
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-18 18:11:11
 * @FilePath: \myBlog\app\editor.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
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