// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/mashWebServices': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/agent-config': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/v1': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/config': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/judge': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/transfer': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/uic': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/alarm': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/data-query': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/bureau': {
        target: 'http://syccz.stg.cn/',
        changeOrigin: true,
        logLevel: 'debug'
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
