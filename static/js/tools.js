var immersed = 0;
(function() {
    var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if(ms&&ms.length>=3){         // 当前环境为沉浸式状态栏模式
      immersed=parseFloat(ms[2]); // 获取状态栏的高度
    }
})()



/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
var tools = {
    /**
     * 删除JSON数组中的指定对象
     * @param  {array} arr - 需要删除元素的数字
     * @param  {object} jsonObj - 需要删除的对象
     */
    removeArrJson: function (arr, jsonObj) {
        for (var i = 0; i < arr.length; i++) {
            if (tools.jsonEqual(arr[i], jsonObj)) {
                arr.splice(i, 1);
            }
        }
        return arr;
    },
    /**
     * 两个json对象是否相等
     * @param  {object} objA - 第一个json对象
     * @param  {object} objB - 第二个json对象
     */
    jsonEqual: function (objA, objB) {
        if (!tools.isObj(objA) || !tools.isObj(objB)) return false; //判断类型是否正确
        if (tools.getLength(objA) != tools.getLength(objB)) return false; //判断长度是否一致
        return tools._jsonEqualMt(objA, objB, true); //默认为true
    },
    _jsonEqualMt: function (objA, objB, flag) {
        for (var key in objA) {
            if (!flag) //跳出整个循环
                break;
            if (!objB.hasOwnProperty(key)) {
                flag = false;
                break;
            }
            if (!tools.isArray(objA[key])) { //子级不是数组时,比较属性值
                if (objB[key] != objA[key]) {
                    flag = false;
                    break;
                }
            } else {
                if (!tools.isArray(objB[key])) {
                    flag = false;
                    break;
                }
                var oA = objA[key],
                    oB = objB[key];
                if (oA.length != oB.length) {
                    flag = false;
                    break;
                }
                for (var k in oA) {
                    if (!flag) //这里跳出循环是为了不让递归继续
                        break;
                    flag = CompareObj(oA[k], oB[k], flag);
                }
            }
        }
        return flag;
    },
    /**
     * 是否是对象
     * @param  {object} object - 判断该参数是否是对象
     * @return {boolean}    返回一个布尔值
     */
    isObj: function (object) {
        return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
    },
    /**
     * 是否是数组
     * @param  {object} object - 判断该参数是否为数组
     * @return {Boolean} 返回一个布尔值
     */
    isArray: function (object) {
        return object && typeof (object) == 'object' && object.constructor == Array;
    },
    /**
     * 获取对象长度
     * @param  {object} object - 获取该对象的长度
     * @return {number}        返回数组长度
     */
    getLength: function (object) {
        var count = 0;
        for (var i in object) count++;
        return count;
    },
    /**
     * 获取url中的参数
     * @param {string} key - url参数中的key
     * @return {string} 返回key对应的value
     */
    getUrlQuery: function (key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    },
    /**
     * 打开原生导航头
     * @param  {object} options - 页面配置信息
     * @param  {object} extras - 页面之间参数传递
     */
    openWindowWithTitle: function (options, extras) {
        options = options || {};
        extras = extras || {};
        var id;
        if (options.id) {
            id = options.id;
        } else {
            id = options.url.split('?')[0];
        }
        mui.openWindowWithTitle({
            url: options.url,
            id: id,
            styles: {
                top: options.styTop || '0px', // 新页面顶部位置
                bottom: options.styBotom || '0px', // 新页面底部位置
                width: options.styWidth || '100%', // 新页面宽度，默认为100%
                height: options.styHeight || '100%', // 新页面高度，默认为100%
            },
            //自定义扩展参数，可以用来处理页面间传值
            extras: extras,
            //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
            createNew: options.createNew || false,
            show: {
                //页面loaded事件发生后自动显示，默认为true
                autoShow: options.showAutoShow || true,
                //页面显示动画，默认为”slide-in-right“；
                aniShow: options.showAniShow || 'pop-in',
                //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                duration: options.showDuration
            },
            waiting: {
                //自动显示等待框，默认为true
                autoShow: options.waitAutoShow || false,
                //等待对话框上显示的提示内容
                title: options.waitTitle || '加载中...',
                options: {
                    //等待框背景区域宽度，默认根据内容自动计算合适宽度
                    width: options.waitWidth,
                    //等待框背景区域高度，默认根据内容自动计算合适高度
                    height: options.waitHeight,
                }
            }
        }, {
                //导航栏ID,默认为title,若不指定将会使用WebviewOptions中指定的 [webviewID+ "_title"] 作为id
                id: options.titleID || "title",
                //导航栏高度值
                height: options.height || immersed + 44 +'px',
                //导航栏背景色
                backgroundColor: options.backgroundColor || "#007FFF",
                //底部边线颜色
                bottomBorderColor: options.bottomBorderColor || "#007FFF",

                //标题配置
                title: {
                    //标题文字
                    text: options.text || "",

                    //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
                    position: {
                        top: options.titlePosTop || immersed/2 + 'px',
                        left: options.titlePosLeft || 0,
                        width: options.titlePosWidth || "100%",
                        height: options.titlePosHeight || "100%"
                    },

                    //绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
                    styles: {
                        color: options.titleStyColor || "#FFFFFF",
                        align: options.titleStyAlign || "center",
                        family: options.titleStyFamily || "'Helvetica Neue',Helvetica,sans-serif",
                        size: options.titleStySize || "17px",
                        style: options.titleStyStyle || "normal",
                        weight: options.titleStyWeight || "normal",
                        fontSrc: options.titleStyFontSrc || ""
                    }
                },

                //左上角返回箭头
                back: {
                    //图片格式
                    image: {
                        //加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
                        base64Data: options.backBase || 'data:image/png;base64,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MjAxNy0xMS0yMFQwOTo1OTo0M1o8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNy0xMS0yMFQwOTo1OTo1OFo8L3htcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7EKb+RAAABYklEQVRoge2ZT08CMRBHHx418SAJC4J/jn7/T6QCskuiF4Xremg8kLjt0pnphKTv2jDze2kXZsuk73sumSvvAFKqgDdVwJsq4E0VyGQBHICptJCHwAL4AK6BN4QSpQXmhPB/3ACvwF1uwUnBWWgO7AbWvoHbnKKldiAWHuAlt3AJgVT4JafH6iysBVLhVwjCg61AQzr8VtrESqAB2si6SniwEUiFf0ApPOgLjAm/0WyoKVA8POgJzHAIDzoCM6CLrD9iFB7kAmPCr4U9okhnodiHzcODfAeayNo74eybIhXY4yyh8RCPkVgp9PkXra/RPWFwG2KNkYTmD1mHg4T2KFFcwmKYGyOx1GpmNU6nJDYoSVi+0HSEK5QhVCSsXylb0hL3kgYlXupTElsEEvVe6AyGduIHeM4tWvpqseX0uBwI4b9yC3pc7u4IEkfgCfiUFCv5DJhQ/+Dwpgp4UwW8uXiBXyo0TMCpkBJ2AAAAAElFTkSuQmCC',
                        //要加载的图片路径
                        imgSrc: options.backImgSrc || '',

                        //图片源的绘制区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
                        sprite: {
                            top: options.backSprTop || '0px',
                            left: options.backSprLeft || '0px',
                            width: options.backSprWidth || '100%',
                            height: options.backSprHeight || '100%'
                        },

                        //绘制图片的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
                        position: {
                            top: options.backPosTop || immersed + 10 + 'px',
                            left: options.backPosLeft || "10px",
                            width: options.backPosWidth || "24px",
                            height: options.backPosHeight || "24px"
                        }
                    },
                    // 重写返回事件，默认执行mui.back();
                    // click: options.backEvent
                }
            })
    },
    /**
     * 打开新页面，openWindow
     * @param  {object} options - 页面信息
     * @param  {object} extras - 页面之间传递的参数
     */
    openWindow: function (options, extras) {
        var aniShow = options.aniShow || "pop-in";
        extras || {}
        var id;
        if (options.id) {
            id = options.id;
        } else {
            id = options.url.split('?')[0];
        }
        mui.openWindow({
            url: options.url,
            id: id,
            show: {
                aniShow: aniShow
            },
            waiting: {
                autoShow: false
            },
            extras: extras
        })
    },
    /**
     * ajax请求(异步)
     * @param  {string} type - 请求的url，如: '/UserLogin'
     * @param  {object} data - 请求的参数
     * @param  {function} scb - 成功的回调
     * @param  {function} ech - 失败的回调
     */
    ajax: function (type, data, scb, ecb) {
        var url = type === '/UploadData' ? config.OS_FILEURL + type : tools.getUrl() + type;
        mui.ajax({
            url: url,
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json",
            data: data,
            success: scb,
            error: ecb
        })
    },
    /**
     * ajax请求(同步)
     * @param  {string} type - 请求的url，如: '/UserLogin'
     * @param  {object} data - 请求的参数
     * @param  {function} scb - 成功的回调
     * @param  {function} ech - 失败的回调
     */
    ajax2: function (type, data, scb, ecb) {
        var url = type === '/UploadData' ? config.OS_FILEURL + type : tools.getUrl() + type;
        mui.ajax({
            url: url,
            type: "POST",
            async: false,
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json",
            data: data,
            success: scb,
            error: ecb
        })
    },
    /**
     * 根据不同平台，返回不同的url
     * @return {string} 返回请求的url
     */
    getUrl: function () {
        if (mui.os.plus) {
            return config.OS_URL;
        } else {
            return config.NODE_URL;
        }
    },
    /**
     * 返回storage存储对象
     * PC端使用localStorage
     * APP端使用plus.storage
     * 存入、取出、删除等API与localStorage相同，具体参考 http://www.dcloud.io/docs/api/zh_cn/storage.html
     * @return {object} 返回本地存储对象
     */
    storage: function () {
        if (mui.os.plus) {
            return plus.storage;
        } else {
            return localStorage;
        }
    },
    /**
     * 登录失效、登录超时等，调用该方法，跳转登录页面
     * @param  {number} result - 后台返回的状态
     * @param  {string} attach - 后台返回的信息
     */
    toast: function (result, attach) {
        switch (result) {
            case -4:
                mui.toast(attach);
                tools._goLoginPage();
                break;
            case -42:
                mui.toast(attach);
                tools._goLoginPage();
                break;
            case -44:
                mui.toast(attach);
                tools._goLoginPage();
                break;
            case -41:
                location.reload();
                break;
            default:
                // statements_def
                break;
        }
    },
    _goLoginPage: function () {
        tools.openWindowWithTitle({
            url: 'login.html'
        })
    },
    /**
     * 判断某DOM元素是否包含某class
     * @param  {object}  obj - DOM对象
     * @param  {string}  classStr - class名
     * @return {Boolean}  返回一个布尔值
     */
    hasClass: function (obj, classStr) {
        if (obj.className) {
            var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
            return (arr.indexOf(classStr) === -1) ? false : true;
        } else {
            return false;
        }
    },
    /**
     * 获取当前DOM节点的兄弟节点
     * @param {object} elm - DOM对象
     * @return 返回当前DOM节点的兄弟节点
     */
    siblings: function (elm) {
        var a = [];
        var p = elm.parentNode.children;
        for (var i = 0, pl = p.length; i < pl; i++) {
            if (p[i] !== elm)
                a.push(p[i]);
        }
        return a;
    },
    /**
     * 值小于零，在前面补零
     * @param {number} val - 数值
     * @return {string} 在val前加个0
     */
    fillZero: function(val) {
        return '0' + val;
    },
    /**
     * 返回图片url
     * @param {string} img - 图片地址
     * @return {string} 图片地址
     */
    getImage: function(img) {
        var image;
        if(img == '' || img == null) {
            image = '../static/images/avatar.jpg';
        } else {
            if(img.indexOf("http") >= 0) {
                image = img;
            } else {
                if(img.indexOf("UpLoads") >= 0) {
                    image = config.IMG_URL + img;
                }
            }
        }
        return image;
    },
    /**
     * 返回上级页面，发送reload事件
     * @param {boolean} e - 是否触发返回前发送reload事件
     */
    beforeback: function(e) {
		mui.init({
			beforeback: function() {
				if (mui.os.plus && e) {
                    var webview = plus.webview.currentWebview().opener();
                    mui.fire(webview, 'reload');
				}
				return true;
			}
		});
    },
    /**
     * 监听beforeback发送的reload事件，执行刷新操作
     */
    reload: function() {
		window.addEventListener("reload", function() {
            location.reload();
			/* mui.plusReady(function() {
				plus.webview.currentWebview().reload();
			}); */
		});
    },
    /**
     * 自动登录
     */
    /* authLogin: function() {
        if(localStorage.getItem('verifyInfo')) {
            tools.ajax('/AutoLogin', JSON.parse(localStorage.getItem('verifyInfo')), res => {

            }, err => {

            })
        }
    } */
    /**
     * 当前webview向上一级webview传递信息
     * @param {object} msg - 传递的数据内容，建议使用json对象。可以是string，也可以是object
     * @param {object} webview - 通过plus.webview.currentWebview().opener();获取，因为plus需在plusReady中执行，而plusReady是异步函数，所在需在外部传入
     */
    sendMsg: function(msg, webview) {
        if(mui.os.plus) {
            console.log(webview);
            mui.fire(webview, 'sendMsg', msg)
        } else {
            if(typeof msg === 'object') {
                msg = JSON.stringify(msg);
            }
            sessionStorage.setItem('sendMsg', msg);
        }
    },
    /**
     * 获取下一级webview传递过来的数据内容
     * @param {function} callback - 回调函数，返回下一级页面传过来的信息
     */
    getMsg: function(callback) {
        if(mui.os.plus) {
            window.addEventListener('sendMsg', function(event){
                console.log(event.detail)
                callback(event.detail);
            }, false);
        } else {
            if(sessionStorage.getItem('sendMsg')) {
                callback(JSON.parse(sessionStorage.getItem('sendMsg')));
            }
        }
    },
    /**
     * 当前webview向下一webview传递参数
     * APP端使用MUI提供的openWindow传递参数
     * PC端使用sessionStroage传递参数
     * @param {string} key - 键，通过该值获取传递的数据信息
     * @param {string | object} val - 值，可以是string类型，也可以是object
     * @return {object} APP端返回一个对象，PC返回空字符串
     */
    passVal: function(key, val) {
        if(mui.os.plus) {
            var extras = {};
            extras[key] = val;
            return extras;
        } else {
            if(typeof val === 'object')
                val = JSON.stringify(val);
            sessionStorage.setItem(key, val);
            return '';
        }
    },
    /**
     * 去掉字符串前后两端的空格
     * @param {string} str - 需要处理的字符串
     */
    trim: function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    /**
     * 合并JSON对象
     * @param {object} des - 
     * @param {object} src - 
     * @returns {object}
     */
    extend: function(des, src, override){
        if(src instanceof Array){
            for(var i = 0, len = src.length; i < len; i++)
                extend(des, src[i], override);
        }
        for( var i in src){
            if(override || !(i in des)){
            des[i] = src[i];
            }
        }
        return des;
    }
}