



import { Component, OnInit } from '@angular/core'
import { Title, Meta, MetaDefinition } from '@angular/platform-browser'



@Component( {
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.css' ]
} )


export class MainComponent implements OnInit {
	
	private title: string = 'PreCore'
	private meta: MetaDefinition = {
		name: 'description',
		content: 'PreCore, a web app combining Angular, ASP.NET Core, and server-side rendering!'
	}
	
	
	constructor( private _title: Title, private _meta: Meta ) {  }
	
	
	ngOnInit( ) {
		this._title.setTitle( this.title )
		this._meta.updateTag( this.meta )
	}
	
}



