// pages/grade/grade.js
wx.cloud.init()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [
      {
        term: '000000000',
        course: [
          [1,2,3,4, 6],
          [1,2,3,4, 6]
        ],
        term_gpa0: 0,
        term_gpa1: 0,
        term_credit0: 0,
        term_credit1: 0
      },
      {
        term: '000000000',
        course: [
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5]
        ],
        term_gpa0: 0,
        term_gpa1: 0,
        term_credit0: 0,
        term_credit1: 0
      }
    ],
    all_credit0: 0,
    all_credit1: 0,
    all_gpa0: 0,
    all_gpa1: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formatScores: function(scores) {
    var res = [];
    var all_gpa0 = 0
    var all_gpa1 = 0
    var all_credit0 = 0
    var all_credit1 = 0
    for (var key in scores) {
      let tmp = {}
      tmp.term = key
      tmp.term_gpa0 = 0
      tmp.term_credit0 = 0
      tmp.term_gpa1 = 0
      tmp.term_credit1 = 0
      tmp.course = []
      for (let key2 in scores[key]) {
        tmp.course.push(scores[key][key2])
      }
      for (let i = 0; i < tmp.course.length; ++i) {
        tmp.term_credit0 += parseFloat(tmp.course[i][4])
        if (tmp.course[i][7] == '必修') {
          tmp.term_credit1 += parseFloat(tmp.course[i][4])
        }
        let point = 0;
        if (tmp.course[i][2] >= 90 || tmp.course[i][2] == '优秀') {
          point = 4.0
        } else if (tmp.course[i][2] >= 85) {
          point = 3.7
        } else if (tmp.course[i][2] >= 82) {
          point = 3.3
        } else if (tmp.course[i][2] >= 78 || tmp.course[i][2] == '良好') {
          point = 3.0
        } else if (tmp.course[i][2] >= 75) {
          point = 2.7
        } else if (tmp.course[i][2] >= 72) {
          point = 2.3
        } else if (tmp.course[i][2] >= 68 || tmp.course[i][2] == '中等') {
          point = 2.0
        } else if (tmp.course[i][2] >= 64) {
          point = 1.5
        } else if (tmp.course[i][2] >= 60 || tmp.course[i][2] == '及格' || tmp.course[i][2] == '通过') {
          point = 1.0
        } else {
          point = 0.0
        }
        tmp.term_gpa0 += point * parseFloat(tmp.course[i][4])
        if (tmp.course[i][7] == '必修') {
          tmp.term_gpa1 += point * parseFloat(tmp.course[i][4])
        }
      }
      tmp.term_gpa0 = (tmp.term_gpa0 / tmp.term_credit0).toFixed(2)
      tmp.term_gpa1 = (tmp.term_gpa1 / tmp.term_credit1).toFixed(2)
      res.push(tmp)
      all_credit0 += tmp.term_credit0
      all_credit1 += tmp.term_credit1
      all_gpa0 += tmp.term_gpa0 * tmp.term_credit0
      all_gpa1 += tmp.term_gpa1 * tmp.term_credit1
    }
    all_gpa0 = (all_gpa0 / all_credit0).toFixed(2)
    all_gpa1 = (all_gpa1 / all_credit1).toFixed(2)
    this.setData({
      scores: res,
      all_gpa0,
      all_gpa1,
      all_credit0,
      all_credit1
    })
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'hello',
      data: {
        user: wx.getStorageSync('username'),
        pwd: wx.getStorageSync('pwd')
      }
    }).then(res => {
      this.formatScores(res.result)
    })
  }
})