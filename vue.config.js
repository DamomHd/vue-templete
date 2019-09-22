
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//用于开启gzip压缩的插件
const CompressionPlugin = require('compression-webpack-plugin')
// 引入插件
const vConsolePlugin = require('vconsole-webpack-plugin');
// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 基础路径 注意发布之前要先修改这里
//开发绝对路径  线上相对路径
let publicPath = process.env.NODE_ENV === 'development' ? '/' : './'

module.exports = {
    publicPath,
    lintOnSave: true,
    devServer: {
        publicPath, // 和 publicPath 保持一致
        // 端口
        // port: 3000,
        // // 配置代理
        // proxy: {
        //     '^/api': {
        //         target: 'http://localhost:8081',
        //         ws: true,
        //         changeOrigin: true
        //     },
        //     '^/data': {
        //         target: 'http://localhost:3000'
        //     }
        // },
        // // mock
        // before(app) {
        //     app.get('/api/getUser', (req, res, next) => {
        //         res.json(mockData);
        //     })
        // }
    },
    configureWebpack: config => {
        //配置gzip压缩
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,//文件匹配名
                    threshold: 10240,//对超过10K的数据进行压缩
                    deleteOriginalAssets: false // 是否删除原文件
                })]
            }
        }
    },
    css: {
        loaderOptions: {
            // 设置 scss 公用变量文件
            sass: {
                data: ` 
                        @import '~@/assets/style/public.scss';
                        @import "@nutui/nutui/dist/styles/index.scss";   
                        ` //nui如果需要按需加载 scss 文件（如需要自定义主题）时，除了需要把 style 选项值设为为 scss 外sass-loader 配置，如下所示：
            }
        },

    },
    chainWebpack: config => {
        /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
        config.plugins
            .delete('prefetch')
            .delete('preload')
        // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
        config.resolve
            .symlinks(true)
        //配置移动端自适应rem
        config.module
            .rule('scss')
            .oneOf('vue')
            .use('px2rem-loader')
            .loader('px2rem-loader')
            .before('postcss-loader') // this makes it work.
            .options({ remUnit: 75, remPrecision: 8 })
            .end()
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
        config
            // 开发环境
            .when(process.env.NODE_ENV === 'development',
                // sourcemap不包含列信息
                config => config.devtool('cheap-source-map')
            )
            // 非开发环境
            .when(process.env.NODE_ENV !== 'development', config => {
                config.optimization
                    .minimizer([
                        new UglifyJsPlugin({
                            uglifyOptions: {
                                // 移除 console
                                // 其它优化选项 https://segmentfault.com/a/1190000010874406
                                compress: {
                                    // warnings: false,
                                    drop_console: true,
                                    drop_debugger: true,
                                    pure_funcs: ['console.log']
                                }
                            }
                        })
                    ])
            })









    }
}