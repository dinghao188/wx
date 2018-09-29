// pages/index/index.js
const utils = require('../../utils/util.js')
wx.cloud.init()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentId: null,
    contactWho: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  inputId: function(event) {
    this.setData({
      studentId: event.detail.value
    })
  },
  inputWho: function(event) {
    this.setData({
      contactWho: event.detail.value
    })
  },
  publishLoss: function() {
    var studentId = this.data.studentId;
    var contactWho = this.data.contactWho;
    var content = '丢卡者学号：'+studentId+'\n您的联系方式：'+contactWho+'\n确定要发布失物信息？'
    if(studentId && contactWho) {
      wx.showModal({
        title: '发布信息',
        content: content,
        success: res => {
          if(res.cancel) {
          } else {
            wx.cloud.callFunction({
              name: 'hello',
              data: {
                action: 2,
                studentId: studentId,
                contactWho: contactWho
              },
              success: function(res) {
                if (res.result) {
                  wx.showModal({
                    title: '已有信息',
                    content: '请联系：' + res.result[0].contact_who,
                  })
                } else {
                  wx.showToast({
                    title: '发布成功',
                    duration: 1000,
                    icon: 'success'
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  searchLoss: function() {
    var studentId = this.data.studentId;
    var contactWho = this.data.contactWho;
    var content = '您的学号：' + studentId + '\n您的联系方式：' + contactWho + '\n确定要发布寻物信息？'
    if (studentId && contactWho) {
      wx.showModal({
        title: '发布信息',
        content: content,
        success: res => {
          if (res.cancel) {
          } else {
            wx.cloud.callFunction({
              name: 'hello',
              data: {
                action: 3,
                studentId: studentId,
                contactWho: contactWho
              },
              success: function (res) {
                if(res.result) {
                  wx.showModal({
                    title: '查找成功',
                    content: '请联系：'+res.result[0].contact_who,
                  })
                } else {
                  wx.showToast({
                    title: '发布成功',
                    duration: 1000,
                    icon: 'success'
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})