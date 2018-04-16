



using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreCore.Prerender;
using PreCore.Models;



namespace PreCore.Controllers {
	public class HomeController : Controller {
		
		[ HttpGet ]
		public async Task<IActionResult> Index( ) {
			var pre = await Request.Prerender( );
			ViewData[ "SpaHtml" ] = pre.Html;
			ViewData[ "Title" ] = pre.Globals[ "title" ];
			ViewData[ "Styles" ] = pre.Globals[ "styles" ];
			ViewData[ "Scripts" ] = pre.Globals[ "scripts" ];
			ViewData[ "Meta" ] = pre.Globals[ "meta" ];
			ViewData[ "Links" ] = pre.Globals[ "links" ];
			ViewData[ "TransferData" ] = pre.Globals[ "transferData" ];
			return View( );
		}
		
		[ HttpGet ]
		public IActionResult Error( ) {
			return View( new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier } );
		}
		
    }
}


