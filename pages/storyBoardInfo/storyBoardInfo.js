// pages/storyBoardInfo/storyBoardInfo.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {

     name:'',
     typeName:'',
     group:'',
     city:'',
     des:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      var setName;
    if (options.name.length > 9) {
      setName = options.name.substring(0, 9);
      setName = setName + '...';
    }

   this.setData({
     showName:setName,
     name: options.name,
     group: options.typeName,
     photo: options.photo,
     typeName: options.types
   })

    this.getInfo(options.id, options.typeid);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  getInfo: function (id,typeId) {

    var that = this;
    console.log(id)
    wx.request({
      url: app.globalData.head + '/miniprogram/production/' +typeId+'/'+id, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        projectId: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

         console.info(res)

        that.setData({
          des: res.data.result.remark,
          city: res.data.result.city,
        });
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '',
      imageUrl: '../image/chu.jpg',
      path: '/pages/main/main?id=' + that.data.id,
      success: function (res) {
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
        
      }
    }
  }
})