const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8080 // 设置你想要的端口号
  },
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave: false


})
