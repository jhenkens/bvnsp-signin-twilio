const path = require("path");

module.exports = {
    entry: "./src/handler.protected.ts",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        library: {
            name: "handler",
            type: "commonjs",
            export: "handler",
        },
        filename: "handler.protected.js",
        path: path.resolve(__dirname, "functions"),
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },
    target: "node",
    devtool: "inline-source-map",
    externals: Object.keys(require("./package.json").dependencies).reduce(
        function (acc, cur) {
            acc[cur] = cur;
            return acc;
        },
        new Object()
    ),
};
