const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				}
			},
			
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
						loader: 'file-loader'
					}]
			}
		]
	},
	
	plugins: [
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['dist']
		}),
		new HtmlWebpackPlugin({
			title: 'Boooooooks App',
			template: './src/template.html'
		})
	]
}
