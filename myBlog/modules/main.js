/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-16 20:09:01
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-18 20:57:59
 * @FilePath: \Node_肖祺彦_2022.12.17.32\myBlog\modules\main.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import Modal from './modalControl.js'

/*
  导入 import 变量名 form 文件路径

  导出 export 导出内容
*/
let modal = new Modal({
  hbsTemp: Handlebars.templates['modal.hbs'],
  modalWarp: $('.blog-modal'),
  successCallback(data) {
    console.log('提交成功', data)
  }, closeCallback(data) {
    console.log('关闭页面', data)
  }
})
