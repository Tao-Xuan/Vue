const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检测
  // 开启代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 添加对图片文件的处理
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource', // 新的 asset 模式
          generator: {
            filename: 'img/[name].[hash:8][ext]', // 输出文件路径和命名规则
          },
        },
      ],
    },
  },
});
