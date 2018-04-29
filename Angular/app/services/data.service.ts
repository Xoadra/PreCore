



import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'



@Injectable( )


export class DataService {
	
	// Object instantiation for identifying http data
	private type: object = { responseType: 'text' }
	
	
	constructor( private _http: HttpClient ) {  }
	
	
	getData( ) {
		console.log( 'Go get the data!!!' )
		// Tell http to set response data to a string
		return this._http.get<string>( 'api', this.type )
	}
	
}



