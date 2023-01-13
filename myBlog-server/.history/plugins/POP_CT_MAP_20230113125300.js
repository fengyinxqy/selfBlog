/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-12 16:15:23
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-13 12:52:59
 * @FilePath: \myBlog-server\plugins\POP_CT_MAP.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const User = require('../models/User')
const Article = require('../models/Article')
const Column = require('../models/Column')
const Comment = require('../models/Comment')
module.exports = {
  "Comment": {
    "_refId": "aid",
    "_model": Article,
    "queryAct": "findByIdAndUpdate",
    "options": function (_id) {
      return {
        "$push": {
          "comments": _id
        },
        "$inc": {
          "comments_num": 1
        }
      }
    }
  },
  Article: {
    "_refId": "column",
    "_model": Column,
    "queryAct": "findByIdAndUpdate",
    "options": function (_id) {
      return {
        "$push": {
          "aids": _id
        }
      }
    }
  }
}

/*
 Comment
      ref aid : Article:{
        comments:{
          $push: commentId
        }
    }
    添加一篇文章的时候 要找到对应分类 aids字段push添加文章aid
    Article
      ref column: Column:{
        aids:{
          $push: aid
        }
    }

*/