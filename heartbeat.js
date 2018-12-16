var myCharts = require("../../../utils/wxcharts.js")//引入一个绘图的插件

var lineChart_heartbeat = null

var app = getApp()



Page({

  data: {

  },

  onPullDownRefresh: function () {

    console.log('onPullDownRefresh', new Date())

  },





  //把拿到的数据转换成绘图插件需要的输入格式

  convert: function () {

    var categories = [];

    var heartbeat = [];



    var length = app.heartbeat.datapoints.length

    for (var i = 0; i < length; i++) {

      categories.push(app.heartbeat.datapoints[i].at.slice(11, 19));

      heartbeat.push(app.heartbeat.datapoints[i].value);

    }

    return {

      categories: categories,

      heartbeat: heartbeat,

    }

  },



  onLoad: function () {

    var wheatherData = this.convert();



    //得到屏幕宽度

    var windowWidth = 320;

    try {

      var res = wx.getSystemInfoSync();

      windowWidth = res.windowWidth;

    } catch (e) {

      console.error('getSystemInfoSync failed!');

    }



    var wheatherData = this.convert();



    //新建光照强度图表

    lineChart_heartbeat = new myCharts({

      canvasId: 'heartbeat',

      type: 'line',

      categories: wheatherData.categories,

      animation: true,

      background: '#f5f5f5',

      series: [{

        name: 'heartbeat',

        data: wheatherData.heartbeat,

        format: function (val, name) {

          return val.toFixed(2);

        }

      }],

      xAxis: {

        disableGrid: true

      },

      yAxis: {

        title: 'heartbeat (次)',

        format: function (val) {

          return val.toFixed(2);

        },

        min: 190

      },

      width: windowWidth,

      height: 200,

      dataLabel: false,

      dataPointShape: true,

      extra: {

        lineStyle: 'curve'

      }

    });



    

  },





})
