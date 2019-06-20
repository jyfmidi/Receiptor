// miniprogram/pages/newProject/newProject.js
import { ENTRY_STATUS_REVIEWING, USER_STATUS_APPROVED } from '../../utils/constants'


const app = getApp()

const db = wx.cloud.database()
const collection_users = db.collection("Users")
const collection_prjects = db.collection("Projects")


Page({
  data: {
    // 隐式：可选用户 openid 数组
    ownerIds: [""],
    // 显式：前端选择创建者时，显示用户名字用的数组（一一对应上方 ownerIds）
    ownerNames: [""],
    // 当前选中创建者的下标
    ownerIndex: 0,
    name: '',
    description: ''
  },

  onLoad: function (options) {
    // 获取所有注册用户的名单
    collection_users.where({
      status: USER_STATUS_APPROVED
    }).get({
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.error('[数据库] [查询注册用户] 失败: ', err)
      }
    })
  },

  inputName(e) {
    this.name =  e.detail.value
  },

  inputDescription(e) {
    this.description = e.detail.value
  },


  bindGenderChange: function (e) {
    console.log(this)
    this.setData({
      ownerIndex: e.detail.value
    }),
    this.setData({
      owner: this.data.owners[e.detail.value]
    })
  },

  register() {
    collection_user.where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        if (res.data.length == 0) {
          collection_user.add({
            data: {
              name: this.name,
              gender: this.gender,
              workId: this.workId,
              department: this.department,
              position: this.position,
              phone: this.phone,
              email: this.email,

              status: USER_STATUS_REVIEWING,
              permission: USER_PERMISSION_OTHER
            },
            success: res => {
              wx.showToast({
                icon: 'success',
                title: '信息已提交'
              })
              console.log('[数据库] [新增用户] 成功：', res)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '新增记录失败'
              })
              console.error('[数据库] [新增用户] 失败：', err)
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '您的注册信息已记录，请勿重复提交',
            duration: 3000,
            mask: true
          })
        }
      },
      fail: err => {
        console.error('[数据库] [查询用户] 失败: ',err)
      }
    })
  }
})