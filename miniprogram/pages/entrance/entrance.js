// miniprogram/pages/entrance/entrance.js

import { USER_STATUS_REVIEWING, USER_STATUS_APPROVED, USER_STATUS_REJECTED } from '../../utils/constants'

var app = getApp()
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

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

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
            // 待验证用户，不跳转
            if (res.data.length > 0 && res.data[0]['status'] == USER_STATUS_REVIEWING) {
              wx.showToast({
                icon: 'none',
                title: '您的注册信息已提交，正在审核中',
                duration: 3000,
                mask: true
              })
            } else if (res.data.length > 0 && res.data[0]['status'] == USER_STATUS_REJECTED) {
              wx.showToast({
                icon: 'none',
                title: '抱歉，您的信息未通过审核，若有问题请联系管理员',
                duration: 3000,
                mask: true
              })
            } else if (res.data.length === 0 || res.data[0]['_openid'] != app.globalData.openid) {
              // 未注册新用户，跳转到注册页面
              wx.showToast({
                icon: 'none',
                title: '欢迎，即将跳转到注册页面。请注册信息后，联系管理员获取权限',
                duration: 2000,
                mask: true,
                success: function () {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../register/register',
                    })
                  }, 2000)
                }
              })
            } else {
              // 正式用户，跳转到主页
              wx.showToast({
                icon: 'none',
                title: '校验成功。您好，' + res.data[0]['name'],
                duration: 1500,
                mask: true,
                success: function() {
                  setTimeout(function() {
                    wx.redirectTo({
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

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

})