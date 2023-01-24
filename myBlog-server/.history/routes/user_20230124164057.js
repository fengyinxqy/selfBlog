/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-24 16:25:43
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-24 16:40:56
 * @FilePath: \myBlog-server\routes\user.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Article = require('../models/Article')
const Column = require('../models/Column')
const assert = require('http-assert')
const qs = require('qs')




router.put('/', async (req, res, next) => {
  let putData = req.body
  let isPass = req.isPass //鉴权结果
  let userId = req._id //userID
  try {
    assert(isPass, 400, "无权修改")
    let result = await User.findByIdAndUpdate(userId, putData, { runValidators: true, new: true })
    res.send(200, {
      message: '修改成功'
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//查询资源详情
router.get('/', async (req, res, next) => {
  let _id = req._id
  try {
    let userResult = await User.findById(_id)
    console.log(userResult)
    let articleCount = await Article.find({ author: _id }).count()
    let columnCount = await Column.find({ uid: _id }).count()
    userResult = userResult.toJSON()
    userResult.articleCount = articleCount
    userResult.columnCount = columnCount
    console.log(userResult)
    res.send(200, {
      message: '查询成功',
      data: userResult
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})


module.exports = router

