/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 20:49:52
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-13 13:00:43
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
const Comment = require('../models/Comment')
const createError = require('http-errors')
const assert = require('http-assert')

const { pagination } = require('../util/util')

const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_POST_MAP = require('../plugins/POP_POST_MAP')
const POP_GET_MAP = require('../plugins/POP_GET_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP')


// /api/rest/:resource?query 
// /api/rest/users?query  users => User
// /api/rest/articles?query  articles => Article

//创建资源
router.post('/', async (req, res, next) => {
  try {
    const result = await req.Model.create(req.body)
    let modelName = req.Model.modelName
    if (modelName in POP_POST_MAP) {
      let item = POP_POST_MAP[modelName]
      let { _refId, _model, queryAct, options } = item
      let _id = result._id
      let refId = req.body?.[_refId]
      assert(refId, 422, `${_refId} 必填`)
      await _model[queryAct](refId, options(_id))
    }
    res.send(result)
  } catch (err) {
    next(err || createError(400, '添加失败'))
  }
})

//更新资源
// /api/rest/articles/83827123/query?..
router.put('/:id', async (req, res, next) => {
  let putData = req.body
  let modelName = req.Model.modelName
  let id = req.params.id //资源id
  let isPass = req.isPass //鉴权结果
  let userId = req._id //userID

  try {
    let { revisable, authField } = POP_PUT_MAP[modelName]
    let isValidate = (modelName in POP_PUT_MAP) && isPass
    assert(isValidate, 400, "无权修改")
    let data = await req.Model.findById(id)
    assert(data, 404, "资源不存在")
    assert.equal(userId, data?.[authField], 400, '无权修改')

    let updateData = Object.entries(putData).filter(([key, value]) => {
      return revisable.includes(key)
    })
    isValidate = updateData.length !== 0
    assert(isValidate, 400, '修改失败')
    updateData = Object.fromEntries(updateData)
    updateData['date'] = new Date().toISOString()
    await req.Model.findByIdAndUpdate(id, updateData)
    res.send(200, {
      message: '修改成功'
    })
  } catch (err) {
    console.log(err.message, '123')

    next(err)
  }
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