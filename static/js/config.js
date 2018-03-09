var config = {
    // 主要存放一些请求的url
}

resetKinds = {
    MODIFY_USER_NAME: 0,        // 修改帐户  
    MODIFY_PASS_WORD: 1,        // 修改密码
    BINDING_PHONE_NUMBER: 2,    // 手机绑定
    BINDING_AUTH_CODE: 3,       // 授信绑定
    BINDING_IDENT_CODE: 4,      // 硬件绑定
    RELIEVE_IDENT_PHONE: 11,    // 手机解绑
    RELIEVE_AUTH_CODE: 12,      // 授信解绑
    RELIEVE_IDENT_CODE: 13,     // 硬件解绑
}

authKinds = {
    WECHAT: 0,     // 微信
    QQ: 1          // QQ
}
authModes = {
    JSAPI: 0,      // 网站
    APP: 1,        // app
    NATIVE: 2      // 目前无用
}

/*行数，默认值100*/
pageCounts = {
    NON: 0, // 正常
    ONE: 1, //正常
    NOR: 100, // 正常
    MID: 200, // 中等
    MOR: 500, // 较多
    MAX: 1000, // 最多
    LES: 50, // 较少
    LIT: 20, // 很少
    MIN: 10, // 最少
    FEW: 5, // 很少
    BIT: 2, // 一点
    ALL: -1 // 全部
}
commandKinds = {
    UPDATE: 0, // 更新
    INSERT: 1, // 插入
    DROP: 2, // 注销
    DELETE: 3, // 删除
    COMMAND: 4 //指令
}

commandModes = {
    AUTOMATIC: 0, // 自动
    CUSTOMIZE: 1 // 定制
}

loginModes = {
    AUTO: 0, // 自动
    QUICK: 1, // 快速
    AUTH: 2, // 授信
    PHONE: 3, // 手机
    ACCOUNT: 4 // 账户
}

clientPlats = {
    UNKNOW: 0, // 未知	HTTP协议
    COMPUTER: 1, // 电脑	TCP
    MOBILE: 2, // 手机	HTTP
    TABLET: 3, // 平板	HTTP
    WEBSITE: 4, // 网站 HTTP
}

clientSystems = {
    UNKNOW: 0,
    WINDOWS: 1,
    IOS: 2,
    ANDROID: 3
}

conditionKinds = {
    EQUAL: 0, // 等于
    BIGGER: 1, // 大于
    SMALLER: 2, // 小于
    LIKE: 3, // 相似
    LLIKE: 4, // 左相似
    RLIKE: 5, // 右相似
    BETWEEN: 6, // 两者之间
    IN: 9, // 包含
    NOTIN: 10, // 不含
    NOTEQUAL: 13, // 不等于
    NOTLIKE: 14, // 不相似
    NOTBIGGER: 15, // 不大于
    NOTSMALLER: 16, // 不小于
    OR: 17, // 或
    ORLIKE: 18, // 或相似
    ANDNOT: 19, // 与非
    ANDNOTLIKE: 20 // 与非相似
}

sortTypes = {
    ID: 0,
    ID_DESC: 1,
    UID: 2,
    UID_DESC: 3,
    FIRST: 4,
    FIRST_DESC: 5,
    LAST: 6,
    LAST_DESC: 7,
    ANY_KEY: 8,
    ANY_KEY_DESC: 9
}
