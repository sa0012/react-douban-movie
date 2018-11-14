const ua = navigator.userAgent
let utils = {
  // 图片防盗链
  replaceUrl: (srcUrl) => {
    if (srcUrl !== undefined) { // 图片防盗链处理
      return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
    }
  },
  isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
  isiPhone: ua.indexOf('iPhone') > -1,
  isWeChat: () => (/micromessenger/i).test(navigator.userAgent),
  isMobile: phone => /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/.test(phone),
  isCar: car => /(^(浙|闽|粤|京|津|冀|晋|蒙|辽|吉|黑|沪|苏|皖|赣|鲁|豫|鄂|湘|桂|琼|渝|川|贵|云|藏|陕|甘|青|宁|新){1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(car),
  isID: function (ID) { // 是否是PRC身份证
    if (typeof ID !== 'string') return false
    var city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
    var d = new Date(birthday)
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
    var currentTime = new Date().getTime()
    var time = d.getTime()
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    var sum = 0
    var i
    var residue
    if (!/^\d{17}(\d|x)$/i.test(ID)) return false
    if (city[ID.substr(0, 2)] === undefined) return false
    if (time >= currentTime || birthday !== newBirthday) return false
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i]
    }
    residue = arrCh[sum % 11]
    if (residue !== ID.substr(17, 1)) return false
    return true
  },
  isEmail: mail => /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,50}$/.test(mail),
  isChinese: chinese => /^.{1,50}$/.test(chinese),
  /**
   * 对日期进行格式化
   * @param date 要格式化的日期
   * @param format 进行格式化的模式字符串
   *     支持的模式字母有：
   *     y:年,
   *     M:年中的月份(1-12),
   *     d:月份中的天(1-31),
   *     H:小时(0-23),
   *     m:分(0-59),
   *     s:秒(0-59),
   *     S:毫秒(0-999),
   *     q:季度(1-4)
   * @return String
   */
  dateformat: (date, format) => {
    if (!date) return

    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) // eslint-disable-line
      }
    }

    return format
  },
  add0(m) {
    return m < 10 ? '0' + m : m
  },
  timeFormat(timestamp) {
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    // return year + '年' + month + '月' + date + '日' + hours + '时' + minutes + '分' + seconds + '秒';
    return year + '/' + utils.add0(month) + '/' + utils.add0(date) + ' ' + utils.add0(hours) + ':' + utils.add0(minutes) + ':' + utils.add0(seconds);
  },
  // 提取字符串中的整數數字
  getNum: (text) => {
    var value = parseInt(text.replace(/[^0-9]/ig, ""));
    return value;
  },
  dayArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  getDay: (date) => {
    const dayNum = date ? (new Date(date)).getDay() : 0;
    return utils.dayArr[dayNum];
  },
  getBgImg: (index) => {
    if (index <= 6) {
      return index;
    } else {
      return index % 6;
    }
  },
  debounce: (func, wait = 1000) => {
    let timeout; // 定时器变量
    return (event) => {
      clearTimeout(timeout); // 每次触发时先清除上一次的定时器,然后重新计时
      event.persist && event.persist() //保留对事件的引用
      //const event = e && {...e}   //深拷贝事件对象
      timeout = setTimeout(() => {
        func(event)
      }, wait); // 指定 xx ms 后触发真正想进行的操作 handler
    };
  }
}

export default utils