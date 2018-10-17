var that = this;
var app = getApp();
Page({
  data: {
    background: ['https://fileb.apaipian.com/group1/M00/00/87/CgpmTllTkpqAbR5PAEzZ7vPheBY900.mp4', 'https://filec.apaipian.com/group1/M01/00/DE/CgpsbFuFKsmAN4inABYYeRYeVI0381.mp4', 'https://filec.apaipian.com/group1/M01/00/DE/CgpsbFuFKsmAN4inABYYeRYeVI0381.mp4'],
    indicatorDots: true,
    vertical: true,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    height:0,
    width:0,
    left:0,
    top:0,
    check: ['','极远景', '远景', '大远景', '全景', '中景', '近景', '极远景', '特写', '大特写'],
    checkRatio: ['16:9  (1920x1080)', '1:1  (1024x1024)', '3:4  (810x1080)'],
    checkStyle: ['亚洲小清新', '韩国时尚风', '科技工业感', '复古时尚志', '欧美电影感'],
   
  },

  onLoad: function (e) {

    this.getInfo(e.id);

   this.setData({
     height: wx.getSystemInfoSync().windowWidth,
     width: wx.getSystemInfoSync().windowHeight,
     left: (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth)/2,
   })



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
        let dimensionId = "";
        if (res.data.result.dimensionId > 0){
          if (res.data.result.dimensionId == 120 || res.data.result.dimensionId == 180 || res.data.result.dimensionId == 300 || res.data.result.dimensionId == 600){
            dimensionId = res.data.result.dimensionId/60 + '分钟'
          }else{
            dimensionId = res.data.result.dimensionId  + '秒'
          }

        } 

        that.setData({
          projectName: res.data.result.projectName,
          dimensionId: dimensionId,
          pictureRatio: that.data.checkRatio[res.data.result.pictureRatio],
          videoStyle: that.data.checkStyle[res.data.result.videoStyle]
        });
        
        getItem.forEach(function (v, i) {

          let setUrl;
          if (v.picture != "") {
            setUrl = app.globalData.urlPath + v.picture
          }
          
          // let realWidth;
          // let realHeight;
          // let setWidth;
          // let setHeight;

          // wx.getImageInfo({
          //   src: setUrl,
          //   success: function (res) {
          //     realWidth = res.width;  
          //     realHeight = res.height;  
          //   }
          // })

          // if (realWidth / realHeight < (16 / 9)) {
          //   setWidth = 'auto';
          //   setHeight = realHeight;
          // } else {
          //   setWidth = realWidth;
          //   setHeight = 'auto';
          // }

          array.push({
            type: that.data.check[v.type], 
            url: setUrl,
            content: v.description,

          });
        });

        that.setData({
          array: array
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
