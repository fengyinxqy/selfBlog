/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 14:28:17
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-01 14:30:46
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\models\User.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false
  }
})

module.exports = mongoose.model('User', schema)