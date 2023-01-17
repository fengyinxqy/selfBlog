/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-19 21:19:49
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-16 22:05:00
 * @FilePath: \myBlog\app\validate.js
 * @Description: 
 * 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */

/*
  数据校验

  1 静态校验

    submit || onblur  校验 所有表单input or 单个input的内容是否符合规范

   input 内容校验
      正则表达式 规则.test(input.value) => ?pass

      校验类型(账号 密码 邮箱 手机 身份证 汉字 长度 必填) 正则
      错误信息: 针对校验类型返回给用户的错误提示
      校验标识: 通过标识 获取对应input 内容

      通过标识 校验类型 错误信息 inputDOM关联

      submit => 格式化表单对象{key(username):value(val)} => key 查询表 获取对应校验类型正则 + 错误信息 => 进行通道校验 => 校验成功?"下一个input校验":"返回错误信息"=>

    错误反馈展示
      1. input框变色 or input框右侧 标识符号(√ ×)
      2. input 下方or右侧 红色小字提示格式错误
      3. topTips or tosat框 提示

    错误反馈逻辑
      1. 按序排错 (一次一个)
      2. 错误罗列 (所有的错误提示都展示出来)

    用户行为节点 关键Event

    Event节点: submit 提交
    错误反馈: 全反馈 + 临时文本插入 input下方

    校验类型(账号 密码 邮箱 手机 身份证 汉字 长度 必填) 正则

    username (){
      6-8位  数字+字母(Aa) 必填
    }

    pwd(){
      8-12位 至少包含 大写 小写 数字 必填
    }

    组合 + 链式

    设置映射

   1.  username: "required | is_user | max_len(12) | min_len(6)"


   2.  coll.isRequired().minLength(6).maxLength(12).isUser()
  2 动态校验
*/
import util from './util/util'
import Validator from 'validator.tool'
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
        password: 'require|is_pwd'
      },
      login: {
        username: 'required|is_username',
        password: 'require|is_pwd'
      }
    }
    this.msgMap = {
      register: {
        username: "账号必填|账号格式 数字+字母 6-8位",
        password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 "
      },
      login: {
        username: "账号必填|账号格式 数字+字母 6-8位",
        password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 "
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
      $(element).parent().addClass('blog-error--input')[0].dataset['msg'] = message
    })
  }
}















