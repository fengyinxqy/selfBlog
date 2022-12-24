/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-24 11:47:42
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-24 15:28:42
 * @FilePath: \myBlog\config\webpack.prod.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: "production", //development|production
  output: {
    filename: '[name].[hash:7].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
})