export default {
    async install(Vue) {
        // 日期格式化插件
        Vue.filter('format', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
            return require('dayjs')(value).format(format)
        })
    }
}