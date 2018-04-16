



using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;
using PreCore.Models;



namespace PreCore.Prerender {
	public static class Name {
		
		public static IRequest AbstractRequestInfo( this HttpRequest request ) {
			IRequest requestSimplified = new IRequest( );
			requestSimplified.cookies = request.Cookies;
			requestSimplified.headers = request.Headers;
			requestSimplified.host = request.Host;
			return requestSimplified;
		}
		
		public static async Task<RenderToStringResult> BuildPrerender( this HttpRequest Request ) {
			var nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>( );
			var hostEnv = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>( );
			var applicationBasePath = hostEnv.ContentRootPath;
			var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>( );
			var unencodedPathAndQuery = requestFeature.RawTarget;
			var unencodedAbsoluteUrl = $"{ Request.Scheme }://{ Request.Host }{ unencodedPathAndQuery }";
			TransferData transferData = new TransferData( );
			transferData.request = Request.AbstractRequestInfo( );
			transferData.thisCameFromDotNET = "Hi Angular it's asp.net :)";
			System.Threading.CancellationTokenSource cancelSource = new System.Threading.CancellationTokenSource( );
			System.Threading.CancellationToken cancelToken = cancelSource.Token;
			return await Prerenderer.RenderToString(
				"/",
				nodeServices,
				cancelToken,
				new JavaScriptModuleExport( applicationBasePath + "/ClientApp/dist/main-server" ),
				unencodedAbsoluteUrl,
				unencodedPathAndQuery,
				transferData,
				30000,
				Request.PathBase.ToString( )
			);
		}
		
	}
}


