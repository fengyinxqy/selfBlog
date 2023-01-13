/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-11-14 18:33:43
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-12 16:15:02
 * @FilePath: \blog-server\plugins\POPULATE_MAP.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
module.exports = {
  "Article": [{
    "path": "author",
    "select": "nikname avatar"
  },
  {
    "path": "column",
    "select": "name"
  },
  {
    "path": "comments",
    "select": "content date uid",
    "populate": {
      "path": "uid",
      "select": "nikname avatar"
    }
  }],
  "Comment": [{
    "path": "uid",
    "select": "nikname avatar"
  }],
  "Column": [
    {
      "path": "aids",
      "select": "title cover date hit_num comment_num like_num author"
    }
  ]
}