/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-16 18:30:33
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-16 18:44:14
 * @FilePath: \blog\myBlog\script\execHbs.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */


const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const templatePath = path.join(process.cwd(), './template')
const viewPath = path.join(process.cwd(), './views')

/* handlebars example.handlebars -f example.precompiled.js */

fs.readdir(templatePath, 'utf-8', (err, datas) => {
  if (err) {
    console.error(err)
  }
  if (datas) {
    datas.map(item => {
      let { name, base, ext } = path.parse(item)
      if (ext === '.hbs') {
        exec(`handlebars ${templatePath}/${name}.hbs -f ${viewPath}/${name}.js`)
        console.log(`${name}编译完成`)
      }
    })
  }
})