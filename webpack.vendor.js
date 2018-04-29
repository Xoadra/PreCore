



const webpack = require( 'webpack' )
const merge = require( 'webpack-merge' )
const path = require( 'path' )

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const CleanWebpackPlugin = require( 'clean-webpack-plugin' )



// Module exports converted from object to arrow function to use environment variables
module.exports = ( env ) => {
	
	// Environment identity set to a returned boolean based on the configured environment
	const develop = !( env && env.prod )
	// Temporarily placed vendor code library lists for testing entry points using the DllPlugin
	const vendors = [
		'@angular/animations',
		'@angular/common',
		'@angular/compiler',
		'@angular/core',
		'@angular/forms',
		'@angular/http',
		'@angular/platform-browser',
		'@angular/platform-browser-dynamic',
		'@angular/router',
		'zone.js'
	]
	const polyfills = [ 'core-js', /* 'es6-promise', 'es6-shim', */ 'event-source-polyfill' ]
	const modules = vendors.concat( polyfills )
	
	
	const meta = {
		// Options for what build information is displayed in the terminal while bundling files
		stats: { modules: false },
		resolve: { extensions: [ '.js' ] },
		module: {
			rules: [
				{ test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
				/* {
					test: /\.css(\?|$)/,
					use: [ 'to-string-loader' ].concat( ExtractTextPlugin.extract( [
						develop
						 ? 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
						 : 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize'
					] ) )
				} */
			]
		},
		plugins: [
			// Helps fix critical dependencies warnings when compiling Angular vendor code
			new webpack.ContextReplacementPlugin( /\@angular\b.*\b(bundles|linker)/, path.join( __dirname, './Angular' ) ),
			new webpack.ContextReplacementPlugin( /(.+)?angular(\\|\/)core(.+)?/, path.join( __dirname, './Angular' ) ),
			// Workaround for an unknown plugin to resolve a particular unidentified issue 
			new webpack.IgnorePlugin( /^vertx$/ )
		].concat( develop ? [ ] : [ new CleanWebpackPlugin( [ 'Root', 'Node' ] ) ] ),
		// Library setting is unknown and necessitates further investigation into its use
		output: { filename: '[name].bundle.js', library: '[name]_[hash]' }
	}
	
	
	const browser = merge( meta, {
		entry: { vendor: develop ? modules : polyfills },
		module: {
			rules: [
				{ test: /\.css(\?|$)/, use: ExtractTextPlugin.extract( develop ? 'css-loader' : 'css-loader?minimize' ) }
			]
		},
		plugins: [
			new ExtractTextPlugin( 'vendor.bundle.css' ),
			// Declare the vendor manifest json file name and learn the name setting's use
			new webpack.DllPlugin( {
				path: path.join( __dirname, 'Root', '[name].manifest.json' ),
				name: '[name]_[hash]'
			} )
		].concat( develop ? [ ] : [ new webpack.optimize.UglifyJsPlugin( ) ] ),
		output: { path: path.join( __dirname, 'Root' ), publicPath: '/Root/' }
	} )
	
	
	const server = merge( meta, {
		// Identifies the environment the bundles run in, such as in the browser or via Node
		target: 'node',
		entry: { vendor: modules.concat( [ 'aspnet-prerendering' ] ) },
		// Search for information on the resolve option's mainFields attribute functionality
		resolve: { mainFields: [ 'main' ] },
		module: {
			rules: [
				{ test: /\.css(\?|$)/, use: [ 'to-string-loader', develop ? 'css-loader' : 'css-loader?minimize' ] }
			]
		},
		plugins: [
			// Name the generated vendor manifest json file and look up the name setting
			new webpack.DllPlugin( {
				path: path.join( __dirname, 'Node', '[name].manifest.json' ),
				name: '[name]_[hash]'
			} )
		].concat( develop ? [ ] : [ new webpack.optimize.UglifyJsPlugin( ) ] ),
		output: { path: path.join( __dirname, 'Node' ), publicPath: '/Node/', libraryTarget: 'commonjs2' }
	} )
	
	
	// Returned configs for Webpack to interpret, build, and output the specified bundles
	return [ browser, server ]
	
}


