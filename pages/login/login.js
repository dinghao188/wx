//index.js
//获取应用实例
const app = getApp()
wx.cloud.init()

Page({
  data: {
    test: '测试版本',
    username: null,
    pwd: null
  },
  onLoad: function(options) {
  },
  inputId: function(event) {
    this.setData({
      username: event.detail.value
    })
  },
  inputPwd: function(event) {
    this.setData({
      pwd: event.detail.value
    })
  },
  login: function(event) {
    if(!this.data.username || !this.data.pwd) {
      return
    } else {
      wx.setStorageSync('username', this.data.username)
      wx.setStorageSync('pwd', this.data.pwd)
      wx.switchTab({
        url: '/pages/info/info',
      })
    }
  }
})
