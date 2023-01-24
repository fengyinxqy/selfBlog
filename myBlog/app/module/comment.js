/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2023-01-21 14:52:58
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-21 15:42:24
 * @FilePath: \myBlog\app\module\comment.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import $ from 'jquery'
import Message from './message'


const ERROR_MAP = {
  content: '内容不能为空'
}

export default class Comment {
  constructor({ eleInput, eleSubmit, aid }, callback) {
    this.eleInput = eleInput
    this.eleSubmit = eleSubmit
    this.aid = aid
    this.content = ''
    this.callback = callback
    this.init()
  }
  init() {
    this.listen()
  }


  listen() {
    $(document).on('click', this.eleSubmit, (e) => {
      e.preventDefault()
      let data = {}
      let content = $(this.eleInput).html() || $(this.eleInput).val()
      data.content = content
      data.aid = this.aid;
      Object.entries(data).some(([key, value]) => {
        let isPass = !value || value.trim().length === 0
        if (isPass) {
          new Message(ERROR_MAP[key]).warning()
          data = null
        }
        return isPass
      })

      this.callback(data)
    })
  }

}
