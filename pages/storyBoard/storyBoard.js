// pages/storyBoard/storyBoard.js
var that = this;
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
    arrayItem: [],
    array:[],
    array0: [],
    projectName:'',
    id:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.initPage();
    this.getInfo(options.id);
    this.setData({
      projectName: options.name,
      id: options.id
    })

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
  },

  initPage: function (){

    this.data.arrayItem.push({
      title: "创作团队",
      url:"../image/team.png",
      type:"创作团队",
      isOpen:false
    });
    this.data.arrayItem.push({
      title: "后期制作",
      url: "../image/team.png",
      type: "后期制作",
      isOpen: false
    });
    this.data.arrayItem.push({
      title: "拍摄设备",
      url: "../image/team.png",
      type: "拍摄设备",
      isOpen: false
    });
    this.data.arrayItem.push({
      title: "服装道具",
      url: "../image/team.png",
      type: "服装道具",
      isOpen: false
    });
    this.data.arrayItem.push({
      title: "拍摄场地",
      url: "../image/team.png",
      type: "拍摄场地",
      isOpen: false
    });
    this.data.arrayItem.push({
      title: "配音配乐",
      url: "../image/team.png",
      type: "配音配乐",
      isOpen: false
    });
    this.data.arrayItem.push({
      title: "差旅食宿及杂费",
      url: "../image/team.png",
      type: "差旅食宿及杂费",
      isOpen: false
    });
    this.data.arrayItem.push({
      title: "附加服务",
      url: "../image/team.png",
      type: "附加服务",
      isOpen: false
    });

    this.setData({

      arrayItem: this.data.arrayItem

    });

  },


  openItem:function(e){
    
    var id = e.currentTarget.dataset.text;
    var index = e.currentTarget.id;
    var hasOpen = this.data.arrayItem[index].isOpen;

    this.data.arrayItem.forEach(function (v, i) {

      if (index == i && !hasOpen){
          v.isOpen = true;
      }else{
          v.isOpen = false;
      }

    })


    this.data.array = [];
    var checkArray = this.data.array0;
    
    for (var i = 0, len = checkArray[0].length; i < len; i++){
      if(checkArray[0][i].category == id){
        var item = {};
        item.name = checkArray[0][i].name;
        item.photo = app.globalData.urlPath + checkArray[0][i].mainPhoto;
        item.picScale =  checkArray[0][i].picScale;
        this.data.array.push(item);
      } 
    }

    console.log(this.data.array);

    this.setData({
      arrayItem: this.data.arrayItem,
      array: this.data.array
    });
  
  },

  getInfo: function (id) {

    var that = this;
    console.log(id)
    wx.request({
      url: app.globalData.head +'/miniprogram/production/info', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        projectId: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        that.data.array0.push(res.data.result.resources)

      }
    })

  },


})