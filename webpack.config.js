const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /index.html/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /(?<!index)\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: './src/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].css',
                            context: './src/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?sourceMap=true'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader?sourceMap=true'
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: './src/',
                            publicPath: getPublicPath
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};

// If path is in the css folder then return urls from file-loader that
// are relative to the css folder.
function getPublicPath(url) {
    if(/\/css\//.test(url)) {
        /* relative path example: img/file1.jpg */
        var relativePathRegExp = /(?<=\/)[^/]+\/[^/]+\.\w+$/;
        var relativePath = url.match(relativePathRegExp)[0];
        return relativePath;
    } else {
        return url;
    }
}
