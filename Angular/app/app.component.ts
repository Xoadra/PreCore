



import { Component, OnInit } from '@angular/core'

import { WebService } from './services/web.service'



@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
} )


export class AppComponent implements OnInit {
	
	name: string = 'PreCore'
	about: string = 'An Isomorphic, Server Prerendered Angular & ASP.NET Core Web App!'
	
	
	constructor( private _web: WebService ) {  }
	
	
	ngOnInit( ) {  }
	
}


