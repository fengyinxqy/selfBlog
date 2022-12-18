/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-18 20:32:04
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-18 21:31:11
 * @FilePath: \Node_肖祺彦_2022.12.17.32\myBlog\modules\modal.config.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
export default {
  "login": {
    title: '登录',
    formData: [
      {
        label: "用户名",
        query: "username",
        type: "text",
        placeholder: "用户名: 6-8位 字母数字"
      },
      {
        label: "密码",
        query: "pwd",
        type: "password",
        placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)"
      }
    ],
    btns: [
      {
        targetName: 'resetContent',
        name: '重置'
      },
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交'
      }
    ]
  },
  "register": {
    title: '注册',
    formData: [
      {
        label: "用户名",
        query: "username",
        type: "text",
        placeholder: "用户名: 6-8位 字母数字"
      },
      {
        label: "密码",
        query: "pwd",
        type: "password",
        placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)"
      }
    ],
    btns: [
      {
        targetName: 'resetContent',
        name: '重置'
      },
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交'
      }
    ]
  }
}