const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
var app = getApp(); 
Page({
  data: {

    array: [],
    hasInfo: false,
    content: "",
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    demo2_days_style: [],
    id:0

  },

  prev: function (event) {

    this.setData({
      year: event.detail.currentYear,
      month: event.detail.currentMonth,
      hasInfo: false
    })
    this.getNowDay(0);

  },
  next: function (event) {

    this.setData({
      year: event.detail.currentYear,
      month: event.detail.currentMonth,
      hasInfo: false
    })
    this.getNowDay(0);
  },
  dayClick: function (event) {

    var year = event.detail.year;
    var month = 0;
    if (event.detail.month < 10) {
      month = "0" + event.detail.month
    } else {
      month = event.detail.month;
    }

    var day = event.detail.day;
    if (event.detail.day < 10) {
      day = "0" + event.detail.day
    } else {
      day = event.detail.day;
    }

    var nowData = year + "-" + month + "-" + day;
    console.info('nowData' + nowData);
    var moth = event.detail
    var arr = this.data.array;
    for (var i = 0, len = arr.length; i < len; i++) {
      var dataDay = arr[i].start;
      if (dataDay == nowData) {
        this.setData({
          hasInfo: true,
          content: arr[i].jobContent
        })
        break;
      }
    }

    this.getNowDay(day);

  },


  dateChange: function (event) {
    console.log(event.detail.year);


  },

  onLoad: function (options) {

    this.setData({
      id: options.id
    })
    this.getInfoDay(options.id)

  
  },

  getNowDay: function (dayId) {


    var hasDayId = dayId;

    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo2_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {

      var day = 0;
      var month = this.data.month;

      if (month < 10) {
        month = '0' + month;
      }

      if (i < 10) {
        day = '0' + i;
      } else {
        day = i;
      }

      var checkDay = this.data.year + '-' + month + '-' + day;

      var arr = this.data.array;

      var dataItem = 0;

      for (var j = 0, len = arr.length; j < len; j++) {
        dataItem = arr[j].start;
        if (checkDay == dataItem) {

          if (day == hasDayId){
              demo2_days_style.push({
                month: 'current', day: i, color: 'white', background: '#000'
              });
          }else{
            demo2_days_style.push({
              month: 'current', day: i, color: 'white', background: '#fe5453'
            });
          }
        } else {
          demo2_days_style.push({
            month: 'current', day: i
          });
        }
      }

    }

    console.log(demo2_days_style)

    this.setData({
      demo2_days_style
    });

  },


  getInfoDay:function(id){
    
    var that = this;

    wx.request({
      url: app.globalData.head +'/miniprogram/schedule/info', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        projectId: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('res='+res.data)
        
        var itemArray = res.data.result.items;
        var littleYear = '2016-01-01'; 
        for (var j = 0, len = itemArray.length; j < len; j++){
          that.data.array.push(itemArray[j])
          if (littleYear < itemArray[j].start){
            littleYear = itemArray[j].start
          }
        }

      var date = new Date(littleYear);
      var years = date.getFullYear(); //获取当前年份(2位)     
      var months = date.getMonth() + 1;//获取当前月份(0-11,0代表1月)  
      
       that.setData({
           year: years,
           month:months
       });

       that.getNowDay(0)
      }
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
