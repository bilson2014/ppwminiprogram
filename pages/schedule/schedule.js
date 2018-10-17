var app = getApp(); 
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    id:0,
    projectName:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var name = options.name;
    this.setData({
      id: id,
      projectName:name
    })
//'20170920173626332'
    this.getInfoDayS(id);
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

  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '4006609728',
    })
  },
  
  
  getInfoDayS: function (id) {

    var that = this;

    wx.request({
      url: app.globalData.head + '/miniprogram/schedule/info', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        projectId: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('res=' + res.data)
            
        var itemArray = res.data.result.items;
        that.sortItem(itemArray);

      }
    })

  },
  sortItem: function(resources){
    var temp;
    console.info(resources)
    for(var i = 0; i<resources.length;i++){
          for (var j = i; j < resources.length; j++) {
            if (this.compareDateName(resources[i].start, resources[j].start) > 0) {
              temp = resources[i];
              resources[i] = resources[j];
              resources[j] = temp;
            }
          }
    }

    let array = new Array;
    let nowDay = util.formatTime(new Date());
    var nowdate = new Date(nowDay);
    var nowyears = nowdate.getFullYear(); //获取当前年份(2位)     
    var nowmonths = nowdate.getMonth() + 1;//获取当前月份(0-11,0代表1月)  
    var nowday = nowdate.getDate();//
    var checkNowDay = parseInt(nowyears + '' + nowmonths + '' + nowday);
   
    resources.forEach(function (v, i) {
        var date = new Date(resources[i].start);
        var years = date.getFullYear(); //获取当前年份(2位)     
        var months = date.getMonth() + 1;//获取当前月份(0-11,0代表1月)  
        var day = date.getDate();//
        var index = true;
        var theDay = false;
        var checkDay = parseInt(years + '' + months + '' + day);
        if(day<10){
          day='0'+day;
        }

      
        
      console.info('checkDay=' + checkDay)
      console.info('checkNowDay=' + checkNowDay)

      if (checkDay < checkNowDay){
        index = true;
      } else if (checkDay > checkNowDay){
        index = false;
      }else{
        theDay = true;
      }
      
      var needDay = months + '月' + day + '日';
      var content = resources[i].jobContent;

        array.push({
          day: needDay, years: years + '年', content: content, index:index,theDay:theDay
        });
    })

     this.setData({
       array: array
     });

},

compareDateName: function(dIdA, IdB) {
  if (dIdA > IdB) {
    return 1;
  } else if (dIdA < IdB) {
    return -1;
  } else {
    return 0;
  }
},

check:function(e){
  
  // let index = e.currentTarget.dataset.index;

  //     this.data.array.forEach(function (v, i) {
      
  //        if(i == index){
  //             v.index = 1;
  //        }else{
  //             v.index = 0;
  //        }

  //     })

  //     this.setData({
  //       array: this.data.array
  //     });

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
      }
    }
  }
  
})