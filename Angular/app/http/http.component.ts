



import { Component, OnInit } from '@angular/core'

import { DataService } from '../services/data.service'



@Component( {
	selector: 'app-http',
	templateUrl: './http.component.html',
	styleUrls: [ './http.component.css' ]
} )


export class HttpComponent implements OnInit {
	
	data: string
	
	
	constructor( private _data: DataService ) {  }
	
	
	ngOnInit( ) {
		// Verify backend access within an isomorphic app
		this._data.getData( ).subscribe( data => this.data = data )
		console.log( 'Yay, backend data!!!' )
	}
	
}



