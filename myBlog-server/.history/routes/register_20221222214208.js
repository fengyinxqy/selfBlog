/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-20 19:10:59
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-22 21:41:56
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\routes\register.js
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
  let { username, pwd } = req.body
  console.log(username, pwd, '============----')
  //TODO 验证username pwd 格式内容

  if (!username || !pwd || username?.length === 0 || pwd?.length === 0) {
    res.send(200, {
      ...getUserStatusMsg('USER_TRIM')
    })
  }
  let result = await userControl.addUser(username, pwd)
  if (result.statusCode === 200) {
    let token = await sendToken(result)
    res.send(200, {
      ...result,
      data: {
        token
      }
    })
    return
  }
  res.send(200, {
    ...result,
  })

});

module.exports = router;
