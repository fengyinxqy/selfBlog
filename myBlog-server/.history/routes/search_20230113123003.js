/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-13 12:21:40
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-13 12:27:16
 * @FilePath: \myBlog-server\routes\search.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const assert = require('http-assert');
const createError = require('http-errors')


router.get('/', async function (req, res, next) {
  let { q = '' } = req.query
  let regExp = new RegExp(q, 'i')
  Article.find({

  })
});

module.exports = router;
