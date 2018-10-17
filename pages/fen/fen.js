var that = this;
var app = getApp(); 
Page({
     
  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getInfo(20170920173626332);
    let width = wx.getSystemInfoSync().windowWidth;
    let height = width*9/16;
    this.setData({
      height: height+'px'
    });


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
   * 
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  getInfo: function (id) {

    var that = this;
    wx.request({
      url: app.globalData.head + '/miniprogram/continuity/info', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
            projectId: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
          let array = new Array();
          let getItem = res.data.result.scripts;
          getItem.forEach(function (v, i) {
            array.push({
              type: v.type, url: app.globalData.urlPath + v.picture, content: v.description
            });
           });

          that.setData({
            array:array
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