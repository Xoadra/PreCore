



using Microsoft.AspNetCore.Mvc;



namespace PreCore.Controllers {
	public class ApiController : Controller {
		
		[ HttpGet ]
		[ Route( "api" ) ]
		public string Api( ) {
			return "Stop calling me!!!";
		}
		
	}
}


