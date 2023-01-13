/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 20:49:52
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-13 10:46:30
 * @FilePath: \myBlog-server\routes\bus.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Article = require('../models/Article')
const Column = require('../models/Column')
const createError = require('http-errors')
const assert = require('http-assert')
const app = require('../app')

const { pagination } = require('../util/util')


// /api/rest/:resource?query 
// /api/rest/users?query  users => User
// /api/rest/articles?query  articles => Article

//创建资源
router.post('/', async (req, res, next) => {
  try {
    const model = await req.Model.create(req.body)
    let modelName = req.Model.modelName
    if (modelName in POP_CT_MAP) {
      let item = POP_CT_MAP[modelName]
      let { _refId, _model, queryAct, options } = item
      let _id = model._id
      let refId = req.body?.[_refId]
      assert(refId, 422, `${_refId} 必填`)
      await _model[queryAct](refId, options(_id))
    }
    res.send(model)
  } catch (err) {
    next(err || createError(400, '添加失败'))
  }
})

//更新资源
// /api/rest/articles/83827123/query?..
router.put('/:id', async (req, res) => {
  const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
  res.send(model)
})

//删除资源
router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
    errMsg: 'ok'
  })
})

//查询资源列表
router.get('/', async (req, res) => {
  const { options = {}, page = 1, size = 100, query = {}, dis = 8 } = req.body
  try {
    let result = await pagination({ model: req.Model, query, options, size, page, dis })
    res.send(result)
  } catch (err) {
    next(createError(422, "请求错误"))
  }
})

//查询资源详情
router.get('/:id', async (req, res) => {
  let modelName = req.Model.modelName
  try {
    let querys = req.Model.findById(req.params.id)
    if (modelName in POPULATE_MAP) {
      let populates = POPULATE_MAP[modelName]
      const result = await querys.populate(populates).exec()
      res.send(result)
    }
  } catch (err) {
    console.log(err)
  }

})


module.exports = router