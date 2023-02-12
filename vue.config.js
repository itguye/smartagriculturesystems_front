// const { defineConfig } = require('@vue/cli-service')
const path = require('path')
var webpack = require('webpack');
module.exports = {
  chainWebpack: config => {
    // svg图标加载
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/icons/svg'))
      .end()

    config.module
      .rule('icons') // 定义一个名叫 icons 的规则
      .test(/\.svg$/) // 设置 icons 的匹配正则
      .include.add(path.join(__dirname, 'src/icons/svg')) // 设置当前规则的作用目录，只在当前目录下才执行当前规则
      .end()
      .use('svg-sprite') // 指定一个名叫 svg-sprite 的 loader 配置
      .loader('svg-sprite-loader') // 该配置使用 svg-sprite-loader 作为处理 loader
      .options({ // 该 svg-sprite-loader 的配置
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/api': {
        target: 'http://localhost:8086', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '' //请求的时候使用这个api就可以
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ]
  }
}