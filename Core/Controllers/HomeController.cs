﻿



using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreCore.Prerender;
using PreCore.Models;



namespace PreCore.Controllers {
	public class HomeController : Controller {
		
		[ HttpGet ]
		public async Task<IActionResult> Index( ) {
			// Setup and execute server-side app prerendering
			var pre = await Request.Prerender( );
			ViewData[ "Html" ] = pre.Html;
			ViewData[ "Title" ] = pre.Globals[ "title" ];
			ViewData[ "Meta" ] = pre.Globals[ "meta" ];
			ViewData[ "Links" ] = pre.Globals[ "links" ];
			ViewData[ "Styles" ] = pre.Globals[ "styles" ];
			ViewData[ "Data" ] = pre.Globals[ "transferData" ];
			ViewData[ "Scripts" ] = pre.Globals[ "scripts" ];
			return View( );
		}
		
		[ HttpGet ]
		public IActionResult Error( ) {
			return View( new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier } );
		}
		
    }
}



