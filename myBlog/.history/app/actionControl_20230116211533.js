import Modal from './modalControl'
import Validate from './validate'
import Http from './http'
import Router from './routeControl'
import scroll from './scroll'
/*
  actionControl
  管理页面所有发生的行为
  调用功能模块

  modal 行为
    modal 唤起渲染
    modal 上按钮触发

  form 行为 
    blur 清除错误提示
    confirm 提交 校验

*/
const RES_HANDLE = {
  register() {
    this.user()
  },
  login() {
    this.user()
  },
  user() {
    Router.go('/user', { routeName: 'user' })
  }
}



function cleanErrMsg(form) {
  //获取form下所有类名为 blog-error--input 错误p标签
  let errorInput = $(form).find('.blog-error--input')
  if (errorInput.length === 0) {
    return false
  }
  errorInput.removeClass('blog-error--input')[0].dataset['msg'] = ''
}

export default class Action {
  constructor() {
    this.init()
    this.modalAgency()
    this.formAgency()
    this.routeAgency()
  }

  init() {
    //初始路由
    Router.go('/index', { routeName: 'index' })
    let oCon = document.querySelector('.blog-container')
    oCon.addEventListener('touchmove', (e) => {
      e.preventDefault()
    }, false)
    new IScroll('.blog-container', {
      mouseWheel: true,
      // scrollbars: true
    });
    // 获取文章列表
  }

  //modal
  modalAgency() {
    //监听所有的 [data-modal] 元素的 click 渲染唤起对应modal
    $(document).on('click', '[data-modal]', (e) => {
      let $target = $(e.target)
      let modalType = $target.data('modal')
      //防止模板渲染时 data-modal属性 没有值
      if (!modalType) {
        return false
      }
      //modal属性挂载 Modal实例
      this.modal = new Modal({ modalType })
      this.modal.render()
    })

    //监听modal上的 button
    $(document).on('click', 'button[data-modal-btn]', (e) => {
      let $target = $(e.target)
      let btnType = $target.data('modal-btn')
      // confirm close 
      if (this.modal && btnType) {
        //调用modal 对应行为
        this.modal[btnType]()
      }
    })
  }

  //form 
  formAgency() {
    //form input 失去焦点时 清除错误提示
    $('form').on('blur', 'input', (e) => {
      let $target = $(e.target)
      let $form = $target.parent('form')
      //清除错误数据
      cleanErrMsg($form)
    })

    $(document).on('submit', 'form', async (e) => {
      let $target = $(e.target)
      //获取form的id
      let formType = $target[0].id
      cleanErrMsg($target)
      //表单校验 如果校验成功 返回表单数据
      try {
        let formData = await new Validate(formType)
        //调用 Http发送请求 
        let result = await new Http({ type: formType, data: formData, }).send()
        //如果请求回调成功 执行handle句柄
        RES_HANDLE[formType](result)
        /*
          业务处理 登录 回调 处理登录后续细节 dom
        
        */
        //如果存在modal 关闭modal
        this.modal && this.modal.close()
      } catch (err) {
        console.log(err)
      }

    })
  }

  //router
  routeAgency() {
    $(document).on('click', 'a[data-router]', function (e) {
      let $target = $(this)
      let routeName = $target.data('router')
      Router.go(`/${routeName}`, { routeName: routeName })
    })
  }
}

