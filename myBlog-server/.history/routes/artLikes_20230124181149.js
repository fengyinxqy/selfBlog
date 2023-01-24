/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-13 13:01:46
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-24 18:11:13
 * @FilePath: \myBlog-server\routes\artLikes.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const Article = require('../models/Article')

/*post 文章点赞 */
router.post('/', async (req, res, next) => {
  let id = req._id
  console.log(id)
  try {
    let result = await Article.findByIdAndUpdate(id, {
      $inc: {
        like_num: 1
      }
    })
    let likes = ++result.like_num
    res.send(200, {
      message: '点赞成功',
      data: {
        likes
      }
    })
  } catch (err) {
    next(err)
  }

});

module.exports = router;
