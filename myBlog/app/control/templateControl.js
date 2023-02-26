/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-26 13:39:58
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-24 17:26:38
 * @FilePath: \myBlog\app\control\templateControl.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import head from '../../src/views/head.hbs'
import user from '../../src/views/user.hbs'
import modal from '../../src/views/modal.hbs'
import write from '../../src/views/write.hbs'
import article from '../../src/views/article.hbs'
import message from '../../src/views/message.hbs'
import articles from '../../src/views/articles.hbs'
import columns from '../../src/views/columns.hbs'
import comment from '../../src/views/comment.hbs'
import toolbar from '../../src/views/toolbar.hbs'
import info from '../../src/views/info.hbs'
import slide from '../../src/views/slide.hbs'
import $ from 'jquery'

const TEMP_MAP = {
  head, user, modal, write, article, message, articles, columns, comment, toolbar, info, slide
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
    let html = '';
    if (tempName in TEMP_MAP) {
      html = TEMP_MAP[tempName](data)
    }
    return html
  }
}