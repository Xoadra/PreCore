



const webpack = require( 'webpack' )
const merge = require( 'webpack-merge' )
const path = require( 'path' )

const ExtractTextPlugin = require( 'mini-css-extract-plugin' )
const CheckerPlugin = require( 'awesome-typescript-loader' ).CheckerPlugin
const AngularCompilerPlugin = require( '@ngtools/webpack' ).AngularCompilerPlugin



// Module exports converted from object to arrow function to use environment variables
module.exports = ( env ) => {
	
	// Environment identity set to a returned boolean based on the configured environment
	const develop = !( env && env.prod )
	
	
	const meta = {
		mode: develop ? 'development' : 'production',
		// Terminal output settings for displaying build information while files are bundled
		stats: { modules: false },
		// Webpack's absolute route where it looks for any config entry points and loaders
		context: __dirname,
		resolve: { extensions: [ '.js', '.ts' ] },
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: develop ? [
						'ts-loader?silent=true',
						// Broken via static injection errors with Webpack 4 during server boot up
						/* 'awesome-typescript-loader?silent=true', */
						'angular2-template-loader',
						'angular2-router-loader'
					] : '@ngtools/webpack'
				},
				{ test: /\.html$/, use: 'html-loader?minimize=false' },
				{ test: /\.css$/, use: [ 'to-string-loader', develop ? 'css-loader' : 'css-loader?minimize' ] },
				/* {
					test: /\.css$/,
					exclude: path.resolve( __dirname, 'app' ),
					use: [ 'to-string-loader' ].concat( ExtractTextPlugin.extract( {
						fallback: 'style-loader',
						use: develop
						? 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
						: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize'
					} ) )
				},
				{
					test: /\.css$/,
					include: path.resolve( __dirname, 'app' ),
					use: develop
						? 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
						: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize'
				}, */
				{ test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
			]
		},
		// CheckerPlugin supposedly does async error reporting, presumably while bundling
		// Nullified given Webpack 4 feature depreciations and awesome typescript loader
		plugins: [ /* new CheckerPlugin( ) */ ],
		output: { filename: '[name].bundle.js' }
	}
	
	
	const browser = merge( meta, {
		// Allows code designed for running in Node to operate in non-Node environments
		node: { fs: 'empty' },
		entry: { browser: './Angular/boot.browser.ts' },
		devtool: develop ? 'cheap-eval-source-map' : false,
		/* module: {
			rules: [
				{
					test: /\.css$/,
					exclude: path.resolve( __dirname, 'app' ),
					use: ExtractTextPlugin.extract( {
						fallback: 'style-loader',
						use: develop
						? 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
						: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize'
					} )
				},
				{
					test: /\.css$/,
					include: path.resolve( __dirname, 'app' ),
					use: develop
						? 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
						: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize'
				},
			]
		}, */
		plugins: [
			// Position manifest referencing to the json file output via the vendor configuration
			new webpack.DllReferencePlugin( {
				context: __dirname,
				manifest: require( './Root/vendor.manifest.json' )
			} )
		].concat( develop ? [
			// Just create inline source maps instead by removing the filename option below
			new webpack.SourceMapDevToolPlugin( {
				filename: '[file].map',
				moduleFilenameTemplate: path.relative( './Root', '[resourcePath]' )
			} )
		] : [
			// Unknown UglifyJsPlugin and AngularCompilerPlugin settings need investigation
			new AngularCompilerPlugin( {
				mainPath: path.join( __dirname, 'Angular/boot.browser.ts' ),
				tsConfigPath: './tsconfig.json',
				entryModule: path.join( __dirname, 'Angular/app/app.browser#AngularModule' ),
				exclude: [ './**/*.server.ts' ]
			} ),
			new webpack.optimize.UglifyJsPlugin( { output: { ascii_only: true, } } ),
		] ),
		output: { path: path.join( __dirname, 'Root' ), publicPath: '/Root/' }
	} )
	
	
	const server = merge( meta, {
		// Identifies the environment the bundles run in, such as in the browser or via Node
		target: 'node',
		entry: { server: develop ? './Angular/boot.server.ts' : './Angular/boot.production.ts' },
		resolve: { mainFields: [ 'main' ] },
		// Source map selection for TypeScript debugging during server-side prerendering
		devtool: develop ? 'inline-source-map' : false,
		/* module: {
			rules: [ { test: /\.css$/, use: [ 'to-string-loader', develop ? 'css-loader' : 'css-loader?minimize' ] } ]
		}, */
		plugins: [
			// Direct foreign dependency lookups at the backend's vendor manifest json file
			new webpack.DllReferencePlugin( {
				context: __dirname,
				manifest: require( './Node/vendor.manifest.json' ),
				sourceType: 'commonjs2',
				name: './vendor.bundle'
			} )
		].concat( develop ? [
			// Helps fix critical dependencies warnings when compiling Angular vendor code
			new webpack.ContextReplacementPlugin( /(.+)?angular(\\|\/)core(.+)?/, path.join( __dirname, 'src' ), {  } ),
			new webpack.ContextReplacementPlugin( /(.+)?express(\\|\/)(.+)?/, path.join( __dirname, 'src' ), {  } )
		] : [
			// Options set for UglifyJsPlugin and AngularCompilerPlugin need to be researched
			new webpack.optimize.UglifyJsPlugin( { mangle: false, compress: false, output: { ascii_only: true, } } ),
			new AngularCompilerPlugin( {
				mainPath: path.join( __dirname, 'Angular/boot.production.ts' ),
				tsConfigPath: './tsconfig.json',
				entryModule: path.join( __dirname, 'Angular/app/app.server#NetCoreModule' ),
				exclude: [ './**/*.browser.ts' ]
			} )
		] ),
		// LibraryTarget setting's use is unknown and necessitates additional investigation
		output: { path: path.join( __dirname, 'Node' ), publicPath: '/Node/', libraryTarget: 'commonjs' }
	} )
	
	
	// Returned configs for Webpack to interpret, build, and output the specified bundles
	return [ browser, server ]
	
}



