// miniprogram/pages/newProject/newProject.js
import { PROJECT_STATUS_INPROCESSING, USER_STATUS_APPROVED } from '../../utils/constants'

const app = getApp()

const db = wx.cloud.database()
const collection_users = db.collection("Users")
const collection_projects = db.collection("Projects")


Page({
  data: {
    // // 隐式：可选用户 _id 数组
    // ownerIds: [],
    // // 显式：前端选择创建者时，显示用户名字用的数组（一一对应上方 ownerIds）
    // ownerNames: [],
    // // 当前选中创建者的下标
    // ownerIndex: 0
  },

  onLoad: function (options) {
    // 获取所有注册用户的名单
    // collection_users.where({
    //   status: USER_STATUS_APPROVED
    // }).get({
    //   success: res => {
    //     var ids = ["0"]
    //     var names = ["请选择创建者"]
    //     for (var i = 0; i < res.data.length; i++){
    //       ids.push(res.data[i]._id)
    //       names.push(res.data[i].name)
    //     }
    //     this.setData({
    //       ownerIds: ids,
    //       ownerNames: names
    //     })
    //   },
    //   fail: err => {
    //     console.error('[数据库] [查询注册用户] 失败: ', err)
    //   }
    // })
  },

  redirectToIndex: function () {
    wx.navigateBack()
  },

  inputName(e) {
    this.name =  e.detail.value
  },

  inputDescription(e) {
    this.description = e.detail.value
  },


  // bindOwnerChange: function (e) {
  //   this.setData({
  //     ownerIndex: e.detail.value
  //   })
  // },


  submit() {
    collection_users.where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        // 验证用户是否存在
        if (res.data.length > 0) {
          wx.showLoading({
            title: '提交中...',
            mask: true
          })
          const timestamp = new Date().getTime();
          collection_projects.add({
            data: {
              name: this.name,
              description: this.description,
              owner_id: res.data[0]['_id'],
              create_timestamp: timestamp,
              update_timestamp: timestamp,

              status: PROJECT_STATUS_INPROCESSING
            },
            success: res => {
              wx.hideLoading()
              wx.redirectTo({
                url: 'subpages/success',
              })
              console.log('[数据库] [创建新项目]] 成功：', res)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '新增记录失败'
              })
              console.error('[数据库] [创建新项目] 失败：', err)
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '抱歉，暂无权限提交，有问题请联系管理员',
            duration: 3000,
            mask: true
          })
        }
      },
      fail: err => {
        console.error('[数据库] [查询用户] 失败: ', err)
      }
    })
    
  }
})