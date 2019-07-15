/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-05 15:09:42
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-07-15 11:05:41
 * @description: 个人常用API
 */

const vincent = {
    //判断字符串的类型
    checkStrType: ({ text = '', type = '', isNeedMsg = false } = {}) => {
        let res = {
            state: false,
            msg: ''
        }
        let validatePatterns = {
            "required": [/^[\S+\s*\S+]+$/ig, "不能为空！"],
            "integer": [/^(0|[1-9][0-9]*)$/, "必须为整数！"],
            "numeric": [/^\d+(\.\d+)?$/, "不是合法的数字！"],
            "currency": [/^\d+\.\d{1,2}$/, "不是合法的货币数字！"],
            "email": [/^\w+@\w+(\.\w+)*$/, "不合法的email输入！"],
            "phone": [/^1[3|4|5|6|7|8|9][0-9]{9}$/, "手机号格式不正确"],
            "tel": [/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/, "电话不合法！"],
            "password": [/^(\w){6,20}$/, '密码格式只能输入6-20个字母、数字、下划线'],
            "mustChecked": [/0+/g, "checkbox不能为空！"],
            "mustSelected": [/0+/g, "select不能为空！"],
            "ipAddress": [/^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/, "不是有效的IP地址！"],
            "netport": [/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, "不合法的端口！"],
            "mac": [/^[0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}$/, "不合法的mac地址！"],
            "year": [/^(\d{4})$/, "年份不合法！"],
            "mouth": [/^(\d{4})-(0\d{1}|1[0-2])$/, "月份不合法！"],
            "date": [/^{\d}{4}\-{\d}{2}\-{\d}{2}$/, "日期不合法！"],
            "timeHour": [/^(0\d{1}|1\d{1}|2[0-3])$/, "小时不合法！"],  //HH
            "timeMinute": [/^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/, "分钟不合法！"], //HH:mm
            "timeSeconds": [/^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/, "时间不合法！"], //HH:mm:ss
            "chineseOnly": [/[^\u4E00-\u9FA5]/g, "输入不合法！请只输入中文！"],
            "mobilePhone": [/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, "手机号不合法！"],
            "specials": [/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>?]{1}[^`~!@$%^&+=\\\][\{\}:;'\,<>?]{0,}$/, "不能输入特殊字符！"],
            "pattern": [null, "数据不合法！请确认"],
            "carCode": [/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/, "车牌号格式不正确"],
            "idCard": [/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, "身份证号格式不正确"],
            'postcode': [/^\d{6}$/, "邮编格式不正确"],
            'longitude': [/^-?((180(\.0{0,6})?)|((\d{1,2}|1[0-7]\d)(\.\d{0,6})?))$/, "不是有效的经度！"],
            'latitude': [/^-?((90(\.0{0,6})?)|((\d|[1-8]\d)(\.\d{0,6})?))$/, "不是有效的纬度！"],
            'digitOrLetter': [/^[A-Za-z0-9]*$/, "格式不正确(只支持数字或字母)"]
        };
        if (!type || !validatePatterns.hasOwnProperty(type)) {
            res.msg = "暂无该方式的正则判断，请自行判断"
            res.state = false;
            return res;
        }
        res.state = validatePatterns[type][0].test(text)
        res.msg = validatePatterns[type][1]
        return res;
    },
    //获取某一天 前几天 后几天
    getDay: (day = 0) => {
        var today = new Date();
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();

        tMonth = doHandleMonth(tMonth + 1);
        tDate = doHandleMonth(tDate);

        function doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = "0" + month;
            }
            return m;
        }
        return tYear + "/" + tMonth + "/" + tDate;
    },
    urlParams: {
        get: (key, href) => {
            href = href || window.location.search;
            var match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
            return match && match[1] && decodeURIComponent(match[1]) || '';
        },
        getAll: (names = [], url) => {
            if (!(names instanceof Array)) return false;
            var result = {};
            var i = 0,
                len = names.length;
            if (names.length === 0) return false;
            for (; i < len; i++) {
                result[names[i]] = this.get(names[i], url);
            }
            return result;
        },
        set: (name, url) => {
            if (typeof name !== 'string') return false;
            if (!url) url = window.location.href;
            var _name = name.replace(/[\[\]]/g, '\\$&');
            var value = name + '=' + encodeURIComponent(val);
            var regex = new RegExp(_name + '=[^&]*');
            var urlArr = url.split('#');
            var result = '';

            if (regex.exec(url)) {
                result = url.replace(regex, value);
            } else {
                result = urlArr[0] + '&' + value + (urlArr[1] || '');
            }

            return result
        },
        setMore: (obj = {}, url) => {
            var result = url || '';
            if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
            for (var name in obj) {
                result = setParam(name, obj[name], result);
            }
            return result;
        },
        remove: (name, url) => {
            if (typeof name !== 'string') return false;
            if (!url) url = window.location.href;
            var urlparts = url.split('?');
            var prefix = encodeURIComponent(name + '=');
            var pars = urlparts[1].split(/[&;]/g);
            var i = 0, len = pars.length;

            for (; i < len; i++) {
                if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }
            url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
            return url;
        },
        reomveMore: (names = [], url) => {
            var result = url || '';
            var i = 0,
                len = names.length;
            if (names.length === 0) return false;

            for (; i < len; i++) {
                result = this.remove(names[i], result);
            }
            return result;
        }
    },
    //防抖 简易版 典型例子：限制 鼠标连击 触发
    debounce: (fn, wait = 50, immediate) => {
        let timer;
        return function () {
            if (immediate) {
                fn.apply(this, arguments)
            }
            if (timer) clearTimeout(timer)

            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait)
        }
    },
    //节流
    throttle: (fn, delay, isDebounce) => {
        let timer;
        let lastCall = 0;
        return function (...args) {
            if (isDebounce) {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    fn(...args)
                }, delay)
            }
            else {
                const now = new Date().getTime()
                if (now - lastCall < delay) return
                lastCall = now
                fn(...args)
            }
        }
    }
}

export default vincent