// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var username = wx.getStorageSync('username')
    var pwd = wx.getStorageSync('pwd')
    if(!username || !pwd) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.setData({
        username: username,
        pwd: pwd
      })
    }
  },
  logout: function() {
    wx.removeStorageSync('username')
    wx.removeStorageSync('pwd')
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})