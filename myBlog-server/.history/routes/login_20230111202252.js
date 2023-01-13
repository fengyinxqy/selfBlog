/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-20 19:10:59
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-11 20:22:51
 * @FilePath: \myBlog-server\routes\login.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')
const { decrypt, encrypt } = require('../core/util/util')
const jwt = require('jsonwebtoken') //token生成包  JWT
const { sendToken } = require('../core/sendToken')
const User = require('../models/User')
const assert = require('http-assert');

router.post('/', async (req, res, next) => {

  let { username, password } = req.body
  // +password 设置追加返回password内容 password Schema设置select为false时使用
  try {
    if (!username || username?.trim()?.length === 0 || !password || password?.trim()?.length === 0) {
      assert(false, 422, "账号密码必填")
    }
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, "用户不存在")
    //校验密码
    assert.equal(password, decrypt(user.password), 422, '账号密码错误')

    //生成token
    let token = await sendToken(user)
    res.send(200, {
      data: {
        message: '登录成功',
        data: {
          userId: user._id,
          token: token
        }
      }
    })
  } catch (err) {
    next(err)
  }
  /*
     查询不到 user: null
       assert 触发 throw error(422,"用户不存在")
       进入catch next传递error到 错误处理中间件 返回错误响应
     查询到 user 不为null
       assert 不触发 跳过
       res.send(成功信息)
   */
});



module.exports = router;
