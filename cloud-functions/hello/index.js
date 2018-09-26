// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
// event中的action动作表示请求的目的，如下
// 1 代表登录操作
// 2 代表其他
exports.main = async (event, context) => {
  if(event.action == 1) {
    return {
    }
  }
}