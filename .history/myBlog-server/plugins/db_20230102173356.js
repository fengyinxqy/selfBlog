/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 20:31:03
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-02 16:50:36
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\plugins\db.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const mongoose = require('mongoose')
const { encrypt } = require('../util/util')

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
let db = mongoose.connection
db.on('error', function (err) {
  console.log(err)
})
db.on('open', function (err) {
  console.dir('mongodb://127.0.0.1:27017/blog is open')
})

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
    select: false,
    required: true,
    set(val) {
      //写入password时触发 写入数据 => encrypt(源数据)
      return encrypt(val)
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
      },
      message: "请输入合法邮箱地址"
    },
    unique: true
  },
  avatar: {
    type: String, //URL,
    default: "http://127.0.0.1:3000/public/images/avatar.jpg"
  },

  nickname: {
    type: String,
    validate: {
      validator: function (val) {
        return /^[0-9a-zA-Z\u0391-\uFFE5]{1,8}$/.test(val)
      },
      message: "昵称可包含 数字/英文/汉字 1-8位"
    }
  }
})

let User = mongoose.model('User', schema)

User.create({})
// module.exports = {
//   mongoose
// }