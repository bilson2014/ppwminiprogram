// pages/quotation/quotation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  projectName:'测试',
  production:[{
    index:0,
    array:[],
    total:0
  }],
  postProduction: [{
      index: 0,
      array:[],
      total:0
    }],
    discount:0,
    taxRate:0,
    total:0,
    subTotal:0,
    tax:0,
    subRax:0.
  },

  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '4006609728',
    })
  },

  openProduction:function(){

       if(this.data.production[0].index == 1){
         this.data.production[0].index = 0
       }else{
         this.data.production[0].index = 1
       }

    this.setData({
      production: this.data.production
    })

  },
  openPostProduction: function () {

    if (this.data.postProduction[0].index == 1) {
      this.data.postProduction[0].index = 0
    } else {
      this.data.postProduction[0].index = 1
    }

    this.setData({
      postProduction: this.data.postProduction
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.initInfo(options.id);

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
  
  },
  initInfo: function (id) {

    var that = this;
    console.info('id='+id)
    wx.request({
      url: app.globalData.head + '/miniprogram/quotation/info', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        projectId: id ,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(JSON.stringify(res.data.result));
        console.log('dis=' + res.data.result.discount);
        that.setInfo(res.data.result.items)  ;
        that.setData({
          subTotal : res.data.result.subTotal,
          total : res.data.result.total,
          taxRate : res.data.result.taxRate,
          discountRate: res.data.result.discount,
          discount : res.data.result.total - res.data.result.discount,
          subRax: parseInt(res.data.result.total) + parseInt(res.data.result.discount), 
          tax: (res.data.result.subTotal * (res.data.result.taxRate/100)).toFixed(2) 
        })
      }
    })
  },

  setInfo:function(res){
     
     var name = "";
     var total = 0;
     var postTotal = 0;
     var sum = 0;
     var postSum = 0;
     var postIndex = 0;
     var index = 0;
     var that = this;
     var arrayItem = [];
     var pArrayItem = [];
     var join = 0;

    res.forEach(function (v, i) {
    
      if (v.typeName == '后期制作' || v.typeName == '三维动画' || v.typeName == 'MG动画' || v.typeName == '配音及配乐' ){

          if (v.typeName != name) {
            postTotal = v.sum;
            that.data.postProduction[0].array.push({
              name: v.typeName,
              enName: v.typeEName,
              total: postTotal
            })
            name = v.typeName
            if (join == 0){
              join++
            }else{
              postIndex++;
            }
            
          } else {
            
            postTotal = parseInt(postTotal) + parseInt(v.sum)
            that.data.postProduction[0].array[postIndex].total = postTotal;
          }
        postSum = parseInt(postSum) + parseInt(v.sum)

      }else{
            if (v.typeName != name) {
              total = v.sum;
              that.data.production[0].array.push({
                name: v.typeName,
                enName: v.typeEName,
                total: total
              })

              if (i != 0) {
                index++;
              }

              name = v.typeName

            } else {
              total = parseInt(total) + parseInt(v.sum)
              that.data.production[0].array[index].total = total;
            }
        sum = parseInt(sum) + parseInt(v.sum)
      }

    })

    that.data.production[0].total = sum;
    that.data.postProduction[0].total = postSum;
    
    this.setData({
      production: this.data.production,
      postProduction: this.data.postProduction
    })
    
  }

})