var tools = {
    // 打开原生导航头
    openWindowWithTitle: function (options, extras) {
        options = options || {};
        options['bar'] = true
        extras = extras || {};
        var background = '#53e3a6',          // 原生头背景色
            id = options.id ? options.id : options.url.split('?')[0],     // webview id
            statusbar = options.bar ? { background: options.barbg || background } : null;    // 状态栏背景色
        mui.openWindow({
            url: options.url,
            id: id,
            waiting: {
                autoShow: false
            },
            styles: {
                statusbar: statusbar,
                titleNView: {
                    autoBackButton: options.back || true,
                    titleText: options.title || '',
                    titleColor: options.color || "#fff",
                    titleSize: "17px",
                    backgroundColor: options.background || background,
                    buttons: options.buttons,
                    type: options.type || 'default'
                }
            },
            extras: extras
        })
    },
    openWindow: function(options, extras) {
        options = options || {};
        extras = extras || {};
        var aniShow = options.aniShow || "pop-in",        // 打开页面的动画效果
                id = options.id ? options.id : options.url.split('?')[0];     // webview id
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
    }
}