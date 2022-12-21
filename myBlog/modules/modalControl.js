/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-18 20:32:16
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 16:13:23
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog\modules\modalControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import modalMap from './modal.config.js'
export default class Modal {
  constructor({ hbsTemp, modalWarp = $('.blog-modal'), modalType }) {
    //渲染hbs方法
    this.hbsTemp = hbsTemp
    this.data = {}
    this.wrap = modalWarp
    this.modalType = modalType
    this.html = ''
  }
  //数据渲染
  render(modalType) {
    // 生成html = 渲染方法(渲染数据)
    let data = modalMap[this.modalType]
    this.html = this.hbsTemp(data)
    this.draw()
  }

  //渲染
  draw() {
    this.clean()
    this.wrap.removeAttr('hidden')
    this.wrap.html(this.html).show()
  }
  //清空
  clean() {
    this.wrap.html('')
  }
  //关闭
  close() {
    console.log('close')
    this.reset()
  }
  //提交
  confirm() {
    // this.reset()
  }
  //reset 重置blog-wrap
  reset() {
    this.wrap.hide()
    this.wrap.attr('hidden', true)
  }

  // 重置内容
  resetContent() {
    let obtn = $('.form-control')
    obtn.each((index, ele) => {
      $(ele).val('');
    })
  }
}