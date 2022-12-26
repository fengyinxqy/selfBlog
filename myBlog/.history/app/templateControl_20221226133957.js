/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-21 20:00:52
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-24 11:59:16
 * @FilePath: \myBlog\app\templateControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import head from '../src/views/head.hbs'
import user from '../src/views/user.hbs'
import modal from '../src/views/modal.hbs'
import write from '../src/views/write.hbs'

const TEMP_MAP = {
  head, user, modal, write
}


export default class TemplateControl {
  constructor({
    wrap = "body", name, data
  }) {
    this.wrap = $(wrap)
    this.name = name
    this.data = data
    this.init()
  }

  init() {
    this.tempHandle = TEMP_MAP[this.name]
    this.render()
  }

  render() {
    this.wrap.html(this.getHTML())
  }

  getHTML() {
    return this.tempHandle(this.data)
  }

  static render(tempName, data) {
    let html = ''
    if (tempName in TEMP_MAP) {
      html = TEMP_MAP[tempName](data)
    }
    return html
  }
}