var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var envConfig = require('./config/environment.json');
var version = require('./package.json').version;

module.exports = function(env, mod){

	var appConfig = envConfig[env];

	var config = {
		entry: {
			vendor: mod.vendor,
			main: mod.entry
		},
		output: {
			path: __dirname+'/_build/'+env+'/'+mod.name,
			filename: appConfig.hashAssets ? 'app.[chunkhash].js' : '[name].bundle.js'
		},
		resolve: {
			modulesDirectories: ["node_modules",]
		},
		module: {
			loaders: [
				{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
				{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')},
				{ test: /\.html$/, loader: 'ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './app')) + '/!html'},		
				{ test: /\.(jpg|png|gif)$/, loader: 'file-loader?name=images/[name].[ext]'},
				{ test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name].[ext]' }
			]
		},
		plugins: [
			new ExtractTextPlugin(appConfig.hashAssets ? './bundle.[chunkhash].css' : 'bundle.css'),			
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.DedupePlugin()
		]
	};
	
	/* For local environment */
	if(appConfig.debug) {
		config.debug = true;
		config.devtool = 'sourcemap';
	}

	if(appConfig.env !== 'test') {
		config.plugins = config.plugins.concat(
			new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */appConfig.hashAssets ? "vendor.[chunkhash].js" : "vendor.js")
		);
	}

	// local dev-server config
	if(appConfig.env === 'local') {
		config.devtool = 'eval';			
		for(var key in config.entry) {			
			config.entry[key].unshift(
				'webpack-dev-server/client?http://localhost:8008/',
				'webpack/hot/dev-server'
			);
		}

		config.plugins = config.plugins.concat(
			new webpack.HotModuleReplacementPlugin()
		);
	}

	return config;
};
