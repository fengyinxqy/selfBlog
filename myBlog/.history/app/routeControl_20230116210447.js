/*
 * @Author: Petrichor 572752189@qq.com
 * @Date: 2022-11-14 18:25:32
 * @LastEditors: Petrichor 572752189@qq.com
 * @LastEditTime: 2023-01-16 21:04:47
 * @FilePath: \myBlog\app\routeControl.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Petrichor 572752189@qq.com, All Rights Reserved. 
 */
import Template from './templateControl'
import Http from './http'
import Router from 'sme-router'
import Editor from 'wangeditor'
import util from './util/util'
import scroll from './scroll'
import $ from 'jquery'

const ROUTE_MAP = {
  'write': {
    wrap: ".blog-container--wrap",
  },
  'user': {
    wrap: ".blog-head--login"
  },
  'index': {
    wrap: '.blog-head--login',
  },
  'editor/submit': {
    wrap: ".blog-container--wrap",
    tempName: 'article'
  },
  'article': {
    wrap: '.blog-container--wrap',
    tempName: 'article'
  },
  'articles': {
    wrap: '.blog-container--wrap',
    tempName: 'articles'
  }
}

let editor

//设置routeName 和 渲染容器
function routeHandle(routeName) {
  let type = routeName
  if (ROUTE_MAP[type]?.['wrap']) {
    pageRouter['_mount'] = document.querySelector(ROUTE_MAP[type]['wrap'])
  }
}

/*
  模板名称 默认为 routeName 路由名称
  如果 路由表对应路由属性 有tempName属性 那 模板名称 对应tempName属性值
*/
function renderHandle(routeName, data) {
  routeHandle(routeName)
  let { tempName } = ROUTE_MAP[routeName];
  if (!tempName) {
    tempName = routeName
  }
  return Template.render(tempName, data)
}

//路由管理 事件
//实例化参数 模板渲染内容的容器的id名称
const pageRouter = new Router('page')

//功能中间件 
pageRouter.use((req) => {
  let type = req.body.routeName
  req.routeName = type
})

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

pageRouter.route('/article', async (req, res, next) => {
  let routeName = 'article'
  try {
    let id = req.body.id
    let result = await new Http({ type: 'getArticleById', data: { id } }).send()
    res.render(renderHandle(routeName, result))
  } catch (err) {

  }
})
pageRouter.route('/index', async (req, res, next) => {
  let routeName = 'user'

  pageRouter.go('/user', { routeName: 'user' })
  try {
    routeName = "articles"
    let result = await new Http({ type: routeName }).send()

    result.list = result.list.map(item => {
      item.date = util.formatDate(new Date(item.date), 'yyyy年mm月dd日')
      item.content = `${$(item.content).text().slice(0, 60)}...`
      return item
    })
    res.render(renderHandle(routeName, result))
    //刷新 scroll 重新根据当前滚动内容适配滚动
    scroll.refresh()
  } catch (err) {
    console.log(err)
  }


})

pageRouter.route('/user', (req, res, next) => {
  let routeName = req.routeName
  // res.render(Template.render(routeName, { isLogin: true }))
  res.render(renderHandle(routeName, { isLogin: true }))
})

//如果没有routeName 重定向到 初始目录 /
pageRouter.route('*', (req, res, next) => {
  if (!req.routeName || req.routeName === 'undefined') {
    pageRouter.go('/index', { routeName: "index" })
  }
})

export default pageRouter

