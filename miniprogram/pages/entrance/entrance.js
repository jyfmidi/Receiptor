// miniprogram/pages/entrance/entrance.js
const app = getApp()
Page({
  data: {
    openid: '',
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
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
                title: '抱歉，操作权限不足，请联系管理员'
              })
            } else {
              console.log(res)
              wx.showToast({
                icon: 'success',
                title: '您好，' + res.data[0]['name'],
                duration: 1500,
                mask: true,
                success: function() {
                  setTimeout(function() {
                    wx.navigateTo({
                      url: '../index/index',
                    })
                  },1500)
                }
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