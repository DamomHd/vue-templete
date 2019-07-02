
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 基础路径 注意发布之前要先修改这里
//开发绝对路径  线上相对路径
let publicPath = process.env.NODE_ENV === 'development' ? '/' : './'
console.log(publicPath)
module.exports = {
    publicPath,
    lintOnSave: true,
    devServer: {
        publicPath // 和 publicPath 保持一致
    },
    // css: {
    //     loaderOptions: {
    //         // 设置 scss 公用变量文件
    //         sass: {
    //             data: `@import '~@/assets/style/public.scss';`
    //         }
    //     }
    // },
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