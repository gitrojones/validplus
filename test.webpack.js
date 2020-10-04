const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: {
		validplus: path.resolve(__dirname, './validplus')
	},
	devtool: 'inline-cheap-module-source-map',
	resolve: {
		extensions: [ '.js', '.ts', '.json', '.vue' ],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@lib': path.resolve(__dirname, './lib'),
			'@test': path.resolve(__dirname, './test'),
			'@dev': path.resolve(__dirname, './dev'),
      'validplus': path.resolve(__dirname, './validplus.ts')
		}
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        loader: 'babel-loader'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					optimizeSSR: false
				}
			},
			{
				test: /\.css$/,
				use: [ 'vue-style-loader', 'css-loader', 'postcss-loader' ]
			},
			{
				test: /\.less$/,
				loader: [ 'vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader' ]
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[ext]'
				}
			}
		]
	},
	plugins: [
		new EslintPlugin({}),
		new VueLoaderPlugin(),
		new webpack.NormalModuleReplacementPlugin(/\.(gif|png|scss|less|css)/, 'node-noop')
	]
};
