



using Microsoft.AspNetCore.Mvc;



namespace PreCore.Controllers {
	public class ApiController : Controller {
		
		[ HttpGet ]
		[ Route( "api" ) ]
		public string Api( ) {
			// Api test returning a string called by the frontend
			return "Stop calling me!!!";
		}
		
	}
}



