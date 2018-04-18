



import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'



@Injectable( )


export class DataService {
	
	private type: object = { responseType: 'text' }
	
	
	constructor( private _http: HttpClient ) {  }
	
	
	getData( ) {
		console.log( 'Go get the data!!!' )
		return this._http.get<string>( 'api', this.type )
	}
	
}



