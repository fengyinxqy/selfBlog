const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Article = require('../models/Article')
const createError = require('http-errors')
const assert = require('http-assert')
const app = require('../app')

const { pagination } = require('../core/util/util')


// /api/rest/:resource?query 
// /api/rest/users?query  users => User
// /api/rest/articles?query  articles => Article

//创建资源
router.post('/', async (req, res, next) => {
  try {
    const model = await req.Model.create(req.body)
    res.send(model)
  } catch (err) {
    next(createError(400))
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

  // const items = await req.Model.find().setOptions(queryOptions)
  // res.send(200, { message: 'ok', data: { count: items.length, list: items } })
})

//查询资源详情
router.get('/:id', async (req, res) => {
  const item = await req.Model.findById(req.params.id)

  res.send(item)
})


module.exports = router