/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 14:28:17
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-01 14:41:19
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\models\User.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */

/*
  username: 用户名 
  type: String
  validate:/数字+字母 6-8位/:/^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/ 
  required true 必填
  unique true 唯一
  

  passowrd 密码
  type: String
  select false 不可查
  set: encrypt(value) RSA加密
  validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/ 
  required true


  email 邮箱
  type: String
  validate /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/ "请输入合法邮箱地址"
  unique true 

  avatar 头像
  type: String (URL)
  default: "http://127.0.0.1:3000/public/images/avatar.jpg"
  

  nickname 昵称
  type: String
  validate: /^([\w\W]){1,8}$/ 昵称长度 1-8位
  default: "用户"
*/
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    required: [true, '用户名必填'],
    type: String,
    validate: {
      validator(val) {
        return /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/.test(val)
      },
      message: "用户名必须为 数字+字母 6-8位"
    },
    unique: true
  },
  password: {
    type: String,
    select: false
  }
})

module.exports = mongoose.model('User', schema)