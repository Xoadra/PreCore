



import { Component, OnInit } from '@angular/core'
import { Meta } from '@angular/platform-browser'



@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
} )


export class AppComponent implements OnInit {
	
	title = 'app'
	
	
	constructor( private _meta: Meta ) {  }
	
	
	ngOnInit( ) {  }
	
}


