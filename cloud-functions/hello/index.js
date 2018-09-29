// 云函数入口文件
const cloud = require('wx-server-sdk')
const util = require('./util.js')
cloud.init()
const db = cloud.database()
const apiRoot = 'http://api.shengrang.net/jwc/'
// 云函数入口函数
// event中的action动作表示请求的目的，如下
// 1 代表登录操作
// 2 代表发布失物信息
// 3 代表发布寻物信息
exports.main = async (event, context) => {
  if(event.action == 1) {
    return {
    }
  } else if(event.action == 2) {
    if (event.studentId && event.contactWho) {
      try {
        var record = await db.collection('lost')
        .where({
          student_id: event.studentId,
          contact_who: event.contactWho
        }).get()

        if(record.data.length) {
          return record.data
        } else {
          await db.collection('found').add({
            data: {
              student_id: event.studentId,
              contact_who: event.contactWho
            }
          })
          return
        }
      } catch (e) {
        console.log(e)
      }
    }
  } else if(event.action == 3){
    try {
      var doc = await db.collection('found')
      .where({
        student_id: event.studentId
      }).get()
      if(doc.data.length) {
        return doc.data
      } else {
        await db.collection('lost').add({
          data: {
            student_id: event.studentId,
            contact_who: event.contactWho
          }
        })
        return
      }
    } catch(e) {
      console.log(e)
    }
  } else {
    var url = apiRoot+'score?user='+event.user+'&pwd='+event.pwd
    var res = await util.apiRequest({
      url: url,
      method: 'get'
    }).catch(e => console.log(e))
    if(res && res.data) {
      let tmp = JSON.parse(res.data)
      return util.formatScores(tmp.scores)
    }
  }
}