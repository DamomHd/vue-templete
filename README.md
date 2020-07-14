<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-02 11:46:02
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2020-07-14 14:04:39
 * @description: 
 -->
# test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



【前端公虾米】

# 解决移动端300ms延迟
cnpm install fastclick -S   
在main.js中引入fastClick和初始化:
```
import FastClick from 'fastclick'; // 引入插件
FastClick.attach(document.body); // 使用 fastclick
```
Gitmoji Commit 演示

# 解决cli3 热更新慢
npm install babel-plugin-dynamic-import-node --save-dev

在.babelrc添加
```json
{
    "env": {
        "development": {
            "plugins": [
                "dynamic-import-node"
            ]
        }
    }
}

```
