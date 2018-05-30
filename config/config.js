const _path = require('path');
const ExtracTextPlugin = require('extract-text-webpack-plugin');

// vue-loader 基本配置
const baseVueLoaderConf = {
    // 引入postcss
    postcss: {
        config: {
            path: _path.resolve('../')
        }
    },
    // 转为require调用，让webpack处理目标资源
    transformToRequire: {
        video: "src",
        source: "src",
        img: "src",
        image: "xlink:href"
    }
};

// vue-loader 开发环境配置
const devVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
    // loaders
    loaders: {
        css: ['vue-style-loader', 'css-loader'],
        less: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    },
    cssSourceMap: true
});

// vue-loader 生产环境配置
const buildVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
    loaders: ExtracTextPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'less-loader'],
        fallback: 'vue-style-loader'
    }),
    cssSourceMap: false
});

module.exports = {
    dev: {
        publicPath: '/',
        devtoolType: "cheap-module-eval-source-map",
        vueLoaderConf: devVueLoaderConf,
        host: 'localhost',
        port: '1234',
        proxyTable: {}
    },
    build: {
        publicPath: '/',
        devtoolType: 'source-map',
        vueLoaderConf: buildVueLoaderConf,
        staticPath: 'static'
    }
}