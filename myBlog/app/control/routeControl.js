import Template from './templateControl'
import Http from '../module/http'
import Router from '../route'
import util from '../util/util'
import modalMap from '../config/modal.config'
import $ from 'jquery'
import Editor from '../module/editor'
import Comment from '../module/comment'
import store from 'store'
import QS from 'qs'
import Packery from 'packery'
import Message from '../module/message'



const ROUTE_MAP = {
  'write': {
    wrap: ".blog-container--wrap",
  },
  'toolbar': {
    wrap: '.blog-toolbar',
    tempName: 'toolbar'
  },
  'index': {
    wrap: '.blog-head--login',
    tempName: 'user'
  },
  'info': {
    wrap: '.blog-container--wrap',
    tempName: 'info'
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
  },
  'columns': {
    wrap: '.blog-container--wrap',
    tempName: 'columns'
  },
  'slide': {
    wrap: '.blog-slide-wrap',
    tempName: 'slide'
  }
}

const userInfoName = 'ua_info'



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
    dom: Template.render(tempName, data)
  }
}

//路由管理 事件
//实例化参数 模板渲染内容的容器的id名称
const pageRouter = new Router('page')

//功能中间件 
pageRouter.use((req) => {
  let type = req.body.routeName
  req.routeName = type
  pageRouter.render(renderHandle('toolbar', {
    list: []
  }))
})

pageRouter.route('/info', async (req, res, next) => {
  let routeName = 'info'
  let data = modalMap[routeName]
  try {
    let result = store.get(userInfoName)
    if (!result) {
      new Message('请先登录').warning()
    }
    // 给每个 表单item 的value赋值为result对应key
    data.formData = data.formData.map(item => {
      let key = item.query
      item.value = result[key]
      return item
    })
    res.render(renderHandle(routeName, data))
  } catch (err) {
    console.log(err)
  }
})

pageRouter.route('/columns', async (req, res, next) => {
  //动态修改 router的实例wrap容器元素
  let routeName = 'columns'
  try {
    let { list } = await Http({
      type: 'columns', data: {
        query: QS.stringify({ uid: store.get('uid') })
      }
    })
    list = list.map(item => {
      let len = item.aids.length
      item.size = Math.min((len + 1) * 2, 8)
      return item
    })
    res.render(renderHandle(routeName, { list }))
    new Packery('.blog-column', {})
  } catch (err) {
    console.log(err)
  }
})


pageRouter.route('/write', async (req, res, next) => {
  //动态修改 router的实例wrap容器元素
  let routeName = 'write'
  let columnId = req.body.columnID
  try {
    let { list } = await Http({
      type: 'columns', data: {
        query: QS.stringify({ uid: store.get('uid') })
      }
    })
    let selectIdx = list.reduce((acc, curr, idx) => {
      if (curr._id == columnId) {
        return idx
      }
      return acc
    }, 0)
    list = list.map((item, idx) => {
      item.selected = idx === selectIdx
      return item
    })
    res.render(renderHandle(routeName, { list }))
    //TODO 富文本编辑器初始化 参数为提交回调
    new Editor(async function (data) {
      if (!data) {
        return false
      }
      let result = await Http({ type: 'postArticle', data })
      pageRouter.go(`/article`, { routeName: 'article', articleID: result.id })
    })
  } catch (err) {
    console.log(err)
  }
})

pageRouter.route('/article', async (req, res, next) => {
  let routeName = 'article'
  try {
    let articleId = req.body.articleID
    let result = await Http({ type: 'getArticleById', data: { id: articleId } })
    res.render(renderHandle(routeName, result))
    res.render(renderHandle('toolbar', {
      list: [
        {
          icon: 'heart-empty',
          content: result.like_num
        },
        {
          icon: 'eye-open',
          content: result.hit_num
        },
        {
          icon: 'edit',
          content: result.comment_num
        }
      ]
    }))
    //comment 控制
    new Comment({
      eleInput: '.blog-comment--input',
      eleSubmit: '.blog-comment--submit',
      aid: articleId
    }, async (data) => {
      if (!data) {
        return false
      }
      await Http({ type: 'postComment', data })
      pageRouter.reload('/article', { routeName: "article", articleID: articleId })
    })

  } catch (err) {
    console.log(err)
  }
})


pageRouter.route('/index', async (req, res, next) => {
  let routeName = 'index'
  //userInfo
  let isLogin = false
  let userInfo = {}
  try {
    await Http({ type: routeName })
    isLogin = true
    //登录后获取用户信息
    userInfo = await Http({
      type: 'getUserInfo'
    })
    store.set(userInfoName, userInfo)
    res.render(renderHandle('slide', userInfo))
  } catch (err) {
    console.log(err)
    isLogin = false
  }
  res.render(renderHandle(routeName, { isLogin, avatar: userInfo.avatar }))
  let reqBody = { ...req.body }
  reqBody.routeName = "articles"
  pageRouter.go('/articles', reqBody)
})


pageRouter.route('/articles', async (req, res, next) => {
  let routeName = "articles"
  res.render(renderHandle('toolbar', {
    list: [
      {
        route: 'write',
        content: '写文章',
        icon: 'edit'
      }
    ]
  }))
  try {
    let columnId = req.body.columnID
    let q = req.body.search
    let queryData = { column: columnId, q }
    let result = await Http({
      type: routeName,
      data: {
        query: QS.stringify(queryData)
      }
    })
    result.columnId = columnId
    result.list = result.list.map(item => {
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

