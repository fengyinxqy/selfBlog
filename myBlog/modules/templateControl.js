/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-21 20:00:52
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 20:47:40
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog\modules\templateControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */

const TEMP_MAP = {
  'user': {

  },
  'modal': {

  }
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
    this.tempHandle = Handlebars.templates[`${this.name}.hbs`]
    this.render()
  }

  render() {
    this.wrap.html(this.getHTML())
  }

  getHTML() {
    return this.tempHandle(this.data)
  }

  static render(tempName, data) {
    return Handlebars.templates[`${tempName}.hbs`](data)
  }
}