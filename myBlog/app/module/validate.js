/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-26 13:39:58
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-24 16:50:09
 * @FilePath: \myBlog\app\module\validate.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import util from '../util/util'
import Validator from 'validator.tool'
import $ from 'jquery'
export default class RegExpVerify {
  constructor(type) {
    //type 表单名称
    this.type = type
    this.form = $(`#${this.type}`)

    return this.submitIntercept()
  }

  submitIntercept() {
    this.formMap = {
      register: {
        username: 'required|is_username',
        email: 'required|is_email',
        password: 'required|is_pwd'
      },
      login: {
        username: 'required|is_username',
        password: 'required|is_pwd'
      },
      putUserInfo: {
        username: 'required|is_username',
      },
      postColumn: {
        name: 'required'
      }
    }
    this.msgMap = {
      register: {
        username: "账号必填|账号格式 数字+字母 6-8位",
        email: '邮箱必填|请填写正确的邮箱格式',
        password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 "
      },
      login: {
        username: "账号必填|账号格式 数字+字母 6-8位",
        password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 "
      },
      putUserInfo: {
        username: "账号必填|账号格式 数字+字母 6-8位",
      },
      postColumn: {
        name: "分类名称必填"
      }
    }
    return this.validatorFactory()
  }

  //验证代理
  validatorFactory() {
    let rulesObj = this.formMap[this.type]
    let msgObj = this.msgMap[this.type]
    let validateArr = this.outPutValidator(msgObj, rulesObj)
    return this.creawteRev(validateArr)

  }
  //创建校验对象
  creawteRev(validateArr) {
    let type = this.type
    /*
      promise包装异步处理 Validator 注册并直接调用校验方法 validate()
    */
    return new Promise((resolve, reject) => {
      new Validator(type, validateArr, (obj, evt) => {
        if (obj.errors.length === 0) {
          let formData = util.getFormJson(this.form)
          resolve(formData)
          return false
        }
        //回调处理 errors信息 element message
        this.errorControl(obj)
        reject(obj.errors)
      }).validate()
    })
  }


  outPutValidator(msg, rules) {
    return Object.entries(rules).map(([key, value]) => {
      return {
        'name': key,
        'display': msg[key],
        'rules': value
      }
    })
  }

  errorControl(obj) {
    obj.errors[0]['element'].focus()
    //循环所有错误 反馈信息
    obj.errors.map(({ message, element }) => {
      console.log(message)
      $(element).parent().addClass('blog-error--input')[0].dataset['msg'] = message
    })
  }
}