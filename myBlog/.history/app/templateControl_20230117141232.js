import head from '../src/views/head.hbs'
import user from '../src/views/user.hbs'
import modal from '../src/views/modal.hbs'
import write from '../src/views/write.hbs'
import article from '../src/views/article.hbs'
import message from '../src/views/message.hbs'
import articles from '../src/views/articles.hbs'
import $ from 'jquery'

const TEMP_MAP = {
  head, user, modal, write, article, message, articles
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