// miniprogram/pages/newProject/newProject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owners: ["中国", "美国", "英国"],
    ownerIndex: 0,
  },
  bindOwnerChange: function(e){
    this.setData({
      ownerIndex: e.detail.value
    })
  }
})