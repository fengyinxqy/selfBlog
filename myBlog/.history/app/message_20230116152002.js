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


