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

  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '4006609728',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
        that.reSetData(res.data.result.resources);
      }
    })

  },


  reSetData: function (item) {

    console.info(item)
    
    var arrayOut = [];


    for (var i in item) {

      var category = item[i].category;
      if (i == 0) {
        var setOut = {};
        setOut.category = item[i].category;
        setOut.isOpen = 1;
        setOut.picScale = item[i].picScale;
        setOut.categoryEN = item[i].categoryEN;
        setOut.itemArray = [];
        arrayOut.push(setOut);
      }
      else {
        var hasSame = false;
        for (var j in arrayOut) {
          var setSide = {};
          if (category == arrayOut[j].category) {
            hasSame = true;
          }
        }
        if (!hasSame) {
          var setOut = {};
          setOut.category = item[i].category;
          setOut.isOpen = 1;
          setOut.categoryEN = item[i].categoryEN;
          setOut.picScale = item[i].picScale;
          setOut.itemArray = [];
          arrayOut.push(setOut);
        }
      }
    }

    for (var i in item) {
      var category = item[i].category;
      for (var j in arrayOut) {
        if (category == arrayOut[j].category) {
          var setSide = {};

          if (item[i].name == "null"){
            setSide.name = item[i].typeName;
          }else{
            setSide.name = item[i].name;
          }
         
            if (item[i].name.length > 9) {
              setSide.name = item[i].name.substring(0, 9);
              setSide.name = setSide.name + '...';
            }
          if (item[i].mainPhoto != null && item[i].mainPhoto != ''){
              setSide.mainPhoto = app.globalData.urlPath + '/' +item[i].mainPhoto;
          }else{
            setSide.mainPhoto = null
          }
          setSide.id = item[i].id; 
          setSide.typeId = item[i].type; 
          setSide.subType = item[i].subType;
          setSide.typeName = item[i].typeName;
          arrayOut[j].itemArray.push(setSide);
        }
      }
    }

    console.log(arrayOut)

    this.setData({
      array: arrayOut
    })

  },


  openPostProduction: function (e) {

    var current = e.currentTarget.dataset.index;

    if (this.data.array[current].isOpen == 1) {
      this.data.array[current].isOpen = 0
    } else {
      this.data.array[current].isOpen = 1
    }

    this.setData({
      array: this.data.array
    })

  },

  opento:function(e){

    var id = e.currentTarget.dataset.id;
    var typeid = e.currentTarget.dataset.typeid;
    var typeName = e.currentTarget.dataset.type;
    var name = e.currentTarget.dataset.name;
    var photo = e.currentTarget.dataset.mainphoto;
    var types = e.currentTarget.dataset.typename;
    wx.navigateTo({
      url: '../storyBoardInfo/storyBoardInfo?id=' + id + '&typeid=' + typeid + '&typeName=' + typeName + '&name=' + name + '&photo=' + photo + '&types=' + types,
    })

  },
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