/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-21 15:32:34
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 21:05:44
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog\modules\actionControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import Modal from './modalControl.js'
import Validate from './validate.js'
import Http from './Http.js'
import Template from './templateControl.js'

const RES_HANDLE = {
  register() {
    this.index()
  },
  login() {
    this.index()
  },
  index() {
    new Template({
      wrap: '.blog-head--login',
      name: 'user',
      data: { isLogin: true }
    })
  }
}

function clearErrMsg(form) {
  //获取form下所有类名为 blog-error--input 错误p标签
  let errorInput = $(form).find('.blog-error--input')
  if (errorInput.length === 0) {
    return false
  }
  errorInput.removeClass('blog-error--input')[0].dataset['msg'] = ''
}

export default class Action {
  constructor() {
    this.modalAgency()
    this.formAgency()
    this.routeAgency()
  }

  modalAgency() {
    // 监听所有modal元素的click 渲染唤起对应的modal
    $(document).on('click', '[data-modal]', (e) => {
      let $target = $(e.target)
      let modalType = $target.data('modal')
      // 防止模板渲染时data-modal没有值
      if (!modalType) {
        return false
      }
      this.modal = new Modal({
        hbsTemp: Handlebars.templates['modal.hbs'],
        modalType
      })
      this.modal.render()
    })
    // 监听modal上的button
    $(document).on('click', '[data-modal-btn]', (e) => {
      let $target = $(e.target)
      let btnType = $target.data('modal-btn')
      if (this.modal && btnType) {
        this.modal[btnType]()
      }
    })
  }

  formAgency() {
    // 失去焦点时清除错误提示
    $('form').on('blur', 'input', (e) => {
      let $target = $(e.target)
      let $form = $target.parent('form')
      clearErrMsg($form)
    })
    $(document).on('submit', 'form', async (e) => {
      let $target = $(e.target)
      let formType = $target[0].id
      clearErrMsg($target)
      try {
        let formData = await new Validate(formType)
        let result = await new Http({ type: formType, data: formData }).send()
        RES_HANDLE[formType](result)
        this.modal && this.modal.close()
      } catch (error) {
        console.log(error)
      }
    })
  }

  //router
  routeAgency() {
    $(document).on('click', 'a[data-router]', function (e) {
      console.log(this)
      let $target = $(this)
      let routeName = $target.data('router')
      new Template({
        wrap: '.blog-container',
        name: routeName
      })
      //TODO 富文本编辑器初始化
      let editor = new wangEditor('.blog-container')
      editor.create()
    })
  }
}