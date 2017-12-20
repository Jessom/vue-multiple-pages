'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig.webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    var endTime = Date.now();
    var time = (endTime - webpackConfig.startTime) / 1000;
    console.log(chalk.yellow('骚年，当你看到这条信息的时候，需要特别注意一下，你的代码已经编译完成了! \n'))
    console.log(chalk.yellow('编译所花费的时间是： ' + time + 's'));
    // console.log(chalk.cyan('  Build complete.\n'))
    // console.log(chalk.yellow(
    //   '  Tip: built files are meant to be served over an HTTP server.\n' +
    //   '  Opening index.html over file:// won\'t work.\n'
    // ))
  })
})
