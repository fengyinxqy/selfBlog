/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-12 12:53:09
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-19 13:35:38
 * @FilePath: \myBlog-server\routes\upload.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();
const assert = require('http-assert');
const multer = require("Multer")
const { uploadPath, uploadURL, maxFileSize } = require('../config')
const path = require('path')
const fs = require('fs');
const createError = require('http-errors');

const FILE_TYPE = {
  'user': 'user',
  'article': 'article'
}

const storage = multer.diskStorage({
  //存储位置
  destination(req, res, cb) {
    let fileType = FILE_TYPE[req.params['classify'].trim()] ?? "other";
    const filePath = path.join(uploadPath, fileType)
    fs.existsSync(filePath) || fs.mkdirSync(filePath);
    cb(null, filePath);
  },
  filename(req, file, cb) {
    const { ext, base, name } = path.parse(file.originalname)
    cb(null, name + '_' + Date.now() + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxFileSize
  }
})


router.post('/:classify', upload.any(), async (req, res, next) => {
  try {
    let fileType = FILE_TYPE[req.params['classify']] ?? ''
    assert(fileType, 400, '文件上传分类不正确')
    let { uid } = req.body
    if (fileType === 'user') {
      assert(uid, 422, '用户头像必须指定UID')
    }
    let fileURLS = req.files.map(item => {
      let { destination, filename } = item
      return path.join(uploadURL, path.parse(destination).name, filename).replace(/\\/g, '/').replace('http:/', 'http://')
    })

    let resultData = {
      message: "上传成功",
      data: {
        fileURL: fileURLS[0]
      }
    }
    if (fileType === 'article') {
      let data = fileURLS
      resultData = {
        "errno": 0,
        data
      }
    }
    res.send(200, resultData)
  } catch (err) {
    next(err)
  }
})
module.exports = router;
