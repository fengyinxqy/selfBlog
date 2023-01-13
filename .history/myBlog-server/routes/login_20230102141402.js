/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-20 19:10:59
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-02 14:14:02
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\routes\login.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')
const jwt = require('jsonwebtoken') //token生成包  JWT
const { sendToken } = require('../core/sendToken')
const User = require('../models/User')

router.post('/', async function (req, res, next) {

  let { username, pwd } = req.body
  // const User =  

  // let result = await userControl.verifyUser(username, pwd)
  // //如果验证账号密码失败
  // if (result.statusCode !== getUserStatusMsg('USER_INN')?.['statusCode']) {
  //   res.send(200, { ...result })
  //   return
  // }
  // console.log(result)
  // //如果验证成功 签发Token
  // if (result.statusCode === '4020' && result.data) {
  //   let token = await sendToken(result)

  //   let backRes = getUserStatusMsg('USER_LOGIN')
  //   backRes.statusCode = 200
  //   res.send(200, {
  //     ...backRes,
  //     data: {
  //       token
  //     }
  //   })
  // }
});



module.exports = router;
