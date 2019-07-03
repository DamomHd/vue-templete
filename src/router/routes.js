

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
const frame = [
    {
        path: '/',
        name: 'index',
        meta: {
            auth: true,
            title: '首页'
        },
        component: _import('index')
    }
]
export default [
    ...frame
]