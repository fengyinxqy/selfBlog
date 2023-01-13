/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-01 20:28:48
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-01 20:30:29
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog-server\middleware\resource.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const { classify } = require('inflection')

module.exports = options => {
  return async (req, res, next) => {
    const modelName = classify(req.params.resource);
    req.Model = require(`../models/${modelName}`)
    next()
  }
}