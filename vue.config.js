const CompressionWebpackPlugin = require('compression-webpack-plugin')

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'moment': 'moment',
  '_': 'lodash'
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/normalize.css'
    ],
    js: [
    ]
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/normalize.css'
    ],
    js: [
      'https://cdn.bootcss.com/babel-polyfill/7.2.5/polyfill.min.js',
      'https://unpkg.com/vue',
      'https://unpkg.com/vue-router',
      'https://unpkg.com/vuex',
      'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
      'https://unpkg.com/moment',
      'https://unpkg.com/lodash'
    ]
  }
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css', 'html', 'png', 'jpg', 'gif', 'svg', 'jpeg']

module.exports = {
  lintOnSave: true,
  productionSourceMap: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    watchOptions: {
      poll: true // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    }
  },
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境 npm 包转 CDN
      myConfig.externals = externals
      myConfig.plugins = []

      // 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  },
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config
      .plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
        }
        return args
      })
  }
}
