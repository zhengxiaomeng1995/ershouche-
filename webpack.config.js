module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        publicPath: 'xuni'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                            plugins: [
                                [
                                    'import', 
                                    {
                                        'libraryName': 'antd',
                                        'libraryDirectory': 'lib',   // default: lib
                                        'style': false
                                    }
                                ],
                                [
                                    '@babel/plugin-proposal-decorators', 
                                    {
                                        'legacy': true
                                    }
                                ],
                                [
                                    '@babel/plugin-proposal-class-properties',
                                    {
                                        'loose': true
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ]
            }
        ],
    },
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://192.168.2.250:3000',
                pathRewrite: { '^/api': '' }
            }
        }
    }
}
