export default {
  "login": {
    title: '登录',
    formType: 'login',
    formData: [
      {
        label: "用户名",
        query: "username",
        type: "text",
        placeholder: "用户名: 6-8位 字母数字"
      },
      {
        label: "密码",
        query: "pwd",
        type: "password",
        placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)"
      }
    ],
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
        isSubmit: true
      }
    ]
  },
  "register": {
    title: '注册',
    formType: 'register',
    formData: [
      {
        label: "用户名",
        query: "username",
        type: "text",
        placeholder: "用户名: 6-8位 字母数字"
      },
      {
        label: "密码",
        query: "pwd",
        type: "password",
        placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)"
      }
    ],
    btns: [
      {
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
        isSubmit: true
      }
    ]
  }
}