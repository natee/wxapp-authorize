let code

const storeUserInfo = (params) => {
  console.log('待对比数据：', params)
  wx.request({
    url: '/api/xxx',
    method: 'POST',
    data: params,
    success: function (res) {
      console.log('success', res)
    },
    fail: function (res) {
      console.log('fail', res)
    }
  })
}

const getUserInfo = (code) => {
  wx.getUserInfo({
    success(data) {
      storeUserInfo({
        code: code,
        info: data
      })
    },
    fail(res) {
      console.log('getUserInfo：用户主动拒绝授权')
      authorizeFail()
    }
  })
}

// 重新打开授权
const reAuthorize = (code) => {
  wx.openSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        getUserInfo()
      } else {
        // 妈蛋，敢拒绝，必须授权！
        authorizeFail()
      }
    }
  })
}

const authorizeFail = () => {
  wx.showModal({
    title: "用户未授权",
    content: "不授权将影响您领取红包，点击“确定”打开授权设置，点击“取消”退出小程序",
    confirmText: "确定",
    success(res) {
      if (res.confirm) {
        reAuthorize()
      } else if (res.cancel) {
        // 由于前面没有页面，所以这里等于退出小程序
        wx.navigateBack()
      }
    }
  })
}

const mpAuthorize = (config, callback) => {
  wx.login({
    success(res) {
      code = res.code
      getUserInfo()
    }
  })
}

export {
  mpAuthorize
}
