/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-15 14:18:59
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-15 14:25:08
 * @FilePath: \Node_肖祺彦_2022.12.15.28\express-sign\config.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */

const path = require('path');
module.exports = {
  host: "127.0.0.1",
  root: process.cwd(),
  port: 3000,
  keyPath: path.join(process.cwd(), '/auth'),
  userPath: path.join(process.cwd(), '/user/user.json'),
  pubKeyPath: path.join(process.cwd(), '/auth/public.cer'),
  priKeyPath: path.join(process.cwd(), '/auth/private.cer'),
}