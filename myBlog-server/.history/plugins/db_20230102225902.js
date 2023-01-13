/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 20:31:03
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-02 22:59:02
 * @FilePath: \myBlog-server\plugins\db.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const mongoose = require('mongoose')

async()
mongoose.connect('mongodb://127.0.0.1:27017/blog', {
  useNewUrlParser: true, useUnifiedTopology: true
})
} catch (err) {
  console.log(err)
}

let db = mongoose.connection
db.on('error', function (err) {
  console.log(err)
})
db.on('open', function (err) {
  console.dir('mongodb://127.0.0.1:27017/blog is open')
})

module.exports = {
  mongoose
}