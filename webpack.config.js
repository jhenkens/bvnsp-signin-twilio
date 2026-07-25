const path = require("path");

module.exports = {
    entry: {
        "handler.protected": "./src/handlers/handler.protected.ts",
        "complete-user-auth": "./src/handlers/complete-user-auth.ts",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                                tsx: false
                            },
                            target: 'es2022' // Matches your Node 24 deployment target
                        }
                    }
                }
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
        filename: "[name].js",
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
