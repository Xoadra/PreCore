



const path = require( 'path' )
const webpack = require( 'webpack' )
const merge = require( 'webpack-merge' )

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )



const treeShakableModules = [
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
const nonTreeShakableModules = [
	'core-js',
	// 'es6-promise',
	// 'es6-shim',
	'event-source-polyfill'
]
const allModules = treeShakableModules.concat( nonTreeShakableModules )


module.exports = ( env ) => {
	
	console.log( `env = ${ JSON.stringify( env ) }` )
	
	const extractCSS = new ExtractTextPlugin( 'vendor.css' )
	const isDevBuild = !( env && env.prod )
	
	
	const sharedConfig = {
		stats: { modules: false },
		resolve: { extensions: [ '.js' ] },
		module: {
			rules: [
				{ test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
			]
		},
		output: { publicPath: 'dist/', filename: '[name].js', library: '[name]_[hash]' },
		plugins: [
			new webpack.ContextReplacementPlugin( /\@angular\b.*\b(bundles|linker)/, path.join( __dirname, './ClientApp' ) ),
			new webpack.ContextReplacementPlugin( /(.+)?angular(\\|\/)core(.+)?/, path.join( __dirname, './ClientApp' ) ),
			new webpack.IgnorePlugin( /^vertx$/ )
		]
	}
	
	
	const clientBundleConfig = merge( sharedConfig, {
		entry: { vendor: isDevBuild ? allModules : nonTreeShakableModules },
		output: { path: path.join( __dirname, 'wwwroot', 'dist' ) },
		module: {
			rules: [
				{
					test: /\.css(\?|$)/,
					use: extractCSS.extract( { use: isDevBuild ? 'css-loader' : 'css-loader?minimize' } )
				}
			]
		},
		plugins: [
			extractCSS,
			new webpack.DllPlugin( {
				path: path.join( __dirname, 'wwwroot', 'dist', '[name]-manifest.json' ),
				name: '[name]_[hash]'
			} )
		].concat( isDevBuild ? [ ] : [ new webpack.optimize.UglifyJsPlugin( ) ] )
	} )
	
	
	const serverBundleConfig = merge( sharedConfig, {
		target: 'node',
		resolve: { mainFields: [ 'main' ] },
		entry: { vendor: allModules.concat( [ 'aspnet-prerendering' ] ) },
		output: { path: path.join( __dirname, 'ClientApp', 'dist' ), libraryTarget: 'commonjs2', },
		module: {
			rules: [
				{ test: /\.css(\?|$)/, use: [ 'to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize' ] }
			]
		},
		plugins: [
			new webpack.DllPlugin( {
				path: path.join( __dirname, 'ClientApp', 'dist', '[name]-manifest.json' ),
				name: '[name]_[hash]'
			} )
		].concat( isDevBuild ? [ ] : [ new webpack.optimize.UglifyJsPlugin( ) ] )
	} )
	
	
	return [ clientBundleConfig, serverBundleConfig ]
	
}


