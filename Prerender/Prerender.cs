



using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;



namespace PreCore.Prerender {
	public static class Name {
		
		public static IRequest Decode( this HttpRequest source ) {
			IRequest http = new IRequest( );
			http.cookies = source.Cookies;
			http.headers = source.Headers;
			http.host = source.Host;
			return http;
		}
		
		public static async Task<RenderToStringResult> Prerender( this HttpRequest trans ) {
			INodeServices node = trans.HttpContext.RequestServices.GetRequiredService<INodeServices>( );
			IHostingEnvironment zone = trans.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>( );
			IHttpRequestFeature item = trans.HttpContext.Features.Get<IHttpRequestFeature>( );
			String root = zone.ContentRootPath;
			String path = item.RawTarget;
			String url = $"{ trans.Scheme }://{ trans.Host }{ path }";
			TransferData data = new TransferData( );
			data.request = trans.Decode( );
			data.thisCameFromDotNET = "The server beckons thee!!!";
			CancellationTokenSource origin = new CancellationTokenSource( );
			CancellationToken exe = origin.Token;
			JavaScriptModuleExport js = new JavaScriptModuleExport( root + "/Angular/exe/server.bundle" );
			return await Prerenderer.RenderToString( "/", node, exe, js, url, path, data, 30000, trans.PathBase.ToString( ) );
		}
		
	}
}


