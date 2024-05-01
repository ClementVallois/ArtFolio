module.exports = {
    configureWebpack: {
        entry: "./src/main.js",
        devServer: {
            hot: true,
        },
        watch: true,
        watchOptions: {
            ignored: /node_modules/,
            poll: 1000,
        },
    },
    transpileDependencies: true,
};
