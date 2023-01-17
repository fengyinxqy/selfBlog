/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-15 14:17:47
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-16 15:57:40
 * @FilePath: \myBlog-server\util\util.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');
const { priKeyPath, pubKeyPath } = require('../config');
const { compile } = require('morgan');
const mongoPage = require('mongoose-sex-page')

function generateKeys() {
  const newkey = new NodeRSA({ b: 512 });
  newkey.setOptions({ encryptionScheme: 'pkcs1' })
  let public_key = newkey.exportKey('pkcs8-public')//公钥,
  let private_key = newkey.exportKey('pkcs8-private') //私钥

  fs.writeFileSync(priKeyPath, private_key);
  fs.writeFileSync(pubKeyPath, public_key);
}

function encrypt(plain) {
  let public_key = fs.readFileSync(pubKeyPath, 'utf8');
  const nodersa = new NodeRSA(public_key);
  nodersa.setOptions({ encryptionScheme: 'pkcs1' });
  const encrypted = nodersa.encrypt(plain, 'base64');
  return encrypted;
}

function decrypt(cipher) {
  let private_key = fs.readFileSync(priKeyPath, 'utf8'); //私钥
  let prikey = new NodeRSA(private_key);
  prikey.setOptions({ encryptionScheme: 'pkcs1' });
  console.log(prikey.decrypt(cipher, 'utf8'), 'dyc')
  return prikey.decrypt(cipher, 'utf8')
}

async function pagination({ model, query, options, size, page, dis }) {
  let result = await mongoPage(model).find(query).select(options).size(size).page(page).display(dis).exec()

  let { total, records: list, pages, display } = result
  //count 当次返回的 list的长度 数据数量
  let count = list.length
  return { count, page, size, total, list, pages, display }
}


module.exports = {
  generateKeys,
  encrypt,
  decrypt,
  pagination
};