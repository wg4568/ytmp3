const path = require("path");
const config = require("./config.json");

module.exports = {
    entry: "./src/client/main.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: "tsconfig.webpack.json",
                    transpileOnly: true,
                    experimentalWatchApi: true
                }
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        library: "ytmp3",
        filename: "bundle.js",
        path: path.resolve(__dirname, "static/js")
    },
    optimization: {
        minimize: !config.debug
    }
};
