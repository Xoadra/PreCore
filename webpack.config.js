




const path = require( 'path' )
const webpack = require( 'webpack' )
const merge = require( 'webpack-merge' )

const AngularCompilerPlugin = require( '@ngtools/webpack' ).AngularCompilerPlugin
const CheckerPlugin = require( 'awesome-typescript-loader' ).CheckerPlugin
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin



module.exports = ( env ) => {
	
	const isDevBuild = !( env && env.prod )
	
	
	const sharedConfig = {
		stats: { modules: false },
		context: __dirname,
		resolve: { extensions: [ '.js', '.ts' ] },
		output: { filename: '[name].js', publicPath: 'dist/' },
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: isDevBuild ? [
						'awesome-typescript-loader?silent=true',
						'angular2-template-loader',
						'angular2-router-loader'
					] : '@ngtools/webpack'
				},
				{ test: /\.html$/, use: 'html-loader?minimize=false' },
				{ test: /\.css$/, use: [ 'to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize' ] },
				{ test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
			]
		},
		plugins: [ new CheckerPlugin( ) ]
	}
	
	
	const clientBundleOutputDir = './wwwroot/dist'
	
	const clientBundleConfig = merge( sharedConfig, {
		entry: { 'main-client': './ClientApp/boot.browser.ts' },
		output: { path: path.join( __dirname, clientBundleOutputDir ) },
		plugins: [
			new webpack.DllReferencePlugin( {
				context: __dirname,
				manifest: require( './wwwroot/dist/vendor-manifest.json' )
			} )
		].concat( isDevBuild ? [
			new webpack.SourceMapDevToolPlugin( {
				filename: '[file].map',
				moduleFilenameTemplate: path.relative( clientBundleOutputDir, '[resourcePath]' )
			} )
		] : [
			new AngularCompilerPlugin( {
				mainPath: path.join( __dirname, 'ClientApp/boot.browser.ts' ),
				tsConfigPath: './tsconfig.json',
				entryModule: path.join( __dirname, 'ClientApp/app/app.browser#AppModule' ),
				exclude: [ './**/*.server.ts' ]
			} ),
			new webpack.optimize.UglifyJsPlugin( { output: { ascii_only: true, } } ),
		] ),
		devtool: isDevBuild ? 'cheap-eval-source-map' : false,
		node: { fs: "empty" }
	} )
	
	
	const serverBundleConfig = merge( sharedConfig, {
		resolve: { mainFields: [ 'main' ] },
		entry: { 'main-server': isDevBuild ? './ClientApp/boot.server.ts' : './ClientApp/boot.production.ts' },
		plugins: [
			new webpack.DllReferencePlugin( {
				context: __dirname,
				manifest: require( './ClientApp/dist/vendor-manifest.json' ),
				sourceType: 'commonjs2',
				name: './vendor'
			} )
		].concat( isDevBuild ? [
			new webpack.ContextReplacementPlugin( /(.+)?angular(\\|\/)core(.+)?/, path.join( __dirname, 'src' ), {  } ),
			new webpack.ContextReplacementPlugin( /(.+)?express(\\|\/)(.+)?/, path.join( __dirname, 'src' ), {  } )
		] : [
			new webpack.optimize.UglifyJsPlugin( { mangle: false, compress: false, output: { ascii_only: true, } } ),
			new AngularCompilerPlugin( {
				mainPath: path.join( __dirname, 'ClientApp/boot.production.ts' ),
				tsConfigPath: './tsconfig.json',
				entryModule: path.join( __dirname, 'ClientApp/app/app.server#AppModule' ),
				exclude: [ './**/*.browser.ts' ]
			} )
		] ),
		output: { libraryTarget: 'commonjs', path: path.join( __dirname, './ClientApp/dist' ) },
		target: 'node',
		devtool: isDevBuild ? 'inline-source-map' : false
	} )
	
	
	return [ clientBundleConfig, serverBundleConfig ]
	
}



