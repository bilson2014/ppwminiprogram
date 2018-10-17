// pages/projectInfo/projectInfo.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      projectName:'',
      total:0,
      dis:0,
      array:[],
      id:0,
    demo: [{ id: 10, typeId: 0, typeName: '类别1', name: '大的' }, { id: 10, typeId: 0, typeName: '类别1', name: '大' }, { id: 11, typeId: 1, typeName: '类别2', name: '大萨'}
      , { id: 15, typeId: 2, typeName: '类别3', name: '大萨达' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    var that = this; 
    var id = options.id;
    this.setData({
      id:id
    })
    wx.request({
      url: app.globalData.head +'/miniprogram/quotation/info', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        projectId: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      //  console.log(res.data)
          that.setData({
            projectName: res.data.result.projectName,
            total: res.data.result.total + '元',
            dis: res.data.result.discount + '元'
          });

        that.reSetData(res.data.result.items);


        }
        

      

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
  reSetData:function(item){

    var arrayOut=[];


    for (var i in item) {
        
        var typeId = item[i].typeId;
        if (i == 0) {
          var setOut = {};
          setOut.name = item[i].typeName;
          setOut.typeId = item[i].typeId;
          setOut.isOpen = true;
          setOut.itemArray = [];
          arrayOut.push(setOut);
        
        }
        else {
          var hasSame = false;
                for (var j in arrayOut){
                  var setSide = {};
                  if (typeId == arrayOut[j].typeId) {
                      hasSame = true;
                  } 
                }
            if (!hasSame) {
              var setOut = {};
              setOut.name = item[i].typeName;
              setOut.typeId = item[i].typeId;
              setOut.isOpen = true;
              setOut.itemArray = [];
              arrayOut.push(setOut);
            }
          }
        }

    for (var i in item){
      var typeId = item[i].typeId;
      for (var j in arrayOut){
        if (typeId == arrayOut[j].typeId ){
            var setSide = {};
          setSide.sideName = item[i].detailName +"("+item[i].itemName+")";
            setSide.day = item[i].days;
            setSide.sum = item[i].sum;
          arrayOut[j].itemArray.push(setSide);
        }
      }
    }

    console.log(arrayOut)

   this.setData({
     array: arrayOut
   })

  },
  open:function(e){
    
    var index = e.currentTarget.id
    for (var i in this.data.array){

        if(index == i){
          var isOpen = this.data.array[i].isOpen;
          if(isOpen){
             this.data.array[i].isOpen = false;
          }else{
            this.data.array[i].isOpen = true;
          }

        }

    }

    this.setData({
      array: this.data.array
    })

  }
})