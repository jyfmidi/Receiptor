// miniprogram/pages/newTransaction/newTransaction.js
import { PROJECT_STATUS_INPROCESSING, TRANSACTION_STATUS_REVIEWING, TRANSACTION_FLOW_IN, TRANSACTION_FLOW_OUT } from '../../utils/constants'

const app = getApp()

const db = wx.cloud.database()
const collection_users = db.collection("Users")
const collection_projects = db.collection("Projects")
const collection_transactions = db.collection("Transactions")


Page({
  data: {
    projects: [],
    // 前端选择项目时，显示项目名字用的数组（一一对应上方 projects）
    projectNames: [],
    // 当前选中项目的下标
    projectIndex: 0,

    flowIds: [TRANSACTION_FLOW_OUT,TRANSACTION_FLOW_IN],
    flowNames: ["支出","收入"],
    flowIndex: 0
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    // 获取所有开放的项目列表
    collection_projects.where({
      status: PROJECT_STATUS_INPROCESSING
    }).get({
      success: res => {
        let that = this
        var names = ["请选择该账目所属项目"]
        for (var i = 0; i < res.data.length; i++){
          names.push(res.data[i].name)
        }
        that.setData({
          projects: res.data,
          projectNames: names
        })
        
        wx.hideLoading()
      },
      fail: err => {
        console.error('[数据库] [查询可选项目] 失败: ', err)
      }
    })
  },

  redirectToIndex: function () {
    wx.navigateBack()
  },

  inputName(e) {
    this.name = e.detail.value
  },

  inputDescription(e) {
    this.description = e.detail.value
  },

  inputReceiptNumber(e) {
    this.receiptNumber = e.detail.value
  },

  inputAmount(e) {
    this.amount = e.detail.value
  },

  inputReceiver(e) {
    this.receiver = e.detail.value
  },


  bindProjectChange: function (e) {
    this.setData({
      projectIndex: e.detail.value
    })
  },

  bindFlowChange: function (e) {
    this.setData({
      flowIndex: e.detail.value
    })
  },


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
          collection_transactions.add({
            data: {
              name: this.name,
              description: this.description,
              number: this.receiptNumber,
              amount: parseInt(this.amount),
              receiver: this.receiver,

              owner: res.data[0],
              project: this.data.projects[this.data.projectIndex-1],
              create_timestamp: timestamp,
              update_timestamp: timestamp,


              status: TRANSACTION_STATUS_REVIEWING,
              flow_direction: this.data.flowIds[this.data.flowIndex]
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