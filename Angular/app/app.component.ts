



import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { WebService } from './services/web.service'



@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ],
	// View styles for this component are used globally
	encapsulation: ViewEncapsulation.None
} )


export class AppComponent implements OnInit, OnDestroy {
	
	name: string = 'PreCore'
	
	
	constructor( private _route: Router, private _web: WebService ) {  }
	
	
	// Initial website access sets up route data injection
	ngOnInit( ) {
		this._web.injectData( this._route, this.name )
	}
	
	// Use of ngOnDestroy needs to be fully investigated
	ngOnDestroy( ) {
		this._web.killNavigator( )
	}
	
}


