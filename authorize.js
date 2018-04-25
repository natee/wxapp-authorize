import api from '@/api'

class Authorize {
  constructor(){
    this.callback = null
    this.code = null
  }

  authroize(callback){
    this.callback = callback
    wx.login({
      success: (res) => {
        this.code = res.code
        this.getUserInfo()
      }
    })
  }

  getUserInfo(){
    wx.getUserInfo({
      success: (data) => {
        
        // 这一段是用来记录用户信息，实际当中不一定有
        api.saveUserInfo({
          code: this.code,
          info: JSON.stringify(data.userInfo)
        }).then(res => {
          if(res.code === 0){
            
            // 如果需要在授权成功后才进行后续操作，传入callback
            if(this.callback && typeof this.callback === "function"){
              this.callback()
            }
          }
        })
      },
      fail: (res) => {
        console.log('getUserInfo：用户主动拒绝授权')
        this.authorizeFail()
      }
    })
  }

  authorizeFail(){
    wx.showModal({
      title: "用户未授权",
      content: "不授权将影响您领取红包，点击“确定”打开授权设置，点击“取消”退出小程序",
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
          // 妈蛋，敢拒绝，必须授权！
          this.authorizeFail()
        }
      }
    })
  }
}

export default Authorize
