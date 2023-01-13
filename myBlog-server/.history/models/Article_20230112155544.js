/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 14:28:25
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-01 15:19:14
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\models\Article.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const mongoose = require('mongoose')
const { uploadURL } = require('../config')
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "默认标题" + Date.now
  },
  //封面图
  cover: {
    type: String, //URL
    default: `${uploadURL}uploads/`
  },
  //文章内容
  body: {
    type: String, // URIencode(HTMLCode)
    required: true,
  },
  //更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  //点击量
  hit_num: {
    type: Number,
    default: 0
  },
  //评论数量
  comment_num: {
    type: Number,
    default: 0
  },
  //喜欢 点赞
  like_num: {
    type: Number,
    default: 0
  },
  //作者
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  //评论集合
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment"
    }
  ],
  //分类
  column: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Column',
    default: "技术文章"
  }
})

module.exports = mongoose.model('Article', schema)