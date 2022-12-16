/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-16 20:09:08
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-16 20:28:36
 * @FilePath: \blog\myBlog\modules\export.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
export default class Http {
  constructor({ host = 'http://127.0.0.1:3000' } = {}) {
    this.hostUrl = host
  }
  show() {
    return this.hostUrl
  }
}