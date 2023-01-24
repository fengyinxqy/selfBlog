/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-13 12:21:40
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-24 13:38:26
 * @FilePath: \myBlog-server\routes\search.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express')
const router = express.Router()
const Article = require('../models/Article')
const User = require('../models/User')
const Column = require('../models/Column')
const Comment = require('../models/Comment')
const assert = require('http-assert');
const { pagination } = require('../util/util')
const createError = require('http-errors')
const qs = require('qs')
/*
  文章搜索 search API

  title body

  http://127.0.0.1:3000/search?q=你好
*/

const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_POST_MAP = require('../plugins/POP_POST_MAP')
const POP_GET_MAP = require('../plugins/POP_GET_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP')
const RESOURCE_POST_MAP = require('../plugins/RESOURCE_POST_MAP')

router.get('/', async (req, res, next) => {

  let modelName = 'Article'
  let { options = {}, page = 1, size = 100, query = {}, dis = 8, populate = {} } = req.query
  query = qs.parse(query)
  let regexp = new RegExp(query.q, 'i')
  query = {
    $or: [
      { title: { $regex: regexp } },
      { content: { $regex: regexp } }
    ]
  }
  try {
    if (modelName in POPULATE_MAP) {
      populate = POPULATE_MAP[modelName]
    }
    let result = await pagination({ model: Article, query, options, populate, size, page, dis })
    res.send(200, {
      message: "ok",
      data: result
    })
  } catch (err) {
    console.log(err)
    next(createError(422, "获取失败"))
  }

});



module.exports = router;
