/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-20 19:10:59
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-11 20:21:11
 * @FilePath: \myBlog-server\routes\register.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')
const { sendToken } = require('../core/sendToken')

/* POST register listing. */
router.post('/', async function (req, res, next) {

  let { username, password } = req.body
  // +password 设置追加返回password内容 password Schema设置select为false时使用
  try {
    if (!username || username?.trim()?.length === 0 || !password || password?.trim()?.length === 0) {
      assert(false, 422, "账号密码必填")
    }
    const user = await User.create(req.body)

    //生成token
    let token = await sendToken(user)
    res.send(200, {
      data: {
        message: '注册成功',
        data: {
          userId: user._id,
          token: token
        }
      }
    })
  } catch (err) {
    console.log(err.message)
    if (err.message.indexOf('duplicate key error') !== -1) {
      let repeatKey = Object.entries(err.keyPattern)?.map(([key, value]) => {
        return `${QUE_MAP?.[key]}不能重复`
      })[0]
      next(createError(422, repeatKey))
    }
    let paramErrors = Object.entries(err.errors).map(([key, val]) => {
      return `${val.message} `
    }).reduce((a, c) => {
      a += c
      return a
    }, "")
    next(createError(422, paramErrors))
  }
});

module.exports = router;
