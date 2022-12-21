/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-20 19:10:59
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 13:18:44
 * @FilePath: \项目_肖祺彦_2022.12.18.33\express-sign\routes\login.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')
const jwt = require('jsonwebtoken') //token生成包  JWT


router.post('/', async function (req, res, next) {

  let { username, pwd } = req.body

  let result = await userControl.verifyUser(username, pwd)
  //如果验证账号密码失败
  if (result.statusCode !== getUserStatusMsg('USER_INN')?.['statusCode']) {
    res.send(200, { ...result })
    return
  }
  //如果验证成功 签发Token
  if (result.data) {
    let { user_name, user_id } = result?.data

    let privateKey = await getPrivateKey()
    let token = jwt.sign({ user_name, user_id, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, privateKey, { algorithm: 'RS256' });

    let backRes = getUserStatusMsg('USER_LOGIN')
    backRes.statusCode = 200
    res.send(200, {
      ...backRes,
      data: {
        token
      }
    })
  }
});

module.exports = router;
