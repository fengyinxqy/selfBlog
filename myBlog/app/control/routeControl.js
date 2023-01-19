import Template from './templateControl'
import Http from '../module/http'
import Router from '../route'
import util from '../util/util'
import $ from 'jquery'
import Editor from '../module/editor'
import store from 'store'
import QS from 'qs'

const ROUTE_MAP = {
  'write': {
    wrap: ".blog-container--wrap",
  },
  'index': {
    wrap: '.blog-head--login',
    tempName: 'user'
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
  return {
    dom: Template.render(tempName, data),
  }
}

//路由管理 事件
//实例化参数 模板渲染内容的容器的id名称
const pageRouter = new Router('page')

//功能中间件 
pageRouter.use((req) => {
  let type = req.body.routeName
  req.routeName = type
})

pageRouter.route('/write', async (req, res, next) => {
  //动态修改 router的实例wrap容器元素
  let routeName = 'write'
  try {
    let { list } = await Http({
      type: 'columns', data: {
        query: QS.stringify({ uid: store.get('uid') })
      }
    })
    res.render(renderHandle(routeName, { list }))
    //TODO 富文本编辑器初始化 参数为提交回调
    new Editor(async function (data) {
      if (!data) {
        return false
      }
      let result = await Http({ type: 'postArticle', data })
      pageRouter.go(`/article`, { routeName: 'article', id: result.id })
    })
  } catch (err) {
    console.log(err)
  }
})

pageRouter.route('/article', async (req, res, next) => {
  let routeName = 'article'
  try {
    let id = req.body.id

    let result = await Http({ type: 'getArticleById', data: { id } })
    res.render(renderHandle(routeName, result))
  } catch (err) {
    console.log(err)
  }
})

pageRouter.route('/index', async (req, res, next) => {
  let routeName = 'index'
  //TODO
  // pageRouter.go('/write', { routeName: 'write' })
  try {
    await Http({ type: routeName })
    res.render(renderHandle(routeName, { isLogin: true }))
  } catch (err) {
    res.render(renderHandle(routeName, { isLogin: false }))
  }

  try {
    routeName = "articles"
    let result = await Http({ type: routeName })
    console.log(result)
    result.list = result.list.map(item => {
      item.date = util.formatDate(new Date(item.date), 'yyyy年mm月dd日')
      item.content = `${$(item.content).text().slice(0, 60)}...`
      return item
    })
    res.render(renderHandle(routeName, result))
    //刷新 scroll 重新根据当前滚动内容适配滚动
  } catch (err) {
    console.log(err)
  }
})



//如果没有routeName 重定向到 初始目录 /
pageRouter.route('*', (req, res, next) => {
  if (!req.routeName || req.routeName === 'undefined') {
    pageRouter.go('/index', { routeName: "index" })
  }
})

export default pageRouter

