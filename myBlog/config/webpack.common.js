/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-24 11:47:42
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-24 13:49:08
 * @FilePath: \myBlog\config\webpack.common.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //指定入口
  entry: {
    main: './app/main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "html plugn page",
      template: './index.html'
    }),
    // new CleanWebpackPlugin()
  ],
  output: {
    //输出文件名称
    filename: '[name].build.js',
    //输出文件路径
    path: path.join(process.cwd(), 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        // 图片资源
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.styl$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",

          },
          {
            loader: "stylus-loader",
          },
        ],
      },
    ]
  }
};