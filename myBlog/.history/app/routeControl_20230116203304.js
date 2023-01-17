/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-11-14 18:25:32
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-16 20:32:57
 * @FilePath: \myBlog\app\routeControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import Template from './templateControl'
import Http from './http'
import Router from 'sme-router'
import Editor from 'wangeditor'

const ROUTE_MAP = {
  'write': {
    wrap: ".blog-container",
  },
  'user': {
    wrap: ".blog-head--login"
  },
  'index': {
    wrap: '.blog-head--login'
  },
  'editor/submit': {
    wrap: ".blog-container",
    tempName: 'artical'
  },
  'editor/clean': {
    wrap: ".blog-container",
  }
}
let editor
//设置routeName 和 渲染容器
function routeHandle(req) {
  let type = req.body.routeName
  if (ROUTE_MAP[type]?.['wrap']) {
    pageRouter['_mount'] = document.querySelector(ROUTE_MAP[type]['wrap'])
  }
  req.routeName = type
}

function renderHandle(routeName, data) {
  let { tempName } = ROUTE_MAP[routeName];
  if (!tempName) {
    tempName = routeName
  }
  return Template.render(tempName, data)
}

//实例化参数 模板渲染内容的容器的id名称
const pageRouter = new Router('page')

//功能中间件 
pageRouter.use(routeHandle)


pageRouter.route('/write', (req, res, next) => {
  //动态修改 router的实例wrap容器元素
  let routeName = req.routeName ?? 'index'
  res.render(renderHandle(routeName, {}))
  //TODO 富文本编辑器初始化
  editor = new Editor('.blog-write--wrap')
  editor.create()
})
// 提交 富文本编辑器内容
pageRouter.route('/editor/:active', async (req, res, next) => {
  let routeName = req.routeName
  if (editor) {
    let content = editor.txt.html()
    let title = $(content).first().text()
    try {
      let result = await new Http({ type: 'postArticle', data: { title, content } }).send()
      pageRouter.go(`/article`, { routeName: 'article', id: result.id })
    } catch (err) {
      console.log(err)
    }
  }
})

pageRouter.route('/index', async (req, res, next) => {
  let routeName = 'user'
  pageRouter.go('/user', { routeName: 'user' })
  // new Http({ type: routeName }).send().then(res => {
  //   pageRouter.go('/user', { routeName: 'user' })
  // }).catch(err => {
  //   res.render(renderHandle(routeName, { isLogin: false }))
  // })

})

pageRouter.route('/user', (req, res, next) => {
  let routeName = req.routeName
  res.render(renderHandle(routeName, { isLogin: true }))
})

//如果没有routeName 重定向到 初始目录 /
pageRouter.route('*', (req, res, next) => {
  if (!req.routeName || req.routeName === 'undefined') {
    pageRouter.go('/index', { routeName: "index" })
  }
})

export default pageRouter
