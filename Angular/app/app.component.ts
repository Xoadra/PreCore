



import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { WebService } from './services/web.service'



@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ],
	encapsulation: ViewEncapsulation.None
} )


export class AppComponent implements OnInit {
	
	private name: string = 'PreCore'
	
	
	constructor( private _route: Router, private _web: WebService ) {  }
	
	
	ngOnInit( ) {
		this._web.injectData( this._route, this.name )
	}
	
}



