var app = getApp(); 
Page({

  data: {
     
    projectName:'', 
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    id: 0,
    filmDestPath:'',
    principalName:'',
    principalPhone:'',
    principalEmail:'',
    principalImg:''

  },

  onLoad: function (e) {
    //decodeURI
    
    var index = JSON.stringify(e.q);
    console.log(index)
    var src = decodeURIComponent(index);
    var cut = src.lastIndexOf("id");
    var name = src.substring(cut+3 , src.length-1);
    var scene = decodeURIComponent(e.scene);
    
    if(id!=undefined){
      var id = e.id;
      this.setData({
        id: e.id
      })
    } else{
        if (scene != "undefined" && scene != undefined) {
          this.initProjectInfo(scene)
        } else {

          if (name != undefined && name != "define") {
            this.initProjectInfo(name)
          } else {
            if (index == undefined) {
            //  this.initProjectInfo('20181024162817964')
              wx.redirectTo({
                url: '../index/index',
              })
            }
          }
        }
    }

  },

  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    this.data.items.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      items: this.data.items

    })

  },

  //滑动事件处理

  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

      that.data.items.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })

    //更新数据

    that.setData({

      items: that.data.items

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  info: function (e) {

  //  var id = JSON.stringify(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;

    if(index == "交付日期"){
        wx.navigateTo({
          url: '../schedule/schedule?id=' + id + '&name=' + this.data.projectName,
        })
    }

    if (index == "团队情况") {
      wx.navigateTo({
        url: '../storyBoard/storyBoard?id=' + id + '&name=' + this.data.projectName,
      })
    }

    if (index == "分镜脚本") {
      wx.navigateTo({
        url: '../verVideo/verVideo?id=' + id + '&name=' + this.data.projectName,
      })
    }
    
    if (index == "参考影片") {
      wx.navigateTo({
        url: '../webView/webView?id=' + this.data.filmDestPath,
      })
    }

    if (index == "项目报价") {
      
      wx.navigateTo({
        url: '../quotation/quotation?id=' + id + '&name=' + this.data.projectName,
      })
    }
  },

  tel:function(){
      wx.makePhoneCall({
        phoneNumber: '4006609728',
      })
  },

  initTitleDiv:function(item){

    this.data.items.push({
      title: "项目类型",
      id: item.projectId,
      content: item.productName,
      contentInfo: '',
      info: "",
      needMove: false,
      isTouchMove: false
    }),

    this.data.items.push({
      title: "交付日期",
      id: item.projectId,
      content: item.deliveryDate != null ? item.deliveryDate : "未确定",
      contentInfo: '',
      info: "计划",
      needMove: item.deliveryDate != null ? true : false,
      isTouchMove: false //默认隐藏删除
    }),

      this.data.items.push({
        title: "项目报价",
        id: item.projectId,
        content: item.quotation != "" && item.quotation != null ? item.quotation+'人民币':"未确定",
        contentInfo: '',
        info: "预算",
        needMove: item.quotation != "" && item.quotation != null ? true :false,
        isTouchMove: false //默认隐藏删除
      }),
    
      // this.data.items.push({
      //   title: "项目进展",
      //   content: "创意阶段",
      //   contentInfo: '正在上传项目资料',
      //   info: "历史",
      //   needMove: true,
      //   isTouchMove: false //默认隐藏删除
      // }),
      this.data.items.push({
        title: "团队情况",
        id: item.projectId,
        content: item.hasProduction ? '已组建':'未组建',
        contentInfo: '',
        info: "详情",
        needMove: item.hasProduction,
        isTouchMove: false //默认隐藏删除
      }),
        
      this.data.items.push({
        title: "参考影片",
        id: item.projectId,
        content: item.filmDestPath != "" && item.filmDestPath != null ? '已确定' : '未确定',
        contentInfo: '',
        info: "详情",
        needMove: item.filmDestPath != "" && item.filmDestPath != null ? true : false,
        isTouchMove: false //默认隐藏删除
      }),

      this.data.items.push({
        title: "分镜脚本",
        id: item.projectId,
        content: item.hasContinuity != "" && item.hasContinuity != null ? '已确定' : '未确定',
        contentInfo: '',
        info: "详情",
        needMove: item.hasContinuity != "" && item.hasContinuity != null ? true : false,
        isTouchMove: false //默认隐藏删除
      }),
      // this.data.items.push({
      //   title: "文字脚本",
      //   content: "已确认",
      //   contentInfo: '',
      //   info: "详情",
      //   needMove: true,
      //   isTouchMove: false //默认隐藏删除
      // })

    this.setData({

      items: this.data.items,
      projectName: item.projectName

    });
  },


  initProjectInfo:function(id){

   var that = this;

    wx.request({
      url: app.globalData.head+'/miniprogram/project/info', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        projectId: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.initTitleDiv(res.data.result);

        let filmDestPath = res.data.result.filmDestPath;

        if (filmDestPath != '' && filmDestPath != null){
            let firstPatch = filmDestPath.indexOf('http');
            let secondPatch = filmDestPath.indexOf('http', firstPatch + 1);
            if (secondPatch != -1){
                filmDestPath = filmDestPath.substring(firstPatch, secondPatch);
            }
             filmDestPath = filmDestPath.trim();
             let  lastChar = filmDestPath.charAt(filmDestPath.length - 1);
             filmDestPath = (filmDestPath.substring(0, filmDestPath.length - 1) + that.checkChar(lastChar)).trim()
 
        }
        
        that.setData({
          projectName:res.data.result.projectName,
          filmDestPath: filmDestPath,
          principalName: res.data.result.principalName,
          principalPhone: res.data.result.principalPhone,
          principalEmail: res.data.result.principalEmail,
          principalImg: app.globalData.urlPath + res.data.result.principalImg
        })
      }
    })
  },

  checkChar: function (val){
      var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      var rs = "";
      for (var i = 0, l = val.length; i < val.length; i++) {
        rs = rs + val.substr(i, 1).replace(reg, '');
      }
      return rs;
  },


  onShareAppMessage: function () {
    var that = this;
    return {
      title: '',
      imageUrl:'../image/chu.jpg',
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