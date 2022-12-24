/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-23 19:21:25
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-24 14:42:38
 * @FilePath: \myBlog\config\webpack.dev.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const { merge } = require('webpack-merge');
const path = require('path')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: 'dist',
      publicPath: '/'
    },
    host: 'localhost',
    port: 8080,
    open: true,
  },
});