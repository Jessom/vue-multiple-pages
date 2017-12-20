# vue-multiple-pages
> 使用vue-cli实现多页面开发，目录层级可以无限嵌套

`git clone https://github.com/Jessom/vue-multiple-pages.git`

# 目录结构
```
|- build          webpack相关
|- config         webpack配置相关
|- src            工作目录
  |- common       资源文件
  |- components   公共组件
  |- module       页面文件
    |- index      主页面
      |- App.vue  
      |- index.html
      |- index.js
      |- detail     // 子页面
        ...
    |- test       test页面
      ...
|- static         静态文件资源
  ...
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# HeadCut
