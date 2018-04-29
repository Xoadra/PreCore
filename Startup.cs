



using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;



namespace PreCore {
	public class Startup {
		
		public IConfiguration Configuration { get; }
		
		
		public Startup( IHostingEnvironment env ) {
			var builder = new ConfigurationBuilder( )
				.SetBasePath( env.ContentRootPath )
				.AddJsonFile( "appsettings.json", optional: true, reloadOnChange: true )
				.AddJsonFile( $"appsettings.{ env.EnvironmentName }.json", optional: true )
				.AddEnvironmentVariables( );
			Configuration = builder.Build( );
		}
		
		
		public void ConfigureServices( IServiceCollection services ) {
			services.AddMvc( );
			// Node server activation for prerendering single page apps
			services.AddNodeServices( );
			services.Configure<RazorViewEngineOptions>( razor => {
				// Overwrite the razor view engine's default view location
				razor.ViewLocationFormats.Clear( );
				// Identify custom path names for the razor view engine
				razor.ViewLocationFormats.Add( "~/View/{1}/{0}" + RazorViewEngine.ViewExtension );
				razor.ViewLocationFormats.Add( "~/View/Shared/{0}" + RazorViewEngine.ViewExtension );
			} );
		}
		
        public void Configure( IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory ) {
			loggerFactory.AddConsole( Configuration.GetSection( "Logging" ) );
			loggerFactory.AddDebug( );
			app.UseStaticFiles( );
			if ( env.IsDevelopment( ) ) {
				app.UseDeveloperExceptionPage( );
				// Webpack middleware setup integration with backend
				// Fails to operate properly when upgraded to Webpack 4
				/* app.UseWebpackDevMiddleware( new WebpackDevMiddlewareOptions {
					HotModuleReplacement = true
				} ); */
			}
			else { app.UseExceptionHandler( "/Home/Error" ); }
			app.UseMvc( routes => {
				routes.MapRoute( name: "default", template: "{controller=Home}/{action=Index}/{id?}" );
				routes.MapSpaFallbackRoute( name: "spa-fallback", defaults: new { controller = "Home", action = "Index" } );
			} );
		}
		
	}
}



