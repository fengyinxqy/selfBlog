/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-16 20:09:01
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 13:47:40
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog\modules\main.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import Modal from './modalControl.js'
import RegExpVerify from './validate.js'
import Http from './Http.js'

/*
  导入 import 变量名 form 文件路径

  导出 export 导出内容
*/
let modal = new Modal({
  hbsTemp: Handlebars.templates['modal.hbs'],
  modalWarp: $('.blog-modal'),
  drawCallback(formType) {
    $(`#${formType}`).on('blur', 'input', (e) => {
      let $target = $(e.target)
      $target.parent().removeClass('blog-error--input')[0].dataset['msg'] = ''
    })
    modal.validator = new RegExpVerify(formType, (formData) => {
      //TODO validate Success
      console.log('提交 TODO http')
      new Http({
        type: formType,
        data: formData,
        callback: function () {
          if (formType === 'login') {
            //TODO 页面跳转主页
            new Http({
              type: 'user', callback() {
                console.log('进入主页')
              }
            })
          }
        }
      })
      modal.reset()
    }, (errors) => {
      //TODO validate error
      //聚焦到错误的input
      errors[0]['element'].focus()
      //循环所有错误 反馈信息
      errors.map(({ message, element }) => {
        $(element).parent().addClass('blog-error--input')[0].dataset['msg'] = message
      })
    })
  },
  successCallback(formType) {
    //执行第三方校验库校验方法
    modal.validator.validate()
  }, closeCallback(data) {
    console.log('关闭页面', data)
  }
})