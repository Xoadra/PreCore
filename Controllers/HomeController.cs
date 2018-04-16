



using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreCore.Prerender;
using PreCore.Models;



namespace PreCore.Controllers {
	public class HomeController : Controller {
		
		[ HttpGet ]
		public async Task<IActionResult> Index( ) {
			var prerenderResult = await Request.BuildPrerender( );
			ViewData[ "SpaHtml" ] = prerenderResult.Html;
			ViewData[ "Title" ] = prerenderResult.Globals[ "title" ];
			ViewData[ "Styles" ] = prerenderResult.Globals[ "styles" ];
			ViewData[ "Scripts" ] = prerenderResult.Globals[ "scripts" ];
			ViewData[ "Meta" ] = prerenderResult.Globals[ "meta" ];
			ViewData[ "Links" ] = prerenderResult.Globals[ "links" ];
			ViewData[ "TransferData" ] = prerenderResult.Globals[ "transferData" ];
			return View( );
		}
		
		[ HttpGet ]
		public IActionResult Error( ) {
			return View( new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier } );
		}
		
    }
}


