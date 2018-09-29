const request = require('request')

apiRequest = async function(options) {
  var res = new Promise((resolve,reject) => {
    request({
      url: options.url,
      method: options.method,
      body: JSON.stringify(options.payload)
    },(error,response,body) => {
      if(response && response.statusCode === 200) {
        resolve({
          st: response.statusCode,
          data: body
        })
      } else {
        reject(error)
      }
    })
  })
  return res;
}

/*
**将获取到的成绩数据格式化，最后得到的成绩为一个对象，格式如下
**{
  '学期1':{
    '课程编号':   String,
    '课程详情':   [编号，名称，成绩，未知，学分，学时，考核方式，必修？，未知]
  },
  '学期2':同上,
  ...
}
*/
formatScores = (scores) => {
  helper = (s) => {
    var tmp = {}
    for(let i = 0;i < s.length;++i) {
      let id = s[i][0]
      if(tmp[id]) {
        if (s[i][2] > tmp[id][2])
          tmp[id][2] = s[i][2]
      } else {
        tmp[id] = s[i]
      }
    }
    return tmp
  };

  var res = {}
  for(var key in scores) {
    res[key] = helper(scores[key])
  }
  return res
}

module.exports = {
  apiRequest,
  formatScores
}