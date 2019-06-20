// miniprogram/pages/personalInfo/personalInfo.js
const app = getApp()
Page({
  data: {
    userInfo: {
      name: '',
      gender: '',
      workId: '',
      department: '',
      position: '',
      phone: '',
      email: ''
    }
  },

  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        const db = wx.cloud.database()
        db.collection('Users').where({
          _openid: app.globalData.openid
        }).get({
          success: res => {
            if (res.data.length === 0 || res.data[0]['_openid'] != app.globalData.openid) {
              wx.showToast({
                icon: 'none',
                title: '抱歉，操作权限不足，请联系管理员',
                duration: 1500,
                mask: true,
                success: function () {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '../entrance/entrance',
                    })
                  }, 1500)
                }
              })
            } else {
              this.setData({
                'userInfo.name' : res.data[0]['name'],
                'userInfo.gender' : res.data[0]['gender'],
                'userInfo.workId' : res.data[0]['workId'],
                'userInfo.department': res.data[0]['department'],
                'userInfo.position': res.data[0]['position'],
                'userInfo.phone': res.data[0]['phone'],
                'userInfo.email': res.data[0]['email'],
              })
            }
          },
          fail: err => {
            console.error('[数据库] [用户] 查询失败', err)
          }
        })

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
})