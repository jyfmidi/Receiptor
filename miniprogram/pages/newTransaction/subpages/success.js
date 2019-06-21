// miniprogram/pages/newTransaction/subpages/success.js
Page({
  viewTransaction: function () {
    wx.redirectTo({
      url: '../../index/index'
    })
  },
  newTransaction: function () {
    wx.navigateTo({
      url: '../newTransaction'
    })
  },
  redirectToIndex: function () {
    wx.reLaunch({
      url: '../../index/index'
    })
  }
})