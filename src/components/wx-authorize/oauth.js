class Authorize {
  constructor(){
    this.successCb = null
    this.failCb = null
    this.code = null
  }

  authroize(options){
    this.successCb = options.success || function(){}
    this.failCb = options.fail || function(){}
    wx.login({
      success: (res) => {
        this.code = res.code
        this.getUserInfo()
      }
    })
  }

  getUserInfo(){
    const self = this

    // TODO api更新，这个不能用了，用自定义提示，点击按钮才能调用
    wx.getUserInfo({
      success: (data) => {
        if(self.successCb && typeof self.successCb === "function"){
          self.successCb()
        }
      },
      fail: (res) => {
        console.log('getUserInfo：用户主动拒绝授权', res)
        
        /**
         * 之前拒绝授权后，我们直接打开授权配置，让用户勾选权限
         * 升级后，直接显示前端模拟的授权提示弹窗，由用户自主点击授权按钮
         * 手机调试可以看到微信的err_code，而微信开发者工具看不到，
         * 如果可以区分是用户手动拒绝授权还是其它方式导致失败，则这里可以优化为，打开权限配置页面
         */
        // this.authorizeFail()

        // 显示授权弹窗
        if(self.failCb && typeof self.failCb === "function"){
          self.failCb()
        }
      }
    })
  }

  authorizeFail(){
    wx.showModal({
      title: "用户未授权",
      content: "不授权将影响您领取奖励，点击“确定”打开授权设置，点击“取消”退出小程序",
      confirmText: "确定",
      success: (res) => {
        if (res.confirm) {
          this.reAuthorize()
        } else if (res.cancel) {
          // 由于前面没有页面，所以这里等于退出小程序
          wx.navigateBack()
        }
      }
    })
  }

  reAuthorize(){
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfo()
        } else {
          this.authorizeFail()
        }
      }
    })
  }
}

export default Authorize