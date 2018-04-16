



const webpack = require( 'webpack' )
const merge = require( 'webpack-merge' )
const path = require( 'path' )

const AngularCompilerPlugin = require( '@ngtools/webpack' ).AngularCompilerPlugin
const CheckerPlugin = require( 'awesome-typescript-loader' ).CheckerPlugin
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin



module.exports = ( env ) => {
	
	const develop = !( env && env.prod )
	
	
	const meta = {
		stats: { modules: false },
		context: __dirname,
		resolve: { extensions: [ '.js', '.ts' ] },
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: develop ? [
						'awesome-typescript-loader?silent=true',
						'angular2-template-loader',
						'angular2-router-loader'
					] : '@ngtools/webpack'
				},
				{ test: /\.html$/, use: 'html-loader?minimize=false' },
				{ test: /\.css$/, use: [ 'to-string-loader', develop ? 'css-loader' : 'css-loader?minimize' ] },
				{ test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
			]
		},
		plugins: [ new CheckerPlugin( ) ],
		output: { filename: '[name].bundle.js', publicPath: 'exe/' }
	}
	
	
	const browser = merge( meta, {
		node: { fs: "empty" },
		entry: { browser: './Angular/boot.browser.ts' },
		devtool: develop ? 'cheap-eval-source-map' : false,
		plugins: [
			new webpack.DllReferencePlugin( {
				context: __dirname,
				manifest: require( './Root/exe/vendor.manifest.json' )
			} )
		].concat( develop ? [
			new webpack.SourceMapDevToolPlugin( {
				filename: '[file].map',
				moduleFilenameTemplate: path.relative( './Root/exe', '[resourcePath]' )
			} )
		] : [
			new AngularCompilerPlugin( {
				mainPath: path.join( __dirname, 'Angular/boot.browser.ts' ),
				tsConfigPath: './tsconfig.json',
				entryModule: path.join( __dirname, 'Angular/app/app.browser#AngularModule' ),
				exclude: [ './**/*.server.ts' ]
			} ),
			new webpack.optimize.UglifyJsPlugin( { output: { ascii_only: true, } } ),
		] ),
		output: { path: path.join( __dirname, './Root/exe' ) }
	} )
	
	
	const server = merge( meta, {
		target: 'node',
		entry: { server: develop ? './Angular/boot.server.ts' : './Angular/boot.production.ts' },
		resolve: { mainFields: [ 'main' ] },
		devtool: develop ? 'inline-source-map' : false,
		plugins: [
			new webpack.DllReferencePlugin( {
				context: __dirname,
				manifest: require( './Angular/exe/vendor.manifest.json' ),
				sourceType: 'commonjs2',
				name: './vendor.bundle'
			} )
		].concat( develop ? [
			new webpack.ContextReplacementPlugin( /(.+)?angular(\\|\/)core(.+)?/, path.join( __dirname, 'src' ), {  } ),
			new webpack.ContextReplacementPlugin( /(.+)?express(\\|\/)(.+)?/, path.join( __dirname, 'src' ), {  } )
		] : [
			new webpack.optimize.UglifyJsPlugin( { mangle: false, compress: false, output: { ascii_only: true, } } ),
			new AngularCompilerPlugin( {
				mainPath: path.join( __dirname, 'Angular/boot.production.ts' ),
				tsConfigPath: './tsconfig.json',
				entryModule: path.join( __dirname, 'Angular/app/app.server#NetCoreModule' ),
				exclude: [ './**/*.browser.ts' ]
			} )
		] ),
		output: { libraryTarget: 'commonjs', path: path.join( __dirname, './Angular/exe' ) }
	} )
	
	
	return [ browser, server ]
	
}


