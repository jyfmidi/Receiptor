//index.js
const app = getApp()

Page({
  data: {
    openid: '',
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: true,
    takeSession: true,
    requestResult: ''
  },

  onLoad: function(options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    this.setData({
      openid: app.globalData.openid
    })
  },

})
