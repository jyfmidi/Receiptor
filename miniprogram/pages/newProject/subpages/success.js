// miniprogram/pages/newProject/subpages/success.js
Page({
  viewProject: function () {
    wx.redirectTo({
      url: '../../index/index'
    })
  },
  newProject: function () {
    wx.navigateTo({
      url: '../newProject'
    })
  },
  redirectToIndex: function () {
    wx.redirectTo({
      url: '../../index/index'
    })
  }
})