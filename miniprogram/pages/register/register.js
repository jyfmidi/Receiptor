// miniprogram/pages/register/register.js
import { USER_STATUS_REVIEWING, USER_PERMISSION_OTHER } from '../../utils/constants'


const app = getApp()

const db = wx.cloud.database()
const collection_users = db.collection("Users")


Page({
  data: {
    genders: ["", "男", "女"],
    genderIndex: 0
  },

  inputName(e) {
    this.name =  e.detail.value
  },

  inputWorkId(e) {
    this.workId = e.detail.value
  },

  inputDepartment(e) {
    this.department = e.detail.value
  },

  inputPosition(e) {
    this.position = e.detail.value
  },

  inputDepartment(e) {
    this.department = e.detail.value
  },

  inputPhone(e) {
    this.phone = e.detail.value
  },

  inputEmail(e) {
    this.email = e.detail.value
  },

  bindGenderChange: function (e) {
    this.setData({
      genderIndex: e.detail.value
    }),
    this.gender= this.data.genders[e.detail.value]
  },

  register() {
    collection_users.where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        if (res.data.length == 0) {
          collection_users.add({
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
              wx.redirectTo({
                url: 'subpages/success',
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