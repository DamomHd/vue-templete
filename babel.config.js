module.exports = {
  presets: [
    '@vue/app'
  ],
  //按需导入组件配置 npm i @nutui/babel-plugin-separate-import -D
  "plugins": [
    ["@nutui/babel-plugin-separate-import", {
      "style": "scss" //style 选项值为 "css" 时加载组件对应的css文件，为 "scss" 时加载对应的scss文件。无style选项时，不自动加载样式文件。
    }]
  ]
}
