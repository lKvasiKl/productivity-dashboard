const path = require("path");
const { merge } = require("webpack-merge");
const common = require("../webpack.config.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, 'src'),
            watch: true
        },
    },
});