



const webpack = require( 'webpack' )
const merge = require( 'webpack-merge' )
const path = require( 'path' )

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const CleanWebpackPlugin = require( 'clean-webpack-plugin' )



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
const polyfills = [
	'core-js',
	// 'es6-promise',
	// 'es6-shim',
	'event-source-polyfill'
]
const modules = vendors.concat( polyfills )


module.exports = ( env ) => {
	
	const develop = !( env && env.prod )
	
	
	const meta = {
		stats: { modules: false },
		resolve: { extensions: [ '.js' ] },
		module: {
			rules: [
				{ test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
			]
		},
		plugins: [
			new CleanWebpackPlugin( [ 'Root/exe', 'Angular/exe' ] ),
			new webpack.ContextReplacementPlugin( /\@angular\b.*\b(bundles|linker)/, path.join( __dirname, './Angular' ) ),
			new webpack.ContextReplacementPlugin( /(.+)?angular(\\|\/)core(.+)?/, path.join( __dirname, './Angular' ) ),
			new webpack.IgnorePlugin( /^vertx$/ )
		],
		output: { filename: '[name].bundle.js', publicPath: 'exe/', library: '[name]_[hash]' }
	}
	
	
	const browser = merge( meta, {
		entry: { vendor: develop ? modules : polyfills },
		module: {
			rules: [
				{
					test: /\.css(\?|$)/,
					use: ExtractTextPlugin.extract( { use: develop ? 'css-loader' : 'css-loader?minimize' } )
				}
			]
		},
		plugins: [
			new ExtractTextPlugin( 'vendor.bundle.css' ),
			new webpack.DllPlugin( {
				path: path.join( __dirname, 'Root', 'exe', '[name].manifest.json' ),
				name: '[name]_[hash]'
			} )
		].concat( develop ? [ ] : [ new webpack.optimize.UglifyJsPlugin( ) ] ),
		output: { path: path.join( __dirname, 'Root', 'exe' ) }
	} )
	
	
	const server = merge( meta, {
		target: 'node',
		entry: { vendor: modules.concat( [ 'aspnet-prerendering' ] ) },
		resolve: { mainFields: [ 'main' ] },
		module: {
			rules: [
				{ test: /\.css(\?|$)/, use: [ 'to-string-loader', develop ? 'css-loader' : 'css-loader?minimize' ] }
			]
		},
		plugins: [
			new webpack.DllPlugin( {
				path: path.join( __dirname, 'Angular', 'exe', '[name].manifest.json' ),
				name: '[name]_[hash]'
			} )
		].concat( develop ? [ ] : [ new webpack.optimize.UglifyJsPlugin( ) ] ),
		output: { path: path.join( __dirname, 'Angular', 'exe' ), libraryTarget: 'commonjs2', }
	} )
	
	
	return [ browser, server ]
	
}



