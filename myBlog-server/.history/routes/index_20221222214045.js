/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-15 13:06:21
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-22 21:40:46
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\routes\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey, getPublicKey, getPublicKeySync } = require('../core/rsaControl')
const jwt = require('jsonwebtoken') //token生成包  JWT
const expressJwt = require('express-jwt') //token验证中间件 JWT
const createError = require('http-errors');

router.post('/', expressJwt({
  secret: getPublicKeySync(), //解密秘钥 
  algorithms: ["RS256"], //6.0.0以上版本必须设置解密算法 
  isRevoked: function (req, payload, next) {
    //获取token payload内容
    // console.log(payload)
    let { user_name, user_id } = payload
    console.log(payload)
    req.username = user_name
    req.userID = user_id

    userControl.verifyToken(user_name, user_id).then(result => {
      req.isPass = false
      if (result.statusCode === getUserStatusMsg('USER_FOND')['statusCode']) {
        req.isPass = true
      }
      next()
    })

  }
}), async function (req, res, next) {
  if (req.isPass) {
    let result = getUserStatusMsg('USER_LOGIN')
    result.statusCode = 200
    res.send(200, {
      ...result,
    })
  } else {
    let result = getUserStatusMsg('USER_FAILED')
    res.send(200, {
      ...result,
    })
  }

});

module.exports = router;
