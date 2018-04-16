



using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;



namespace PreCore {
	public class Startup {
		
		public IConfiguration Configuration { get; }
		
		
		public Startup( IHostingEnvironment env ) {
			var builder = new ConfigurationBuilder( )
				.SetBasePath( env.ContentRootPath)
				.AddJsonFile( "appsettings.json", optional: true, reloadOnChange: true )
				.AddJsonFile( $"appsettings.{ env.EnvironmentName }.json", optional: true )
				.AddEnvironmentVariables( );
			Configuration = builder.Build( );
		}
		
		
		public void ConfigureServices( IServiceCollection services ) {
			services.AddMvc( );
			services.AddNodeServices( );
			services.Configure<RazorViewEngineOptions>( razor => {
				razor.ViewLocationFormats.Clear( );
				razor.ViewLocationFormats.Add( "~/View/{1}/{0}" + RazorViewEngine.ViewExtension );
				razor.ViewLocationFormats.Add( "~/View/Shared/{0}" + RazorViewEngine.ViewExtension );
			} );
		}
		
        public void Configure( IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory ) {
			loggerFactory.AddConsole( Configuration.GetSection( "Logging" ) );
			loggerFactory.AddDebug( );
			app.UseStaticFiles( );
			if ( env.IsDevelopment( ) ) { app.UseDeveloperExceptionPage( ); }
			else { app.UseExceptionHandler( "/Home/Error" ); }
			app.UseMvc( routes => {
				routes.MapRoute( name: "default", template: "{controller=Home}/{action=Index}/{id?}" );
				routes.MapSpaFallbackRoute( name: "spa-fallback", defaults: new { controller = "Home", action = "Index" } );
			} );
		}
		
	}
}


