/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-12-15 14:32:23
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2022-12-21 12:43:20
 * @FilePath: \express-sign\core\userControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
const { decrypt, encrypt, generateKeys } = require('../util/util')
const fs = require('fs').promises
const { userPath } = require('../config')
const { getUserStatusMsg } = require('./statusControl')

module.exports = {
  //添加用户
  async addUser(username, pwd) {
    //TODO pwd 公钥加密
    let password = encrypt(pwd)

    //查看数据库是否存在同名用户 
    let user = await this.getUserInfo(username)

    //如果用户不存在
    if (user?.['tag'] === 'USER_NOF') {
      let userId = await getUsersNum()
      userId = ('000000' + userId).substr(-6)
      await appendUser({ user_id: userId, user_name: username, password })
      return {
        ...getUserStatusMsg('USER_ADD')
      }
    }
    if (user?.['tag'] === 'USER_FOND') {
      return {
        ...getUserStatusMsg('USER_DR')
      }
    }
    return {
      statusCode: user.statusCode,
      errMsg: '注册失败'
    }
  },
  /* 获取用户信息 */
  async getUserInfo(username) {
    try {
      let users = await getUsers()
      let userInfo = users.find(item => item['user_name']?.trim() === username?.trim())
      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }
      return {
        ...getUserStatusMsg('USER_FOND'),
        data: {
          ...userInfo
        }
      }
    } catch (error) {
      console.error(error)
      return {
        ...getUserStatusMsg('USER_FERR'),
      }
    }
  },
  //验证Token信息
  async verifyToken(username, userID) {
    console.log('-------------------')
    console.log(username, userID)
    try {
      let users = await getUsers();
      let userInfo = users.find(item => item['user_id'].trim() === userID.trim())

      if (!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }

      if (userInfo['user_name'] === username) {
        return {
          ...getUserStatusMsg('USER_FOND'),
        }
      }

    } catch (err) {
      console.error(err)
      return {
        ...getUserStatusMsg('USER_FERR'),
      }
    }
  },
  /* 验证用户账号密码 */
  async verifyUser(username, pwd) {
    let user = await this.getUserInfo(username)

    //如果不是查询成功
    if (user?.['tag'] !== 'USER_FOND') {
      return user
    }
    let { user_id, user_name, password } = user.data

    //验证密码 库中存储二次加密 和传输 一次加密 对比
    let isVerify = decrypt(decrypt(password.trim())) === decrypt(pwd.trim())
    console.log(isVerify)
    if (isVerify) {
      return {
        ...getUserStatusMsg('USER_INN'),
        data: {
          user_id, user_name
        }
      }
    }
  }
}

async function getUsers() {
  let users = await fs.readFile(userPath, 'utf8')
  users = JSON.parse(users)
  return users
}

async function setUsers(users) {
  try {
    await fs.writeFile(userPath, JSON.stringify(users), 'utf8')
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

async function appendUser({ user_id = false, user_name = false, password = false }) {
  let user = await getUsers()
  user.push({
    user_id, user_name, password
  })
  await setUsers(user)
  return true
}


async function getUsersNum() {
  let users = await getUsers()

  return users?.length
}