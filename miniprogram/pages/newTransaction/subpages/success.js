// miniprogram/pages/newTransaction/subpages/success.js
Page({
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