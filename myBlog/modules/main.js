/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-16 20:09:01
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 21:04:27
 * @FilePath: \项目_肖祺彦_2022.12.21.36\myBlog\modules\main.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */


/*
  导入 import 变量名 form 文件路径

  导出 export 导出内容
*/

import Action from './actionControl.js'
import Template from './templateControl.js'

new Template({
  wrap: '.blog-head--login',
  name: 'user',
  data: { isLogin: false }
})
new Action()

