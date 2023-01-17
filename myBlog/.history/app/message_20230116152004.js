/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-16 14:40:19
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-16 15:20:03
 * @FilePath: \myBlog\app\message.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import template from './templateControl'
import $ from 'jquery'


export default class Message {
  constructor(msg = "未知错误") {
    this.msg = msg
    this.wrap = $('.blog-message')
  }

  success() {
    this.html('success')
  }

  info() {
    this.html('info')
  }

  warning() {
    this.html('warning')
  }

  danger() {
    this.html('danger')
  }

  html(type) {
    this.render(template.render('message', { type, msg: this.msg }))
  }

  render(ele) {
    let wrap = this.wrap
    wrap.append($(ele)).children().addClass('show move').delay(3000).queue(function (next) {
      $(this).remove()
      next()
    })
  }

}


