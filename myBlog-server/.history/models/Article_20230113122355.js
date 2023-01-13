/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 14:28:25
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-13 12:23:54
 * @FilePath: \myBlog-server\models\Article.js
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
    default: `${uploadURL}uploads/article/article-cover.jpg`
  },
  //文章内容
  content: {
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
    required: true,
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
    required: true,
    default: "63bfbea41fb61e568c29cd74"
  }
})

module.exports = mongoose.model('Article', schema)