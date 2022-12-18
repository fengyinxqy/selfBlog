/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-18 20:32:16
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-18 21:39:06
 * @FilePath: \Node_肖祺彦_2022.12.17.32\myBlog\modules\modalControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import modalMap from './modal.config.js'
export default class Modal {
  constructor({ hbsTemp, modalWrap = $('.blog-modal'), dataType, successCallback = (data) => {
    console.log('提交成功', data)
  }, closeCallback = (data) => {
    console.log('关闭页面', data)
  } }) {
    this.hbsTemp = hbsTemp
    this.data = {}
    this.wrap = modalWrap
    this.html = ''
    this.successCallback = successCallback
    this.closeCallback = closeCallback
    this.eventAgent()
  }

  // 数据渲染
  render() {
    let data = modalMap[this.dataType]
    this.html = this.hbsTemp(data)
    this.draw()
  }

  // event 代理
  eventAgent() {
    this.wrap.on('click', 'button', (e) => {
      e.preventDefault()
      let targetName = $(e.target).data('btn-target')
      this[targetName] && this[targetName]()
    })

    $('body').on('click', 'a', (e) => {
      e.preventDefault()
      let modalType = $(e.target).data('modal')
      if (!modalType || modalType.length === 0) {
        return false
      }
      this.dataType = modalType
      this.render()
    })

    $('body').on("click", '.blog-modal--close', (e) => {
      this.close()
    })
  }

  // 渲染
  draw() {
    this.clear()
    this.wrap.removeAttr('hidden')
    this.wrap.html(this.html).show()
  }

  // 清除
  clear() {
    this.wrap.html('')
  }

  //关闭
  close() {
    this.closeCallback()
    this.reset()
  }

  // 提交
  confirm() {
    this.successCallback()
    this.reset()
  }

  // 重置
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