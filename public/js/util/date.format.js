Date.prototype.format = function (format_str) {
  'use strict';
  var fmt = format_str || 'yyyy-MM-dd',
    k,
    o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
    };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (String(this.getFullYear())).substr(4 - RegExp.$1.length));
  }
  for (k in o) {
    if (o.hasOwnProperty(k)) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr((String(o[k])).length)));
      }
    }
  }
  return fmt;
};