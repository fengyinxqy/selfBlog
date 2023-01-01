/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 15:19:32
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-01 15:19:39
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\models\Column.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  //文章 ids
  aids: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  }]
})

module.exports = mongoose.model('Column', schema)