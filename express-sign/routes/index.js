/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-15 13:06:21
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 12:37:49
 * @FilePath: \项目_肖祺彦_2022.12.18.33\express-sign\routes\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey, getPublicKey, getPublicKeySync } = require('../core/rsaControl')
const expressJwt = require('express-jwt')
const createError = require('http-errors');

router.post('/', expressJwt({
  secret: getPublicKeySync(), //解密秘钥 
  algorithms: ["RS256"], //6.0.0以上版本必须设置解密算法 
  isRevoked: function (req, payload, next) {
    //获取token payload内容
    console.log(payload)
    let { user_name, user_id } = payload
    console.log(payload)
    req.username = user_name
    req.userID = user_id
    userControl.verifyToken(user_name, user_id).then(result => {
      if (result.statusCode === getUserStatusMsg('USER_FOND')['statusCode']) {
        next()
      } else {
        next(createError(401))
      }
    })

  }
}), async function (req, res, next) {
  let result = getUserStatusMsg('USER_LOGIN')
  res.statusCode = 200
  res.send(200, {
    ...result
  })
});

module.exports = router;
