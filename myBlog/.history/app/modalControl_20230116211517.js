/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-18 20:32:16
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-16 21:15:17
 * @FilePath: \myBlog\app\modalControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import modalMap from './config/modal.config'
import Template from './templateControl'
import $ from 'jquery'
/*

  初始化 
    根据temp 渲染 =>  生成

  行为调用
    展示
    关闭

*/

export default class Modal {
  constructor({ modalWarp = $('.blog-modal'), modalType }) {
    this.data = {}
    this.wrap = modalWarp
    this.modalType = modalType
    this.html = ''
  }
  //数据渲染
  render() {
    // 生成html = 渲染方法(渲染数据)
    let data = modalMap[this.modalType]
    this.html = Template.render('modal', data)
    this.draw()
  }

  //渲染
  draw() {
    this.clean()
    this.wrap.removeAttr('hidden')
    this.wrap.html(this.html).show()
    this.drawCallback && this.drawCallback(this.modalType)
  }
  //清空
  clean() {
    this.wrap.html('')
  }
  //关闭
  close() {
    this.reset()
  }
  //提交
  confirm() {
    console.log('confirm')
  }
  //reset 重置blog-wrap
  reset() {
    this.wrap.hide()
    this.wrap.attr('hidden', true)
  }


}