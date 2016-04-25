module.exports = {
    entry: "./src/relaymark.oauth2.js",
    output: {
        path: "dist",
        filename: "relaymark.oauth2.js"
    },
    module: {
        loaders: [
            {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /src.*\.html$/,
                loader: 'ngtemplate!html'
            },
            {
                test: /src.*\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    externals: [{ angular: "angular", ngStorage: "ngStorage"}]

    
};