/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-15 13:06:21
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 13:09:00
 * @FilePath: \express-sign\routes\register.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')

/* POST register listing. */
router.post('/', async function (req, res, next) {
  let { username, pwd } = req.body
  //TODO 验证username pwd 格式内容

  if (!username || !pwd || username?.length === 0 || pwd?.length === 0) {
    res.send(200, {
      ...getUserStatusMsg('USER_TRIM')
    })
  }
  let result = await userControl.addUser(username, pwd)
  result.statusCode = 200
  res.send(200, {
    ...result
  })
});

module.exports = router;
